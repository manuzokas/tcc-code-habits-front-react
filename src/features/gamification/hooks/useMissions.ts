import { useState, useCallback } from 'react';
import { MISSIONS } from '../constants/missions';
import type { MissionKeyType, Missions } from '../types/missions';

export const useMissions = () => {
  const [missions, setMissions] = useState<Missions>(MISSIONS);

  /**
   * incrementa o progresso de uma missão específica
   * @param missionType - Tipo da missão (water, stretch, eyeRest)
   * @param amount - Quantidade a incrementar (opcional, padrão é o increment definido na missão)
   */
  const handleAdd = useCallback((missionType: MissionKeyType, amount?: number) => {
    setMissions(prev => {
      const mission = prev[missionType];
      const incrementAmount = amount ?? mission.increment;
      const newValue = Math.min(mission.current + incrementAmount, mission.total);
      
      return {
        ...prev,
        [missionType]: {
          ...mission,
          current: newValue
        }
      };
    });
  }, []);

  /**
   * completa uma missão (define o progresso para o total)
   * @param missionType - Tipo da missão (water, stretch, eyeRest)
   */
  const handleComplete = useCallback((missionType: MissionKeyType) => {
    setMissions(prev => ({
      ...prev,
      [missionType]: {
        ...prev[missionType],
        current: prev[missionType].total
      }
    }));
  }, []);

  /**
   * reseta todas as missões para o estado inicial
   */
  const resetMissions = useCallback(() => {
    setMissions(MISSIONS);
  }, []);

  /**
   * calcula o progresso total (XP ganho)
   */
  const calculateTotalXp = useCallback(() => {
    return Object.values(missions).reduce((total, mission) => {
      return total + (mission.current / mission.total) * mission.xp;
    }, 0);
  }, [missions]);

  return {
    missions,
    handleAdd,
    handleComplete,
    resetMissions,
    calculateTotalXp,
    isAllMissionsCompleted: Object.values(missions).every(m => m.current >= m.total)
  };
};