<template>
  <div :style="definedColumnHeight" class="bg-yellow-300 w-8 column shrink-0"></div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  maxValue: { type: Number, required: true },
  minValue: { type: Number, required: true },
  PRICE: { type: Number, required: true },
});

const definedColumnHeight = computed(() => {
  return {
    "--heightColumn": `${
      ((props.PRICE - props.minValue) / (props.maxValue - props.minValue)) * 100
    }%`,
  };
});
</script>

<style scoped>
.column {
  height: var(--heightColumn);
  transition: height 0.3s;
}
</style>
