<template>

  <Head>
    <Meta name="google-site-verification" content="XT7Y8L0FGnHC1Tm6SRI6iJbwLVGhWd1lEov42N38kXE" />
  </Head>
  <UApp>
    <UBanner color="neutral" icon="material-symbols:cookie" :title="$t('app.cookieBanner.title')" close class="mb-2">
      <template #default>
        {{ $t('app.cookieBanner.description') }}
      </template>
    </UBanner>

    <!-- Language Selector -->
    <div class="border-b border-gray-200 bg-gray-900 py-2">
      <UContainer>
        <div class="flex justify-end">
          <div class="flex gap-2">
            <UButton v-for="locale in locales" :key="locale.code" variant="ghost" size="xs"
              :color="$i18n.locale === locale.code ? 'primary' : 'neutral'" @click="setLocale(locale.code)">
              {{ locale.name }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <NuxtRouteAnnouncer />
    <main class="flex-1 flex flex-col">
      <NuxtPage />
    </main>

    <!-- Footer with legal links -->
    <footer class="border-t border-gray-200 mt-auto py-6 bg-gray-50">
      <UContainer>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>&copy; {{ new Date().getFullYear() }} {{ $t('app.footer.copyright') }}</p>
          <div class="flex gap-4">
            <UButton :to="$localePath('legal')" variant="link" size="xs" color="neutral">{{ $t('app.footer.legalLink')
            }}
            </UButton>
            <UButton :to="$localePath('index')" variant="link" size="xs" color="neutral">{{ $t('app.footer.homeLink') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </footer>
  </UApp>
</template>

<script setup lang="ts">
const { proxy } = useScriptGoogleAnalytics()
proxy.gtag('event', 'page_view')

const { locales, setLocale } = useI18n()

const { t } = useI18n()

const i18nHead = useLocaleHead({ seo: { canonicalQueries: ['foo'] } })

useHead({
  titleTemplate: `%s - ${t('app.title')}`,
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs.lang
  },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: computed(() => t('app.description')) },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#2563eb' }, // Tailwind blue-600
    ...(i18nHead.value.meta || [])
  ],
  bodyAttrs: {
    /**
     * @see ../nuxt.config.ts for rootAttrs
     */
    class: 'bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col'
  },
})
</script>
