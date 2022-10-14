<template>
  <article
    class="p-3 pb-3.5 border rounded-md border-gray bg-white cursor-pointer box-border flex-grow w-96 order-1 h-24"
    :class="{ 'outline outline-4 outline-black': active }"
  >
    <div class="flex justify-between">
      <span class="text-sm pl-1">{{ FROMSYMBOL }}</span
      ><img class="cursor-pointer" src="../assets/img/Trash.svg" @click="deleteTicker" />
    </div>
    <p class="text-4xl">{{ PRICE }}$</p>
  </article>
</template>

<script setup>
const props = defineProps({
  FROMSYMBOL: { type: String, required: true },
  PRICE: { type: Number, required: true },
  active: { type: Boolean, required: true },
});

const emits = defineEmits(["delete-ticker"]);

const deleteTicker = () => {
  const result = confirm("Вы уверены?");
  if (result) emits("delete-ticker", props.FROMSYMBOL);
};
</script>
