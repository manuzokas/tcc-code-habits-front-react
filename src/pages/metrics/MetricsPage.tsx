import React from "react";
import { DailySummaryChart } from "@/features/metrics/components/DailySummaryChart";
import { InterruptionsImpactChart } from "@/features/metrics/components/InterruptionsImpactChart";
import { HealthAdherenceChart } from "@/features/metrics/components/HealthAdherenceChart";
import { InsightsPanel } from "@/features/metrics/components/InsightsPanel";

export const MetricsPage: React.FC = () => {

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Dashboard de Produtividade e Bem-Estar
        </h1>
        <p className="text-gray-400 mt-1">
          Analise seus padrões de trabalho para otimizar sua rotina e prevenir o
          esgotamento.
        </p>
      </div>

      {/* --- INÍCIO DO CONTAINER DO GRID NARRATIVO --- */}
      {/* Este layout conta uma história:
        1. Visão Geral (O que aconteceu?)
        2. Diagnóstico (Por que aconteceu?)
        3. Ação (O que fazer a respeito?)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- LINHA 1: A VISÃO GERAL --- */}
        <div className="lg:col-span-2">
          <DailySummaryChart />
        </div>

        {/* --- LINHA 2: O DIAGNÓSTICO (Pressão Externa vs. Equilíbrio Interno) --- */}
        <InterruptionsImpactChart />
        <HealthAdherenceChart />

        {/* --- LINHA 3: A INTELIGÊNCIA ACIONÁVEL --- */}
        <div className="lg:col-span-2">
          <InsightsPanel />
        </div>
      </div>
      {/* --- FIM DO CONTAINER DO GRID --- */}
    </div>
  );
};

export default MetricsPage;
