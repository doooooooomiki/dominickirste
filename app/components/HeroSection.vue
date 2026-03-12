<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import fitty from 'fitty'

const hero = useTemplateRef('hero')
const heroimg = useTemplateRef('hero-img')
const pinner = useTemplateRef('hero-pinner')
const surname = useTemplateRef('surname')
const familyname = useTemplateRef('familyname')
const arrowsoysauce = useTemplateRef('arrow-soy-sauce')
const reveal = useTemplateRef('hero-reveal')
let ctx: gsap.Context

const setupGsap = () => {
  if (!hero.value || !pinner.value || !surname.value || !familyname.value) return

  ctx = gsap.context(() => {
    const splitSurname = SplitText.create(surname.value, { type: 'chars' })
    gsap.set(splitSurname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => { if (surname.value) fitty(surname.value, { minSize: 1 }) },
    })
    gsap.set(surname.value, {
      autoAlpha: 1,
    })

    const splitFamilyname = SplitText.create(familyname.value, { type: 'chars' })
    gsap.set(splitFamilyname.chars, {
      y: 20,
      autoAlpha: 0,
      onComplete: () => { if (familyname.value) fitty(familyname.value, { minSize: 1 }) },
    })
    gsap.set(familyname.value, {
      autoAlpha: 1,
    })

    gsap.set(arrowsoysauce.value, {
      y: 20,
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
      .to(arrowsoysauce.value, {
        y: 0,
        autoAlpha: 1,
      }, '>0.1')

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
          <h1 class="h1--black">
            <div
              ref="surname"
              class="surname surname--hide"
            >
              Dominic
            </div>
            <div
              ref="familyname"
              class="familyname familyname--hide"
            >
              Kirste
            </div>
          </h1>
          <svg
            ref="arrow-soy-sauce"
            class="arrow arrow--hide arrow--soy-sauce"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 21"
          >
            <path
              fill="currentcolor"
              d="M7.62294 11.248c0 .576-.448 1.28-1.632 4.64-1.248 3.36-1.376 4.928-2.176 4.928-.736 0-.864-1.44-2.144-4.928-1.183999-3.36-1.6319986-4.064-1.6319986-4.64 0-.48.3199996-.8.7359996-.8.351999 0 .767999.224 1.087999.224.512 0 .736-.288.736-1.312V1.872c0-.672.352-1.056002 1.216-1.056002.896 0 1.248.384002 1.248 1.056002V9.36c0 1.024.224 1.312.736 1.312.32 0 .704-.224 1.088-.224.416 0 .736.32.736.8Z"
            />
          </svg>
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
          <h1 class="h1--yellow">
            <div class="surname fit">
              Dominic
            </div>
            <div class="familyname fit">
              Kirste
            </div>
          </h1>
          <svg
            class="arrow arrow--tamago"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8 21"
          >
            <path
              fill="currentcolor"
              d="M7.62294 11.248c0 .576-.448 1.28-1.632 4.64-1.248 3.36-1.376 4.928-2.176 4.928-.736 0-.864-1.44-2.144-4.928-1.183999-3.36-1.6319986-4.064-1.6319986-4.64 0-.48.3199996-.8.7359996-.8.351999 0 .767999.224 1.087999.224.512 0 .736-.288.736-1.312V1.872c0-.672.352-1.056002 1.216-1.056002.896 0 1.248.384002 1.248 1.056002V9.36c0 1.024.224 1.312.736 1.312.32 0 .704-.224 1.088-.224.416 0 .736.32.736.8Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.hero {
  block-size: 300vh;
  width: 100%;
}

.hero-pinner {
  position: relative;
  width: 100%;
  min-block-size: 100vh;
  min-block-size: 100svh;
  max-block-size: 100vh;
  background-color: var(--color-primary);
}

.hero-content {
  position: relative;
}

.hero-content--reveal {
  clip-path: circle(0% at 50% 50%);
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}

.hero-content--reveal h1,
.hero-content--reveal .arrow {
  position: relative;
  z-index: 666;
}

.hero-img {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
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

.arrow {
  position: relative;
  height: 1.313rem;
  width: .5rem;
  align-self: center;
}

.arrow--soy-sauce {
  color: black;
}

.arrow--tamago {
  color: var(--color-primary);
}
</style>
