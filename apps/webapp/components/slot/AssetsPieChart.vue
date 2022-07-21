<template>
  <div>
    <template v-if="rows.length > 0">
      <PieChart :labels="pieChart.labels" :data="pieChart.data" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PieChart from '@/components/PieChart';

const props = defineProps({
  rows: { type: Array, required: false, default: () => [] }
});

const pieChart = computed(() => {
  const rowsLocal = props.rows;

  return {
    labels: rowsLocal.map((item: any) => item.name) as any[],
    data: rowsLocal.map((item: any) =>
      Number((item.percent_diff * 100).toFixed(2))
    ) as any[]
  };
});
</script>
