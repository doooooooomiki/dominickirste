<script setup lang="ts">
import { gsap } from 'gsap'

const wrapper = useTemplateRef('tech-stack-wrapper')
const gallery = useTemplateRef('tech-stack-gallery')
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    if (!wrapper.value || !gallery.value) return

    const getDistance = () => gallery.value!.scrollWidth - wrapper.value!.clientWidth

    const scrollTween = gsap.to(gallery.value, {
      x: () => -(getDistance()),
      ease: 'none', // <-- IMPORTANT!
      scrollTrigger: {
        trigger: wrapper.value,
        pin: true,
        scrub: true,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        invalidateOnRefresh: true,
      },
    })

    gsap.utils.toArray<HTMLElement>(gallery.value.childNodes).forEach((card) => {
      const values = {
      // get a value between 4 and 12 or -4 and -12
        x: (Math.random() * 4 + 12) * (Math.random() < 0.5 ? 1 : -1),
        // get a value between 8 and 12 or -4 and -12
        y: (Math.random() * 4 + 12) * (Math.random() < 0.5 ? 1 : -1),
        // get a value between 4 and 12 or -4 and -12
        rotation: (Math.random() * 4 + 12) * (Math.random() < 0.5 ? 1 : -1),
      }

      gsap.fromTo(card, {
        rotation: values.rotation,
        xPercent: values.x,
        yPercent: values.y,
      }, {
        rotation: -values.rotation,
        xPercent: -values.x,
        yPercent: -values.y,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left 120%',
          end: 'right -20%',
          scrub: true,
        },
      })
    })
  })
})

onUnmounted(() => ctx.revert())
</script>

<template>
  <section class="tech-stack-section">
    <div class="layout-center">
      <div
        ref="tech-stack-wrapper"
        class="cards-wrapper"
      >
        <div
          ref="tech-stack-gallery"
          class="cards"
        >
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-1.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Neon Waves</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-2.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Velvet Drift</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-3.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Echo Flame</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-4.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Phantom Beat</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-5.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Crystal Tide</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-6.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Riot in Silence</h2>
              </div>
            </div>
          </div>
          <div class="card">
            <img
              src="https://assets.codepen.io/16327/portrait-image-7.jpg"
            >
            <div class="card-content">
              <p><span>Collection</span> <span>indie pop</span></p>
              <div>
                <span class="from">From</span>
                <h2>Jet <br>Flame</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.tech-stack-section .cards-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
.tech-stack-section .cards {
  display: flex;
  width: max-content;
  white-space: nowrap;
  gap: min(33vw, 69px);
  will-change: transform;
}
.tech-stack-section .card {
  position: relative;
  width: min(69vw, 480px);
  aspect-ratio: 0.75;
  border-radius: 2vw;
  overflow: hidden;
  object-fit: cover;
  text-align: center;
  text-transform: uppercase;
  border: 0.5vw solid currentColor;
}
.tech-stack-section .card img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.tech-stack-section .card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.tech-stack-section .card-content p {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
}
.tech-stack-section .from {
  border: 0.2em solid currentColor;
  border-radius: 100%;
  padding: 0.28em 0.3em;
}
.tech-stack-section .card-content h2 {
  font: 800 normal 4.5vw/0.8 'Inter', sans-serif;
  text-wrap: auto;
  padding: 0.2em 0 0.12em;
}

.tech-stack-section .card:nth-child(1) {
  color: #BCEFFF;
}
.tech-stack-section .card:nth-child(2) {
  color: #C9FE6E;
}
.tech-stack-section .card:nth-child(3) {
  color: #FAFF9E;
}
.tech-stack-section .card:nth-child(4) {
  color: #FC4C3B;
}
.tech-stack-section .card:nth-child(5) {
  color: #F1F1F1;
}
.tech-stack-section .card:nth-child(6) {
  color: #8CEDFF;
}
.tech-stack-section .card:nth-child(7) {
  color: #FAFF9E;
}
</style>
