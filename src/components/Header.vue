<script setup lang="ts">
import { ref , onMounted } from "vue";

const button1 = ref<HTMLButtonElement | null>(null); // buton 1. pro volbu pozadí aplikace
const button2 = ref<HTMLButtonElement | null>(null); // buton 2. pro volbu pozadí aplikace
const button3 = ref<HTMLButtonElement | null>(null); // buton 3. pro volbu pozadí aplikace
const button4 = ref<HTMLButtonElement | null>(null); // buton 4. pro volbu pozadí aplikace

const color:string[]=["black","rgb(58, 34, 2)","rgb(2, 17, 92)","rgb(92, 1, 71)"]; // barvy [černá,hnědá,modrá,fialová]

onMounted(() => {
  if (button1.value) {
    button1.value.style.display = "none"; // Tlačítko bude skryté, protože původní barva pozadí aplikace je černá
    // přebarvení není třeba, default background-color je black
  }

  if (button2.value) {
    button2.value.style.backgroundColor  = color[1]; // Přebarví button na barvu, kterou následně bude možné přebarvit barvu pozadí aplikace
  }

  if (button3.value) {
    button3.value.style.backgroundColor  = color[2]; // Přebarví button na barvu, kterou následně bude možné přebarvit barvu pozadí aplikace
  }

  if (button4.value) {
    button4.value.style.backgroundColor  = color[3]; // Přebarví button na barvu, kterou následně bude možné přebarvit barvu pozadí aplikace
  }

});



const changeColor=(id:number)=>{
// funkce přebarví pozadí aplikace a schová button s aktuální barvou

const buttons = [button1, button2, button3, button4]; // všechny buttony vloží do pole

buttons.forEach((btn, index) => {
  if (btn.value){
    // pokud button existuje
    btn.value.style.display = "block"; // Zobrazí všechny buttony
  }
}); // smyčka všechny buttony zviditelní

const activeButton = buttons[id - 1]; // Najdeme button v poli, na který bylo právě kliknuto
if (activeButton.value) {
  // pokud HTML element button existuje
  activeButton.value.style.display = "none"; // Skryjeme tlačítko s aktivní barvou
}

const app=document.getElementById("app") as HTMLElement; // tělo Vue aplikace
const colorBackground=color[id-1]; // (id - 1): určí barvu v poli, které je číslováno od 0


if(app) {
  // pokud HTML element existuje
  app.style.backgroundColor=colorBackground; // změní barvu pozadí těla Vue aplikace
  document.body.style.backgroundColor=colorBackground; // změní barvu pozadí těla Vue aplikace
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
  <p>Použité ikony a&nbsp;licence</p>
  <p>Tato aplikace využívá ikony importované z&nbsp;Vue knihoven.</p>
  <p>Pro přehlednost uvádíme:</p>
  <ul>
    <li>@heroicons/vue – distribuováno pod licencí MIT</li>
    <li>@fortawesome/vue-fontawesome – distribuováno pod licencí CC BY 4.0</li>
    <li>vue-material-design-icons – distribuováno pod licencí MIT</li>
    <li>oh-vue-icons – distribuováno pod licencí MIT</li>
    <li>Ikony z knihoven, jejichž názvy začínají na&nbsp;„Gy“ (např.&nbsp;Grommet Icons) – distribuovány pod&nbsp;licencí Apache License 2.0</li>
  </ul>
  <p>Ikony byly importovány standardním způsobem pomocí ES modulů a následně převedeny do&nbsp;čisté SVG podoby. Veškerá autorská práva a&nbsp;licenční podmínky zůstanou u&nbsp;jejich původních tvůrců.</p>
  <p>&copy;&#8239;2025 Boar-cz</p>
  <p>(všechna práva vyhrazena)</p>
  <button @click="closeDialog" type="button" title="close">Close dialog</button>
</dialog>

<header>
    <a href="#" @click="openDialog" title="Information" ><h1>ZOO Game</h1></a>
    <aside>
        <button ref="button1" type="button" title="Color 1" @click="changeColor(1)"></button>
        <button ref="button2" type="button" title="Color 2" @click="changeColor(2)"></button>
        <button ref="button3" type="button" title="Color 3" @click="changeColor(3)"></button>
        <button ref="button4" type="button" title="Color 4" @click="changeColor(4)"></button>
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
background-color:black;
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
