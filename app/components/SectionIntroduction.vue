<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const inner = useTemplateRef('introduction-inner')
const content = useTemplateRef('introduction-content')
const hi = useTemplateRef('hi')
const home = useTemplateRef('home')
const handshake = useTemplateRef('handshake')
let ctx: gsap.Context

const setupGsap = () => {
  if (!inner.value || !content.value || !hi.value || !home.value || !handshake.value) return

  const splitConfig: SplitText.Vars = {
    type: 'words, lines',
    wordsClass: 'introduction-word pill',
    linesClass: 'introduction-line',
  }

  const splitHi = SplitText.create(hi.value, splitConfig)
  const splitHome = SplitText.create(home.value, splitConfig)
  const splitShakehands = SplitText.create(handshake.value, splitConfig)

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: inner.value,
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
  }, inner.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <section class="introduction">
    <div ref="introduction-inner" class="introduction-inner layout-center">
      <div ref="introduction-content" class="introduction-content layout-stack-block">
        <LayerEmojis />
        <div ref="hi" class="introduction-line-container introduction-line-container--hi">
          <p>Hi. <br> Mein Name ist Dominic</p>
        </div>
        <div ref="home" class="introduction-line-container introduction-line-container--home">
          <p>und mein Zuhause ist das Frontend.</p>
        </div>
        <div ref="handshake" class="introduction-line-container introduction-line-container--handshake">
          <p>Wo Design und Code sich die Hand geben.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.introduction {
  position: relative;
  background-color: transparent;
}

.introduction-inner {
  position: inherit;
  block-size: 800vh;
}

.introduction-content {
  position: inherit;
  block-size: 100vh;
}

.introduction-line-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.introduction-line > p {
  display: inline-flex;
  gap: 8px;
}

.introduction-word {
  --color-foreground: var(--color--soy-sauce);
  --color-background: var(--color--tamago);
}
</style>
