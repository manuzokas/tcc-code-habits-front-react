import { useState, useEffect, useCallback } from "react";
import type { CalendarEvent, NewCalendarEvent } from "../types/calendar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/api/supabase";

export const useCalendarEvents = (currentDate: Date) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      setEvents([]);
      setIsLoading(false);
      return;
    }

    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const start_time_iso = startOfMonth.toISOString();
    const end_time_iso = endOfMonth.toISOString();

    const { data, error: fetchError } = await supabase
      .from("calendar_events")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", start_time_iso)
      .lte("start_time", end_time_iso);

    if (fetchError) {
      console.error("Error fetching calendar events:", fetchError.message);
      setError(fetchError.message);
      setEvents([]);
    } else {
      setEvents(data || []);
    }
    setIsLoading(false);
  }, [user, currentDate]);

  const addEvent = async (event: NewCalendarEvent) => {
    if (!user) {
      throw new Error("User not authenticated.");
    }
    const { data, error: addError } = await supabase
      .from("calendar_events")
      .insert({ ...event, user_id: user.id })
      .select()
      .single();

    if (addError) {
      throw addError;
    } 

    setEvents((prevEvents) => [...prevEvents, data as CalendarEvent]);
    return data as CalendarEvent;
  };

  const updateEvent = async (event: CalendarEvent) => {
    if (!user || !event.id) {
      throw new Error("User not authenticated or event ID is missing.");
    }
    const { data, error: updateError } = await supabase
      .from("calendar_events")
      .update(event)
      .eq("id", event.id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    setEvents((prevEvents) =>
      prevEvents.map((e) => (e.id === data.id ? (data as CalendarEvent) : e))
    );
    return data as CalendarEvent;
  };

  const deleteEvent = async (eventId: string) => {
    if (!user) {
      throw new Error("User not authenticated.");
    }
    const { error: deleteError } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", eventId)
      .eq("user_id", user.id);

    if (deleteError) {
      throw deleteError;
    } 

    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
  };

  useEffect(() => {
    if (user) {
      fetchEvents();
    } else {
      setEvents([]);
      setIsLoading(false);
    }
  }, [user, currentDate, fetchEvents]);

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
};
