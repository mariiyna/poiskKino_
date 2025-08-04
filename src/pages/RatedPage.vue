<template>
  <v-sheet class="py-10 mb-10 bg-background">
    <h2 class="text-md-h4 text-center text-primary font-weight-bold">
      Мои оценки
    </h2>
    <AppSorting :sortingFunc="RatingStore.sortRatedMovies" />
    <div v-if="RatingStore.sortedRated.length !== 0">
      <output-layout :movie-list="MovieStore.paginateMovies(RatingStore.sortedRated)">
        <template v-slot:default="{movie}">
          <v-sheet
            class="pa-3 mb-7 bg-background-light elevation-10 rounded-lg"
          >
            <div class="text-center mb-2">
              Ваша оценка:
              <span class="text-primary">
                {{ RatingStore.getRating(movie.id) }}
              </span>
            </div>
            <v-btn
              color="primary"
              variant="outlined"
              class="w-100"
              size="small"
              @click="RatingStore.deleteFromRated(movie.id)"
            >
              Удалить оценку
            </v-btn>
          </v-sheet>
        </template>
      </output-layout>
    </div>
    <EmptyMessage v-else/>
    <AppPagination :movieList="RatingStore.sortedRated" />
  </v-sheet>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMovieStore } from '@/stores/MovieStore.js';
import { useRatingStore } from '@/stores/RatingStore';
import AppPagination from '@/components/AppPagination.vue';
import AppSorting from '@/components/AppSorting.vue';
import OutputLayout from '@/components/OutputLayout.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';

const MovieStore = useMovieStore();
const RatingStore = useRatingStore();

onMounted(async () => {
  await MovieStore.fetchMovie();
  const ratedList = JSON.parse(localStorage.getItem('ratedMovies') || '[]');
  if (ratedList.length > 0) {
    const movieIds = ratedList.map((movie) => movie.movieId);
    RatingStore.sortedRated = [
      ...MovieStore.movies.filter((movie) => movieIds.includes(movie.id)),
    ];
  }
});
</script>
