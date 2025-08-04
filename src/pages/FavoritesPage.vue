<template>
  <v-sheet class="py-10 mb-10 bg-background">
    <h2 class="text-md-h4 text-center text-primary font-weight-bold">
      Избранное
    </h2>
    <AppSorting :sortingFunc="FavoritesStore.sortFavoriteMovies" />
    <div v-if="FavoritesStore.sortedFavorites.length !== 0">
      <output-layout :movie-list="MovieStore.paginateMovies(FavoritesStore.sortedFavorites)">
        <template v-slot:default="{movie}">
          <v-btn
            class="w-100 rounded-lg elevation-10 bg-background-primary"
            @click="FavoritesStore.deleteFromFavorites(movie.id)"
          >
            Удалить
          </v-btn>
        </template>
      </output-layout>
    </div>
    <EmptyMessage v-else/>
    <AppPagination :movieList="FavoritesStore.sortedFavorites" />
  </v-sheet>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { useMovieStore } from '@/stores/MovieStore';
import OutputLayout from '@/components/OutputLayout.vue';
import AppSorting from '@/components/AppSorting.vue';
import AppPagination from '@/components/AppPagination.vue';
import EmptyMessage from '@/components/EmptyMessage.vue';

const FavoritesStore = useFavoritesStore();
const MovieStore = useMovieStore();

</script>
