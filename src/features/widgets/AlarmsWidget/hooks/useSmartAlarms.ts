import { useState, useEffect } from "react";
import type { Alarm, NewAlarm } from "../types/alarms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/api/supabase";
import { playAlarmSound, stopAlarmSound } from "@/shared/services/audioService";

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const useSmartAlarms = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [ringingAlarmId, setRingingAlarmId] = useState<string | null>(null);

  const markAlarmAsTriggered = async (alarmId: string) => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("alarms")
      .update({ last_triggered_at: now })
      .eq("id", alarmId)
      .select()
      .single();

    if (error) {
      console.error("Error updating last_triggered_at:", error);
    } else if (data) {
      setAlarms((prevAlarms) =>
        prevAlarms.map((a) => (a.id === alarmId ? data : a))
      );
    }
  };

  useEffect(() => {
    if (isLoading || ringingAlarmId) return;

    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const currentDay = now.getDay();

      const alarmToRing = alarms.find((alarm) => {
        const alarmTime = alarm.time.substring(0, 5);

        if (!alarm.is_active || alarmTime !== currentTime) {
          return false;
        }

        if (
          alarm.last_triggered_at &&
          isSameDay(new Date(alarm.last_triggered_at), now)
        ) {
          return false;
        }

        const days = alarm.days_of_week;
        if (days.includes("Daily")) return true;
        if (days.includes("Weekdays") && currentDay >= 1 && currentDay <= 5)
          return true;

        return false;
      });

      if (alarmToRing) {
        markAlarmAsTriggered(alarmToRing.id);
        setRingingAlarmId(alarmToRing.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms, ringingAlarmId, isLoading]);

  useEffect(() => {
    if (ringingAlarmId) {
      playAlarmSound();
    } else {
      stopAlarmSound();
    }
  }, [ringingAlarmId]);

  const dismissAlarm = () => {
    setRingingAlarmId(null);
  };

  const fetchAlarms = async () => {
    if (!user) {
      setAlarms([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const { data, error } = await supabase
      .from("alarms")
      .select("*")
      .eq("user_id", user.id)
      .order("time", { ascending: true });
    if (error) {
      console.error("Error fetching alarms:", error.message);
      setAlarms([]);
    } else {
      setAlarms(data || []);
    }
    setIsLoading(false);
  };

  const addAlarm = async (newAlarmData: Omit<NewAlarm, "is_active">) => {
    if (!user) return;
    const timeWithSeconds =
      newAlarmData.time.length === 5
        ? `${newAlarmData.time}:00`
        : newAlarmData.time;
    const { data, error } = await supabase
      .from("alarms")
      .insert({
        ...newAlarmData,
        time: timeWithSeconds,
        user_id: user.id,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      console.error("Error adding new alarm:", error.message);
    } else if (data) {
      setAlarms((prevAlarms) =>
        [...prevAlarms, data].sort((a, b) => a.time.localeCompare(b.time))
      );
    }
  };

  const deleteAlarm = async (alarmId: string) => {
    if (alarmId === ringingAlarmId) {
      dismissAlarm();
    }
    const { error } = await supabase.from("alarms").delete().eq("id", alarmId);
    if (error) {
      console.error("Error deleting alarm:", error.message);
    } else {
      setAlarms((prevAlarms) =>
        prevAlarms.filter((alarm) => alarm.id !== alarmId)
      );
    }
  };

  const toggleAlarm = async (alarmId: string, currentStatus: boolean) => {
    if (currentStatus && alarmId === ringingAlarmId) {
      dismissAlarm();
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    alarms,
    isLoading,
    addAlarm,
    deleteAlarm,
    toggleAlarm,
    ringingAlarmId,
    dismissAlarm,
  };
};
