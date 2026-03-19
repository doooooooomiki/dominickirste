<template>
  <div class="layer layer--emojis layout-stack-block layer--emojis--hide">
    <div class="emoji emoji--star-face">
      <img src="/emoji--star-face.png">
    </div>
    <div class="emoji emoji--cool-face">
      <img src="/emoji--cool-face.png">
    </div>
    <div class="emoji emoji--heart-face">
      <img src="/emoji--heart-face.png">
    </div>
    <div class="emoji emoji--happy-face">
      <img src="/emoji--happy-face.png">
    </div>
    <div class="emoji emoji--happy-star">
      <img src="/emoji--happy-star.png">
    </div>
    <div class="emoji emoji--satisfied-face">
      <img src="/emoji--satisfied-face.png">
    </div>
    <div class="emoji emoji--hearts-on-face">
      <img src="/emoji--hearts-on-face.png">
    </div>
    <div class="emoji emoji--smiling-face">
      <img src="/emoji--smiling-face.png">
    </div>
    <div class="emoji emoji--surprised-face">
      <img src="/emoji--surprised-face.png">
    </div>
  </div>
</template>

<style>
.layer {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  overflow: hidden;
}

.layer--emojis {
  aspect-ratio: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  place-content: center;
  place-items: center;
  gap: 8px;
}

:root.matter-happend .layer--emojis {
  display: none;
}

.emoji {
  width: min(128px, 90%);
  aspect-ratio: 1;
}

.emoji--star-face {
  left: -8%;
  top: 8%;
}

.emoji--happy-star {
  left: 38%;
  top: 10%;
}

.emoji--cool-face {
  left: 79%;
  top: 9%;
}

.emoji--heart-face {
  left: -4%;
  top: 36%;
}

.emoji--happy-face {
  left: 39%;
  top: 39%;
}

.emoji--satisfied-face {
  left: 80%;
  top: 40%;
}

.emoji--smiling-face {
  left: -8%;
  top: 66%;
}

.emoji--hearts-on-face {
  left: 74%;
  top: 69%;
}

.emoji--surprised-face {
  left: 32%;
  top: 66%;
}

.emoji img {
  width: 100%;
  height: 100%;
}
</style>
