<template>
  <div id="cardGraph">
    <h2>Temps de jeu - Dernière semaine</h2>
    <div class="chart-container">
      <canvas v-if="hasData && !chartError" ref="chartCanvas"></canvas>
      <div v-else class="chart-placeholder">
        <p v-if="!hasData">Pas de données pour le graphique.</p>
        <p v-else-if="chartError">
          Erreur lors de la création du graphique — vérifie la console.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount, computed } from "vue";
import { mockGamingHoursByDayData } from "../datas/mockStatDatats";
import Chart from "chart.js/auto";
import { BarController, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
const chartError = ref(false);

// Préparer les données pour le graphique (agrégation par date)
const prepareChartData = () => {
  const groupedByDate: { [key: string]: number } = {};

  // Grouper les heures par date
  mockGamingHoursByDayData.forEach((entry) => {
    groupedByDate[entry.date] = (groupedByDate[entry.date] ?? 0) + entry.hours;
  });

  // Trier les dates
  const sortedDates = Object.keys(groupedByDate).sort();

  // Formatter les labels (ex: "Lun", "Mar", etc.)
  const labels = sortedDates.map((date) => {
    const d = new Date(date);
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return days[d.getDay()];
  });

  const hours = sortedDates.map((date) => Number((groupedByDate[date] ?? 0).toFixed(1)));

  return { labels, hours };
};

const chartData = computed(() => prepareChartData());
const hasData = computed(() => chartData.value.hours.length > 0);

onMounted(() => {
  if (!chartCanvas.value || !hasData.value) return;

  const ctx = chartCanvas.value.getContext("2d");
  if (!ctx) return;

  const createGradient = (color1: string, color2: string) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const colors = [
    createGradient("#3dd9b3", "#2a9d8f"),
    createGradient("#5b8cff", "#4a7cef"),
    createGradient("#8b5cf6", "#7c3aed"),
    createGradient("#3dd9b3", "#2a9d8f"),
    createGradient("#5b8cff", "#4a7cef"),
    createGradient("#8b5cf6", "#7c3aed"),
    createGradient("#5b8cff", "#4a7cef"),
  ];

  const maxVal = Math.max(...chartData.value.hours);
  const suggestedMax = Math.ceil(maxVal * 1.2);

  try {
    console.log("TimeGraphiquePerWeek: creating chart", {
      labels: chartData.value.labels,
      hours: chartData.value.hours,
    });

    chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.value.labels,
        datasets: [
          {
            data: chartData.value.hours,
            backgroundColor: colors,
            borderRadius: { topLeft: 8, topRight: 8 },
            borderSkipped: false,
            maxBarThickness: 56,
            barPercentage: 0.85,
            categoryPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            padding: 10,
            displayColors: false,
            callbacks: {
              label: (context: any) => `${context.parsed.y}h`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax,
            ticks: {
              color: "#64748b",
              font: { size: 11 },
              callback: (value: any) => `${value}h`,
            },
            grid: { color: "rgba(255,255,255,0.04)" },
            border: { display: false },
          },
          x: {
            ticks: { color: "#94a3b8", font: { size: 12 } },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });

    console.log("TimeGraphiquePerWeek: chart created successfully");
  } catch (err) {
    console.error("TimeGraphiquePerWeek: failed to create chart", err);
    chartError.value = true;
  }
});

// Mettre à jour le graphique si les données changent
watch(
  chartData,
  (newData) => {
    if (!chartInstance) return;
    chartInstance.data.labels = newData.labels;
    // @ts-ignore
    chartInstance.data.datasets[0].data = newData.hours;
    chartInstance.update();
  },
  { deep: true }
);

onBeforeUnmount(() => {
  chartInstance?.destroy();
  chartInstance = null;
});
</script>

<style scoped>
#cardGraph {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 900px;
}

h2 {
  color: #e2e8f0;
  margin: 0 0 20px 0;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.chart-container {
  position: relative;
  height: 380px;
  min-height: 320px;
  width: 100%;
}

.chart-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  font-size: 0.95rem;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
