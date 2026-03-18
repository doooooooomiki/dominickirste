<script setup lang="ts">
import { gsap } from 'gsap'

const hero = useTemplateRef('hero')
const heroimg = useTemplateRef('hero-img')
const pinner = useTemplateRef('hero-pinner')
const reveal = useTemplateRef('hero-reveal')
let ctx: gsap.Context

const setupGsap = () => {
  if (!hero.value || !pinner.value) return

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: hero.value,
        pin: pinner.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      .to(reveal.value, {
        clipPath: 'circle(70.7014% at 50% 50%)',
      })
      .from(heroimg.value, {
        scale: 1.2,
      }, '<')
  }, hero.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section
    ref="hero"
    class="hero"
  >
    <div
      ref="hero-pinner"
      class="hero-pinner"
    >
      <div class="hero-content">
        <div class="layout-center layout-cover hero-cover">
          <NameLine as="h1" :reveal="true" color="soy-sauce" />
        </div>
      </div>
      <div
        ref="hero-reveal"
        class="hero-content hero-content--reveal"
      >
        <div
          ref="hero-img"
          class="hero-img"
        >
          <NuxtImg
            src="/dominickirste.jpg"
            sizes="sm:800px md:1600px lg:3200px"
            quality="100"
          />
        </div>
        <div class="layout-center layout-cover hero-cover">
          <NameLine as="div" color="tamago" background="kodama" />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  block-size: 300vh;
  background-color: var(--color--shiro);
  width: 100%;
}

.hero-pinner {
  position: relative;
  width: 100%;
  block-size: 100svh;
  background-color: inherit;
}

.hero-content {
  position: relative;
  height: 100%;
}

.hero-content--reveal {
  clip-path: circle(0% at 50% 50%);
  transform: translateZ(0);
  will-change: transform;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color--soy-sauce);
}

.hero-img {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  z-index: -1;
}

.hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.surname--hide,
.familyname--hide,
.arrow--hide {
  opacity: 0;
}
</style>
