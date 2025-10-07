<template>
  <!-- Setup Phase -->
  <div v-if="!isExerciseActive" class="min-h-screen bg-gray-50 py-8">
    <UContainer class="max-w-4xl">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ $t('breathingExercise.title') }}</h1>
        <p class="text-lg text-gray-600">{{ $t('breathingExercise.subtitle') }}</p>
      </div>

      <UAlert
        color="error"
        variant="solid"
        icon="i-heroicons-exclamation-triangle"
        :title="$t('breathingExercise.safetyNotice.title')"
        class="mb-6"
      >
        <template #description>
          <p class="mb-2">{{ $t('breathingExercise.safetyNotice.description') }}</p>
          <p class="text-sm">{{ $t('breathingExercise.safetyNotice.warning') }}</p>
        </template>
        <template #actions>
          <UButton :to="$localePath('legal')" color="neutral" variant="solid" size="sm">{{ $t('breathingExercise.safetyNotice.viewDisclaimer') }}</UButton>
        </template>
      </UAlert>

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

  <!-- Exercise Session Phase -->
  <BreathingExerciseSession v-else :exercise-config="activeExerciseConfig!" @exit-session="handleExitSession" />
</template>

<script setup lang="ts">
defineOgImageComponent('NuxtSeo')
const { proxy } = useScriptGoogleAnalytics()
// Default configuration for Wim Hof Method
const defaultGlobalSettings = {
  preparationTime: 15,
  restBetweenRounds: 5
}


const defaultRounds = [
  {
    cycles: 30,
    inhaleDuration: 2,
    exhaleDuration: 1,
    holdDuration: 60, // 1 minute
    recoveryHold: 15,
    notes: ''
  },
  {
    cycles: 30,
    inhaleDuration: 2,
    exhaleDuration: 1,
    holdDuration: 90, // 1.5 minutes
    recoveryHold: 15,
    notes: ''
  },
  {
    cycles: 30,
    inhaleDuration: 2,
    exhaleDuration: 1,
    holdDuration: 120, // 2 minutes
    recoveryHold: 15,
    notes: ''
  }
]

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
    rounds: defaultRounds
  }
}

// Initialize with saved preset or defaults
const savedPreset = loadSavedPreset()
const initialGlobalSettings = ref(savedPreset.globalSettings)
const initialRounds = ref(savedPreset.rounds)

// Exercise session state
const isExerciseActive = ref(false)
const activeExerciseConfig = ref<ExerciseConfig | null>(null)


interface GlobalSettings {
  preparationTime: number
  restBetweenRounds: number
}

interface Round {
  cycles: number
  inhaleDuration: number
  exhaleDuration: number
  holdDuration: number
  recoveryHold: number
  notes?: string
}

interface ExerciseConfig {
  globalSettings: GlobalSettings
  rounds: Round[]
}

const handleStartExercise = (exerciseConfig: ExerciseConfig) => {
  // Google Analytics conversion: exercise started
  if (proxy && typeof proxy.gtag === 'function') {
    proxy.gtag('event', 'conversion', { event_category: 'breathing', event_label: 'start' })
  }
  activeExerciseConfig.value = exerciseConfig
  isExerciseActive.value = true
}

const handleExitSession = () => {
  // Google Analytics conversion: exercise finished
  if (proxy && typeof proxy.gtag === 'function') {
    proxy.gtag('event', 'conversion', { event_category: 'breathing', event_label: 'finish' })
  }
  isExerciseActive.value = false
  activeExerciseConfig.value = null
}

// Modal state
const toast = useToast()
const { t } = useI18n()

// Handle saving preset from the form component
const handleSavePreset = (presetData: ExerciseConfig) => {
  if (import.meta.client) {
    try {
      localStorage.setItem('wim-hof-breathing-preset', JSON.stringify(presetData))
      console.log('Preset saved successfully')

      // Update the reactive values to reflect the saved preset
      initialGlobalSettings.value = presetData.globalSettings
      initialRounds.value = presetData.rounds

      // Show success toast
      toast.add({
        title: t('breathingExercise.setupForm.presetSaved'),
        description: t('breathingExercise.setupForm.presetSavedDescription'),
        icon: 'i-heroicons-check-circle',
        color: 'success'
      })
    } catch (error) {
      console.error('Failed to save preset:', error)

      // Show error toast
      toast.add({
        title: t('breathingExercise.setupForm.saveFailed'),
        description: t('breathingExercise.setupForm.saveFailedDescription'),
        icon: 'i-heroicons-exclamation-triangle',
        color: 'error'
      })
    }
  }
}
</script>

<style scoped>
/* Page-specific styles */
</style>