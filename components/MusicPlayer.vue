<template>
  <div
    id="MusicPlayer"
    v-if="audio"
    class="fixed flex justify-between items-center bottom-0 w-full z-50 h-[90px] bg-[#181818] border-b border-b-[#272727]"
  >
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <NuxtImg
          :src="currentArtist.albumCover"
          width="55"
          class="rounded-sm shadow-2xl"
        />
        <div class="ml-4">
          <div class="text-sm text-white hover:underline cursor-pointer">
            {{ currentTrack.name }}
          </div>
          <div
            class="text-xs text-gray-400 hover:text-white hover:underline cursor-pointer"
          >
            {{ currentTrack.name }}
          </div>
        </div>
      </div>

      <div class="flex items-center ml-8">
        <Icon name="mdi:heart" size="20" color="#1bd760" />
        <Icon
          name="mdi:picture-in-picture-bottom-right-outline"
          size="18"
          color="#fff"
          class="ml-4"
        />
      </div>
    </div>

    <div class="max-w-[35%] mx-auto w-1/2 mb-3">
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center h-[30px]">
          <button class="mx-2">
            <Icon
              name="mdi:skip-backward"
              color="#fff"
              size="25"
              @click="$songStore.prevSong(currentTrack)"
            />
          </button>
          <button
            class="p-1 rounded-full mx-3 bg-white"
            @click="$songStore.playOrPauseThisSong(currentArtist, currentTrack)"
          >
            <Icon
              :name="!isPlaying ? 'mdi:play' : 'mdi:pause'"
              color="#181818"
              size="25"
            />
          </button>
          <button class="mx-2">
            <Icon
              name="mdi:skip-forward"
              color="#fff"
              size="25"
              @click="$songStore.nextSong(currentTrack)"
            />
          </button>
        </div>
      </div>

      <div class="flex items-center h-[25px]">
        <div class="text-white text-sm pr-2 pt-[11px]">
          {{ isTrackTimeCurrent ?? "0:00" }}
        </div>
        <div
          @mouseenter="isHover = true"
          @mouseleave="isHover = false"
          ref="seekerContainer"
          class="w-full relative mt-2 mb-3"
        >
          <input
            ref="seeker"
            type="range"
            min="0"
            max="100"
            v-model="range"
            class="absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
            :class="{ rangeDotHidden: !isHover }"
          />
          <div
            :style="`width: ${range}%`"
            :class="isHover ? 'bg-green-500' : 'bg-white'"
            class="pointer-events-none mt-1.5 absolute h-1 z-10 inset-y-0 left-0 w-0"
          />
          <div
            class="absolute h-1 z-0 mt-1.5 inset-y-0 left-0 w-full bg-gray-500 rounded-full"
          />
        </div>
        <div class="text-white text-sm pl-2 pt-[11px]">
          {{ isTrackTimeTotal ?? "0:00" }}
        </div>
      </div>
    </div>

    <div class="flex items-center w-1/4 justify-end pr-10">
      <MusicPlayerVolume />
    </div>
  </div>
</template>

<script setup>
const { $songStore } = useNuxtApp();
const { isPlaying, audio, currentTrack, currentArtist } =
  storeToRefs($songStore);

let isHover = ref(false);
let isTrackTimeCurrent = ref();
let isTrackTimeTotal = ref();
let seeker = ref();
let seekerContainer = ref();
let range = ref(0);

onMounted(() => {
  if (currentTrack.value) {
    seeker.value.addEventListener("change", function () {
      const time = audio.value.duration * (seeker.value.value / 100);
      audio.value.currentTime = time;
    });

    seeker.value.addEventListener("mousedown", function () {
      audio.value.pause();
      isPlaying.value = false;
    });

    seeker.value.addEventListener("mouseup", function () {
      audio.value.play();
      isPlaying.value = true;
    });

    seekerContainer.value.addEventListener("click", function (e) {
      const clickPosition =
        (e.pageX - seekerContainer.value.offsetLeft) /
        seekerContainer.value.offsetWidth;
      const time = audio.value.duration * clickPosition;
      audio.value.currentTime = time;
      seeker.value.value =
        (100 / audio.value.duration) * audio.value.currentTime;
    });
  }
});

const timeupdate = () => {
  audio.value.addEventListener("timeupdate", function () {
    var minutes = Math.floor(audio.value.currentTime / 60);
    var seconds = Math.floor(audio.value.currentTime - minutes * 60);
    isTrackTimeCurrent.value =
      minutes + ":" + seconds.toString().padStart(2, "0");
    const value = (100 / audio.value.duration) * audio.value.currentTime;
    range.value = value;
    seeker.value.value = value;
  });
};

const loadedmetadata = () => {
  audio.value.addEventListener("loadedmetadata", function () {
    const duration = audio.value.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    isTrackTimeTotal.value =
      minutes + ":" + seconds.toString().padStart(2, "0");
  });
};

watch(
  () => audio.value,
  () => {
    timeupdate();
    loadedmetadata();
  }
);

watch(
  () => isTrackTimeCurrent.value,
  (time) => {
    if (time && time == isTrackTimeTotal.value) {
      $songStore.nextSong(currentTrack.value);
    }
  }
);
</script>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
