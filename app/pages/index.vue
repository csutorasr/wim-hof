<template>
  <UContainer>
    <UCard>
      <h1 class="text-3xl font-bold mb-4">Wim Hof Method Breathing App</h1>
      <p class="mb-6">Welcome! Explore guided breathing exercises, track your progress, and learn about the Wim
        Hof Method.</p>

      <div class="flex flex-col gap-4 justify-center items-center">
        <UButton to="/breathing-exercise" color="primary" variant="solid" size="lg" class="w-fit">Start Breathing Exercise</UButton>
        <!-- <UButton to="/articles" color="neutral" variant="outline">Learn More</UButton> -->
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
defineOgImageComponent('NuxtSeo')
</script>
