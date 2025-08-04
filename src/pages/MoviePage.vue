<template>
  <v-row class="mb-5 py-10">
    <v-col
      cols="12"
      md="6"
      class="d-flex justify-center">
      <v-img
        :aspect-ratio="1"
        :src="movie.poster.url" />
    </v-col>
    <v-col>
      <div class="pt-5 text-center text-md-left">
        <div class="mb-5">
          <h1 class="text-primary">{{ movie.name }}</h1>
          <h2
            v-if="movie.alternativeName"
            class="text-primary mb-2">
            {{ movie.alternativeName }}
          </h2>
        </div>
        <h4 class="my-4">
          <span class="text-primary">Год выпуска:</span> {{ movie.year }}
        </h4>
        <h4 class="mb-4">
          <span class="text-primary">Длительность:</span>
          {{ calculateLength }}
        </h4>
        <h4 class="mb-4">
          <span class="text-primary">Описание:</span>
        </h4>
        <p class="mb-4">{{ movie.description }}</p>
        <v-btn
          class="mr-2 mb-4 bg-background-primary"
          :prepend-icon="FavoritesStore.isMovieInFavorites(movie.id) ? 'mdi-heart-off-outline': 'mdi-heart'"
          @click="favoritesBtnHandler"
        >
          {{ favoritesTextBtn }}
        </v-btn> 
      </div>
    </v-col>
  </v-row>
  <div>
    <v-sheet class="mb-10 bg-background-light rounded-xl elevation-5">
      <v-row>
        <v-col class="text-center d-flex flex-column ga-7">
          <div>
            <h3 class="mb-3">Рейтинг</h3>
            <div class="d-flex flex-column flex-sm-row justify-center">
              <div
                v-for="(value, key) in movie.rating"
                :key="key"
              >
                <v-chip
                  v-if="key !== '_id' && key !== 'await'"
                  variant="elevated"
                  class="mr-2 mb-4 bg-background-primary font-weight-bold"
                >
                  {{ key }}: {{ value }}
                </v-chip>
              </div>
            </div>
          </div>
          <div>
            <h3 class="mb-3">Количество голосов</h3>
            <div class="d-flex flex-column flex-sm-row justify-center">
              <div
                v-for="(value, key) in movie.votes"
                :key="key"
              >
                <v-chip
                  v-if="key !== '_id' && key !== 'await'"
                  variant="elevated"
                  class="mr-2 mb-4 bg-background-primary font-weight-bold"
                  :key="key"
                >
                  {{ key }}: {{ value }}
                </v-chip>
              </div>
            </div>
          </div>
          <div>
            <h3>
              {{ personalRating ? "Ваша оценка: " + personalRating : "Оцените фильм:" }}
            </h3>
            <v-rating
              half-increments
              hover
              class="mb-4 d-block"
              active-color="primary"
              color="primary"
              v-model="personalRating"
              :size="35"
            />
            <v-btn 
              v-if="personalRating"
              size="small"
              color="primary"
              variant="outlined"
              class="mb-2"
              @click="removeRating"
            >
              Удалить оценку
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
    <div
      v-if="movie.watchability.items"
      class="mb-10"
    >
      <h2 class="text-center mb-5">Где посмотреть</h2>
      <v-row justify="center">
        <v-col
          v-for="watch in movie.watchability.items"
          :key="watch.logo._id"
          cols="6"
          sm="3"
          md="2"
        >
          <v-img
            max-width="70%"
            rounded="lg"
            class="ma-auto mb-4"
            :src="watch.logo.url"
          />
          <div class="d-flex justify-center">
            <v-btn
              :href="watch.url"
              variant="outlined"
            >
              Перейти
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-sheet class="pa-5 bg-background">
      <h3 class="text-center text-primary mb-5 text-uppercase">Рекомендуем посмотреть</h3>
      <v-row>
        <v-col 
          v-for="movie in recommendedMovies"
          cols="12"
          md="3"
          sm="6"
          class="mb-5"
          :key="movie.id">
          <MovieCard :movie="movie" />
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import { useRatingStore } from '@/stores/RatingStore';
import { useFavorites } from '@/composable/useFavorites';
import MovieCard from '@/components/MovieCard.vue';

const MovieStore = useMovieStore();
const FavoritesStore = useFavoritesStore();
const RatingStore = useRatingStore();

const movie = computed(() => MovieStore.getDetailedMovie());

const calculateLength = computed(() => {
  const hours = Math.floor(movie.value.movieLength / 60);
  const remainingMinutes = movie.value.movieLength % 60;
  return remainingMinutes > 0
    ? `${hours} ч ${remainingMinutes} мин`
    : `${hours} ч`;
});

let personalRating = ref(0);

async function removeRating() {
  RatingStore.deleteFromRated(movie.value.id); 
  personalRating.value = 0;  
  recommendedMovies.value = await getRecommendations();  
}

watch(personalRating, (newRating) => RatingStore.setRating(movie.value.id, newRating));

const {favoritesTextBtn, favoritesBtnHandler} = useFavorites(movie);

let recommendedMovies = ref([]);

function calculateSimilarity(movie1, movie2) {
    let score = 0;

    // разница в рейтинге (вес 5)
    score += (1 - Math.abs(movie1.rating.kp - movie2.rating.kp) / 10) * 5; 

    // разница в популярности (вес 4), сравниваем и нормализуем, т.к. значения большие и разница может быть значительной
    if (movie1.votes.kp && movie2.votes.kp) {
      score += (1 - Math.abs(movie1.votes.kp - movie2.votes.kp) / Math.max(movie1.votes.kp, movie2.votes.kp)) * 4; 
    }

    // разница в длительности (вес 3)
    if (movie1.movieLength && movie2.movieLength) {
      score += (1 - Math.abs(movie1.movieLength - movie2.movieLength) / 180) * 3; 
    }

    // разница в годах выхода (вес 2)
    score += (1 - Math.abs(movie1.year - movie2.year) / 20) * 2;

    return score;
}

const getRecommendations = async () => {
  await MovieStore.fetchMovie();

  // сбор избранного и оценок
  let preferMovies = [];

  if (RatingStore.ratedMovies.length > 0) {
    RatingStore.ratedMovies.forEach((movie) => {
      if (movie.personalRating >= 4) {
        const foundMovie = MovieStore.movies.find((m) => m.id === movie.movieId);
        if (foundMovie) { 
          preferMovies.push(foundMovie);
        }
      }
    });
  }

  if (FavoritesStore.favoriteMovies.length > 0) {
    FavoritesStore.favoriteMovies.forEach((movie) => {
      preferMovies.push(movie);
    });
  }

  // для того, чтобы в рекомендации не попал фильм, на странице которой сейчас пользователь
  preferMovies.push(MovieStore.getDetailedMovie());

  // если пользователь вообще ничего не добавил в избранное и не оценил
  if (preferMovies.length === 0) {
    return MovieStore.movies.sort(() => Math.random() - 0.5).slice(0, 4);
  }

  // настройка рекомендаций
  const recommendations = new Map();

  preferMovies.forEach(preferMovie => {
    MovieStore.movies.forEach(mov => {
      if (!preferMovies.some(m => m.id === mov.id)) {
        const similarity = calculateSimilarity(preferMovie, mov);
        if (similarity > 0) {
          recommendations.set(mov.id, (recommendations.get(mov.id) || 0) + similarity);
        }
      }
    });
  });

  // берем топ-4 самых похожих 
  return [...recommendations.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([movieId]) => MovieStore.movies.find(m => m.id === movieId));
};

onMounted(() => {
  personalRating.value = RatingStore.getRating(movie.value.id);
});

onMounted(async () => {
  recommendedMovies.value = await getRecommendations();
});

watch(
  [() => RatingStore.ratedMovies.length, () => FavoritesStore.favoriteMovies.length, () => MovieStore.getDetailedMovie()], 
  async () => {
    recommendedMovies.value = await getRecommendations();
  },
  { deep: true }
);

watch(personalRating, async (newRating) => {
  if (newRating === 0) {
    recommendedMovies.value = await getRecommendations(); 
  }
});
</script>
