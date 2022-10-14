<template>
  <div class="relative w-full">
    <img class="absolute top-2.5 left-2.5" src="../assets/img/Search.svg" />
    <input
      placeholder="Найти тикер"
      class="border rounded-md py-2 pl-10 pr-2 max-w-md w-full"
      v-model="modelValue"
      @input="$emit('update:modelValue', $event.target.value.toUpperCase())"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, required: true },
});
defineEmits(["update:modelValue"]);
</script>
