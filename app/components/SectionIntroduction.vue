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
        <LayerEmojis />
        <div ref="hi" class="line-container line-container--hi">
          <p>Hi. <br> Mein Name ist Dominic</p>
        </div>
        <div ref="home" class="line-container line-container--home">
          <p>und mein Zuhause ist das Frontend.</p>
        </div>
        <div ref="handshake" class="line-container line-container--handshake">
          <p>Wo Design und Code sich die Hand geben.</p>
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
  block-size: 800vh;
}

.intro-content {
  position: inherit;
  block-size: 100vh;
}

.line-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.intro-line > p {
  display: inline-flex;
  gap: 8px;
}

.intro-word {
  --color-foreground: var(--color--soy-sauce);
  --color-background: var(--color--tamago);
}
</style>
