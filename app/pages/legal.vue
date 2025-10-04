<template>
  <UContainer class="max-w-2xl py-12 mx-auto">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Legal Notice</h1>
      </template>
      <div class="prose prose-blue">
        <p>
          <strong>Disclaimer:</strong> This website and application are not affiliated with, endorsed by, or officially connected to Wim Hof or the Wim Hof Method organization. The Wim Hof Method is the intellectual property of Wim Hof and his team. This project is an independent, non-commercial tool created for educational and personal use only.
        </p>
        <p>
          All credit for the Wim Hof Method, its techniques, and its name belongs to Wim Hof. For official information, training, and resources, please visit the <a href="https://www.wimhofmethod.com/" target="_blank" rel="noopener">official Wim Hof Method website</a>.
        </p>
        <p>
          If you are the rights holder and wish to request changes or removal, please contact the site owner.
        </p>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped>
.prose a {
  text-decoration: underline;
}
</style>
