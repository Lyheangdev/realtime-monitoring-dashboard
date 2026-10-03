<script setup lang="ts">
const input = ref("")

const { data, status, sendMessage, closeConnection } = useWebsocket("http://127.0.0.1:8000/ws")

async function handleSendMessage() {
  if(!input.value) return;
  sendMessage(input.value)
  input.value = "";
}

function handleClose() {
  closeConnection()
}
</script>


<template>
     <div>
        <h2>Websocket Connection Status: {{ status }}</h2>
        <p>Websocket response</p>

        <div>
          <div v-for="( v, i) in data" :key="i">{{ v }}</div>
        </div>s
        
        <input v-model="input" type="text" placeholder="Input send to websocket ..." @keydown.enter="handleSendMessage"/>
        <button @click.prevent="handleSendMessage">Send Now</button>
        <button @click.prevent="handleClose">Close Now</button>
    </div>
</template>