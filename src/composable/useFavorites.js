import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/FavoritesStore';

export function useFavorites(movie) {
  const FavoritesStore = useFavoritesStore();
  const movieId = computed(() => movie.value.id);

  const favoritesTextBtn = computed(() => 
    FavoritesStore.isMovieInFavorites(movieId.value) ? 'Удалить из избранного': 'В избранное'
  );

  const favoritesBtnHandler = () => {
    if (FavoritesStore.isMovieInFavorites(movieId.value)) {
      FavoritesStore.deleteFromFavorites(movieId.value);
    }
    else {
      FavoritesStore.addToFavorites(movie.value);
    }
  };

  return {
    favoritesTextBtn,
    favoritesBtnHandler
  };
}