<template>
  <UContainer>
    <UCard>
      <h1 class="text-3xl font-bold mb-4">{{ $t('home.title') }}</h1>
      <p class="mb-6">{{ $t('home.welcome') }}</p>

      <div class="flex flex-col gap-4 justify-center items-center">
        <UButton :to="$localePath('breathing-exercise')" color="primary" variant="solid" size="lg" class="w-fit">{{ $t('home.startButton') }}</UButton>
        <!-- <UButton :to="$localePath('articles')" color="neutral" variant="outline">Learn More</UButton> -->
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
defineOgImageComponent('NuxtSeo')
</script>
