<template>
  <div class="container">
    <div class="card">
      <img :src="dishesStore.profilePhoto" alt="Chef" class="avatar" />
      <h2>Taste of Nigeria</h2>
      <p>Savor the bold flavors of Nigeria’s culinary heritage.</p>

      <div v-if="dishesStore.isLoading">Loading dishes...</div>
      <div v-else-if="dishesStore.error" class="error">{{ dishesStore.error }}</div>

      <div v-else-if="dishesStore.dishes.length >= 1" class="slider">
        <div class="slide">
          <img
            :src="currentDish.image"
            :alt="currentDish.name"
            class="dish-image"
            @load="onImageLoad(currentDish.name)"
            @error="onImageError(currentDish.name)"
          />
          <h3>{{ currentDish.name }}</h3>
          <p>{{ currentDish.description }}</p>
        </div>

        <div class="controls">
          <button @click="prevSlide">‹</button>
          <button @click="nextSlide">›</button>
        </div>
      </div>

      <div v-else>Not enough dishes to display.</div>
    </div>
  </div>
</template>

<script setup>
import { useDishesStore } from './stores/dishes';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';

const dishesStore = useDishesStore();
const currentIndex = ref(0);
let intervalId = null;

const currentDish = computed(() => dishesStore.dishes[currentIndex.value] || {});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % dishesStore.dishes.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + dishesStore.dishes.length) % dishesStore.dishes.length;
};

const startAutoSlide = () => {
  intervalId = setInterval(() => {
    nextSlide();
  }, 3000);
};

const stopAutoSlide = () => {
  if (intervalId) clearInterval(intervalId);
};

onMounted(() => {
  dishesStore.fetchDishes();
  dishesStore.fetchProfilePhoto();
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});

const onImageLoad = (name) => {
  dishesStore.incrementImagesLoaded(name);
};

const onImageError = (name) => {
  dishesStore.handleImageError(name);
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #eef8ed;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 480px;
  width: 100%;
  position: relative;
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 9999px;
  position: absolute;
  top: 16px;
  left: 16px;
  border: 2px solid #2e7d32;
}

h2 {
  margin-top: 60px;
  color: #2e7d32;
}

.slider {
  margin-top: 1rem;
}

.slide {
  margin-bottom: 1.5rem;
}

.dish-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.controls button {
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
}

.controls button:hover {
  background-color: #1b5e20;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
