<script setup lang="ts">
const lines = ref<Array<string>>([])

let eventSource: EventSource | null = null

onMounted(() => {

  eventSource = new EventSource(
    'http://localhost:8000/api/v1/sse/stream'
  )

  eventSource.onmessage = (event: MessageEvent) => {

    const line = JSON.parse(event.data) as {data : string}

    console.log('New line:', line)

    lines.value.push(line.data)
  }

  eventSource.onerror = (error) => {
    console.error('SSE connection error:', error)
  }
})

onUnmounted(() => {
  eventSource?.close()
})
</script>

<template>
  <div>
    <p>Streaming From SSE</p>
  </div>

  <div>
    <div v-for="item in lines" :key="item">
      {{ item }}
    </div>
  </div>
</template>
