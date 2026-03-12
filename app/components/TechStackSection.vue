<script setup lang="ts">
import { gsap } from 'gsap'

const wrapper = useTemplateRef('tech-stack-wrapper')
const gallery = useTemplateRef('tech-stack-gallery')

let ctx: gsap.Context

const setupGsap = () => {
  if (!wrapper.value) return

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
  }, wrapper.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section class="tech-stack-section">
    <div class="layout-center">
      <h2>
        <div class="fit">
          Wellen
        </div>
        <div class="fit">
          die ich
        </div>
        <div class="fit">
          surfe
        </div>
      </h2>
      <div
        ref="tech-stack-wrapper"
        class="cards-wrapper"
      >
        <div
          ref="tech-stack-gallery"
          class="cards"
        >
          <div class="card card--html">
            <h3>HTML</h3>
            <div class="card-img-container">
              <img src="/html.png">
            </div>
          </div>
          <div class="card card--css">
            <h3>CSS</h3>
            <div class="card-img-container">
              <img src="/css3.png">
            </div>
          </div>
          <div class="card card--tailwind">
            <h3>TAILWIND</h3>
            <div class="card-img-container">
              <img src="/tailwind.png">
            </div>
          </div>
          <div class="card card--js">
            <h3>JAVA&shy;SCRIPT</h3>
            <div class="card-img-container">
              <img src="/javascript.png">
            </div>
          </div>
          <div class="card card--ts">
            <h3>TYPE&shy;SCRIPT</h3>
            <div class="card-img-container">
              <img src="/typescript.png">
            </div>
          </div>
          <div class="card card--vue">
            <h3>VUE</h3>
            <div class="card-img-container">
              <img src="/vue.png">
            </div>
          </div>
          <div class="card card--nuxt">
            <h3>NUXT</h3>
            <div class="card-img-container">
              <img src="/nuxt.png">
            </div>
          </div>
          <div class="card card--gsap">
            <h3>GSAP</h3>
            <div class="card-img-container card-img-container--cover">
              <img src="/gsap.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.tech-stack-section {
  background: linear-gradient(195deg, #ff00c3, #d123ba, #a42dab, #7b2f97, #552b80, #342465, #181a48, #050b2b);
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100vh; */
  padding-block: 10rem;
  width: 100%;
}

.cards {
  display: flex;
  width: max-content;
  white-space: nowrap;
  gap: min(33vw, 69px);
  will-change: transform;
}

.card {
  position: relative;
  width: min(69vw, 480px);
  aspect-ratio: 0.75;
  border-radius: 2vw;
  text-align: center;
  text-transform: uppercase;
  border: 1vw solid currentcolor;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.card-img-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img-container--cover {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
}

.card-img-container img {
  width: 80%;
}

.card-img-container--cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-stack-section p {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
}

.tech-stack-section .from {
  border: 0.2em solid currentcolor;
  border-radius: 100%;
  padding: 0.28em 0.3em;
}

.card h3 {
  font-family: 'Geist';
  font-size:  var(--step-3);
  line-height: 0.8;
  text-wrap: auto;
  margin: unset;
  padding: 1em 0 0.12em;
  position: relative;
  z-index: 666;
}

.card--html {
  color: white;
  background-color: #f16524;
  border-color: #e54c20;
}

.card--css {
  color: white;
  background-color: #1d73b7;
  border-color: #33a9db;
}

.card--tailwind {
  color: white;
  background-color: #3fc3ca;
  border-color: #3ebea6;
}

.card--js {
  color: white;
  background-color: #fbde35;
  border-color: #eec726;
}

.card--ts {
  color: white;
  background-color: #3191cf;
  border-color: #0c416d;
}

.card--vue {
  color: white;
  background-color: #53d799;
  border-color: #39ae64;
}

.card--nuxt {
  color: white;
  background-color: #020420;
  border-color: #00DC82;
}

.card--gsap {
  color: white;
  border-color: #7fbff2;
}
</style>
