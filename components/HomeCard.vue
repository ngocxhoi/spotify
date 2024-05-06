<template>
  <NuxtLink to="/library">
    <UCard :ui="{ background: 'bg-[#111111] hover:bg-[#252525]', ring: '' }">
      <NuxtImg loading="lazy" :src="img" alt="" class="rounded-md" />
      <div class="text-white pt-4 font-semibold text-base">{{ title }}</div>
      <div class="text-gray-400 pt-1 pb-3 text-sm">{{ subtitle }}</div>
    </UCard>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps(["img", "title", "subtitle"]);
const { img, title, subtitle } = toRefs(props);
</script>

<style></style>
