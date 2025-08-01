import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSupabase } from "@/hooks/useSupabase";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { SetupItem, UserSetupProgress, CombinedSetupItem } from "../types/setup";
import { startOfDay } from 'date-fns';

const CHECKLIST_ITEMS_KEY = ["preCodeSetupItems"];
const USER_PROGRESS_KEY = ["userSetupProgress"];

export const usePreCodeSetup = () => {
  const supabase = useSupabase();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  // QUERY 1: busca a lista estática de itens da checklist
  const { data: checklistItems, isLoading: isLoadingItems, error: itemsError } = useQuery<SetupItem[], Error>({
    queryKey: CHECKLIST_ITEMS_KEY,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pre_code_setup_items")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: Infinity,
  });

  // QUERY 2: busca o progresso do usuário para o dia atual
  const { data: userProgress, isLoading: isLoadingProgress, error: progressError } = useQuery<UserSetupProgress[], Error>({
    queryKey: [USER_PROGRESS_KEY, userId],
    queryFn: async () => {
      if (!userId) return [];
      const today = startOfDay(new Date()).toISOString();
      const { data, error } = await supabase
        .from("user_pre_code_setup_progress")
        .select("*")
        .eq("user_id", userId)
        .eq("completion_date", today.split('T')[0]);
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  // alterna o status de um item da checklist
  const toggleItemCompletion = useMutation({
    mutationFn: async (itemId: string) => {
      if (!userId) throw new Error("User not authenticated.");
      const today = startOfDay(new Date()).toISOString();
      
      const isCompleted = userProgress?.some(p => p.item_id === itemId && p.completed) ?? false;

      if (isCompleted) {
        const { error } = await supabase
          .from("user_pre_code_setup_progress")
          .delete()
          .eq("user_id", userId)
          .eq("item_id", itemId)
          .eq("completion_date", today.split('T')[0]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_pre_code_setup_progress")
          .insert({ user_id: userId, item_id: itemId, completed: true, completion_date: today.split('T')[0] });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROGRESS_KEY, userId] });
    },
  });

  const combinedChecklist =
    checklistItems?.map<CombinedSetupItem>((item) => ({
      ...item,
      completed: userProgress?.some((p) => p.item_id === item.id && p.completed) ?? false,
    })) || [];
    
  const completedCount = combinedChecklist.filter(item => item.completed).length;
  const totalCount = combinedChecklist.length;

  return {
    checklist: combinedChecklist,
    completedCount,
    totalCount,
    isLoading: isLoadingItems || isLoadingProgress,
    error: itemsError || progressError,
    toggleItem: toggleItemCompletion.mutate,
  };
};