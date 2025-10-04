<template>
  <div class="space-y-8">
    <div 
      class="flex items-center justify-center p-8 transition-all duration-1000"
    >
      <div 
        class="w-80 h-80 rounded-full border-4 border-white/30 flex flex-col items-center justify-center transition-all duration-1000 relative"
        :class="{
          'scale-75 border-white/20': instruction === 'Exhale',
          'scale-100 border-white/60': instruction === 'Inhale'
        }"
      >
        <div 
          class="absolute inset-0 flex flex-col items-center justify-center transform transition-all duration-1000"
          :class="{
            'scale-133': instruction === 'Exhale',
            'scale-100': instruction === 'Inhale'
          }"
        >
          <div class="text-3xl font-bold mb-2">{{ instruction }}</div>
          <div class="text-6xl font-bold mb-2">
            {{ Math.ceil(timer) }}
          </div>
          <div class="text-sm text-blue-200">
            Cycle {{ currentCycle + 1 }} of {{ totalCycles }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  timer: {
    type: Number,
    required: true
  },
  instruction: {
    type: String,
    required: true
  },
  currentCycle: {
    type: Number,
    required: true
  },
  totalCycles: {
    type: Number,
    required: true
  }
})
</script>
