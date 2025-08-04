<template>
  <v-container>
    <div class="mb-5">
      <v-text-field
        v-model="filters.searchingValue"
        variant="solo"
        bg-color="background-light"
        rounded="xl"
        clearable
        prepend-inner-icon="mdi-magnify"
        label="Поиск..."
        type="text"
      />
      <v-sheet class="pa-5 rounded-lg elevation-5 bg-background-light">
        <div class="d-sm-flex flex-wrap justify-center align-center ga-10">
          <v-select
            v-model="filters.ratingSortValue"
            variant="solo-filled"
            bg-color="background-light"
            label="Рейтинг выше"
            clearable
            :items="ratingItems"
          />
          <v-select
            v-model="filters.yearSortValue"
            variant="solo-filled"
            label="Год выпуска"
            bg-color="background-light"
            multiple
            clearable
            :items="MovieStore.getAllYears"
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 2">
                <span>{{ item.title }}</span>
              </v-chip>
              <span
                v-if="index === 2"
                class="text-grey text-caption align-self-center"
              >
                (+{{ filters.yearSortValue.length - 2 }} другие)
              </span>
            </template>
          </v-select>
          <v-select
            clearable
            variant="solo-filled"
            bg-color="background-light"
            label="Длительность (мин)"
            :items="lengthItems"
            v-model="filters.durationSortValue"
          />
        </div>
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useMovieStore } from '@/stores/MovieStore';
import { useFilterStore } from '@/stores/FilterStore';
import { VTextField } from 'vuetify/components';

const props = defineProps({
  sortingFunc: {
    type: Function,
    required: true,
  },
});

const MovieStore = useMovieStore();
const FilterStore = useFilterStore();

const lengthItems = ref(['> 30', '> 60',' > 90',' > 120', '> 160']);
const ratingItems = ref([9, 8, 7, 6, 5]);

const formatLength = (length) => {
  return length ? Number(length.slice(2)) : null;
};

const filters = reactive({
  ratingSortValue: null,
  yearSortValue: [],
  durationSortValue: null,
  searchingValue: '',
});

watch(
  filters,
  (newFilters) => {
    FilterStore.ratingSortValue = newFilters.ratingSortValue;
    FilterStore.yearSortValue = newFilters.yearSortValue;
    FilterStore.durationSortValue = formatLength(newFilters.durationSortValue);
    FilterStore.searchingValue = newFilters.searchingValue;
    props.sortingFunc();
  },
  { deep: true },
);
</script>
