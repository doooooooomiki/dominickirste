<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useResizeObserver } from '@vueuse/core'

const intro = useTemplateRef('intro')
const hi = useTemplateRef('hi')
let ctx: gsap.Context

const setupGsap = () => {
  if (!intro.value || !hi.value) return
  const splitHi = SplitText.create(hi.value, { type: 'words', wordsClass: 'intro-word', smartWrap: true })
  ctx = gsap.context(() => {
    gsap.timeline()
      .from(splitHi.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        rotation: 'random(-24, 24)',
        scrollTrigger: {
          trigger: hi.value,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
  }, intro.value)
}

useResizeObserver(intro, () => setupGsap())

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section
    ref="intro"
    class="intro"
  >
    <div
      data-speed="clamp(0.92)"
      class="emoji emoji--happy-face"
    >
      <img src="/emoji--happy-face.png">
    </div>
    <div
      data-speed="clamp(0.91)"
      class="emoji emoji--cool-face"
    >
      <img src="/emoji--cool-face.png">
    </div>
    <div
      data-speed="clamp(0.9)"
      class="emoji emoji--heart-face"
    >
      <img src="/emoji--heart-face.png">
    </div>
    <div
      ref="hi"
      class="layout-center"
    >
      <p>
        <strong>Hi.</strong>
      </p>
      <p>Mein Name ist Dominic und mein Zuhause ist das Frontend. Dort wo Design und Code sich die Hand geben.</p>
    </div>
  </section>
</template>

<style>
.intro {
  position: relative;
  background-color: var(--color-primary);
}

.intro-word {
  border: 1vw solid black;
  border-radius: 16px;
  background-color: var(--color-primary);
}

.emoji {
  position: absolute;
  width: var(--step-5);
  height: var(--step-5);
}

.emoji--happy-face {
  right: 1%;
  bottom: 24%;
}

.emoji--cool-face {
  right: 4%;
  bottom: 8%;
}

.emoji--heart-face {
  right: 2%;
  bottom: -8%;
}

.emoji img {
  width: 100%;
  height: 100%;
}
</style>
