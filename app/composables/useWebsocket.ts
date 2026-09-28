export const useWebsocket = (url: string) => {
  const data = ref<string[]>([]);
  const status = ref<"CONNECTING" | "OPEN" | "CLOSED">("CONNECTING");
  let websocket: WebSocket | null = null;

  function connectToWebsocket() {
    websocket = new WebSocket(url);

    //-- Check if the connection is open
    websocket.onopen = () => {
      status.value = "OPEN";
    };

    //-- Recieve realtime payload stream
    websocket.onmessage = (event: MessageEvent) => {
      if (!event.data) return;
      const response = JSON.parse(event.data) as { payload: string };
      data.value = [...data.value, response.payload]
    };

    //-- Close the websocket connection
    websocket.onclose = () => {
      status.value = "CLOSED";
    };

    //-- Handle exception | error
    websocket.onerror = (err: any) => {
      console.error(err);
    };
  }

  function sendMessage(message: string) {
    if (websocket?.readyState === WebSocket.OPEN) {
      const payload = {
        payload: message,
      };
      websocket.send(JSON.stringify(payload));
    }
  }

  function closeConnection() {
    websocket?.close();
  }

  onMounted(() => {
    connectToWebsocket();
  });

  onBeforeUnmount(() => {
    close();
  });

  return { data, status, sendMessage, closeConnection };
};
