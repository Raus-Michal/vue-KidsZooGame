<script setup lang="ts">
import { onMounted } from "vue";
import Animals from "./components/Animals.vue";
import Header from "./components/Header.vue";
import SoundController from "./components/SoundController.vue";

onMounted(() => {

const dialog = document.getElementById("dialog-play");
const closeButton = document.getElementById("close-button");
dialog.showModal(); // Otevření dialogu
closeButton.addEventListener("click", () => {
dialog.close();
});


});



</script>

<template>

<SoundController />

  <Header />

  <div class="container-animals">
    <Animals />
  </div>

  <dialog id="dialog-play">
    <button id="close-button" type="button" title="Play games">Go!</button>
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
