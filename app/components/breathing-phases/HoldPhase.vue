<template>
  <div class="space-y-8">
    <div class="space-y-4">
      <h2 class="text-4xl font-bold">Hold Your Breath</h2>
      <p class="text-xl text-blue-200">
        {{ isIndefinite ? 'Tap screen to continue' : 'Retention phase' }}
      </p>
    </div>
    
    <div class="text-8xl font-bold text-yellow-300">
      {{ displayTime }}
    </div>
    
    <div class="space-y-2">
      <p class="text-lg">Stay relaxed</p>
      <p class="text-blue-200">
        {{ isIndefinite ? 'Breathe when you need to' : 'Don\'t force it - breathe when you need to' }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  timer: {
    type: Number,
    required: true
  },
  isIndefinite: {
    type: Boolean,
    default: false
  },
  indefiniteElapsed: {
    type: Number,
    default: 0
  }
})

const displayTime = computed(() => {
  if (props.isIndefinite) {
    return props.indefiniteElapsed.toString()
  }
  return Math.ceil(props.timer).toString()
})
</script>
