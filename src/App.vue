<template>
  <v-app app>
    <v-container class="mb-container">
      <div class="bg-background position-fixed px-10 pt-10 header-container">
        <AppHeader/>
      </div>
    </v-container>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { RouterView } from 'vue-router';

const MovieStore = useMovieStore();

onMounted(async () => {
  await MovieStore.fetchMovie();
  MovieStore.filterAllMovies();
});
</script>

<style scoped>
.header-container {
  width:100%;
  z-index: 1000;
  left: 0;
  top: 0;
}

.mb-container {
  margin-bottom: 15px;
}

@media (max-width: 600px) {
  .mb-container {
    margin-bottom: 80px;
  }
}

@media (max-width: 500px) {
  .mb-container {
    margin-bottom: 165px;
  }
}

</style>
