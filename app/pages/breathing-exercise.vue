<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <UContainer class="max-w-4xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Wim Hof Method</h1>
        <p class="text-lg text-gray-600">Configure and start your breathing exercise</p>
      </div>

      <div class="flex justify-center">
        <BreathingSetupForm 
          :initial-global-settings="initialGlobalSettings"
          :initial-rounds="initialRounds"
          @start-exercise="handleStartExercise"
          @save-preset="handleSavePreset"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
// Default configuration for Wim Hof Method
const defaultGlobalSettings = {
  preparationTime: 30,
  restBetweenRounds: 60
}

const defaultRound = {
  cycles: 30,
  inhaleDuration: 2,
  exhaleDuration: 1,
  holdDuration: 60,
  recoveryHold: 15,
  notes: ''
}

// Load saved preset from localStorage or use defaults
const loadSavedPreset = () => {
  if (import.meta.client) {
    const savedPreset = localStorage.getItem('wim-hof-breathing-preset')
    if (savedPreset) {
      try {
        return JSON.parse(savedPreset)
      } catch (error) {
        console.warn('Failed to parse saved preset:', error)
      }
    }
  }
  return {
    globalSettings: defaultGlobalSettings,
    rounds: [defaultRound]
  }
}

// Initialize with saved preset or defaults
const savedPreset = loadSavedPreset()
const initialGlobalSettings = ref(savedPreset.globalSettings)
const initialRounds = ref(savedPreset.rounds)

const handleStartExercise = (exerciseConfig) => {
  console.log('Starting exercise with configuration:', exerciseConfig)
  // TODO: Navigate to exercise execution view or show exercise interface
  // For now, we'll just log the configuration
}

// Modal state
const toast = useToast()

// Handle saving preset from the form component
const handleSavePreset = (presetData) => {
  if (import.meta.client) {
    try {
      localStorage.setItem('wim-hof-breathing-preset', JSON.stringify(presetData))
      console.log('Preset saved successfully')
      
      // Update the reactive values to reflect the saved preset
      initialGlobalSettings.value = presetData.globalSettings
      initialRounds.value = presetData.rounds
      
      // Show success toast
      toast.add({
        title: 'Preset Saved!',
        description: 'Your breathing exercise configuration has been saved and will be loaded automatically next time.',
        icon: 'i-heroicons-check-circle',
        color: 'green'
      })
    } catch (error) {
      console.error('Failed to save preset:', error)
      
      // Show error toast
      toast.add({
        title: 'Save Failed',
        description: 'Failed to save preset. Please try again.',
        icon: 'i-heroicons-exclamation-triangle',
        color: 'red'
      })
    }
  }
}
</script>

<style scoped>
/* Page-specific styles */
</style>