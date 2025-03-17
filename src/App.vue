<script setup>
import { onMounted } from 'vue';
import Animal from './components/Animal.vue'
import Header from './components/Header.vue'



const data=[
  {
    id: 1,
    src: "svg/kacena.svg",
    title: "Kačena",
    mp3: "mp3/kacena.mp3"
  },
  {
    id: 2,
    src: "svg/kocka.svg",
    title: "Kočka",
    mp3: "mp3/kocka.mp3"
  },
  {
    id: 3,
    src: "svg/kohout.svg",
    title: "Kohout",
    mp3: "mp3/kohout.mp3"
  },
  {
    id: 4,
    src: "svg/krava.svg",
    title: "Krava",
    mp3: "mp3/krava.mp3"
  },
  {
    id: 5,
    src: "svg/kun.svg",
    title: "Kůň",
    mp3: "mp3/kun.mp3"
  },
  {
    id: 6,
    src: "svg/lev.svg",
    title: "Lev",
    mp3: "mp3/lev.mp3"
  },
  {
    id: 7,
    src: "svg/ovce.svg",
    title: "Ovce",
    mp3: "mp3/ovce.mp3"
  },
  {
    id: 8,
    src: "svg/prase.svg",
    title: "Prase",
    mp3: "mp3/prase.mp3"
  },
  {
    id: 9,
    src: "svg/zaba.svg",
    title: "Žába",
    mp3: "mp3/zaba.mp3"
  }
];

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

<Header />

<div class="container-sound">
<button id="button-sound-play" type="button" title="Zastav zvuk">
<img src="./assets/svg/sound-no-play.svg" alt="sound-play">
</button>

<button id="button-sound-no-play" style="display:none;" type="button" title="Pustit zvuk">
<img src="./assets/svg/sound-play.svg" alt="sound-play">
</button>
</div>

<div  id="animal-buttons-container" class="container-animals">

<Animal />
<Animal />
<Animal />
<Animal />
<Animal />
<Animal />

</div>

<dialog id="dialog-play">
<button id="close-button" type="button" title="Play games">Go!</button>
</dialog>

</template>

<style scoped>

.container-sound
{
position:absolute;
z-index:5;
right:1rem;
top:1rem;
}

.container-sound button
{
color:white;
background-color:transparent;
border:none;
padding:0;
width:2rem;
height:2rem;
width:calc(2rem + 2vw);
height:calc(2rem + 2vw);
max-width:4rem;
max-height:4rem;
border-radius:50%;
}

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
