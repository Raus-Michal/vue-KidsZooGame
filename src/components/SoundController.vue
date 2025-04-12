<script setup lang="ts">
import { useAnimals } from '@/stores/animals';

const animals = useAnimals(); // Použití store Pinia v proměnné animals

</script>

<template>
<div class="container">
    <button v-if="animals.sound_play" type="button" title="Zastav zvuk" @click="animals.soundAnimalstop">
        <svg class="svg-sound" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path class="fill-white" d="M 41.5,90 40.76,12.8 23.94,38.36 5.35,38.73 v 27.66 l 18.88,1.57 z" />
            <g class="stroke-5">
                <line x1="55" y1="35" x2="90" y2="70" />
                <line x2="55" y1="35" x1="90" y2="70" />
            </g>
        </svg>
    </button>

    <button v-else-if="!animals.sound_play" type="button" title="Pustit zvuk" @click="animals.soundAnimalplay" >
        <svg class="svg-sound" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <path class="fill-white" d="m 41.5,88.7 -1,-77.2 -16.8,25.6 -18.6,0.5 v 27.7 l 18.9,1.6 z" />
            <g class="stroke-5">
                <path id="s1" class="anim-stroke" d="m 50.9,38.6 a 8.7,12.8 0 0 1 7.6,6.3 8.7,12.8 0 0 1 0.1,12.8 8.7,12.8 0 0 1 -7.6,6.4" />
                <path id="s2" class="anim-stroke" d="M 63,28.6 A 12.7,22.6 0 0 1 74.2,39.3 12.7,22.6 0 0 1 74.3,62 12.7,22.6 0 0 1 63.2,73.4" />
                <path id="s3" class="anim-stroke" d="m 75.8,15.6 a 16.9,33.5 0 0 1 14.7,17.2 16.9,33.5 0 0 1 0,33.5 16.9,33.5 0 0 1 -14.7,17.2" />
            </g>
        </svg>
    </button>
</div>

</template>

<style scoped>

.container
{
position:absolute;
z-index:5;
right:1rem;
top:1rem;
}

.container button
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

.svg-sound
{
stroke-linecap:round;
stroke-linejoin:round;
fill:none;
stroke-width:3;
stroke:white;
}

.stroke-5
{
stroke-width:5;
}

.fill-white
{
fill:white;
}

/* Animace stroke */
.anim-stroke
{
animation:stroke-cycle 1.5s infinite;
stroke:white;
}

/* Časování animace jednotlivých prvků */
#s1
{
animation-delay:0s;
}

#s2
{
animation-delay:.25s;
}

#s3
{
animation-delay: .5s;
}

/* Klíčový cyklus animace */
@keyframes stroke-cycle
{
    /* s1 zelená */
    0%, 16.6%
    {
    stroke: white;
    }

    /* s2 zelená */
    16.7%, 33.3%
    {
    stroke: white;
    }

    /* s3 zelená */
    33.4%, 50%
    {
    stroke: white;
    }

    /* Všechny bílé současně */
    50.1%, 66.6%
    {
    stroke:greenyellow;
    }

    /* Restart cyklu */
    66.7%, 100%
    {
    stroke:white;
    }
}

</style>