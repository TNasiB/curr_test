<template>
  <div
    class="flex justify-between absolute md:relative bottom-0 w-full bg-white md:bg-app-bg-color mx-auto my-0 max-w-7xl items-center p-4 border md:border-0"
  >
    <p class="hidden md:inline shrink-0">
      Показано {{ definedPerPageInfo }} результатов из {{ maxItems }}
    </p>
    <div class="flex gap-2 justify-between w-full md:justify-end">
      <app-button @click="$emit('toggle-page', -1)">Назад</app-button>
      <app-button @click="$emit('toggle-page', 1)">Вперед</app-button>
    </div>
  </div>
</template>

<script setup>
import AppButton from "./AppButton.vue";

import { computed } from "vue";

const props = defineProps({
  maxItems: { type: Number, required: true },
  perPage: { type: Number, required: true },
  page: { type: Number, required: true },
});

defineEmits(["togglePage"]);

const definedPerPageInfo = computed(() => {
  const unclompletedInfo = props.perPage * props.page;
  return unclompletedInfo < props.maxItems ? unclompletedInfo : props.maxItems;
});
</script>
