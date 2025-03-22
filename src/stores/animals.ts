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
    currentAnimal: null as Animals | null, // náhodně vybrané 1 zvíře ze pole selectAnimals[] nebo null pokud nebude vybráno
    sound: new Audio() as HTMLAudioElement, // vytvoří z proměnné sound Audio objekt, který slouží k přehrávání zvuku zvířete
    dialog: null as HTMLDialogElement | null // Přidáme dialog, který bude po inicializaci zastupovat HTML element Dialog GO! z App.vue
  }),
  actions: {
    // Asynchronní funkce pro načtení JSON API ze serveru.
    async loadAnimals() {
      try {
        const response = await fetch('data/data.json'); // Načítá data z JSON souboru na zadané URL
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
    // Funkce pro výběr náhodného zvířete z pole this.selectAnimals do pole this.currentAnimal
    currentRandomAnimal() {
      if (this.selectAnimals.length > 0) {
      // pokud pole this.selectAnimals obsahuje nějáké objekty (zvířata), bude jeho délka větší než 0
      const randomIndex = Math.floor(Math.random() * this.selectAnimals.length); // Náhodný index (Math.random() generuje náhodné desetinné číslo mezi 0 (včetně) a 1 | Math.floor() zaokrouhlí číslo směrem dolů na nejbližší celé číslo.)
      this.currentAnimal = this.selectAnimals[randomIndex]; // Vybere zvíře dle náhodného indexu
      }
      else
      {
      // pokud pole this.selectAnimals neobsahuje žádné objekty (zvířata)
        this.selectRandomAnimals(); // Funkce výběre náhodně 6 zvířat z pole this.animals
        if (this.selectAnimals.length > 0) {
          // pokud pole this.selectAnimals obsahuje nějáké objekty (zvířata), bude jeho délka větší než 0
          this.currentRandomAnimal(); // funkce spustí sama sebe
          this.openDialog(); // otevře z komponenty App.vue Dialogové okno - Go!
        }
        else {
          console.log("Výběr 6 náhodných zvířat selhal, není možné provést náhodný výběr jednoho zvířete z tohoto pole");
        }
      }
    },


    // funkce otestuje jestli klik na určité zvíře odpovídá přehrávanému zvuku zvířete
    testAnAnimal(id: number) {
      if (this.currentAnimal && this.currentAnimal.id === id) {
        console.log('Správné zvíře!');
        this.soundAnimalstop(); // funkce, zastaví zvuk zvířete, který se přehrává
        const myFilter=this.selectAnimals.filter((animal)=>{
        return animal.id !== id; // myFilter bude obsahovat všechny zvířata, kromně toho, který má id == tomu id, které bylo zasláno do funkce
        }); // odfiltrování zvířete, který má id, které bylo zasláno do funkce
        this.selectAnimals=myFilter; // přepsání pole s náhodnými zvířaty, polem, který neobsahuje již správně určené zvíře
        this.currentRandomAnimal(); // Funkce vybere náhodného zvířete z pole this.selectAnimals do pole this.currentAnimal
        this.soundAnimalplay(); // funkce přehraje zvuk zvířete, které se má označit pomocí jeho obrázku
      } else {
          console.log('Špatné zvíře.');
          document.body.style.backgroundColor="red"; // nastaví background-color body na red
          setTimeout(()=>{
            document.body.style.backgroundColor="black"; // vrátí background-color body na default hodnotu
          },500); // vrátí background-color body na default hodnotu za čas odpovídající transition v CSS
        }
    },

    // funkce přehraje zvuk zvířete, které se má označit pomocí jeho obrázku
    soundAnimalplay(){
      this.soundAnimalstop(); // funkce, pokud by se zvuk zvířete přehrával, nejprve tento zvuk zastaví
      if (this.currentAnimal!==null){
      // pokud není objekt this.currentAnimal === null, tedy byl naplněn potřebnými parametry
      this.sound.src=this.currentAnimal.mp3;
      this.sound.loop=true; // zajistí opakující se smyčku přehrávání zvuku
      this.sound.play(); // aktivuje přehrávání zvuku
      }
      else
      {
      console.log("se zvukem se nedalo pracovat - this.currentAnimal===null");
      }
    },

    //  funkce zastaví zvuk zvířete, které se má označit pomocí jeho obrázku
    soundAnimalstop(){
    // Zkontrolujeme, jestli se přehrává zvuk zvířete
      if (!this.sound.paused) {
      this.sound.pause(); // zastaví přehrávání zvuku
      }
    },
    // přidání dialog HTML ELEMENTU do store Pinia, aby se následně tento HTML element mohl používat vrámci pinia (inicializace je z App.vue)
    setDialog(dialog: HTMLDialogElement) {
      this.dialog = dialog; // Přiřadíme dialogový element do proměnné this.dialog
    },
    openDialog() {
      if (this.dialog) {
        this.dialog.showModal(); // Otevřeme dialog Go! v App.vue
      } else {
        console.error("Dialog není inicializován!");
      }
    }
  },


  
  getters: {}
});

