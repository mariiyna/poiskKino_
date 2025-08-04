<template>
  <div class="d-flex flex-wrap justify-center ga-8 mb-10">
    <div
      v-for="movie in movieList"
      :key="movie.id"
    >
      <MovieCard 
        class="mb-4 card" 
        :movie="movie" 
      />
      <slot :movie="movie"/>
    </div>
  </div>
</template>

<script setup>
import MovieCard from '@/components/MovieCard.vue';

const props = defineProps({
  movieList: {
    type: Array,
    required: true
  }
});

</script>

<style scoped>
.card {
  width: 260px;
}

@media(max-width: 615px) {
  .card {
    width: 320px;  
  }
}

@media(max-width: 390px) {
  .card {
    width: 240px;  
  }
}
</style>