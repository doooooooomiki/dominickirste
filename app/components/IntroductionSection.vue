<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useResizeObserver } from '@vueuse/core'

const intro = useTemplateRef('intro')
const hi = useTemplateRef('hi')
let ctx: gsap.Context

const setupGsap = () => {
  if (!intro.value || !hi.value) return
  const splitHi = SplitText.create(hi.value, {
    type: 'words, lines',
    wordsClass: 'intro-word',
    linesClass: 'intro-line',
  })
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
    class="intro layout-stack-block"
  >
    <div
      data-speed="clamp(0.92)"
      class="emoji emoji--star-face"
    >
      <img src="/emoji--star-face.png">
    </div>
    <div
      data-speed="clamp(0.9)"
      class="emoji emoji--cool-face"
    >
      <img src="/emoji--cool-face.png">
    </div>
    <div
      data-speed="clamp(0.84)"
      class="emoji emoji--heart-face"
    >
      <img src="/emoji--heart-face.png">
    </div>
    <div
      data-speed="clamp(0.8)"
      class="emoji emoji--happy-face"
    >
      <img src="/emoji--happy-face.png">
    </div>
    <div
      data-speed="clamp(0.78)"
      class="emoji emoji--happy-star"
    >
      <img src="/emojii--happy-star.png">
    </div>
    <div
      ref="hi"
      class="layout-center"
    >
      <p>Hi.</p>
      <p>Mein Name ist Dominic und mein Zuhause ist das Frontend.</p>
      <p>Dort wo Design und Code sich die Hand geben.</p>
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

.intro-line + .intro-line {
  margin-block-start: 1vw;
}

.emoji {
  position: absolute;
  width: var(--step-5);
  height: var(--step-5);
}

.emoji--star-face {
  right: 2%;
  bottom: 64%;
}

.emoji--cool-face {
  right: 4%;
  bottom: 48%;
}

.emoji--heart-face {
  right: 4%;
  bottom: 34%;
}

.emoji--happy-face {
  right: 12%;
  bottom: 24%;
}

.emoji--happy-star {
  right: 8%;
  bottom: 12%;
}

.emoji img {
  width: 100%;
  height: 100%;
}
</style>
