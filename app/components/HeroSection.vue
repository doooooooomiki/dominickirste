<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useResizeObserver } from '@vueuse/core'

gsap.registerPlugin(SplitText)

const section = useTemplateRef('section')
const h1 = useTemplateRef('h1')
const surname = useTemplateRef('surname')
const familyname = useTemplateRef('familyname')
let ctx: gsap.Context

const fitty = (container: HTMLElement | null, text: HTMLElement | null) => {
  if (!container || !text) return
  const fontSize = (container.offsetWidth / (text.offsetWidth)) * parseFloat(getComputedStyle(text).fontSize)
  text.style.fontSize = fontSize + 'px'
}

const setupGsap = () => {
  if (!section.value || !h1.value || !surname.value || !familyname.value) return

  ctx = gsap.context(() => {
    const splitSurname = SplitText.create(surname.value, { type: 'chars' })
    gsap.set(splitSurname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => fitty(h1.value, surname.value),
    })

    const splitFamilyname = SplitText.create(familyname.value, { type: 'chars' })
    gsap.set(splitFamilyname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => fitty(h1.value, familyname.value),
    })

    gsap.timeline()
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

useResizeObserver(section, () => {
  fitty(h1.value, surname.value)
  fitty(h1.value, familyname.value)
})

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
      @load="(e) => console.log(e)"
    />
    <div class="hero-content layout-center layout-cover">
      <h1
        ref="h1"
        class="dynamic-container"
      >
        <div
          ref="surname"
          class="dynamic-text"
        >
          Dominic
        </div>
        <div
          ref="familyname"
          class="dynamic-text"
        >
          Kirste
        </div>
      </h1>
    </div>
  </section>
</template>

<style>
.dynamic-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.dynamic-text {
    white-space: nowrap;
    font-weight: 900;
    line-height: 1;
}

.hero {
  display: grid;
  grid-template-areas: 'hero';

  & .hero-image {
    grid-area: hero;
    width: 100%;
    min-block-size: 100vh;
    min-block-size: 100svh;
    max-block-size: 100vh;
    object-fit: cover;
  }

  & .hero-content {
    grid-area: hero;
  }
}
</style>
