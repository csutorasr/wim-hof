<template>
  <Head>
    <Meta name="google-site-verification" content="XT7Y8L0FGnHC1Tm6SRI6iJbwLVGhWd1lEov42N38kXE" />
  </Head>
  <UApp>
    <UBanner color="neutral" icon="i-heroicons-cookie" title="This website uses cookies and local storage" close class="mb-2">
      <template #default>
        We use tracking (Google Analytics) and local storage to improve your experience. By continuing to use this site,
        you accept this usage.
      </template>
    </UBanner>
    <NuxtRouteAnnouncer />
    <main class="flex-1 flex flex-col">
      <NuxtPage />
    </main>

    <!-- Footer with legal links -->
    <footer class="border-t border-gray-200 mt-auto py-6 bg-gray-50">
      <UContainer>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {{ new Date().getFullYear() }} Wim Hof Breathing App. Not affiliated with Wim Hof Method.</p>
          <div class="flex gap-4">
            <UButton to="/legal" variant="link" size="xs" color="neutral">Legal & Disclaimer</UButton>
            <UButton to="/" variant="link" size="xs" color="neutral">Home</UButton>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>

<script setup lang="ts">
const { proxy } = useScriptGoogleAnalytics()
proxy.gtag('event', 'page_view')

useHead({
  titleTemplate: '%s - Wim Hof Breathing App',
  meta: [
    { name: 'description', content: 'A simple web app to guide you through the Wim Hof breathing exercises.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#2563eb' } // Tailwind blue-600
  ],
  bodyAttrs: {
    /**
     * @see ../nuxt.config.ts for rootAttrs
     */
    class: 'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col'
  },
})
</script>
