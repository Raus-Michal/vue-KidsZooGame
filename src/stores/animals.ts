import { defineStore } from 'pinia';

interface Animals {
  id: number;
  src: string;
  title: string;
  mp3: string;
}

export const useAnimals = defineStore('animals', {
  state: () => ({
    animals: [] as Animals[], // všechna zvířata z JSON API
    selectAnimals: [] as Animals[], // náhodně vybraných 6 zvířat z animals[]
    currentAnimal: null as Animals | null // náhodně vybrané 1 zvíře ze pole selectAnimals[] nebo null pokud nebude vybráno
  }),
  actions: {
    // Asynchronní funkce pro načtení JSON API ze serveru.
    async loadAnimals() {
      try {
        const response = await fetch('/data/data.json'); // Načítá data z JSON souboru na zadané URL
        if (!response.ok) throw new Error('Chyba při načítání produktů'); // Kontrola, zda požadavek proběhl úspěšně.
        this.animals = await response.json(); // Při úspěšném načtení uloží zvířata do stavu animals[]
        console.log('Zvířata načtena:', this.animals);

        // Po načtení dat zavoláme funkci na výběr náhodných 6 zvířat
        this.selectRandomAnimals(); // Funkce pro výběr náhodných 6 zvířat
      } catch (error) {
        console.error('Chyba při načítání produktů:', error); // Zpracování chyby načítání, vypíše do konzole.
      }
    },

    // Funkce pro výběr náhodných 6 zvířat z pole this.animals
    selectRandomAnimals() {
      if (this.animals.length > 0) {
        // pokud pole this.animals obsahuje nějáké objekty, bude jeho délka větší než 0
        const shuffled = [...this.animals].sort(() => 0.5 - Math.random()); // Udělá kopii pole this.animals a promíchá ho
        this.selectAnimals = shuffled.slice(0, 6); // Vybere prvních 6 objektů v poli
        console.log('Vybraná zvířata:', this.selectAnimals);
        this.currentRandomAnimal(); // Funkce pro výběr náhodného zvířete z pole this.selectAnimals
      }
      else
      {
      console.log("Funkce selectRandomAnimals selhala: pole this.animals je prázdné");
      }
    },
    // Funkce pro výběr náhodného zvířete z pole this.selectAnimals
    currentRandomAnimal() {
      if (this.selectAnimals.length > 0) {
      // pokud pole this.selectAnimals obsahuje nějáké objekty, bude jeho délka větší než 0
      const randomIndex = Math.floor(Math.random() * this.selectAnimals.length); // Náhodný index (Math.random() generuje náhodné desetinné číslo mezi 0 (včetně) a 1 | Math.floor() zaokrouhlí číslo směrem dolů na nejbližší celé číslo.)
      this.currentAnimal = this.selectAnimals[randomIndex]; // Vybere zvíře dle náhodného indexu
      }
      else
      {
      console.log("Funkce currentRandomAnimal selhala: pole this.selectAnimals je prázdné");
      }
    },


    // funkce otestuje jestli klik na určité zvíře odpovídá přehrávanému zvuku zvířete
    testAnAnimal(id: number) {
      if (this.currentAnimal && this.currentAnimal.id === id) {
        console.log('Správné zvíře!');
      } else {
        console.log('Špatné zvíře.');
      }
    }
  },
  
  getters: {}
});

