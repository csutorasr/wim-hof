<template>
  <UContainer class="max-w-2xl py-12 mx-auto">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">{{ $t('legal.title') }}</h1>
      </template>
      <div class="prose prose-blue">
        <h2 class="text-xl font-semibold mt-6 mb-4">{{ $t('legal.healthSafety.title') }}</h2>
        <p class="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-500">
          <strong>{{ $t('legal.healthSafety.warning') }}</strong>
        </p>
        <p>
          {{ $t('legal.healthSafety.useAtRisk') }}
        </p>
        <p>
          {{ $t('legal.healthSafety.medicalConsultation') }}
        </p>
        <ul>
          <li>{{ $t('legal.healthSafety.conditions.heart') }}</li>
          <li>{{ $t('legal.healthSafety.conditions.bloodPressure') }}</li>
          <li>{{ $t('legal.healthSafety.conditions.respiratory') }}</li>
          <li>{{ $t('legal.healthSafety.conditions.epilepsy') }}</li>
          <li>{{ $t('legal.healthSafety.conditions.pregnancy') }}</li>
          <li>{{ $t('legal.healthSafety.conditions.other') }}</li>
        </ul>
        <p>
          {{ $t('legal.healthSafety.safetyPrecautions') }}
        </p>
        <p>
          {{ $t('legal.healthSafety.limitationLiability') }}
        </p>
        <p>
          {{ $t('legal.healthSafety.noProfessionalAdvice') }}
        </p>

        <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t('legal.intellectualProperty.title') }}</h2>
        <p>
          {{ $t('legal.intellectualProperty.noAffiliation') }}
        </p>
        <p>
          {{ $t('legal.intellectualProperty.credit') }} <a href="https://www.wimhofmethod.com/" target="_blank" rel="noopener">official Wim Hof Method website</a>.
        </p>
        <p>
          {{ $t('legal.intellectualProperty.rightsHolder') }}
        </p>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
defineOgImageComponent('NuxtSeo')
</script>

<style scoped>
.prose a {
  text-decoration: underline;
}
</style>
