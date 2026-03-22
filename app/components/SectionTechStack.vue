<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const techstack = useTemplateRef('techstack')
const inner = useTemplateRef('techstack-inner')

const pinContainerHeadline = useTemplateRef('techstack-pin-container--headline')
const pinHeadline = useTemplateRef('techstack-pin--headline')

const pinContainerCards = useTemplateRef('techstack-pin-container--cards')
const pinCards = useTemplateRef('techstack-pin--cards')
const cards = useTemplateRef('techstack-cards')

const pinContainerParagraph = useTemplateRef('techstack-pin-container--paragraph')
const pinParagraph = useTemplateRef('techstack-pin--paragraph')

let ctx: gsap.Context

const setupGsap = () => {
  if (!techstack.value) return

  ctx = gsap.context(() => {
    if (!techstack.value || !inner.value || !pinContainerHeadline.value) return

    ScrollTrigger.create({
      trigger: pinContainerHeadline.value,
      pin: pinHeadline.value,
      scrub: true,
      start: 'top top',
      end: () => `+=${pinHeadline.value!.clientHeight * 3}`,
      invalidateOnRefresh: true,
      pinSpacing: false,
    })

    gsap.set(pinContainerCards.value, { height: cards.value!.scrollWidth * 1.4 })

    const scrollTween = gsap.fromTo(cards.value,
      {
        x: () => techstack.value!.clientWidth + cards.value!.firstElementChild!.clientWidth,
      },
      {
        x: () => -(cards.value!.scrollWidth + cards.value!.firstElementChild!.clientWidth),
        ease: 'none', // <-- IMPORTANT!
        scrollTrigger: {
          trigger: pinContainerCards.value,
          pin: pinCards.value,
          scrub: true,
          start: 'top top',
          end: () => `+=${cards.value!.scrollWidth * 1.4 + cards.value!.firstElementChild!.clientWidth}`,
          invalidateOnRefresh: true,
          pinSpacing: false,
        },
      })

    gsap.utils.toArray<HTMLElement>(cards.value!.childNodes).forEach((card) => {
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
          pinSpacing: false,
        },
      })
    })

    const splitConfig: SplitText.Vars = {
      type: 'words, lines',
      wordsClass: 'introduction-word pill',
      linesClass: 'introduction-line',
    }

    const splitParagraph = SplitText.create(pinParagraph.value, splitConfig)

    gsap.from(splitParagraph.words, {
      scrollTrigger: {
        trigger: pinContainerParagraph.value,
        pin: pinParagraph.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
      autoAlpha: 0,
      stagger: 0.2,
      ease: 'back',
      rotation: 'random(-24, 24)',
      duration: 1,
    })
  }, techstack.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section ref="techstack" class="techstack">
    <div ref="techstack-inner" class="techstack-inner layout-center">
      <div ref="techstack-pin-container--headline" class="techstack-pin-container techstack-pin-container--headline">
        <div ref="techstack-pin--headline" class="techstack-pin techstack-pin--headline layout-stack-block">
          <div ref="techstack-headline" class="svg-text techstack-headline">
            <h2 class="sr-only">
              Wellen sind zum Surfen da
            </h2>
            <div class="svg--waves-are-ment-to-be-surfed color--tamago" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 3.25 211.7 34.55"><path fill="currentcolor" d="M30.55 29.65q1.95 0 2.7-2.13.75-2.12.75-6.92l.1-12.25q0-2.65 1.23-3.87 1.22-1.23 4.22-1.23 1.85 0 2.97.6 1.13.6 1.93 2.35t1.1 4.75.3 7.95q0 2.95-.5 5.5T44 28.85t-2.02 3.42Q40.8 33.8 39.5 34.8t-2.75 1.68q-1.45.67-2.83.94-1.37.28-2.67.28-4.5 0-8.15-2.85-3.6 2.95-8.15 2.95-1.95 0-3.9-.57-1.95-.58-3.97-1.98-2.03-1.4-3.58-3.48Q1.95 29.7.98 26.38 0 23.05 0 19q0-6.55.63-9.9.62-3.35 1.89-4.55 1.28-1.2 3.73-1.2 2.05 0 3.25.57 1.2.58 1.7 1.68t.5 2.85l.05 12.2q0 4.8.75 6.95t2.95 2.15q1.1 0 1.65-.93.55-.92.75-2.97-.65-2.9-.65-9.05 0-3.45.15-5.5t.45-3.55 1-2.15 1.58-.93q.87-.27 2.42-.27.9 0 1.58.05.67.05 1.27.3t1 .45.75.75.55.95.37 1.3q.18.9.25 1.57.08.68.11 2 .02 1.33.05 2.3.02.98.02 2.78 0 6.3-.65 9.3.2 1.8.75 2.65t1.7.85m41.4-12.45q2.65 0 3.72.85 1.08.85 1.08 2.9 0 1.7-1.28 2.43-1.27.72-3.97.72h-8.1v5.3l10.85.05q2.8 0 4.03.82 1.22.83 1.22 2.93 0 2.4-1.42 3.35-1.43.95-4.33.95h-16.2q-2.95 0-4.32-1.58-1.38-1.57-1.38-5.57V9.25q0-6 5.7-6h16.2q2.9 0 4.33.9 1.42.9 1.42 3.25 0 2.2-1.22 3.07-1.23.88-4.03.88h-10.9v5.85zM91.6 37.5q-2.3-.05-3.7-.73-1.4-.67-2.1-2.22t-.7-4.15V9.25q0-2.65 1.55-4.33 1.55-1.67 4.1-1.67 3 0 4.42 1.1 1.43 1.1 1.43 4.45v20.05h8.55q2.9 0 4.07.85 1.18.85 1.18 3.5 0 2.7-1.35 3.5t-4.4.8zm30.4 0q-2.3-.05-3.7-.73-1.4-.67-2.1-2.22t-.7-4.15V9.25q0-2.65 1.55-4.33 1.55-1.67 4.1-1.67 3 0 4.43 1.1Q127 5.45 127 8.8v20.05h8.55q2.9 0 4.08.85 1.17.85 1.17 3.5 0 2.7-1.35 3.5t-4.4.8zm44.35-20.3q2.65 0 3.73.85 1.07.85 1.07 2.9 0 1.7-1.27 2.43-1.28.72-3.98.72h-8.1v5.3l10.85.05q2.8 0 4.03.82 1.22.83 1.22 2.93 0 2.4-1.42 3.35-1.43.95-4.33.95h-16.2q-2.95 0-4.32-1.58-1.38-1.57-1.38-5.57V9.25q0-6 5.7-6h16.2q2.9 0 4.33.9 1.42.9 1.42 3.25 0 2.2-1.22 3.07-1.23.88-4.03.88h-10.9v5.85zm45.35 15.55q0 2.2-1.3 3.48-1.3 1.27-3.8 1.27-.65 0-1.3-.15t-1.37-.55q-.73-.4-1.28-.75t-1.37-1.07q-.83-.73-1.3-1.15-.48-.43-1.48-1.38t-1.45-1.4l-9.15-8.65v10.85q0 2.45-.93 3.35-.92.9-2.92.9-2.2 0-3.25-1t-1.05-3.35V9q0-2.85 1.45-4.3t4.15-1.45q1.85 0 2.98.57 1.12.58 2.67 2.08l12.65 12.6V7.6q0-2.15 1.08-3.22 1.07-1.08 2.92-1.08 2.15 0 3.1 1t.95 3.25z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.05 2.9 254.9 34.95"><path fill="currentcolor" d="M15 2.9q5.95 0 10.15 2.45t4.2 5.2q0 .75-.33 1.27-.32.53-.79.75-.48.23-1.03.23-.9 0-2.7-.92-1.8-.93-4-1.86-2.2-.92-4.05-.92-2.95 0-2.95 2.4 0 .75.47 1.42.48.68 1.53 1.4 1.05.73 2.05 1.28t2.75 1.47q1.75.93 2.95 1.63 3.85 2.2 5.4 4.2t1.55 4.6q0 10.35-13.95 10.35-2.75 0-5.32-.55-2.58-.55-4.5-1.45-1.93-.9-3.41-2Q1.55 32.75.8 31.6t-.75-2.15q0-1.1.72-1.88.73-.77 2.13-.77 1.05 0 5.05 1.33 4 1.32 6.45 1.32 2.25 0 2.25-1.55 0-.45-.18-.83-.17-.37-.59-.75-.43-.37-.95-.69-.53-.33-1.45-.83-.93-.5-1.85-1-.93-.5-2.43-1.3t-2.9-1.6q-1.85-1.05-3.17-2.6-1.33-1.55-1.93-3.08Q.6 13.7.6 12.4q0-4.2 3.75-6.85T15 2.9m19.75 3.8q0-1.65 1.43-2.72Q37.6 2.9 40.2 2.9q5.45 0 5.45 3.8 0 2.1-1.37 2.95-1.38.85-4.08.85-2.35 0-3.9-.9t-1.55-2.9M45.6 32.15q0 3-1.25 4.18-1.25 1.17-4.4 1.17-2.95 0-4.02-1.37-1.08-1.38-1.08-4.53V19.3q0-2.55 1.38-4.1 1.37-1.55 3.67-1.55 2.7 0 4.2 1.17 1.5 1.18 1.5 4.33zm37.55.6q0 2.2-1.3 3.48-1.3 1.27-3.8 1.27-.65 0-1.3-.15t-1.37-.55q-.73-.4-1.28-.75t-1.38-1.07l-1.29-1.15q-.48-.43-1.48-1.38t-1.45-1.4l-9.15-8.65v10.85q0 2.45-.92 3.35-.93.9-2.93.9-2.2 0-3.25-1t-1.05-3.35V9q0-2.85 1.45-4.3t4.15-1.45q1.85 0 2.98.57 1.12.58 2.67 2.08L75.1 18.5V7.6q0-2.15 1.08-3.22Q77.25 3.3 79.1 3.3q2.15 0 3.1 1t.95 3.25zm18.3-2.05q1.3 0 2.27-.27.98-.28 1.86-1.01.87-.72 1.42-1.92t.88-3.08q.32-1.87.32-4.42 0-2.85-.5-4.83-.5-1.97-1.45-3-.95-1.02-2.08-1.45-1.12-.42-2.72-.47zm1.5-27.4q7.8 0 12.52 4.5 4.73 4.5 4.73 12.4 0 2.55-.48 4.95-.47 2.4-1.57 4.67-1.1 2.28-2.75 3.95-1.65 1.68-4.2 2.71-2.55 1.02-5.75 1.02H95.6q-3.05 0-4.38-1.55-1.32-1.55-1.32-5.6V9.25q0-5.95 5.7-5.95zm63 26.1q1.5 0 2.5.23 1 .22 1.58.75.57.52.79 1.22.23.7.23 1.75 0 2.55-1.6 3.35t-5.55.8h-18.75q-1.4 0-2.83-.83-1.42-.82-2.37-2.29-.95-1.48-.95-3.13 0-1.5.18-2.48.17-.97.82-2.02t1.18-1.68q.52-.62 1.92-2.07l12.75-11.6H145.7q-3.35 0-4.85-.98-1.5-.97-1.5-3.27 0-2.15 1.22-3.02 1.23-.88 3.63-.88h20.45q1.5 0 2.65.52 1.15.53 1.75 1.36.6.82.9 1.62t.3 1.5q0 .9-.05 1.6t-.27 1.32q-.23.63-.33.98t-.57.95q-.48.6-.68.8t-.95.98q-.75.77-1.05 1.07l-14.6 13.45zm41.6-20.15v14.9q0 7.3-3.52 10.48-3.53 3.17-11.88 3.17-7.95 0-11.68-3.4-3.72-3.4-3.72-10.25V9.25q0-2.65 1.57-4.33 1.58-1.67 3.98-1.67 2.95 0 4.48 1.1 1.52 1.1 1.52 4.45v16.3q.05 1.6.52 2.55.48.95 1.28 1.33.8.37 2.05.37t2.05-.3 1.18-.95q.37-.65.5-1.3.12-.65.12-1.7V8.75q0-1.7.43-2.85.42-1.15 1.29-1.7.88-.55 1.81-.75.92-.2 2.22-.2 2.9 0 4.35 1.4t1.45 4.6m36 9.95L237.3 32q-.8 1.6-1.7 2.27-.9.68-2.15.68-1.6 0-2.7-1.12-1.1-1.13-2.85-4.08l-5.8-10.55v14.15q0 2.15-.97 3.15-.98 1-2.93 1-2.2 0-3.2-.98-1-.97-1-3.82V10.9q0-3.85 1.75-5.8t5.9-1.95q1.55 0 2.7.52 1.15.53 1.72 1.21.58.67 1.13 1.67l6.7 14.65L241 6.8q1.85-3.6 6.65-3.6 2.25 0 3.85.78 1.6.77 2.52 2.49.93 1.73.93 4.33v21.75q-.05 4.95-6.25 4.95-2.25 0-3.68-1.23-1.42-1.22-1.47-3.97z" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.05 2.9 292.95 34.95"><path fill="currentcolor" d="M15 2.9q5.95 0 10.15 2.45t4.2 5.2q0 .75-.33 1.27-.32.53-.79.75-.48.23-1.03.23-.9 0-2.7-.92-1.8-.93-4-1.86-2.2-.92-4.05-.92-2.95 0-2.95 2.4 0 .75.47 1.42.48.68 1.53 1.4 1.05.73 2.05 1.28t2.75 1.47q1.75.93 2.95 1.63 3.85 2.2 5.4 4.2t1.55 4.6q0 10.35-13.95 10.35-2.75 0-5.32-.55-2.58-.55-4.5-1.45-1.93-.9-3.41-2Q1.55 32.75.8 31.6t-.75-2.15q0-1.1.72-1.88.73-.77 2.13-.77 1.05 0 5.05 1.33 4 1.32 6.45 1.32 2.25 0 2.25-1.55 0-.45-.18-.83-.17-.37-.59-.75-.43-.37-.95-.69-.53-.33-1.45-.83-.93-.5-1.85-1-.93-.5-2.43-1.3t-2.9-1.6q-1.85-1.05-3.17-2.6-1.33-1.55-1.93-3.08Q.6 13.7.6 12.4q0-4.2 3.75-6.85T15 2.9m51.3 6.35v14.9q0 7.3-3.52 10.48-3.53 3.17-11.88 3.17-7.95 0-11.67-3.4Q35.5 31 35.5 24.15V9.25q0-2.65 1.58-4.33 1.57-1.67 3.97-1.67 2.95 0 4.48 1.1 1.52 1.1 1.52 4.45v16.3q.05 1.6.53 2.55.47.95 1.27 1.33.8.37 2.05.37t2.05-.3 1.18-.95q.37-.65.5-1.3.12-.65.12-1.7V8.75q0-1.7.43-2.85.42-1.15 1.3-1.7.87-.55 1.8-.75.92-.2 2.22-.2 2.9 0 4.35 1.4t1.45 4.6m25.35 3.95q0-2.4-1.75-3.3T84 9v8.65q3.9 0 5.78-.98 1.87-.97 1.87-3.47M84 30q0 7.5-5.85 7.5-2.95 0-4.32-1.58-1.38-1.57-1.38-5.57V9.25q0-2.9 1.58-4.43Q75.6 3.3 78.15 3.3h10.5q6.15 0 9.95 2.87 3.8 2.88 3.8 7.38 0 3.4-1.42 5.33-1.43 1.92-4.58 2.82 2.4.15 4.45 2.32 2.05 2.18 2.05 5.43 0 3.3-.62 5.07-.63 1.78-1.78 2.38t-3.25.6q-2.95 0-4.32-1.23-1.38-1.22-1.38-3.72 0-3.1-.6-4.78-.6-1.67-1.55-2.17t-2.65-.5l-2.75.05zm36.05.55q0 3.4-1.5 5.18-1.5 1.77-4.35 1.77-2.7 0-4.2-1.62-1.5-1.63-1.5-5.53V9.25q0-1.6.42-2.78.43-1.17 1.23-1.87t1.8-1.03q1-.32 2.25-.32h16.4q2.9 0 4.33.9 1.42.9 1.42 3.25 0 2.2-1.22 3.07-1.23.88-4.03.88h-11.05v5.85h8.8q1.35 0 2.28.2.92.2 1.5.67.57.48.8 1.15.22.68.22 1.73 0 1.7-1.25 2.43-1.25.72-4 .72h-8.35zm41.2-13.35q2.65 0 3.72.85 1.08.85 1.08 2.9 0 1.7-1.28 2.43-1.27.72-3.97.72h-8.1v5.3l10.85.05q2.8 0 4.02.82 1.23.83 1.23 2.93 0 2.4-1.42 3.35-1.43.95-4.33.95h-16.2q-2.95 0-4.33-1.58-1.37-1.57-1.37-5.57V9.25q0-6 5.7-6h16.2q2.9 0 4.33.9 1.42.9 1.42 3.25 0 2.2-1.23 3.07-1.22.88-4.02.88h-10.9v5.85zm45.35 15.55q0 2.2-1.3 3.48-1.3 1.27-3.8 1.27-.65 0-1.3-.15t-1.38-.55q-.72-.4-1.27-.75t-1.38-1.07l-1.29-1.15q-.48-.43-1.48-1.38t-1.45-1.4l-9.15-8.65v10.85q0 2.45-.93 3.35-.92.9-2.92.9-2.2 0-3.25-1t-1.05-3.35V9q0-2.85 1.45-4.3t4.15-1.45q1.85 0 2.97.57 1.13.58 2.68 2.08l12.65 12.6V7.6q0-2.15 1.08-3.22 1.07-1.08 2.92-1.08 2.15 0 3.1 1t.95 3.25zm31.8-2.05q1.3 0 2.27-.27.98-.28 1.85-1.01.88-.72 1.43-1.92t.87-3.08q.33-1.87.33-4.42 0-2.85-.5-4.83-.5-1.97-1.45-3-.95-1.02-2.07-1.45-1.13-.42-2.73-.47zm1.5-27.4q7.8 0 12.52 4.5 4.73 4.5 4.73 12.4 0 2.55-.47 4.95-.48 2.4-1.58 4.67-1.1 2.28-2.75 3.95-1.65 1.68-4.2 2.71-2.55 1.02-5.75 1.02h-9.85q-3.05 0-4.38-1.55-1.32-1.55-1.32-5.6V9.25q0-5.95 5.7-5.95zm37.45 8.1q-2.15 0-3.17 1.25-1.03 1.25-1.03 4.45V23h8.3v-6q0-2.1-.5-3.37-.5-1.28-1.38-1.75-.87-.48-2.22-.48m4.1 18.5h-8.3v2.65q0 2.55-1.35 3.75t-4.65 1.2q-1.4 0-2.3-.4t-1.58-1.35q-.67-.95-1-2.77-.32-1.83-.5-4.41-.17-2.57-.17-6.52 0-3.45.72-6.33.73-2.87 1.95-4.87 1.23-2 2.78-3.53 1.55-1.52 3.38-2.37 1.82-.85 3.54-1.28 1.73-.42 3.48-.42 2.1 0 4.15.57 2.05.58 4.15 1.98t3.68 3.47q1.57 2.08 2.57 5.38t1 7.4q0 6.6-.48 9.77-.47 3.18-1.59 4.43-1.13 1.25-3.48 1.25-3.3 0-4.65-1.2t-1.35-3.75z" /></svg>
            </div>
          </div>
        </div>
      </div>
      <div ref="techstack-pin-container--cards" class="techstack-pin-container techstack-pin-container--cards">
        <div ref="techstack-pin--cards" class="techstack-pin techstack-pin--cards layout-stack-block">
          <div ref="techstack-cards" class="techstack-cards">
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
      <div ref="techstack-pin-container--paragraph" class="techstack-pin-container techstack-pin-container--paragraph">
        <div ref="techstack-pin--paragraph" class="techstack-pin--paragraph layout-stack-block color--tamago">
          <div class="techstack-line-container">
            <p>Let's ride them together!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.techstack {
  background-color: transparent;
}

.techstack-inner {
  position: relative;
}

.techstack-pin--headline {
  block-size: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.techstack-headline {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.techstack-pin-container--cards {
  position: relative;
}

.techstack-pin--cards {
  position: relative;
  block-size: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.techstack-pin-container--paragraph {
  position: relative;
  block-size: 300vh;
}

.techstack-pin--paragraph {
  position: relative;
  block-size: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.techstack-cards {
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
  color: var(--color--shiro);
  background-color: #f16524;
  border-color: #e54c20;
}

.card--css {
  color: var(--color--shiro);
  background-color: #1d73b7;
  border-color: #33a9db;
}

.card--tailwind {
  color: var(--color--shiro);
  background-color: #3fc3ca;
  border-color: #3ebea6;
}

.card--js {
  color: var(--color--shiro);
  background-color: #fbde35;
  border-color: #eec726;
}

.card--ts {
  color: var(--color--shiro);
  background-color: #3191cf;
  border-color: #0c416d;
}

.card--vue {
  color: var(--color--shiro);
  background-color: #53d799;
  border-color: #39ae64;
}

.card--nuxt {
  color: var(--color--shiro);
  background-color: #020420;
  border-color: #00DC82;
}

.card--gsap {
  color: var(--color--shiro);
  border-color: #7fbff2;
}

.techstack-line-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.techstack-line-container > p {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
