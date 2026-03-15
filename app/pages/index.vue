<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText, ScrambleTextPlugin)

const wrapper = useTemplateRef('smooth-wrapper')
const content = useTemplateRef('smooth-content')

let ctx: gsap.Context

const setupGsap = () => {
  if (!wrapper.value) return
  ctx = gsap.context(() => {
    if (!wrapper.value || !content.value) return
    ScrollSmoother.create({
      wrapper: wrapper.value,
      content: content.value,
      smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      normalizeScroll: true,
    })
  }, wrapper.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <div ref="smooth-wrapper">
    <div ref="smooth-content">
      <main class="layout-stack main">
        <HeroSection />
        <IntroductionSection />
        <TechStackSection />
      </main>
      <OutroSection />
    </div>
  </div>
</template>

<style>
main {
  background-color: var(--color-primary);
  position: relative;
  z-index: 666;
}
</style>
