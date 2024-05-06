<template>
  <NuxtLink to="/library">
    <div
      v-if="randColor.color"
      :style="`background: ${randColor.color};`"
      class="contrast-[2] brightness-[0.87] rounded-xl relative overflow-hidden aspect-[1/1]"
    >
      <div class="text-white pt-3 pl-4 font-semibold text-2xl">
        {{ category }}
      </div>
      <NuxtImg
        :src="img || ''"
        class="absolute contrast-[0.55] -right-3.5 bottom-0 max-w-[100px] rotate-[20deg]"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import uniqolor from "uniqolor";

const props = defineProps(["category", "img"]);
const { category, img } = toRefs(props);

let randColor = ref(uniqolor.random());
</script>

<style></style>
