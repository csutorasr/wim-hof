<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">Recovery Breath</h2>
      <p class="text-xl text-blue-200">Take a deep breath and hold</p>
    </div>
    
    <div class="text-8xl font-bold text-green-300">
      {{ Math.ceil(timer) }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">Deep inhale and hold</p>
      <p class="text-blue-200">Feel the energy flowing</p>
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
