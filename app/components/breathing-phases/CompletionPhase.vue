<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">{{ $t('breathingExercise.phases.completion.title') }}</h2>
      <p class="text-xl text-blue-200">{{ $t('breathingExercise.phases.completion.subtitle') }}</p>
    </div>
    
    <div class="text-6xl">🎉</div>
    
    <div class="space-y-4">
      <p class="text-lg">{{ $t('breathingExercise.phases.completion.completedRounds', { count: totalRounds }) }}</p>
      <p class="text-blue-200">{{ $t('breathingExercise.phases.completion.totalTime', { time: totalTime }) }}</p>
      
      <!-- Indefinite Hold Durations -->
      <div v-if="holdDurations.length > 0" class="mt-6 pt-6 border-t border-white/20">
        <h3 class="text-xl font-semibold mb-4">{{ $t('breathingExercise.phases.completion.holdDurations') }}</h3>
        <div class="space-y-2">
          <div 
            v-for="hold in holdDurations" 
            :key="hold.round"
            class="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3"
          >
            <span class="text-blue-200">{{ $t('breathingExercise.session.round') }} {{ hold.round }}</span>
            <span class="text-2xl font-bold">{{ formatTime(hold.duration) }}</span>
          </div>
        </div>
      </div>
      
      <div class="pt-4">
        <UButton
          color="white"
          size="lg"
          @click="$emit('exit')"
        >
          {{ $t('breathingExercise.phases.completion.returnButton') }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  totalRounds: {
    type: Number,
    required: true
  },
  totalTime: {
    type: String,
    required: true
  },
  holdDurations: {
    type: Array,
    default: () => []
  }
})

defineEmits(['exit'])

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins > 0) {
    return `${mins}m ${secs}s`
  }
  return `${secs}s`
}
</script>
