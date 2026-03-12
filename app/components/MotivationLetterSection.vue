<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useResizeObserver } from '@vueuse/core'

const section = useTemplateRef('section')
const hi = useTemplateRef('hi')
let ctx: gsap.Context

const setupGsap = () => {
  if (!section.value || !hi.value) return
  const splitHi = SplitText.create(hi.value, { type: 'words', smartWrap: true })
  ctx = gsap.context(() => {
    gsap.timeline()
      .from(splitHi.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        color: 'white',
        rotation: 'random(-24, 24)',
        scrollTrigger: {
          trigger: hi.value,
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: 1,
        },
      })
  }, section.value)
}

useResizeObserver(section, () => setupGsap())

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section
    ref="section"
    class="introduction"
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
.introduction {
  position: relative;
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
