<template>
  <UCard class="w-full max-w-2xl">
    <template #header>
      <h2 class="text-xl font-semibold">{{ $t('breathingExercise.setupForm.header') }}</h2>
      <p class="text-sm text-gray-600 mt-1">{{ $t('breathingExercise.setupForm.subtitle') }}</p>
    </template>

    <div class="space-y-6">
      <!-- Global Settings -->
      <div class="border-b pb-4">
        <h3 class="text-lg font-medium mb-3">{{ $t('breathingExercise.setupForm.globalSettings') }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField :label="$t('breathingExercise.setupForm.preparationTime')">
            <UInput 
              v-model.number="globalSettings.preparationTime" 
              type="number" 
              min="0" 
              max="60"
            />
          </UFormField>
          <UFormField :label="$t('breathingExercise.setupForm.restBetweenRounds')">
            <UInput 
              v-model.number="globalSettings.restBetweenRounds" 
              type="number" 
              min="30" 
              max="300"
            />
          </UFormField>
        </div>
      </div>

      <!-- Rounds Configuration -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">{{ $t('breathingExercise.setupForm.breathingRounds') }}</h3>
          <UButton icon="i-heroicons-plus" size="sm" @click="addRound">
            {{ $t('breathingExercise.setupForm.addRound') }}
          </UButton>
        </div>

        <div class="space-y-4">
          <UCard 
            v-for="(round, index) in rounds" 
            :key="index"
            class="relative"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h4 class="font-medium">{{ $t('breathingExercise.setupForm.round') }} {{ index + 1 }}</h4>
                <UButton 
                  icon="i-heroicons-trash"
                  color="red"
                  variant="ghost"
                  size="sm"
                  :disabled="rounds.length <= 1"
                  @click="removeRound(index)"
                />
              </div>
            </template>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <UFormField :label="$t('breathingExercise.setupForm.breathingCycles')">
                <UInput 
                  v-model.number="round.cycles" 
                  type="number" 
                  min="10" 
                  max="50"
                  placeholder="30"
                />
                <template #help>
                  <span class="text-xs">{{ $t('breathingExercise.setupForm.breathingCyclesHelp') }}</span>
                </template>
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.inhaleDuration')">
                <UInput 
                  v-model.number="round.inhaleDuration" 
                  type="number" 
                  min="1" 
                  max="10"
                  step="0.5"
                  placeholder="2"
                />
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.exhaleDuration')">
                <UInput 
                  v-model.number="round.exhaleDuration" 
                  type="number" 
                  min="1" 
                  max="10"
                  step="0.5"
                  placeholder="1"
                />
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.holdDuration')">
                <UInput 
                  v-model.number="round.holdDuration" 
                  type="number" 
                  min="15" 
                  max="300"
                  placeholder="60"
                  :disabled="round.indefiniteHold"
                />
                <template #help>
                  <span class="text-xs">{{ $t('breathingExercise.setupForm.holdDurationHelp') }}</span>
                </template>
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.indefiniteHold')">
                <UCheckbox 
                  v-model="round.indefiniteHold"
                  :label="$t('breathingExercise.setupForm.indefiniteHoldLabel')"
                />
                <template #help>
                  <span class="text-xs">{{ $t('breathingExercise.setupForm.indefiniteHoldHelp') }}</span>
                </template>
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.recoveryHold')">
                <UInput 
                  v-model.number="round.recoveryHold" 
                  type="number" 
                  min="10" 
                  max="60"
                  placeholder="15"
                />
                <template #help>
                  <span class="text-xs">{{ $t('breathingExercise.setupForm.recoveryHoldHelp') }}</span>
                </template>
              </UFormField>

              <UFormField :label="$t('breathingExercise.setupForm.roundNotes')">
                <UInput 
                  v-model="round.notes" 
                  :placeholder="$t('breathingExercise.setupForm.roundNotesPlaceholder')"
                />
              </UFormField>
            </div>
          </UCard>
        </div>
      </div>

      <!-- Time Estimation -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <h4 class="font-medium text-blue-900">{{ $t('breathingExercise.setupForm.estimatedTime') }}</h4>
            <p class="text-sm text-blue-700 mt-1">{{ $t('breathingExercise.setupForm.estimatedTimeDescription') }}</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-900">{{ formattedTime }}</div>
            <div class="text-sm text-blue-600">{{ totalEstimatedTime }} {{ $t('breathingExercise.setupForm.seconds') }}</div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4 border-t">
        <UButton color="primary" size="lg" class="flex-1" @click="startExercise">
          {{ $t('breathingExercise.setupForm.startButton') }}
        </UButton>
        <UButton variant="outline" size="lg" @click="savePreset">
          {{ $t('breathingExercise.setupForm.savePreset') }}
        </UButton>
        <UButton variant="ghost" size="lg" @click="resetToDefault">
          {{ $t('breathingExercise.setupForm.resetDefault') }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup>
// Define props for initial values
const props = defineProps({
  initialGlobalSettings: {
    type: Object,
    default: () => ({
      preparationTime: 15,
      restBetweenRounds: 5,
    })
  },
  initialRound: {
    type: Object,
    default: () => ({
      cycles: 30,
      inhaleDuration: 2,
      exhaleDuration: 1,
      holdDuration: 60,
      indefiniteHold: false,
      recoveryHold: 15,
      notes: ''
    })
  },
  initialRounds: {
    type: Array,
    default: null
  }
})

// Define emits first
const emit = defineEmits(['start-exercise', 'save-preset'])

// Reactive state - initialize from props
const globalSettings = ref({ ...props.initialGlobalSettings })
const rounds = ref(props.initialRounds ? [...props.initialRounds] : [{ ...props.initialRound }])

// Methods
const addRound = () => {
  rounds.value.push({ ...props.initialRound })
}

const removeRound = (index) => {
  if (rounds.value.length > 1) {
    rounds.value.splice(index, 1)
  }
}

const resetToDefault = () => {
  globalSettings.value = { ...props.initialGlobalSettings }
  rounds.value = [{ ...props.initialRound }]
}

const savePreset = () => {
  const presetData = {
    globalSettings: globalSettings.value,
    rounds: rounds.value
  }
  console.log('Saving preset:', presetData)
  emit('save-preset', presetData)
}

const startExercise = () => {
  // TODO: Emit or navigate to exercise execution
  const exerciseConfig = {
    globalSettings: globalSettings.value,
    rounds: rounds.value
  }
  console.log('Starting exercise with config:', exerciseConfig)
  // Emit to parent component or use navigateTo for routing
  emit('start-exercise', exerciseConfig)
}

// Computed properties for time estimation
const totalEstimatedTime = computed(() => {
  const roundTime = rounds.value.reduce((total, round) => {
    const breathingTime = (round.inhaleDuration + round.exhaleDuration) * round.cycles
    const holdTime = round.holdDuration + round.recoveryHold
    return total + breathingTime + holdTime
  }, 0)
  
  const restTime = (rounds.value.length - 1) * globalSettings.value.restBetweenRounds
  const prepTime = globalSettings.value.preparationTime
  
  return roundTime + restTime + prepTime // Return total seconds
})

const formattedTime = computed(() => {
  const totalSeconds = Math.round(totalEstimatedTime.value)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${seconds}s`
})
</script>

<style scoped>
/* Component-specific styles if needed */
</style>