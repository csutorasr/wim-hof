<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">Rest</h2>
      <p class="text-xl text-blue-200">Prepare for next round</p>
    </div>
    
    <div class="text-8xl font-bold text-purple-300">
      {{ Math.ceil(timer) }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">Breathe naturally</p>
      <p class="text-blue-200">Next: Round {{ nextRound }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  timer: {
    type: Number,
    required: true
  },
  nextRound: {
    type: Number,
    required: true
  }
})
</script>
