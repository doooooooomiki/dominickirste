<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useResizeObserver } from '@vueuse/core'

gsap.registerPlugin(ScrollTrigger, SplitText)

const section = useTemplateRef('section')
const hi = useTemplateRef('hi')
let ctx: gsap.Context

const setupGsap = () => {
  if (!section.value || !hi.value) return
  const splitHi = SplitText.create(hi.value, { type: 'chars', smartWrap: true })
  ctx = gsap.context(() => {
    gsap.timeline()
      .from(splitHi.chars, {
        duration: 0.8,
        autoAlpha: 0.44,
        stagger: 0.2,
        scrollTrigger: {
          trigger: hi.value,
          start: 'top 75%',
          end: 'bottom 80%',
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
  min-height: 100vh;
  display: grid;
  place-content: center;
}
</style>
