import { useState, useEffect } from "react";
import type { Alarm, NewAlarm } from "../types/alarms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/api/supabase";

export const useSmartAlarms = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchAlarms = async () => {
    setIsLoading(true);
    if (!user) {
      setAlarms([]);
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("alarms")
      .select("*")
      .eq("user_id", user.id)
      .order("time", { ascending: true });

    if (error) {
      console.error("Error fetching alarms:", error.message);
    } else {
      setAlarms(data || []);
    }
    setIsLoading(false);
  };

  const addAlarm = async (newAlarmData: Omit<NewAlarm, "is_active">) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("alarms")
      .insert({
        ...newAlarmData,
        user_id: user.id,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding new alarm:", error.message);
    } else {
      setAlarms((prevAlarms) => [...prevAlarms, data]);
    }
  };

  const deleteAlarm = async (alarmId: string) => {
    const { error } = await supabase.from("alarms").delete().eq("id", alarmId);

    if (error) {
      console.error("Error deleting alarm:", error.message);
    } else {
      setAlarms((prevAlarms) => prevAlarms.filter((alarm) => alarm.id !== alarmId));
    }
  };

  const toggleAlarm = async (alarmId: string, currentStatus: boolean) => {
    const { data, error } = await supabase
      .from("alarms")
      .update({ is_active: !currentStatus })
      .eq("id", alarmId)
      .select()
      .single();

    if (error) {
      console.error("Error toggling alarm status:", error.message);
    } else if (data) {
      setAlarms((prevAlarms) =>
        prevAlarms.map((alarm) => (alarm.id === alarmId ? data : alarm))
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchAlarms();
    } else {
      setAlarms([]); 
      setIsLoading(false);
    }
  }, [user]);

  return { alarms, isLoading, addAlarm, deleteAlarm, toggleAlarm };
};