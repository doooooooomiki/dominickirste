<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useResizeObserver } from '@vueuse/core'
import fitty from 'fitty'

const section = useTemplateRef('section')
const surname = useTemplateRef('surname')
const familyname = useTemplateRef('familyname')
let ctx: gsap.Context
let timelineHeading: gsap.core.Timeline

const setupGsap = () => {
  if (!section.value || !surname.value || !familyname.value) return

  timelineHeading = gsap.timeline().pause()

  ctx = gsap.context(() => {
    const splitSurname = SplitText.create(surname.value, { type: 'chars' })
    gsap.set(splitSurname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => { if (surname.value) fitty(surname.value, { minSize: 1 }) },
    })

    const splitFamilyname = SplitText.create(familyname.value, { type: 'chars' })
    gsap.set(splitFamilyname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => { if (familyname.value) fitty(familyname.value, { minSize: 1 }) },
    })

    timelineHeading
      .to(splitSurname.chars, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
      }, 0.4)
      .to(splitFamilyname.chars, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.12,
      }, '<0.2')
  }, section.value)
}

const playTimelineHeading = () => timelineHeading.play()

useResizeObserver(section, () => fitty.fitAll())

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section
    ref="section"
    class="hero"
  >
    <NuxtImg
      class="hero-image"
      src="/dominickirste.jpg"
      sizes="sm:800px md:1600px lg:3200px"
      :placeholder="[50, 25, 75, 5]"
      quality="100"
      @load="playTimelineHeading"
    />
    <div class="hero-content layout-center layout-cover">
      <h1>
        <div
          ref="surname"
          class="fit"
        >
          Dominic
        </div>
        <div
          ref="familyname"
          class="fit"
        >
          Kirste
        </div>
      </h1>
    </div>
  </section>
</template>

<style>
.hero {
  position: relative;
  width: 100%;
  min-block-size: 100vh;
  min-block-size: 100svh;
  max-block-size: 100vh;

  & .hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .hero-content {
    position: relative;
  }
}
</style>
