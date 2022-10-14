export const initWs = (token) => {
  const ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${token}`);
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        action: "SubAdd",
        subs: JSON.parse(localStorage.getItem("subs")).map(
          (sub) => `2~Binance~${sub}~USDT`
        ),
      })
    );
  });
  return ws;
};
