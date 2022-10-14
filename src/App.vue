<template>
  <div
    class="bg-app-bg-color w-screen flex flex-col min-h-screen relative border-box testtest"
  >
    <div class="p-4 pb-28 md:pb-4 md:h-auto overflow-x-hidden flex-grow flex">
      <div class="max-w-full flex flex-col gap-4 my-0 mx-auto relative flex-grow">
        <form-ticker @add-ticker="addTicker" />
        <form @submit.prevent="">
          <ticker-find-input v-model="searchName" />
        </form>
        <div class="flex flex-col gap-3 h-full">
          <div class="flex gap-3 flex-wrap">
            <ticker-card
              v-for="(card, index) in searchableTickers"
              :key="`${card.MARKET}_${index}`"
              :active="card.FROMSYMBOL === monitoredTickerName"
              v-bind="card"
              @delete-ticker="deleteTicker"
              @click="showDetailInfo(card)"
            />
          </div>
          <ticker-monitoring :tickerList="monitoringList" v-if="monitoredTickerName" />
        </div>
        <hr />
      </div>
    </div>
    <ticker-pagintaion
      v-if="tickerList.length > 6 && !searchName"
      :maxItems="tickerList.length"
      v-bind="pagination"
      @toggle-page="togglePage"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { initWs } from "./services/ws";
import FormTicker from "./components/FormTicker.vue";
import TickerFindInput from "./components/TickerFindInput.vue";
import TickerCard from "./components/TickerCard.vue";
import TickerPagintaion from "./components/TickerPagintaion.vue";
import TickerMonitoring from "./components/TickerMonitoring.vue";

const tickerList = ref([]);
const searchName = ref("");
const ws = initWs(prompt("Введите токен"));
const pagination = ref({
  perPage: 6,
  page: 1,
});
const subs = ref(JSON.parse(localStorage.getItem("subs")) ?? []);
const monitoredTickerName = ref(null);
const monitoringList = ref([]);

const subscribeTicker = () => {
  ws.send(
    JSON.stringify({
      action: "SubAdd",
      subs: subs.value.map((sub) => `2~Binance~${sub}~USDT`),
    })
  );
};

const updateLS = () => localStorage.setItem("subs", JSON.stringify(subs.value));

const unSubscribe = (tickerName) => {
  subs.value = subs.value.filter((sub) => sub !== tickerName);
  updateLS();
  ws.send(
    JSON.stringify({
      action: "SubRemove",
      subs: [`2~Binance~${tickerName}~USDT`],
    })
  );
};

const searchableTickers = computed(() => {
  return searchName.value
    ? tickerList.value.filter((ticker) => ticker.FROMSYMBOL.includes(searchName.value))
    : tickerList.value.filter((_, i) => {
        const { page, perPage } = pagination.value;
        return i + 1 <= page * perPage && i + 1 > perPage * (page - 1);
      });
});

const maxPage = computed(() =>
  Math.ceil(tickerList.value.length / pagination.value.perPage)
);

const togglePage = (pageInfo) => {
  pageInfo += pagination.value.page;
  if (pageInfo > 0 && pageInfo <= maxPage.value) {
    pagination.value.page = pageInfo;
  }
};

ws.addEventListener("message", ({ data }) => {
  if (JSON.parse(data).TYPE === "2") {
    const ticker = JSON.parse(data);
    const tickerUpdated = tickerList.value.find(
      (tickerItem) => ticker.FROMSYMBOL === tickerItem.FROMSYMBOL
    );
    if (!tickerUpdated) return tickerList.value.push(ticker);
    Object.assign(tickerUpdated, ticker);
    if (tickerUpdated.FROMSYMBOL === monitoredTickerName.value && ticker.PRICE) {
      monitoringList.value.push(ticker);
    }
  }
});

const addTicker = (sub) => {
  if (!subs.value.includes(sub)) {
    subs.value.push(sub);
    subscribeTicker();
  }
};

const deleteTicker = (tickerName) => {
  tickerList.value = tickerList.value.filter(
    (tickerItem) => tickerItem.FROMSYMBOL !== tickerName
  );
  unSubscribe(tickerName);
};

watch(subs.value, () => updateLS());
watch(
  () => monitoredTickerName.value,
  () => (monitoringList.value = [])
);

const showDetailInfo = (card) => {
  monitoredTickerName.value = card.FROMSYMBOL;
};
</script>
