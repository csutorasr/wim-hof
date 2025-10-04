<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <UContainer class="max-w-4xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Wim Hof Method</h1>
        <p class="text-lg text-gray-600">Configure and start your breathing exercise</p>
      </div>

      <div class="flex justify-center">
        <BreathingSetupForm @start-exercise="handleStartExercise" />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
const handleStartExercise = (exerciseConfig) => {
  console.log('Starting exercise with configuration:', exerciseConfig)
  // TODO: Navigate to exercise execution view or show exercise interface
  // For now, we'll just log the configuration
}
</script>

<style scoped>
/* Page-specific styles */
</style>