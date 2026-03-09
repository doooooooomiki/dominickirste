<script setup lang="ts">
import { gsap } from 'gsap'

const section = useTemplateRef('section')
const wrapper = useTemplateRef('wrapper')
const gallery = useTemplateRef('horizontal-gallery')

let ctx: gsap.Context

const setupGsap = () => {
  if (!section.value || !wrapper.value || !gallery.value) return

  ctx = gsap.context(() => {
    gsap.to(gallery.value, {
      scrollTrigger: {
        scrub: true,
        trigger: gallery.value,
        pin: wrapper.value,
        start: 'center center',
        end: () => `+=${gallery.value!.scrollWidth}`,
        invalidateOnRefresh: true,
      },
      x: () => -(gallery.value!.scrollWidth - window.innerWidth),
      ease: 'none',
    })
  }, section.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section
    ref="section"
    class="web-tech"
  >
    <div
      ref="wrapper"
      class="layout-center"
    >
      <h2>Scroll down for the Gallery</h2>
      <div
        ref="horizontal-gallery"
        class="horizontal-gallery"
      >
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-1.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-2.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-3.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-4.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-5.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-6.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-7.jpg"
            alt=""
          >
        </div>
        <div class="horizontal-gallery-item">
          <img
            src="https://assets.codepen.io/16327/portrait-image-8.jpg"
            alt=""
          >
        </div>
      </div>
      <p>That's it!</p>
    </div>
  </section>
</template>

<style>
.horizontal-gallery {
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
  position: relative;
}

.horizontal-gallery-item {
  width: 33vw;
  padding: 2rem;
  box-sizing: content-box;
  flex-shrink: 0;
}
.horizontal-gallery-item img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.web-tech {
  padding-bottom: 200vh;
}
</style>
