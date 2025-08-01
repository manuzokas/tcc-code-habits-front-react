// src/hooks/useCalendarEvents.ts
import { useState, useEffect } from "react";
import type { CalendarEvent } from "../types/calendar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/api/supabase";

export const useCalendarEvents = (currentDate: Date) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchEvents = async () => {
    setIsLoading(true);
    if (!user) {
      setEvents([]);
      setIsLoading(false);
      return;
    }

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const start_time_iso = startOfMonth.toISOString();
    const end_time_iso = endOfMonth.toISOString();

    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", start_time_iso)
      .lte("start_time", end_time_iso);

    if (error) {
      console.error("Error fetching calendar events:", error.message);
    } else {
      setEvents(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchEvents();
    } else {
      setEvents([]);
      setIsLoading(false);
    }
  }, [user, currentDate]);

  return { events, isLoading };
};