<template>
  <div class="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 z-50">
    <!-- Transparent full-screen skip button for indefinite hold -->
    <div 
      v-if="currentPhase === 'hold' && currentRoundConfig.indefiniteHold"
      class="absolute inset-0 z-50 cursor-pointer"
      @click="skipIndefiniteHold"
    />
    
    <!-- Header with session info and controls -->
    <div 
      v-if="!(currentPhase === 'hold' && currentRoundConfig.indefiniteHold)"
      class="absolute top-0 left-0 right-0 z-10 p-6"
    >
      <div class="flex items-center justify-between text-white">
        <div class="flex items-center gap-4">
          <UButton
            icon="i-heroicons-x-mark"
            color="white"
            variant="ghost"
            size="lg"
            @click="exitSession"
          />
          <div>
            <h1 class="text-xl font-bold">Wim Hof Method</h1>
            <p class="text-blue-200 text-sm">Round {{ currentRound + 1 }} of {{ exerciseConfig.rounds.length }}</p>
          </div>
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold">{{ formattedTotalTime }}</div>
          <div class="text-blue-200 text-sm">Total Session</div>
        </div>
      </div>
    </div>

    <!-- Main exercise area -->
    <div class="flex items-center justify-center min-h-screen p-6">
      <div class="text-center text-white max-w-2xl mx-auto">
        
        <!-- Preparation Phase -->
        <div v-if="currentPhase === 'preparation'" class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold">Get Ready</h2>
            <p class="text-xl text-blue-200">Prepare for your breathing session</p>
          </div>
          
          <div class="text-8xl font-bold text-blue-300">
            {{ Math.ceil(countdownTimer) }}
          </div>
          
          <div class="space-y-2">
            <p class="text-lg">Find a comfortable position</p>
            <p class="text-blue-200">Relax and focus on your breathing</p>
          </div>
        </div>

        <!-- Breathing Phase -->
        <div v-else-if="currentPhase === 'breathing'" class="space-y-8">
          <!-- Breathing Circle Animation -->
          <div 
            class="flex items-center justify-center p-8 transition-all duration-1000"
          >
            <div 
              class="w-80 h-80 rounded-full border-4 border-white/30 flex flex-col items-center justify-center transition-all duration-1000 relative"
              :class="{
                'scale-75 border-white/20': breathingInstruction === 'Exhale',
                'scale-100 border-white/60': breathingInstruction === 'Inhale'
              }"
            >
              <div 
                class="absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-1000"
                :class="{
                  'scale-133': breathingInstruction === 'Exhale',
                  'scale-100': breathingInstruction === 'Inhale'
                }"
              >
                <div class="text-3xl font-bold mb-2">{{ breathingInstruction }}</div>
                <div class="text-6xl font-bold mb-2">
                  {{ Math.ceil(countdownTimer) }}
                </div>
                <div class="text-sm text-blue-200">
                  Cycle {{ currentCycle + 1 }} of {{ currentRoundConfig.cycles }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hold Phase -->
        <div v-else-if="currentPhase === 'hold'" class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold">Hold Your Breath</h2>
            <p class="text-xl text-blue-200">
              {{ currentRoundConfig.indefiniteHold ? 'Tap screen to continue' : 'Retention phase' }}
            </p>
          </div>
          
          <div class="text-8xl font-bold text-yellow-300">
            {{ currentRoundConfig.indefiniteHold ? formatIndefiniteHoldTime() : Math.ceil(countdownTimer) }}
          </div>
          
          <div class="space-y-2">
            <p class="text-lg">Stay relaxed</p>
            <p class="text-blue-200">
              {{ currentRoundConfig.indefiniteHold ? 'Breathe when you need to' : 'Don\'t force it - breathe when you need to' }}
            </p>
          </div>
        </div>

        <!-- Recovery Hold Phase -->
        <div v-else-if="currentPhase === 'recovery'" class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold">Recovery Breath</h2>
            <p class="text-xl text-blue-200">Take a deep breath and hold</p>
          </div>
          
          <div class="text-8xl font-bold text-green-300">
            {{ Math.ceil(countdownTimer) }}
          </div>
          
          <div class="space-y-2">
            <p class="text-lg">Deep inhale and hold</p>
            <p class="text-blue-200">Feel the energy flowing</p>
          </div>
        </div>

        <!-- Rest Phase -->
        <div v-else-if="currentPhase === 'rest'" class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold">Rest</h2>
            <p class="text-xl text-blue-200">Prepare for next round</p>
          </div>
          
          <div class="text-8xl font-bold text-purple-300">
            {{ Math.ceil(countdownTimer) }}
          </div>
          
          <div class="space-y-2">
            <p class="text-lg">Breathe naturally</p>
            <p class="text-blue-200">Next: Round {{ currentRound + 2 }}</p>
          </div>
        </div>

        <!-- Completion Phase -->
        <div v-else-if="currentPhase === 'complete'" class="space-y-8">
          <div class="space-y-4">
            <h2 class="text-4xl font-bold">Session Complete!</h2>
            <p class="text-xl text-blue-200">Well done!</p>
          </div>
          
          <div class="text-6xl">🎉</div>
          
          <div class="space-y-4">
            <p class="text-lg">You completed {{ exerciseConfig.rounds.length }} rounds</p>
            <p class="text-blue-200">Total time: {{ formattedTotalTime }}</p>
            
            <!-- Indefinite Hold Durations -->
            <div v-if="indefiniteHoldDurations.length > 0" class="mt-6 pt-6 border-t border-white/20">
              <h3 class="text-xl font-semibold mb-4">Hold Durations</h3>
              <div class="space-y-2">
                <div 
                  v-for="hold in indefiniteHoldDurations" 
                  :key="hold.round"
                  class="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3"
                >
                  <span class="text-blue-200">Round {{ hold.round }}</span>
                  <span class="text-2xl font-bold">{{ formatTime(hold.duration) }}</span>
                </div>
              </div>
            </div>
            
            <div class="pt-4">
              <UButton
                color="white"
                size="lg"
                @click="exitSession"
              >
                Return to Setup
              </UButton>
            </div>
          </div>
        </div>

        <!-- Skip/Pause Controls -->
        <div 
          v-if="currentPhase !== 'complete' && !(currentPhase === 'hold' && currentRoundConfig.indefiniteHold)" 
          class="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4"
        >
          <div class="flex gap-4">
            <UButton
              icon="i-heroicons-forward"
              color="white"
              variant="ghost"
              size="xl"
              class="px-6 py-4 text-lg min-h-14"
              @click="skipPhase"
            >
              Skip Phase
            </UButton>
            <UButton
              :icon="isPaused ? 'i-heroicons-play' : 'i-heroicons-pause'"
              color="white"
              variant="ghost"
              size="xl"
              class="px-6 py-4 text-lg min-h-14"
              @click="togglePause"
            >
              {{ isPaused ? 'Resume' : 'Pause' }}
            </UButton>
          </div>
        </div>

        <!-- Round Counter -->
        <div v-if="currentPhase !== 'complete'" class="fixed bottom-2 left-1/2 transform -translate-x-1/2">
          <div class="text-sm text-white/70 text-center">
            Round {{ currentRound + 1 }} of {{ exerciseConfig.rounds.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  exerciseConfig: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['exit-session'])

// Session state
const currentPhase = ref('preparation') // preparation, breathing, hold, recovery, rest, complete
const currentRound = ref(0)
const currentCycle = ref(0)
const countdownTimer = ref(0)
const breathingInstruction = ref('Inhale')
const isPaused = ref(false)
const indefiniteHoldStartTime = ref(0)
const indefiniteHoldElapsed = ref(0)
const indefiniteHoldDurations = ref([])

// Audio elements for breath sounds
const breathInAudio = typeof window !== 'undefined' ? new Audio('sounds/breath-in.mp3') : null
const breathOutAudio = typeof window !== 'undefined' ? new Audio('sounds/breath-out.mp3') : null

function playBreathSound(type) {
  // Stop both sounds before playing the new one
  if (breathInAudio) {
    breathInAudio.pause()
    breathInAudio.currentTime = 0
  }
  if (breathOutAudio) {
    breathOutAudio.pause()
    breathOutAudio.currentTime = 0
  }
  if (type === 'Inhale' && breathInAudio) {
    breathInAudio.play()
  } else if (type === 'Exhale' && breathOutAudio) {
    breathOutAudio.play()
  }
}

// Timer management
let intervalId = null
let sessionTimerInterval = null
const startTime = ref(0)
const elapsedTime = ref(0)

// Computed properties
const currentRoundConfig = computed(() => {
  return props.exerciseConfig.rounds[currentRound.value] || props.exerciseConfig.rounds[0]
})

const formattedTotalTime = computed(() => {
  return `${elapsedTime.value}s`
})

// Format indefinite hold time (counting upwards)
const formatIndefiniteHoldTime = () => {
  return indefiniteHoldElapsed.value.toString()
}

// Format time in minutes and seconds
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins > 0) {
    return `${mins}m ${secs}s`
  }
  return `${secs}s`
}

// Methods
const exitSession = () => {
  clearInterval(intervalId)
  clearInterval(sessionTimerInterval)
  emit('exit-session')
}

const togglePause = () => {
  isPaused.value = !isPaused.value
  if (isPaused.value) {
    clearInterval(intervalId)
  } else {
    startTimer()
  }
}

const skipPhase = () => {
  clearInterval(intervalId)
  
  // If in breathing phase, skip to hold phase (skip all remaining cycles)
  if (currentPhase.value === 'breathing') {
    startHoldPhase()
  } else {
    nextPhase()
  }
}

const skipIndefiniteHold = () => {
  if (currentPhase.value === 'hold' && currentRoundConfig.value.indefiniteHold) {
    // Store the duration before resetting
    indefiniteHoldDurations.value.push({
      round: currentRound.value + 1,
      duration: indefiniteHoldElapsed.value
    })
    
    indefiniteHoldStartTime.value = 0
    indefiniteHoldElapsed.value = 0
    clearInterval(intervalId)
    startRecoveryPhase()
  }
}

const startTimer = () => {
  if (intervalId) clearInterval(intervalId)
  
  intervalId = setInterval(() => {
    if (isPaused.value) return
    
    // For indefinite hold, count upwards
    if (currentPhase.value === 'hold' && currentRoundConfig.value.indefiniteHold) {
      indefiniteHoldElapsed.value = Math.floor((Date.now() - indefiniteHoldStartTime.value) / 1000)
      return
    }
    
    countdownTimer.value -= 0.1
    
    if (countdownTimer.value <= 0) {
      nextPhase()
    }
  }, 100)
}

const startSessionTimer = () => {
  if (sessionTimerInterval) clearInterval(sessionTimerInterval)
  
  sessionTimerInterval = setInterval(() => {
    if (startTime.value > 0) {
      elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000)
    }
  }, 1000)
}

const nextPhase = () => {
  clearInterval(intervalId)
  
  switch (currentPhase.value) {
    case 'preparation':
      startBreathingRound()
      break
    case 'breathing':
      if (breathingInstruction.value === 'Inhale') {
        // Switch to exhale
        breathingInstruction.value = 'Exhale'
        playBreathSound('Exhale')
        countdownTimer.value = currentRoundConfig.value.exhaleDuration
        startTimer()
      } else {
        // Complete breath cycle
        currentCycle.value++
        if (currentCycle.value < currentRoundConfig.value.cycles) {
          // Next breath cycle
          breathingInstruction.value = 'Inhale'
          playBreathSound('Inhale')
          countdownTimer.value = currentRoundConfig.value.inhaleDuration
          startTimer()
        } else {
          // Start hold phase
          startHoldPhase()
        }
      }
      break
    case 'hold':
      startRecoveryPhase()
      break
    case 'recovery':
      // Round complete, check if more rounds
      currentRound.value++
      if (currentRound.value < props.exerciseConfig.rounds.length) {
        startRestPhase()
      } else {
        completeSession()
      }
      break
    case 'rest':
      startBreathingRound()
      break
  }
}

const startBreathingRound = () => {
  currentPhase.value = 'breathing'
  currentCycle.value = 0
  breathingInstruction.value = 'Inhale'
  playBreathSound('Inhale')
  countdownTimer.value = currentRoundConfig.value.inhaleDuration
  startTimer()
}

const startHoldPhase = () => {
  currentPhase.value = 'hold'
  if (currentRoundConfig.value.indefiniteHold) {
    // Start counting upwards
    indefiniteHoldStartTime.value = Date.now()
    indefiniteHoldElapsed.value = 0
    countdownTimer.value = 0
    // Still need a timer to update the display
    startTimer()
  } else {
    countdownTimer.value = currentRoundConfig.value.holdDuration
    startTimer()
  }
}

const startRecoveryPhase = () => {
  currentPhase.value = 'recovery'
  playBreathSound('Inhale')
  countdownTimer.value = currentRoundConfig.value.recoveryHold
  startTimer()
}

const startRestPhase = () => {
  currentPhase.value = 'rest'
  playBreathSound('Exhale')
  countdownTimer.value = props.exerciseConfig.globalSettings.restBetweenRounds
  startTimer()
}

const completeSession = () => {
  currentPhase.value = 'complete'
  clearInterval(intervalId)
  clearInterval(sessionTimerInterval)
}

// Initialize session
onMounted(() => {
  startTime.value = Date.now()
  currentPhase.value = 'preparation'
  countdownTimer.value = props.exerciseConfig.globalSettings.preparationTime
  startTimer()
  startSessionTimer()
})

// Cleanup
onUnmounted(() => {
  clearInterval(intervalId)
  clearInterval(sessionTimerInterval)
})
</script>

<style scoped>
/* Component-specific styles for breathing animation */
</style>