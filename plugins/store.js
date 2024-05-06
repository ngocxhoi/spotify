import { useSongStore } from "~/stores/songs";

export default defineNuxtPlugin(async (NuxtApp) => {
  return {
    provide: {
      // userStore: useUserStore(),
      // profileStore: useProfileStore(),
      // generalStore: useGeneralStore(),
      songStore: useSongStore(),
    },
  };
});
