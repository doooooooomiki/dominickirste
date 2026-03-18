<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { IconBluesky, IconCodepen, IconGithub, IconLinkedin, IconLocation } from '#components'

interface Props {
  type: 'github' | 'linkedin' | 'codepen' | 'bluesky' | 'location'
  foreground?: 'soy-sauce' | 'tamago' | 'shiro'
  background?: 'soy-sauce' | 'tamago' | 'shiro'
}

withDefaults(defineProps<Props>(), {
  foreground: 'soy-sauce',
  background: 'shiro',
})

const hrefs = new Map([
  ['bluesky', 'https://bsky.app/profile/doooooooomiki.bsky.social'],
  ['codepen', 'https://codepen.io/doooooooomiki'],
  ['github', 'https://github.com/doooooooomiki/dominickirste'],
  ['linkedin', 'https://de.linkedin.com/in/dominic-kirste'],
  ['location', 'https://maps.app.goo.gl/HJh6a8McgGt1JEPz8'],
])

const icons = new Map([
  ['bluesky', IconBluesky],
  ['codepen', IconCodepen],
  ['github', IconGithub],
  ['linkedin', IconLinkedin],
  ['location', IconLocation],
])

const foregrounds = new Map([
  ['soy-sauce', 'foreground--soy-sauce'],
  ['tamago', 'foreground--tamago'],
  ['shiro', 'foreground--shiro'],
])

const backgrounds = new Map([
  ['soy-sauce', 'background--soy-sauce'],
  ['tamago', 'background--tamago'],
  ['shiro', 'background--shiro'],
])

const texts = new Map([
  ['bluesky', 'bluesky'],
  ['codepen', 'codepen'],
  ['github', 'github'],
  ['linkedin', 'linkedin'],
  ['location', 'NUE, GER'],
])

const datetime = ref(Date.now())
useIntervalFn(() => {
  datetime.value = Date.now()
}, 1000)
</script>

<template>
  <a
    :href="hrefs.get(type)"
    target="_blank"
    class="pill pill--icon-link"
    :class="[foregrounds.get(foreground), backgrounds.get(background)]"
  >
    <div class="icon">
      <component :is="icons.get(type)" />
    </div>
    <div>
      {{ texts.get(type) }}
      <template v-if="type === 'location'">
        <NuxtTime
          :datetime="datetime"
          locale="de-DE"
          hour="numeric"
          minute="numeric"
          time-zone="Europe/Berlin"
        />
      </template>
    </div>
  </a>
</template>
