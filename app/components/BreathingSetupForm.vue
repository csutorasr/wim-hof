<template>
  <UCard class="w-full max-w-2xl">
    <template #header>
      <h2 class="text-xl font-semibold">Breathing Exercise Setup</h2>
      <p class="text-sm text-gray-600 mt-1">Configure your Wim Hof Method breathing session</p>
    </template>

    <div class="space-y-6">
      <!-- Global Settings -->
      <div class="border-b pb-4">
        <h3 class="text-lg font-medium mb-3">Global Settings</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UFormField label="Preparation Time (seconds)">
            <UInput 
              v-model.number="globalSettings.preparationTime" 
              type="number" 
              min="0" 
              max="60"
            />
          </UFormField>
          <UFormField label="Rest Between Rounds (seconds)">
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
          <h3 class="text-lg font-medium">Breathing Rounds</h3>
          <UButton icon="i-heroicons-plus" size="sm" @click="addRound">
            Add Round
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
                <h4 class="font-medium">Round {{ index + 1 }}</h4>
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
              <UFormField label="Breathing Cycles">
                <UInput 
                  v-model.number="round.cycles" 
                  type="number" 
                  min="10" 
                  max="50"
                  placeholder="30"
                />
                <template #help>
                  <span class="text-xs">Typically 30-40 cycles per round</span>
                </template>
              </UFormField>

              <UFormField label="Inhale Duration (seconds)">
                <UInput 
                  v-model.number="round.inhaleDuration" 
                  type="number" 
                  min="1" 
                  max="10"
                  step="0.5"
                  placeholder="2"
                />
              </UFormField>

              <UFormField label="Exhale Duration (seconds)">
                <UInput 
                  v-model.number="round.exhaleDuration" 
                  type="number" 
                  min="1" 
                  max="10"
                  step="0.5"
                  placeholder="1"
                />
              </UFormField>

              <UFormField label="Hold Duration (seconds)">
                <UInput 
                  v-model.number="round.holdDuration" 
                  type="number" 
                  min="15" 
                  max="300"
                  placeholder="60"
                />
                <template #help>
                  <span class="text-xs">Hold after exhale (retention)</span>
                </template>
              </UFormField>

              <UFormField label="Recovery Breath Hold (seconds)">
                <UInput 
                  v-model.number="round.recoveryHold" 
                  type="number" 
                  min="10" 
                  max="60"
                  placeholder="15"
                />
                <template #help>
                  <span class="text-xs">Hold after recovery inhale</span>
                </template>
              </UFormField>

              <UFormField label="Round Notes">
                <UInput 
                  v-model="round.notes" 
                  placeholder="Optional notes..."
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
            <h4 class="font-medium text-blue-900">Estimated Total Time</h4>
            <p class="text-sm text-blue-700 mt-1">Complete session duration including all rounds and rest periods</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-blue-900">{{ formattedTime }}</div>
            <div class="text-sm text-blue-600">{{ totalEstimatedTime }} seconds</div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 pt-4 border-t">
        <UButton color="primary" size="lg" class="flex-1" @click="startExercise">
          Start Breathing Exercise
        </UButton>
        <UButton variant="outline" size="lg" @click="savePreset">
          Save as Preset
        </UButton>
        <UButton variant="ghost" size="lg" @click="resetToDefault">
          Reset to Default
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