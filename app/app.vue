<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

defineOgImage('DominicKirste.takumi')

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
  <NuxtRouteAnnouncer />
  <div ref="smooth-wrapper">
    <div ref="smooth-content">
      <main class="layout-stack main">
        <SectionHero />
        <SectionIntroduction />
        <SectionTechStack />
      </main>
      <SectionOutro />
    </div>
  </div>
</template>

<style>
main {
  background-color: transparent;
  background: linear-gradient(to bottom, var(--color--tamago), var(--color--tamago), var(--color--tamago), var(--color--tamago),var(--color--tamago), var(--color--tamago), var(--color--tamago), #ff00c3, #d123ba, #a42dab, #7b2f97, #552b80, #342465, #181a48, #050b2b, var(--color--soy-sauce));
  position: relative;
  z-index: 666;
}
</style>
