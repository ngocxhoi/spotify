<template>
  <div class="flex items-center">
    <Icon v-if="vol == 0" name="mdi:volume-mute" color="#fff" size="20" />
    <Icon v-else name="mdi:volume-high" color="#fff" size="20" />
    <div
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      class="flex items-center ml-2 w-[150px] relative mb-[23px]"
    >
      <input
        ref="volume"
        type="range"
        min="0"
        max="100"
        v-model="vol"
        class="mt-7 absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
        :class="{ rangeDotHidden: !isHover }"
      />
      <div
        :style="`width: ${vol}%`"
        :class="isHover ? 'bg-green-500' : 'bg-white'"
        class="pointer-events-none mt-2 absolute h-1 z-10 inset-y-0 left-0 w-0"
      />
      <div
        class="absolute h-1 z-0 mt-2 inset-y-0 left-0 w-full bg-gray-500 rounded-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $songStore } = useNuxtApp();
const { audio } = storeToRefs($songStore);

let isHover = ref(false);
let vol = ref(80);
let volume = ref();

onMounted(() => {
  volume.value.addEventListener("input", (e) => {
    audio.value.volume = e.currentTarget.value / 100;
  });
});
</script>

<style></style>
