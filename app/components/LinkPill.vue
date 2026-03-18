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
  <div
    class="linkpill"
    :class="[foregrounds.get(foreground), backgrounds.get(background)]"
  >
    <a :href="hrefs.get(type)" target="_blank" class="linkpill-link">
      <div class="linkpills-content">
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
      </div>
    </a>
  </div>
</template>

<style>
.linkpill {
  font-size: var(--step--2);
}

.linkpill-link {
  color: var(--color-foreground, var(--color--soy-sauce));
  background-color: var(--color-background, var(--color--shiro));
  display: inline-block;
  border: 4px solid var(--color-foreground, var(--color--soy-sauce));
  border-radius: 24px;
  padding: 8px;
}

.linkpills-content {
  display: flex;
  align-items: center;
  gap: 0.2ch;
}

.icon {
  width: 32px;
  height: 32px;
}
</style>
