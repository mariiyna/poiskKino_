<template>
  <div class="header-container">
    <div 
      class="d-flex align-center justify-center cursor-pointer" 
      @click="navigate('/')"
    >
      <div>
        <v-img
          class="mr-3 d-block"
          min-width="50px"
          src="../../src/assets/logo.png"
        />
      </div>
      <h1 class="text-primary">ПоискКино</h1>
    </div>
    <div
      v-show="isNavShown"
      class="btn-container"  
    >
      <nav-btn
        path="/" 
        icon="mdi-home"
        class="btn"
        :active="route.path === '/'"
      >
        Главная
      </nav-btn>
      <nav-btn
        class="btn"
        path="/favorites" 
        icon="mdi-heart"
        :active="route.path === '/favorites'"
      >
        Избранное
      </nav-btn>
      <nav-btn
        path="/rated"
        class="btn" 
        icon="mdi-star"
        :active="route.path === '/rated'"
      >
        Оценки
      </nav-btn>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useNavigate } from '@/composable/useNavigate';
import NavBtn from '@/components/NavBtn.vue';
import { useRoute } from 'vue-router';


const navigate = useNavigate(); 
const route = useRoute();

const isNavShown = ref(true);
let scrollY = window.scrollY;

const observeScroll = () => {
  if (window.innerWidth <= 500) {
    isNavShown.value = window.scrollY > scrollY ? false: true;
  }
  else {
    isNavShown.value = true;
  }
  scrollY = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', observeScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', observeScroll);
});
</script>

<style lang="scss" scoped>
.header-container{
  display: flex;
  max-width: 1450px;
  margin: 0 auto;
  padding-bottom: 15px;
  justify-content: space-between;
}

.btn-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 600px) {
  .header-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
}

@media (max-width: 500px) {
  .btn-container {
    flex-direction: column;

    .btn {
      display: block;
      width: 100%;
    }
  }
}
</style>