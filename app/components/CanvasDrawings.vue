<script setup lang="ts">
import { gsap } from 'gsap'
import Two from 'two.js'
import Matter from 'matter-js'
import { useResizeObserver, useRafFn, watchOnce } from '@vueuse/core'

const props = defineProps<{
  firstWave: boolean
  secondWave: boolean
  thirdWave: boolean
  isSleepingGroundWavesAreMeantToBeSurfed: boolean
}>()

const containerTwo = useTemplateRef('canvas-container--two')
const containerMatter = useTemplateRef('canvas-container--matter')

watchOnce(() => props.firstWave, () => {
  Matter.Composite.allBodies(engine.world)
    .filter((body) => body.label === 'first-wave')
    .forEach((body) => body.isSleeping = false)
})

watchOnce(() => props.secondWave, () => {
  Matter.Composite.allBodies(engine.world)
    .filter((body) => body.label === 'second-wave')
    .forEach((body) => body.isSleeping = false)
})

watchOnce(() => props.thirdWave, () => {
  Matter.Composite.allBodies(engine.world)
    .filter((body) => body.label === 'third-wave')
    .forEach((body) => body.isSleeping = false)
})

watchOnce(() => props.isSleepingGroundWavesAreMeantToBeSurfed, () => {
  Matter.Composite.allBodies(engine.world)
    .filter((body) => body.label === 'ground-waves-are-meant-to-be-surfed')
    .forEach((body) => {
      Matter.Composite.remove(engine.world, body)
    })
})

let two: Two
let engine: Matter.Engine
// let render: Matter.Render
let groundWavesAreMeantToBeSurfed: Matter.Body
let groundFooter: Matter.Body

const twoMatter = new Map<object, Matter.Body>()

const setup = () => {
  if (!containerMatter.value) return
  if (!containerTwo.value) return

  two = new Two({
    type: Two.Types.canvas,
    fitted: true,
  }).appendTo(containerTwo.value)

  engine = Matter.Engine.create({ gravity: { y: 1.41 } })
  engine.positionIterations = 12 // default 6
  engine.velocityIterations = 9 // default 4
  engine.timing.timeScale = 1

  const groundIntroElRect = document.querySelector('.introduction-content')?.getBoundingClientRect()
  const groundWavesAreMeantToBeSurfedElRect = document.querySelector('.techstack-headline')?.getBoundingClientRect()
  const groundFooterElRect = document.querySelector('.outro-content .nameline')?.getBoundingClientRect()

  if (!groundIntroElRect || !groundWavesAreMeantToBeSurfedElRect || !groundFooterElRect) return

  const thickness = 256

  groundWavesAreMeantToBeSurfed = Matter.Bodies.rectangle(groundWavesAreMeantToBeSurfedElRect.width / 2, groundWavesAreMeantToBeSurfedElRect.top + thickness / 2, 1000000, thickness, { isStatic: true, label: 'ground-waves-are-meant-to-be-surfed' })
  groundFooter = Matter.Bodies.rectangle(groundFooterElRect.width / 2, groundFooterElRect.bottom + thickness / 2, 1000000, thickness, { isStatic: true, label: 'ground-footer' })

  const left = Matter.Bodies.rectangle(0 - thickness / 2, containerMatter.value.clientHeight / 2, thickness, document.body.clientHeight, { isStatic: true })
  const right = Matter.Bodies.rectangle(containerMatter.value.clientWidth + thickness / 2, containerMatter.value.clientHeight / 2, thickness, document.body.clientHeight, { isStatic: true })

  Matter.Composite.add(engine.world, [groundWavesAreMeantToBeSurfed, groundFooter, left, right])

  const randomX = gsap.utils.random(128, containerTwo.value.clientWidth - 128, 4, true)
  const randomY = gsap.utils.random(-containerTwo.value.clientHeight, -128, 2, true)
  const options = {
    density: 0.04,
    frictionAir: 0.02,
    // restitution: 0.4,
    // friction: 0.004,
    frictionStatic: 0.4,
    isSleeping: true,

    restitution: 0.004,
    friction: 0.94,
    // slop: 0,
    // frictionStatic: 1,

  }

  const waving = two.makeImage('/emoji--waving-hand.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    waving,
    Matter.Bodies.circle(waving.position.x, waving.position.y, 40, { ...options, density: 0.04, frictionAir: 0.024, label: 'first-wave' }),
  )

  const victory = two.makeImage('/emoji--victory-hand.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    victory,
    Matter.Bodies.circle(victory.position.x, victory.position.y, 40, { ...options, density: 0.05, frictionAir: 0.023, label: 'first-wave' }),
  )

  const cowboy = two.makeImage('/emoji--cowboy-hat-face.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    cowboy,
    Matter.Bodies.circle(cowboy.position.x, cowboy.position.y, 40, { ...options, density: 0.0055, frictionAir: 0.024, label: 'first-wave' }),
  )

  const sparkles = two.makeImage('/emoji--sparkles.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    sparkles,
    Matter.Bodies.circle(sparkles.position.x, sparkles.position.y, 40, { ...options, density: 0.01, frictionAir: 0.021, label: 'first-wave' }),
  )

  const home = two.makeImage('/emoji--house-with-garden.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    home,
    Matter.Bodies.circle(home.position.x, home.position.y, 40, { ...options, density: 0.0155, frictionAir: 0.018, label: 'second-wave' }),
  )

  const disk = two.makeImage('/emoji--computer-disk.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    disk,
    Matter.Bodies.circle(disk.position.x, disk.position.y, 40, { ...options, density: 0.0075, frictionAir: 0.012, label: 'second-wave' }),
  )

  const globe = two.makeImage('/emoji--globe-with-meridians.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    globe,
    Matter.Bodies.circle(globe.position.x, globe.position.y, 40, { ...options, density: 0.0255, frictionAir: 0.021, label: 'second-wave' }),
  )

  const link = two.makeImage('/emoji--link.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    link,
    Matter.Bodies.circle(link.position.x, link.position.y, 40, { ...options, density: 0.0035, frictionAir: 0.022, label: 'second-wave' }),
  )

  const handshake = two.makeImage('/emoji--handshake.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    handshake,
    Matter.Bodies.circle(handshake.position.x, handshake.position.y, 40, { ...options, frictionAir: 0.0238, label: 'third-wave' }),
  )

  const struck = two.makeImage('/emoji--star-struck.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    struck,
    Matter.Bodies.circle(struck.position.x, struck.position.y, 40, { ...options, frictionAir: 0.03, label: 'third-wave' }),
  )

  const hearteyes = two.makeImage('/emoji--smiling-face-with-heart-eyes.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    hearteyes,
    Matter.Bodies.circle(hearteyes.position.x, hearteyes.position.y, 40, { ...options, density: 0.0235, frictionAir: 0.03, label: 'third-wave' }),
  )

  const sunglasses = two.makeImage('/emoji--smiling-face-with-sunglasses.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    sunglasses,
    Matter.Bodies.circle(sunglasses.position.x, sunglasses.position.y, 40, { ...options, frictionAir: 0.028, label: 'third-wave' }),
  )

  const technologist = two.makeImage('/emoji--technologist.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    technologist,
    Matter.Bodies.circle(technologist.position.x, technologist.position.y, 40, { ...options, frictionAir: 0.022, label: 'third-wave' }),
  )

  const palette = two.makeImage('/emoji--artist-palette.png', randomX(), randomY(), 128, 128, 'fit')
  twoMatter.set(
    palette,
    Matter.Bodies.circle(palette.position.x, palette.position.y, 40, { ...options, frictionAir: 0.0244, label: 'third-wave' }),
  )

  twoMatter.forEach((body) => Matter.Composite.add(engine.world, body))

  // render = Matter.Render.create({
  //   element: containerMatter.value,
  //   engine: engine,
  //   options: {
  //     background: 'transparent',
  //     width: containerMatter.value.clientWidth,
  //     height: containerMatter.value.clientHeight,
  //     pixelRatio: window.devicePixelRatio,
  //   },
  // })

  // Matter.Render.run(render)
}

useRafFn(() => {
  const groundWavesAreMeantToBeSurfedElRect = document.querySelector('.techstack-headline')?.getBoundingClientRect()
  const groundFooterElRect = document.querySelector('.outro-content .nameline')?.getBoundingClientRect()

  const thickness = 256

  if (!groundWavesAreMeantToBeSurfedElRect || !groundFooterElRect) return

  Matter.Body.setPosition(groundWavesAreMeantToBeSurfed, { x: groundWavesAreMeantToBeSurfedElRect.width / 2, y: groundWavesAreMeantToBeSurfedElRect.top + thickness / 2 })
  Matter.Body.setPosition(groundFooter, { x: groundFooterElRect.width / 2, y: groundFooterElRect.bottom + thickness / 2 })

  two.scene.children.forEach((child) => {
    const body = twoMatter.get(child)
    if (!body) return

    child.translation.x = body.position.x
    child.translation.y = body.position.y
    child.rotation = body.angle
  })

  Matter.Engine.update(engine)
  two.update()
})

useResizeObserver(containerTwo, () => {
  two.renderer.setSize(containerTwo.value!.clientWidth, containerTwo.value!.clientHeight)
})

onMounted(() => setup())
</script>

<template>
  <div ref="canvas-container--matter" class="canvas-container canvas-container--matter" />
  <div ref="canvas-container--two" class="canvas-container canvas-container--two" />
</template>

<style>
.canvas-container {
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
}
</style>
