<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, SplitText)

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
      smoothTouch: 0.01, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  }, wrapper.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <div ref="smooth-wrapper">
    <main
      ref="smooth-content"
      class="layout-stack"
    >
      <HeroSection />
      <MotivationLetterSection />
      <TechStackSection />
      <section class="spacer">
        <hr>
      </section>
    </main>
  </div>
</template>

<style>
.spacer {
  padding-bottom: 100vh;
}
</style>
