<script setup lang="ts">
import { onMounted , ref } from "vue";
import Animals from "./components/Animals.vue";
import Header from "./components/Header.vue";
import SoundController from "./components/SoundController.vue";
import { useAnimals } from '@/stores/animals';

const animals = useAnimals(); // Použití store Pinia v proměnné animals

const dialog = ref<HTMLDialogElement | null>(null); // Reference na dialogový element

const kryt = ref<HTMLElement | null>(null); // Reference na div element, krytu proti kliknutí uživatele do aplikace

const open_dialog=ref(false); // proměnná hlídá, zda je otevřeno dialogové okno GO! a tím zobrazení Komponenty SoundController pomocí v-if

// Funkce pro otevření dialogu
  const openDialog = () => {
    if (dialog.value !== null) {
      // pokud HTML element existuje
      dialog.value.showModal();  // Zobrazí dialog
      open_dialog.value=true; // změní value reaktivní proměnné na true, což signalizuje, že došlo k otevření dialogového okna
      animals.setDialog(dialog); // Inicializujeme dialog ve store, aby bylo možné ho následně spouštět z Pinia store
    }
  };

// Funkce pro zavření dialogu
  const closeDialog = () => {
    if (dialog.value !== null) {
      // pokud HTML element existuje
      dialog.value.close();  // Zavře dialog
      open_dialog.value=false; // změní value reaktivní proměnné na false, což signalizuje, že došlo k zavření dialogového okna
      animals.go=true; // určí, že budylo zmáčknuto tlačítko Go! v store Piana
      animals.soundAnimalplay(); // Funkce zapne přehrávání zvuku náhodně vybraného zvířete
    }
  };

onMounted(() => {
// po načtení komponenty
  openDialog(); // otevře dialogové okno Go!
});
</script>

<template>

<SoundController v-if="animals.go" />
  <div ref="kryt" :class="{'kryt--active': animals.krytActive}" class="kryt"> </div>

  <Header />

  <div class="container-animals">
    <Animals />
  </div>

  <dialog ref="dialog">
    <button @click="closeDialog" type="button" title="Play game">Go!</button>
  </dialog>

</template>

<style scoped>

.container-animals
{
display:grid;
grid-template-columns: repeat(2, minmax(2rem, 8rem));
flex-wrap:wrap;
gap:1rem;
justify-content:space-around;
align-items:center;
margin:1rem;
transition: 250ms opacity;
}

@media (orientation: landscape)
{
.container-animals{
grid-template-columns: repeat(3, minmax(2rem, 8rem));
}
}

.kryt
{
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index:-1;
}

/* Aktivní stav krytu – vyšší z-index zabrání interakci s podkladovými prvky */
.kryt--active {
  z-index: 10;
}


dialog {
  border:none;
  padding:0;
  background-color:transparent;
  color:black;
  text-align:center;
}

dialog::backdrop {
background-color: rgba(80, 28, 28, 0.25); /* Poloprůhledné pozadí pro zbytek stránky */
}

dialog button,dialog button:focus
{
width:12rem;
height:12rem;
color:black;
border:2px solid green;
background-color:greenyellow;
font-size:4rem;
font-weight:bold;
border-radius:50%;
padding:2rem;
outline:none;
animation:pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform:scale(0.975); /* Výchozí velikost */
  }
  50% {
    transform:scale(1); /* Mírné zvětšení */
  }
  
  100% {
    transform:scale(0.975); /* Návrat na původní velikost */
  }
}
</style>
