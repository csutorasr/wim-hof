<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">Get Ready</h2>
      <p class="text-xl text-blue-200">Prepare for your breathing session</p>
    </div>
    
    <div class="text-8xl font-bold text-blue-300">
      {{ Math.ceil(timer) }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">Find a comfortable position</p>
      <p class="text-blue-200">Relax and focus on your breathing</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  timer: {
    type: Number,
    required: true
  }
})
</script>
