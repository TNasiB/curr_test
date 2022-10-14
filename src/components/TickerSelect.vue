<template>
  <div class="w-full relative">
    <span class="absolute left-2 top-1">Тикер</span>
    <input
      placeholder="Например DOGE"
      type="text"
      class="border border-solid border-gray rounded-md pt-6 pb-2 px-2 max-w-md w-full"
      :value="tickerName"
      @input="$emit('update:tickerName', $event.target.value.toUpperCase())"
    />
  </div>
</template>

<script setup>
defineProps({
  tickerName: { type: String, required: true },
});
defineEmits(["update:tickerName"]);
</script>

<style lang="scss" scoped></style>
