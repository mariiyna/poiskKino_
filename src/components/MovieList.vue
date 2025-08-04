<template>
  <div class="d-flex flex-wrap ga-5">
    <v-container>
      <div v-if="!MovieListLength">
        <OutputLayout :movieList="MovieStore.paginateMovies(MovieStore.sortedMovies)"/>
        <AppPagination :movieList="MovieStore.sortedMovies" />
      </div>
      <EmptyMessage v-else/>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import OutputLayout from '@/components/OutputLayout.vue';
import AppPagination from '@/components/AppPagination.vue';
import EmptyMessage from '@/components//EmptyMessage.vue';

const MovieStore = useMovieStore();

const MovieListLength = computed(() => MovieStore.movies.length === 0 || MovieStore.paginateMovies(MovieStore.sortedMovies).length === 0); 
</script>

