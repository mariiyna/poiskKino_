<template>
  <v-btn
    variant="outlined"
    color="primary"
    :class="{ 'active': active }"
    :title="pathTitle"
    @click="navigate(path)"
  >
    <v-icon
      size="large"
      :class="{ 'active': active, 'btn-icon': true }"
      :icon="icon"
    />
    <div  
      :class="{ 'active': active, 'btn_text': true}"
    > 
      <slot />
    </div>
  </v-btn>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { useNavigate } from '@/composable/useNavigate';

const props = defineProps({
  path: {
    type: String,
    required: true
  },
  icon: String,
  active: Boolean
});

const pathTitle = ref('');

switch (props.path) {
  case '/':
    pathTitle.value = 'Главная';
    break;
  case '/favorites':
    pathTitle.value = 'Избранное';
    break;
  case '/rated':
    pathTitle.value = 'Оценки';
    break;
}

const navigate = useNavigate();
</script>

<style scoped>
.btn_text {
  display: none;
}

@media (max-width: 600px) {
  .btn-icon {
    display: none;
  }

  .btn_text {
    display: flex;
  }
}

.active {
  border: none;
  background-color: #9e332c;
  color: white;
}
</style>