<script setup lang="ts">
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const section = useTemplateRef<Element>('section')
const surname = useTemplateRef('surname')
const familyname = useTemplateRef('familyname')
const trademark = useTemplateRef('trademark')
let ctx: gsap.Context

onMounted(() => {
  if (!section.value || !surname.value || !familyname.value || !trademark.value) return

  ctx = gsap.context(() => {
    const splitSurname = SplitText.create(surname.value, { type: 'chars' })
    const splitFamilyname = SplitText.create(familyname.value, { type: 'chars' })

    gsap.timeline()
      .from(splitSurname.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.12,
      }, 0.4)
      .from(splitFamilyname.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.12,
      }, '<0.2')
      .from(trademark.value, {
        y: -20,
        autoAlpha: 0,
      }, '>0.2')
  }, section.value)
})

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <section
    ref="section"
    class="hero"
  >
    <NuxtImg
      class="hero-image"
      src="/dominickirste.jpg"
      sizes="sm:800px md:1600px lg:3200px"
      :placeholder="[50, 25, 75, 5]"
      quality="100"
    />
    <div class="hero-content">
      <h1 class="title prose-h1">
        <img
          ref="trademark"
          class="trademark prose-trademark"
          src="/trademark.svg"
        >
        <div ref="surname">
          Dominic
        </div>
        <div ref="familyname">
          Kirste
        </div>
      </h1>
      <ul class="links">
        <li>
          <NuxtLink
            class="link"
            to="https://github.com/doooooooomiki"
            target="_blank"
          >github</NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="link"
            to="https://bsky.app/profile/doooooooomiki.bsky.social"
            target="_blank"
          >bluesky</NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="link"
            to="https://www.linkedin.com/in/dominic-kirste"
            target="_blank"
          >linkedin</NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.prose-h1 {
  --prose: 4rem;
  @media (width >= 40rem) { --prose: 8rem; }
  @media (width >= 64rem) { --prose: 12rem; }
  @media (width >= 80rem) { --prose: 16rem; }
}

.prose-trademark {
  --prose: 2rem;
  @media (width >= 40rem) { --prose: 4rem; }
  @media (width >= 64rem) { --prose: 8rem; }
}

.hero {
  display: grid;
  grid-template-areas: 'hero';

  & .hero-image {
    grid-area: hero;
    width: 100%;
    height: 100dvh;
    object-fit: cover;
  }

  & .hero-content {
    grid-area: hero;
    padding: 2rem;
    padding-bottom: 4rem;
    display: grid;
  }

  & .title {
    text-transform: uppercase;
    color: var(--color-primary);
    font-size: var(--prose);
    font-weight: 900;
    margin: unset;
    line-height: 0.8;
    display: flex;
    flex-direction: column;
    align-items: end;
    place-self: end;
  }

  & .trademark {
    width: var(--prose);
    height: var(--prose);
  }

  & .links {
    order: -1;
    margin: unset;
    padding: unset;
    list-style-type: none;
    place-self: start;
    font-size: 2rem;

    & .link {
      color: var(--color-primary);
    }
  }
}
</style>
