<script setup lang="ts">
import Two from 'two.js'
import { useResizeObserver } from '@vueuse/core'

const stage = useTemplateRef('introduction-stage')
let two: Two

const setupTwo = () => {
  if (!stage.value) return
  two = new Two({
    type: Two.Types.canvas,
    fitted: true,
    autostart: true,
  }).appendTo(stage.value)

  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2, two.height / 3 / 2, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3, two.height / 3 / 2, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3 * 2, two.height / 3 / 2, 96, 96, 'fit')

  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2, two.height / 3 / 2 + two.height / 3, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3, two.height / 3 / 2 + two.height / 3, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3 * 2, two.height / 3 / 2 + two.height / 3, 96, 96, 'fit')

  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2, two.height / 3 / 2 + two.height / 3 * 2, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3, two.height / 3 / 2 + two.height / 3 * 2, 96, 96, 'fit')
  two.makeImage('/emoji--cool-face.png', two.width / 3 / 2 + two.width / 3 * 2, two.height / 3 / 2 + two.height / 3 * 2, 96, 96, 'fit')
}

useResizeObserver(stage, () => {
  two.renderer.setSize(stage.value!.clientWidth, stage.value!.clientHeight)
})

onMounted(() => setupTwo())
</script>

<template>
  <div ref="introduction-stage" class="introduction-stage" />
</template>

<style>
.introduction-stage {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
}
</style>
