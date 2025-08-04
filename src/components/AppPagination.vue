<template>
  <v-row
    v-if="movieList.length > MovieStore.moviePerPage"
    justify="center"
  >
    <v-col class="d-flex justify-center">
      <vue-awesome-paginate
        v-model="MovieStore.currentPage"
        :total-items="movieList.length"
        :items-per-page="MovieStore.moviePerPage"
        :show-ending-button="true"
        :show-breakpoint-buttons="false"
        @click="useScrollUp()"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useMovieStore } from '@/stores/MovieStore';
import { useScrollUp } from '@/composable/useScrollUp';

defineProps({
  movieList: {
    type: Array,
    required: true,
  },
});

const MovieStore = useMovieStore();
</script>
