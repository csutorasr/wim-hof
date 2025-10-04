
<template>
  <UApp>
    <UBanner
      id="cookie-banner-v1"
      color="info"
      icon="i-heroicons-cookie"
      title="This website uses cookies and local storage"
      close
      class="mb-2"
    >
      <template #default>
        We use tracking (Google Analytics) and local storage to improve your experience. By continuing to use this site, you accept this usage.
      </template>
    </UBanner>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const { proxy } = useScriptGoogleAnalytics()
proxy.gtag('event', 'page_view')
</script>
