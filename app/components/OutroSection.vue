<script setup lang="ts">
import { gsap } from 'gsap'
import Matter from 'matter-js'
import { useResizeObserver, useElementBounding } from '@vueuse/core'

const outro = useTemplateRef('outro')
const outroinner = useTemplateRef('outro-inner')
const mattercontainer = useTemplateRef('matter-container')

const { width, height } = useElementBounding(mattercontainer)

let ctx: gsap.Context

let engine: Matter.Engine
let render: Matter.Render
let runner: Matter.Runner
let ground: Matter.Body
let wallLeft: Matter.Body
let wallRight: Matter.Body

const setupMatter = () => {
  if (!mattercontainer.value) return
  const Engine = Matter.Engine
  const Render = Matter.Render
  const Runner = Matter.Runner
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite

  engine = Engine.create()

  render = Render.create({
    element: mattercontainer.value,
    engine: engine,
    options: {
      wireframes: false,
      background: 'transparent',
      width: width.value,
      height: height.value,
      pixelRatio: window.devicePixelRatio,
    },
  })

  ground = Bodies.rectangle(width.value * 0.5, height.value, 10_000, 16, {
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
  })

  wallLeft = Bodies.rectangle(0, height.value * 0.5, 16, height.value, {
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
  })

  wallRight = Bodies.rectangle(width.value, height.value * 0.5, 16, height.value, {
    isStatic: true,
    render: {
      fillStyle: 'transparent',
    },
  })

  const randomX = gsap.utils.random(200, width.value - 200, 4, true)
  const randomY = gsap.utils.random(-240, -24, 2, true)

  const options = {
    friction: 0.001, restitution: 0.5, density: 0.004,

  }

  const emojiCoolFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--cool-face.png',
      },
    },
  })

  const emojiHappyFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--happy-face.png',
      },
    },
  })

  const emojiHappyStar = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--happy-star.png',
      },
    },
  })

  const emojiHeartFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--heart-face.png',
      },
    },
  })

  const emojiHeartsOnFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--hearts-on-face.png',
      },
    },
  })

  const emojiSatisfiedFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--satisfied-face.png',
      },
    },
  })

  const emojiSmilingFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--smiling-face.png',
      },
    },
  })

  const emojiStarFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--star-face.png',
      },
    },
  })

  const emojiSurprisedFace = Bodies.circle(randomX(), randomY(), 64, {
    ...options,
    render: {
      sprite: {
        xScale: 120 / 512,
        yScale: 120 / 512,
        texture: '/emoji--surprised-face.png',
      },
    },
  })

  Composite.add(engine.world, [
    ground,
    wallLeft,
    wallRight,
    emojiCoolFace,
    emojiHappyFace,
    emojiHappyStar,
    emojiHeartFace,
    emojiHeartsOnFace,
    emojiSatisfiedFace,
    emojiSmilingFace,
    emojiStarFace,
    emojiSurprisedFace,
  ])

  Render.run(render)

  runner = Runner.create()

  Runner.run(runner, engine)
}

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
          onComplete: () => setupMatter(),
        })
  }, outro.value)
}

useResizeObserver(mattercontainer, () => {
  if (!mattercontainer.value || !render) return
  render.canvas.width = width.value
  render.canvas.height = height.value
  Matter.Body.setPosition(ground, { x: width.value * 0.5, y: height.value })
  Matter.Body.setPosition(wallLeft, { x: 0, y: height.value * 0.5 })
  Matter.Body.setPosition(wallRight, { x: width.value, y: height.value * 0.5 })
})

onMounted(() => setupGsap())

onUnmounted(() => ctx.revert())
</script>

<template>
  <footer ref="outro" class="outro layout-stack">
    <div ref="outro-inner" class="outro-inner layout-stack-block">
      <div ref="matter-container" class="matter-container layout-center" />
      <div class="outro-content layout-center layout-cover">
        <NameLine
          as="h2"
          dir="up"
          color="soy-sauce"
          background="tamago"
        />
      </div>
    </div>
  </footer>
</template>

<style>
.outro {
  background-color: var(--color--tamago);
  position: relative;
  z-index: 1;
  block-size: 100svh;
}

.matter-container {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
}

.outro-inner {
  background-color: inherit;
  position: inherit;
  block-size: inherit;
  display: flex;
  flex-direction: column;
}

.outro-content {
  position: relative;
  padding-block: unset;
  height: 100%;
}
</style>
