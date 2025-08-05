interface MetricUpdate {
  type: string;
  value: string;
  context?: string;
}

export const missionToMetricsMap = {
  water: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "2L"; // valor total para 4 copos (4 * 0.5L)
    return [{
      type: "hydration",
      value: isCompleted ? totalValue : `${progress * 0.5}L`,
      context: isCompleted ? "Meta diária alcançada!" : `${progress} copos hoje`
    }];
  },
  stretch: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "5 vezes"; // valor total para a missão
    return [{
      type: "posture",
      value: isCompleted ? totalValue : `${progress} vezes`,
      context: isCompleted ? "Excelente alongamento!" : 
             (progress >= 3 ? "Bom" : "Pode melhorar")
    }];
  },
  eyeRest: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "Ativo"; // valor quando completo
    return [{
      type: "eye_health",
      value: isCompleted ? totalValue : (progress > 0 ? "Parcial" : "Inativo"),
      context: isCompleted ? "Descanso visual completo" :
             (progress > 0 ? "Pausas parciais" : "Necessita pausas")
    }];
  },
  stressRelief: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    return [{
      type: "stress",
      value: isCompleted ? "Controlado" : (progress > 0 ? "Em progresso" : "Moderado"),
      context: isCompleted ? "Estresse controlado" : 
             (progress > 0 ? "Alívio parcial" : "Necessita relaxar")
    }];
  },
  sleep: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "8h"; // valor ideal
    return [{
      type: "sleep",
      value: isCompleted ? totalValue : `${progress}h`,
      context: isCompleted ? "Descanso completo" :
             (progress >= 7 ? "Bom" : "Insuficiente")
    }];
  },
  movement: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "15min"; // 3 movimentos * 5min
    return [{
      type: "activity",
      value: isCompleted ? totalValue : `${progress * 5}min`,
      context: isCompleted ? "Ativo o suficiente" :
             (progress >= 3 ? "Bom" : "Moderado")
    }];
  },
  walk: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "10min"; // 1 caminhada * 10min
    return [{
      type: "activity",
      value: isCompleted ? totalValue : `${progress * 10}min`,
      context: isCompleted ? "Caminhada completa" :
             (progress >= 1 ? "Bom início" : "Pendente")
    }];
  },
  steps: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    const totalValue = "200min"; // 100 passos * 2min
    return [{
      type: "activity",
      value: isCompleted ? totalValue : `${progress * 2}min`,
      context: isCompleted ? "Meta de passos alcançada" :
             (progress >= 100 ? "Bom progresso" : "Continue andando")
    }];
  },
  breathBreak: (progress: number, isCompleted: boolean): MetricUpdate[] => {
    return [{
      type: "stress",
      value: isCompleted ? "Controlado" : (progress > 0 ? "Alívio parcial" : "Moderado"),
      context: isCompleted ? "Respiração completa" :
             (progress > 0 ? "Pausa realizada" : "Necessita relaxar")
    }];
  }
};

export type MissionMetricsMap = typeof missionToMetricsMap;