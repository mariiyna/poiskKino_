import { defineStore } from 'pinia';

export const useFilterStore = defineStore('FilterStore', {
  state: () => ({
    ratingSortValue: '',
    yearSortValue: [],
    durationSortValue: '',
    searchingValue: '',
  }),

  actions: {
    _filterByYear(movies) {
      if (Array.isArray(this.yearSortValue) && this.yearSortValue.length > 0) {
        return movies.filter((movie) => this.yearSortValue.includes(movie.year.toString()));
      }
      return movies;
    },

    _filterByRating(movies) {
      if (this.ratingSortValue) {
        return movies.filter((movie) => movie.rating.kp >= this.ratingSortValue);
      }
      return movies;
    },

    _filterByDuration(movies) {
      if (this.durationSortValue) {
        return movies.filter((movie) => movie.movieLength >= this.durationSortValue);
      }
      return movies;
    },

    _applySearch(movies) {
      const searchValue = this.searchingValue?.trim().toLowerCase();

      if (searchValue) {
        return movies.filter((movie) => movie.name.toLowerCase().includes(searchValue));
      }
      return movies;
    },

    sortMovieList(moviesList) {
      let movies = [...moviesList];
      movies = this._filterByRating(movies);
      movies = this._filterByYear(movies);
      movies = this._filterByDuration(movies);
      movies = this._applySearch(movies);
      return movies;
    },
  },
});
