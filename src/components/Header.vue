<script setup lang="ts">


const changeColor=(color:string)=>{
// funkce přebarví pozadí aplikace
const app=document.getElementById("app") as HTMLElement; // tělo Vue aplikace

if(app) {
// pokud HTML element existuje
app.style.backgroundColor=color; // změní barvu pozadí těla Vue aplikace
document.body.style.backgroundColor=color; // změní barvu pozadí těla Vue aplikace
}

};

</script>

<template>

<header>
    <h1>ZOO Game</h1>
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

</style>
