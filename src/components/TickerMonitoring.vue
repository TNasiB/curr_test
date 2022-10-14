<template>
  <div
    class="bg-white rounded-md h-10 flex gap-1 p-5 items-end overflow-x-auto h-60 flex-grow w-full order-first sm:order-1"
    ref="scrollWrapper"
  >
    <ticker-monitoring-column
      v-for="(ticker, i) in tickerList"
      v-bind="ticker"
      :key="i"
      :maxValue="maxValue"
      :minValue="minValue"
    />
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import TickerMonitoringColumn from "./TickerMonitoringColumn.vue";

const props = defineProps({
  tickerList: { type: Array, required: true },
});

const maxValue = computed(() =>
  Math.max(...props.tickerList.map((status) => status.PRICE))
);

const minValue = computed(() =>
  Math.min(...props.tickerList.map((status) => status.PRICE))
);

const scrollWrapper = ref(null);
watch(
  () => props.tickerList.length,
  () => (scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth)
);
</script>

<style scoped>
.column {
  height: var(--heightColumn);
}
</style>
