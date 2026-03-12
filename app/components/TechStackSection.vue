<script setup lang="ts">
import { gsap } from 'gsap'

const techstack = useTemplateRef('tech-stack')
const techstackinner = useTemplateRef('tech-stack-inner')
const wrapper = useTemplateRef('tech-stack-wrapper')
const gallery = useTemplateRef('tech-stack-gallery')
const heading = useTemplateRef('tech-stack-heading-wrapper')

let ctx: gsap.Context

const setupGsap = () => {
  if (!wrapper.value) return

  ctx = gsap.context(() => {
    if (!techstack.value || !techstackinner.value || !wrapper.value || !gallery.value || !heading.value) return

    gsap.to(heading.value, {
      scrollTrigger: {
        trigger: techstack.value,
        pin: heading.value,
        scrub: true,
        start: 'top top',
        end: 'bottom bottom',
        pinSpacing: false,
      },
    })

    const scrollTween = gsap.fromTo(gallery.value, {
      x: () => techstack.value!.clientWidth + gallery.value!.firstElementChild!.clientWidth,
    },
    {
      x: () => -(gallery.value!.scrollWidth + gallery.value!.firstElementChild!.clientWidth),
      ease: 'none', // <-- IMPORTANT!
      scrollTrigger: {
        trigger: techstack.value,
        pin: wrapper.value,
        scrub: true,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
      },
    })

    gsap.utils.toArray<HTMLElement>(gallery.value.childNodes).forEach((card) => {
      const values = {
        x: gsap.utils.random(-12, 12),
        y: gsap.utils.random(-12, 12),
        rotation: gsap.utils.random(-12, 12),
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
  <section
    ref="tech-stack"
    class="tech-stack"
  >
    <div class="layout-center">
      <div
        ref="tech-stack-inner"
        class="tech-stack-inner"
      >
        <div
          ref="tech-stack-heading-wrapper"
          class="tech-stack-heading-wrapper layout-stack-block"
        >
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
        </div>
        <div
          ref="tech-stack-wrapper"
          class="cards-wrapper layout-stack-block"
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
    </div>
  </section>
</template>

<style>
.tech-stack {
  background: linear-gradient(195deg, #ff00c3, #d123ba, #a42dab, #7b2f97, #552b80, #342465, #181a48, #050b2b);
  block-size: 600vh;
}

.tech-stack-inner {
  position: relative;
  block-size: 100vh;
}

.tech-stack-heading-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  display: flex;
  align-items: center;
}

.tech-stack-heading-wrapper h2 {
  width: 100%;
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
}

.cards {
  display: flex;
  width: max-content;
  white-space: nowrap;
  gap: min(12vw, 32px);
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
