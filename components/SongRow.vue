<template>
  <div
    class="group flex items-center justify-between rounded-md hover:bg-[#2a2929]"
  >
    <div class="flex items-center w-full py-1.5">
      <div
        :class="{ '!block': isPlaying && currentTrack.id == track.id }"
        class="group-hover:block hidden w-[40px] ml-[14px] mr-[6px] cursor-pointer overflow-hidden"
      >
        <Icon
          v-if="!isPlaying"
          @click="$songStore.playOrPauseThisSong(artist, track)"
          name="mdi:play"
          color="#fff"
          size="25"
        />
        <Icon
          v-else-if="isPlaying && currentTrack?.name != track.name"
          @click="$songStore.loadSong(artist, track)"
          name="mdi:play"
          color="#fff"
          size="25"
        />
        <Icon
          v-else
          @click="$songStore.playOrPauseSong()"
          name="mdi:pause"
          color="#1bd760"
          size="25"
        />
      </div>

      <div
        :class="{ '!hidden': isPlaying && currentTrack.id == track.id }"
        class="group-hover:hidden text-white font-semibold w-[40px] ml-5"
      >
        <span>
          {{ index }}
        </span>
      </div>

      <div>
        <div
          class="font-semibold"
          :class="
            currentTrack && currentTrack.id == track.id
              ? 'text-[#1bd760]'
              : 'text-white'
          "
        >
          {{ track?.name }}
        </div>
        <div
          class="text-sm font-semibold text-gray-400 hover:underline hover:text-white"
        >
          {{ artist?.name }}
        </div>
      </div>
    </div>

    <div class="flex items-center">
      <button class="group-hover:block hidden">
        <Icon name="mdi:heart-outline" color="#1bd760" size="22" />
      </button>
      <div class="text-xs mx-5 text-gray-400">
        {{ isTrashTime ?? "00:00" }}
      </div>
    </div>
  </div>
  <!-- <audio controls>
    <source ref="audio" :src="track?.path" type="audio/mp3" />
  </audio> -->
</template>

<script setup>
const props = defineProps(["artist", "index", "track"]);
const { artist, index, track } = toRefs(props);
const { $songStore } = useNuxtApp();
const { isPlaying, currentTrack } = storeToRefs($songStore);

let isTrashTime = ref();
const audio = ref();

onMounted(() => {
  audio.value = new Audio(track?.value.path);
  audio.value.addEventListener("loadeddata", () => {
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrashTime.value = minutes + ":" + seconds.toString().padStart(2, "0");
  });
});
</script>

<style></style>
