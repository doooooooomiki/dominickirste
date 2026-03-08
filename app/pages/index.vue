<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollSmoother)

const wrapper = useTemplateRef('smooth-wrapper')
const content = useTemplateRef('smooth-content')
let ctx: gsap.Context

const setupGsap = () => {
  if (!wrapper.value) return
  ctx = gsap.context(() => {
    ScrollSmoother.create({
      wrapper: wrapper.value,
      content: content.value,
      smooth: 1.2, // how long (in seconds) it takes to "catch up" to the native scroll position
      effects: true, // looks for data-speed and data-lag attributes on elements
      smoothTouch: 0.2, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    })
  }, wrapper.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <main
    ref="smooth-wrapper"
    class="layout-stack"
  >
    <div ref="smooth-content">
      <HeroSection />
      <MotivationLetterSection />
      <WebTechSection />
    </div>
  </main>
</template>
