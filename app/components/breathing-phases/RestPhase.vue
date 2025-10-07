<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">{{ $t('breathingExercise.phases.rest.title') }}</h2>
      <p class="text-xl text-blue-200">{{ $t('breathingExercise.phases.rest.subtitle') }}</p>
    </div>
    
    <div class="text-8xl font-bold text-purple-300">
      {{ Math.ceil(timer) }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">{{ $t('breathingExercise.phases.rest.instruction1') }}</p>
      <p class="text-blue-200">{{ $t('breathingExercise.phases.rest.nextRound') }} {{ nextRound }}</p>
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
