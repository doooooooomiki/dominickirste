<template>
  <div class="og-border h-full w-full flex items-start justify-start border-solid border-[12px] bg-gray-50">
    <div class="flex items-start justify-start h-full w-full">
      <div class="flex flex-col justify-between w-full h-full relative">
        <img src="/dominickirste.jpg" class="og-img">
        <h1 class="og-h1 text-[80px] px-20 font-black text-left">
          Dominic Kirste
        </h1>
        <p class="og-p text-2xl pb-10 px-20 font-bold mb-0">
          dominickirste.dev
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.og-border {
  border-color: #fcf237;
}

.og-h1 {
  color: #fcf237;
  margin-block-start: auto;
}

.og-p {
  color: #fcf237;
}

.og-img {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
  object-position: top;
}
</style>
