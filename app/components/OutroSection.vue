<script setup lang="ts">
import { gsap } from 'gsap'

const outro = useTemplateRef('outro')
const outroinner = useTemplateRef('outro-inner')
let ctx: gsap.Context

const setupGsap = () => {
  if (!outro.value || !outroinner.value) return

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: outro.value,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    })
      .fromTo(outroinner.value,
        {
          ease: 'none',
          yPercent: -100,
        },
        {
          ease: 'none',
          yPercent: 0,
        })
  }, outro.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <footer ref="outro" class="outro layout-stack">
    <div ref="outro-inner" class="outro-inner layout-stack-block">
      <div class="layout-center">
        <NameLine as="h2" dir="up" />
      </div>
    </div>
  </footer>
</template>

<style>
.outro {
  background-color: var(--color-primary);
  position: relative;
  z-index: 1;
  block-size: 100svh;
}

.outro-inner {
  background-color: inherit;
  position: inherit;
  z-index: inherit;
  block-size: inherit;
  display: flex;
  flex-direction: column;
}

.outro-inner > div {
  margin-block-start: auto;
}
</style>
