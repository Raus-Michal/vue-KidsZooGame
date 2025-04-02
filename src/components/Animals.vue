<script setup lang="ts">
import { onMounted } from "vue"; // Opraven import - Transition není třeba
import { useAnimals } from '@/stores/animals';

const animals = useAnimals(); // Použití store Pinia v proměnné animals

onMounted(async () => {
  
  animals.selectAnimals = []; // Nejprve prázdné pole
  await animals.loadAnimals(); // načte zvířata z JSON API
});
</script>

<template>
        <div v-for="animal in animals.selectAnimals" :key="animal.id">
            <button 
                :id="`button-${animal.id}`" 
                class="animal-button" 
                type="button" 
                :title="animal.title" 
                @click="() => animals.testAnAnimal(animal.id)">
                <img :src="animal.src" :alt="animal.title">
            </button>
        </div>
</template>

<style scoped>
.animal-button {
  color: white;
  background-color: transparent;
  border: 4px solid white;
  border-radius: 50%;
  padding: 1rem;
  width: 100%;
  height: auto;
  transition: all 0.3s ease-in-out;
}
</style>
