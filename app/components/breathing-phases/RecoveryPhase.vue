<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">{{ $t('breathingExercise.phases.recovery.title') }}</h2>
      <p class="text-xl text-blue-200">{{ $t('breathingExercise.phases.recovery.subtitle') }}</p>
    </div>
    
    <div class="text-8xl font-bold text-green-300">
      {{ Math.ceil(timer) }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">{{ $t('breathingExercise.phases.recovery.instruction1') }}</p>
      <p class="text-blue-200">{{ $t('breathingExercise.phases.recovery.instruction2') }}</p>
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
