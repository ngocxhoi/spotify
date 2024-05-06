<template>
  <div>
    <div
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
    >
      <div class="flex items ml-6">
        <button class="rounded-full bg-black p-[1px] cursor-pointer">
          <Icon name="mdi:chevron-left" color="white" size="30" />
        </button>
        <button class="rounded-full bg-black p-[1px] ml-4 cursor-pointer">
          <Icon name="mdi:chevron-right" color="white" size="30" />
        </button>
      </div>

      <UDropdown
        mode="hover"
        :items="avatarDropdown"
        :popper="{ placement: 'bottom-end', offsetDistance: 0 }"
        :ui="{
          background: 'bg-[#282828]',
          ring: '',
          item: {
            padding: 'px-3 py-2.5',
            inactive: 'text-gray-200 font-semibold',
            active: 'text-gray-200 bg-[#3e3d3d] font-semibold',
          },
        }"
        class="group"
      >
        <button
          class="group-hover:bg-[#282828] bg-black hover:bg-[#282828] rounded-full p-0.5 mt-0.5 mr-8 cursor-pointer"
        >
          <div class="flex items-center">
            <UAvatar alt="Avatar" src="https://picsum.photos/id/40/500/520" />
            <div class="text-white text-14px ml-1.5 font-semibold">
              Nam here
            </div>
            <Icon name="mdi:chevron-down" color="#fffe" size="25" />
          </div>
        </button>
      </UDropdown>
    </div>
    <div id="SideNav" class="h-full p-6 w-[240px] fixed z-50 bg-black">
      <NuxtLink to="/">
        <img src="/images/icons/spotify-logo.png" width="125" alt="" />
      </NuxtLink>

      <div class="my-8" />

      <ul>
        <li>
          <NuxtLink to="/">
            <MenuItem
              class="ml-[1px]"
              :iconSize="23"
              name="Home"
              iconString="home"
              pageUrl="/"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/search">
            <MenuItem
              class="ml-[1px]"
              :iconSize="23"
              name="Search"
              iconString="search"
              pageUrl="/search"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/library">
            <MenuItem
              class="ml-[2px]"
              :iconSize="23"
              name="Library"
              iconString="library"
              pageUrl="/library"
            />
          </NuxtLink>
        </li>
        <div class="py-3.5" />
        <li>
          <NuxtLink to="/">
            <MenuItem
              class="ml-[1px]"
              :iconSize="24"
              name="Create Playlist"
              iconString="playlist"
              pageUrl="/playlist"
            />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <MenuItem
              class="ml-[1px]"
              :iconSize="27"
              name="Liked Songs"
              iconString="liked"
              pageUrl="/liked"
            />
          </NuxtLink>
        </li>
      </ul>

      <div class="border-b border-b-gray-700" />

      <ul>
        <li class="font-semibold text-sm mt-3 text-gray-300 hover:text-white">
          My Playlist #1
        </li>
        <li class="font-semibold text-sm mt-3 text-gray-300 hover:text-white">
          My Playlist #2
        </li>
        <li class="font-semibold text-sm mt-3 text-gray-300 hover:text-white">
          My Playlist #3
        </li>
        <li class="font-semibold text-sm mt-3 text-gray-300 hover:text-white">
          My Playlist #4
        </li>
      </ul>
    </div>
  </div>

  <div
    class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1c1c1c] to-black"
  >
    <div class="mt-[70px]"></div>

    <slot />
    <div class="mb-[100px]"></div>
  </div>
  <div />

  <MusicPlayer v-if="currentTrack != null" />
</template>

<script setup lang="ts">
const { $songStore } = useNuxtApp();
const { currentTrack, isPlaying } = storeToRefs($songStore);

onMounted(() => {
  isPlaying.value = false;
});

let openMenu = ref(false);
let avatarDropdown = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://picsum.photos/id/40/500/520",
      },
    },
    {
      label: "Logout",
      icon: "i-heroicons-arrow-right-start-on-rectangle",
    },
  ],
];
</script>

<style></style>
