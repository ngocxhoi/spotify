<template>
  <MainLayout>
    <div class="p-8">
      <button
        type="button"
        class="text-white text-2xl font-semibold hover:underline cursor-pointer"
      >
        {{ artist?.name }}
      </button>

      <div class="py-1.5" />

      <div class="flex items-center w-full relative h-full">
        <NuxtImg width="140" :src="artist?.albumCover" />
        <div class="w-full ml-5">
          <div
            class="text-[33px] text-white absolute hover:underline cursor-pointer top-0 font-semibold"
          >
            {{ artist?.name }}
          </div>

          <div class="text-gray-300 text-sm flex items-center">
            <div class="">Album</div>
            <Icon name="mdi:dot" size="30" />
            <div>{{ artist?.releaseYear }}</div>
            <Icon name="mdi:dot" size="30" />
            <div>{{ artist?.tracks.length }} songs</div>
          </div>

          <div
            class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5"
          >
            <button class="p-1 rounded-full bg-white">
              <Icon
                @click="playFunc()"
                :name="!isPlaying ? 'mdi:play' : 'mdi:pause'"
                color="#181818"
                size="25"
              />
            </button>
            <button>
              <Icon name="mdi:heart" color="#1bd760" size="30" />
            </button>
            <button>
              <Icon name="mdi:dots-vertical" color="#fff" size="25" />
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6" />
      <div class="flex items-center justify-between px-5 pt-2">
        <div class="flex items-center justify-between text-gray-400">
          <div class="mr-7">#</div>
          <div class="text-sm">Title</div>
        </div>
        <div>
          <Icon name="mdi:clock-time-three-outline" color="#fff" size="18" />
        </div>
      </div>
      <div class="border-b border-b-[#2a2a2a] mt-2" />
      <div class="mb-4" />

      <ul class="w-full">
        <li
          class="cursor-pointer"
          v-for="(track, index) in artist?.tracks"
          :key="track"
        >
          <SongRow :track="track" :artist="artist" :index="index + 1" />
        </li>
      </ul>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "~/layouts/MainLayout.vue";
const { $songStore } = useNuxtApp();
const { isPlaying, currentArtist, currentTrack } = storeToRefs($songStore);
const { data: artist } = await useAsyncData("artist", () =>
  queryContent("/artist").findOne()
);

const playFunc = () => {
  if (currentTrack.value) {
    $songStore.playOrPauseThisSong(currentArtist.value, currentTrack.value);
    return;
  } else {
    $songStore.playFromFirst();
    return;
  }

  $songStore.playOrPauseSong();
};
</script>

<style></style>
