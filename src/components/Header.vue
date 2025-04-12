<script setup lang="ts">
import { ref } from "vue";

const changeColor=(color:string)=>{
// funkce přebarví pozadí aplikace
const app=document.getElementById("app") as HTMLElement; // tělo Vue aplikace

if(app) {
// pokud HTML element existuje
app.style.backgroundColor=color; // změní barvu pozadí těla Vue aplikace
document.body.style.backgroundColor=color; // změní barvu pozadí těla Vue aplikace
}

};


const dialog = ref<HTMLDialogElement | null>(null); // Reference na dialogový element

// Funkce pro otevření dialogu
  const openDialog = (event: Event) => {
    event.preventDefault(); // Zabrání přesměrování nebo akci odkazu
    if (dialog.value !== null) {
      // pokud HTML element existuje
      dialog.value.showModal();  // Zobrazí dialog
    }
  };

// Funkce pro zavření dialogu
  const closeDialog = () => {
    if (dialog.value !== null) {
      // pokud HTML element existuje
      dialog.value.close();  // Zavře dialog
    }
  };

// funkce zavře dialog, pokud uživatel klik mimo dialogové okno
  const closeDialogOnBackdropClick = (event: MouseEvent) => {
    if (event.target === dialog.value) {
        // event.target – prvek, na který uživatel skutečně kliknul. dialog.value – reference na <dialog> (tedy samotný dialogový prvek). Když je splněna podmínka, znamená to, že uživatel klikl na pozadí dialogu – to můžeš využít k jeho zavření. Když nejsou stejné (false), znamená to, že uživatel klikl na něco uvnitř dialogu (např. tlačítko), takže nechceš zavřít okno.
        dialog.value?.close(); // Co znamená dialog.value?.close();? Pokud dialog.value existuje (není null nebo undefined), zavolá se close(). Pokud dialog.value neexistuje, nic se nestane – skript nevyhodí chybu.
    }
};

</script>

<template>

<dialog ref="dialog" @click="closeDialogOnBackdropClick">
    <p>&copy;&#8239;2024 Boar-cz</p>
    <p>(všechna práva vyhrazena)</p>
    <button @click="closeDialog" type="button" title="close">Close dialog</button>
</dialog>

<header>
    <a href="#" @click="openDialog" title="Information" ><h1>ZOO Game</h1></a>
    <aside>
        <button type="button" title="Black color" @click="changeColor('black')"></button>
        <button type="button" title="Royalblue color" @click="changeColor('royalblue')"></button>
        <button type="button" title="Rebeccapurple color" @click="changeColor('rebeccapurple')"></button>
    </aside>
</header>

</template>

<style scoped>

header
{
display: flex;
align-items:center;
gap:2rem;
flex-wrap:wrap;
margin:1rem 4.5rem 0 1rem; /* margin-right 4.5rem je místo pro button SoundControler */
}

header h1
{
font-size:1rem;
margin:0;
padding:0;
}

aside
{
display:flex;
gap:1.5rem;
}

aside button
{
min-height:2rem;
height:2rem;
min-width:2rem;
width:2rem;
border-radius:50%;
border:2px solid white;
background-color:royalblue;
}

aside button:first-child
{
background-color:black;
}

aside button:last-child
{
background-color:rebeccapurple;
}

a,a:link,a:visited,a:active
{
color:var(--b1);
text-decoration:none;
}


dialog {
  border:none;
  padding:1rem;
  background-color:black;
  color:white;
  text-align:center;
  border-radius:16px;
}

dialog::backdrop {
background-color: rgba(80, 28, 28, 0.25); /* Poloprůhledné pozadí pro zbytek stránky */
}

</style>
