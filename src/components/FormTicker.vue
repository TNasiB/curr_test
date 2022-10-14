<template>
  <form
    class="p-4 bg-white rounded-md flex flex-col gap-3 items-start"
    @submit.prevent=""
  >
    <ticker-select v-model:tickerName="tickerName" />
    <button
      class="bg-viol color-white px-5 py-3 text-white rounded-md border border-viol"
      @click="handleSubmitForm"
    >
      Добавить
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import TickerSelect from "./TickerSelect.vue";

const emit = defineEmits(["add-ticker"]);

const tickerName = ref("");

const handleSubmitForm = () => {
  if (!tickerName.value) return;
  emit("add-ticker", tickerName.value);
  tickerName.value = "";
};
</script>
