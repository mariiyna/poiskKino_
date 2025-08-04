<template>
  <div>
    <v-card class="rounded-lg elevation-10 text-center movie-card">
      <v-img
        cover
        class="cursor-pointer"
        :lazy-src="lazySrc"
        :src="movie.poster.previewUrl"
        :alt="movie.name"
        :aspect-ratio="10 / 15"
        @click="showDetail"
      />
      <div class="bg-background-primary">
        <v-card-title class="font-weight-bold">
          {{ movie.name }}
        </v-card-title>
        <v-card-subtitle>
          <div>
            Год выпуска: <span class="font-weight-bold">{{ movie.year }}</span>
          </div>
          <div>
            Кинопоиск:
            <v-chip class="font-weight-bold my-2">{{
              movie.rating.kp.toPrecision(2)
            }}</v-chip>
          </div>
        </v-card-subtitle>
        <div class="d-flex flex-wrap justify-center ga-2">
          <v-btn
            variant="outlined"
            size="small"           
            @click="showMoreInfo = true">
            Подробнее
          </v-btn>

          <v-btn
            variant="outlined"
            class="mb-5"
            size="small"
            @click="showDetail"
          >
            Смотреть
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-dialog
      v-model="showMoreInfo"
      max-width="500px"
    >
      <v-sheet class="elevation-10 rounded-lg text-center bg-background-light pa-10">
        <v-img
          cover
          :lazy-src="lazySrc"
          class="position-relative mb-4 rounded elevation-10 ma-auto"
          :src="movie.poster.previewUrl"
          :alt="movie.name"
          max-width="300px"
        />
        <div class="mb-4">
          {{ movie.shortDescription || movie.description }}
        </div>
        <v-btn
          class="mb-5 elevation-2 text-primary block"
          variant="tonal"
          @click="favoritesBtnHandler"
        >
          {{ favoritesTextBtn }}
        </v-btn>
        <v-btn
          class="text-primary w-100 d-block"
          variant="outlined"
          @click="showMoreInfo = false"
        >
          Закрыть
        </v-btn>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/MovieStore';
import { useScrollUp } from '@/composable/useScrollUp';
import { useFavorites } from '@/composable/useFavorites';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  }
});
const showMoreInfo = ref(false);

const lazySrc = ref('https://img.freepik.com/premium-vector/loading-icon-vector_942802-5401.jpg');

const router = useRouter();
const MovieStore = useMovieStore();

const {favoritesTextBtn, favoritesBtnHandler} = useFavorites(computed(() => props.movie));

const showDetail = () => {
  MovieStore.setDetailedMovie(props.movie);
  useScrollUp();
  router.push(`/movies/${props.movie.id}`);
};
</script>