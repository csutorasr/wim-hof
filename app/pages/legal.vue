<template>
  <UContainer class="max-w-2xl py-12 mx-auto">
    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold">Legal Notice</h1>
      </template>
      <div class="prose prose-blue">
        <h2 class="text-xl font-semibold mt-6 mb-4">Health & Safety Disclaimer</h2>
        <p class="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-500">
          <strong>WARNING:</strong> By using this website and engaging in breathing exercises, you acknowledge and accept full responsibility for any and all consequences, injuries, or harm that may result from your use of these techniques.
        </p>
        <p>
          <strong>Use at Your Own Risk:</strong> The breathing exercises and methods presented on this website can be physically demanding and may pose risks to your health. You should only use these techniques after carefully assessing your own physical and mental fitness, and only if you are confident in your ability to do so safely.
        </p>
        <p>
          <strong>Medical Consultation Required:</strong> Before beginning any breathing exercises or physical practices, consult with a qualified healthcare professional, especially if you have any pre-existing medical conditions including but not limited to:
        </p>
        <ul>
          <li>Heart conditions or cardiovascular disease</li>
          <li>High or low blood pressure</li>
          <li>Respiratory conditions (asthma, COPD, etc.)</li>
          <li>Epilepsy or seizure disorders</li>
          <li>Pregnancy</li>
          <li>Any other medical conditions or concerns</li>
        </ul>
        <p>
          <strong>Safety Precautions:</strong> Never practice these breathing exercises while driving, swimming, in water, or in any situation where loss of consciousness could lead to injury or death. Always practice in a safe environment, preferably seated or lying down.
        </p>
        <p>
          <strong>Limitation of Liability:</strong> The creators, maintainers, and contributors of this website expressly disclaim all liability for any injury, harm, or adverse effects resulting from the use of this website or the techniques described herein. By using this website, you agree to hold harmless all parties involved in its creation and maintenance from any claims, damages, or losses arising from your use.
        </p>
        <p>
          <strong>No Professional Advice:</strong> This website does not provide medical advice, diagnosis, or treatment. The content is for informational purposes only and should not be considered a substitute for professional medical advice, diagnosis, or treatment.
        </p>

        <h2 class="text-xl font-semibold mt-8 mb-4">Intellectual Property Disclaimer</h2>
        <p>
          <strong>No Affiliation:</strong> This website and application are not affiliated with, endorsed by, or officially connected to Wim Hof or the Wim Hof Method organization. The Wim Hof Method is the intellectual property of Wim Hof and his team. This project is an independent, non-commercial tool created for educational and personal use only.
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
defineOgImageComponent('NuxtSeo')
</script>

<style scoped>
.prose a {
  text-decoration: underline;
}
</style>
