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

const firstWave = ref(false)
const secondWave = ref(false)
const thirdWave = ref(false)

const isSleepingGroundWavesAreMeantToBeSurfed = ref(false)
</script>

<template>
  <NuxtRouteAnnouncer />
  <CanvasDrawings
    :first-wave="firstWave"
    :second-wave="secondWave"
    :third-wave="thirdWave"
    :is-sleeping-ground-waves-are-meant-to-be-surfed="isSleepingGroundWavesAreMeantToBeSurfed"
  />
  <div ref="smooth-wrapper">
    <div ref="smooth-content">
      <main class="layout-stack main">
        <SectionHero />
        <SectionIntroduction
          @first-wave="firstWave = true"
          @second-wave="secondWave = true"
          @third-wave="thirdWave = true"
        />
        <SectionTechStack
          @is-sleeping-ground-waves-are-meant-to-be-surfed="isSleepingGroundWavesAreMeantToBeSurfed = true"
        />
      </main>
      <SectionOutro />
    </div>
  </div>
</template>
