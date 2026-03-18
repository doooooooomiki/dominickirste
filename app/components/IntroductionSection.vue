<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const intro = useTemplateRef('intro')
const content = useTemplateRef('intro-content')
const hi = useTemplateRef('hi')
const home = useTemplateRef('home')
const handshake = useTemplateRef('handshake')
let ctx: gsap.Context

const setupGsap = () => {
  if (!intro.value || !content.value || !hi.value) return

  const splitHi = SplitText.create(hi.value, {
    type: 'words, lines',
    wordsClass: 'intro-word pill',
    linesClass: 'intro-line intro-line--hi',
  })

  const splitHome = SplitText.create(home.value, {
    type: 'words, lines',
    wordsClass: 'intro-word pill',
    linesClass: 'intro-line intro-line--home',
  })

  const splitShakehands = SplitText.create(handshake.value, {
    type: 'words, lines',
    wordsClass: 'intro-word pill',
    linesClass: 'intro-line intro-line--handshake',
  })

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: intro.value,
        pin: content.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
      .to(splitHi.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        rotation: 'random(-24, 24)',
        duration: 1,
      }, '>1')
      .from(splitHome.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        rotation: 'random(-24, 24)',
        duration: 1,
      })
      .to(splitHome.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        rotation: 'random(-24, 24)',
        duration: 1,
      }, '>1')
      .from(splitShakehands.words, {
        autoAlpha: 0,
        stagger: 0.2,
        ease: 'back',
        rotation: 'random(-24, 24)',
        duration: 1,
      })
  }, intro.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section ref="intro" class="intro">
    <div ref="intro-inner" class="intro-inner layout-center">
      <div ref="intro-content" class="intro-content layout-stack-block">
        <div class="emoji emoji--star-face">
          <img src="/emoji--star-face.png">
        </div>
        <div class="emoji emoji--cool-face">
          <img src="/emoji--cool-face.png">
        </div>
        <div class="emoji emoji--heart-face">
          <img src="/emoji--heart-face.png">
        </div>
        <div class="emoji emoji--happy-face">
          <img src="/emoji--happy-face.png">
        </div>
        <div class="emoji emoji--happy-star">
          <img src="/emoji--happy-star.png">
        </div>
        <div class="emoji emoji--satisfied-face">
          <img src="/emoji--satisfied-face.png">
        </div>
        <div class="emoji emoji--hearts-on-face">
          <img src="/emoji--hearts-on-face.png">
        </div>
        <div class="emoji emoji--smiling-face">
          <img src="/emoji--smiling-face.png">
        </div>
        <div class="emoji emoji--surprised-face">
          <img src="/emoji--surprised-face.png">
        </div>
        <div ref="hi" class="line-container line-container--hi">
          <p>Hi. Mein Name ist Dominic</p>
        </div>
        <div ref="home" class="line-container line-container--home">
          <p>und mein Zuhause ist das Frontend.</p>
        </div>
        <div ref="handshake" class="line-container line-container--handshake">
          <p>Dort wo Design und Code sich die Hand geben.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.intro {
  position: relative;
  background-color: transparent;
}

.intro-inner {
  position: inherit;
  block-size: 800svh;
}

.intro-content {
  position: inherit;
  block-size: 100svh;
}

.line-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.intro-word {
  --color-foreground: var(--color--soy-sauce);
  --color-background: var(--color--tamago);
}

.intro-line + .intro-line {
  margin-block-start: 1vw;
}

.emoji {
  position: absolute;
  width: var(--step-5);
  height: var(--step-5);
}

.emoji--star-face {
  right: 4%;
  top: 8%;
}

.emoji--cool-face {
  right: 4%;
  top: 80%;
}

.emoji--heart-face {
  right: 2%;
  top: 64%;
}

.emoji--happy-face {
  right: 2%;
  top: 44%;
}

.emoji--happy-star {
  right: 14%;
  top: 28%;
}

.emoji--satisfied-face {
  right: 24%;
  top: 48%;
}

.emoji--hearts-on-face {
  right: 32%;
  top: 66%;
}

.emoji--smiling-face {
  right: 52%;
  top: 84%;
}

.emoji--surprised-face {
  right: 24%;
  top: 82%;
}

.emoji img {
  width: 100%;
  height: 100%;
}
</style>
