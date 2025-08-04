<template>
  <v-sheet class="pt-10 mb-10 bg-background">
    <AppSorting 
      :sortingFunc="MovieStore.filterAllMovies"
    />
    <MovieList />
  </v-sheet>
</template>

<script setup>
import MovieList from '@/components/MovieList.vue';
import { useMovieStore } from '@/stores/MovieStore';
import AppSorting from '@/components/AppSorting.vue';

const MovieStore = useMovieStore();
</script>


