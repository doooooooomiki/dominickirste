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
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        once: true,
      },
    })
  }, outro.value)
}

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <footer ref="outro" class="outro layout-stack">
    <div ref="outro-inner" class="outro-inner layout-stack-block">
      <div class="outro-content layout-center layout-cover">
        <NameLine
          as="h2"
          dir="up"
          color="shiro"
          background="soy-sauce"
        />
      </div>
    </div>
  </footer>
</template>

<style>
.outro {
  position: relative;
  block-size: 100vh;
}

.outro-inner {
  position: inherit;
  block-size: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.outro-content {
  position: relative;
  padding-block: unset;
  height: 100%;
}
</style>
