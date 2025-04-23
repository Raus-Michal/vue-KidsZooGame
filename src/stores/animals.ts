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
    dialog: null as HTMLDialogElement | null, // Přidáme dialog, který bude po inicializaci zastupovat HTML element Dialog GO! z App.vue
    sound_play:false as boolean, // proměnná hlídá, zda se přehrává zvuk (true===zvuk se přehrává; false===zvuk byl zastaven), díky tomu vypíná a zapíná buttony v template SoundController
    go:false as boolean, // proměnná určuje, zda bylo zmáčknuto tlačítko Go!, pokud ano===true, pokud ne===false
    krytActive: false as boolean // stavová proměnná pro „kryt“, který překrývá celou aplikaci a zamezuje dočasně uživateli do ní klikat (true===active, false===deactive)
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
      if(this.go) {
        // pokud bylo aktivován button Go!
        this.soundAnimalplay(); // funkce přehraje zvuk zvířete, které se má označit pomocí jeho obrázku
      }
      }
      else
      {
      // pokud pole this.selectAnimals neobsahuje žádné objekty (zvířata)
      this.go=false; // určí, že bude otevřen button Go!
      this.selectRandomAnimals(); // Funkce výběre náhodně 6 zvířat z pole this.animals
      if (this.selectAnimals.length > 0) {
          // pokud pole this.selectAnimals obsahuje nějáké objekty (zvířata), bude jeho délka větší než 0
        this.soundAnimalstop(); // funkce, pokud by se zvuk zvířete přehrával, nejprve tento zvuk zastaví
        this.openDialog(); // otevře z komponenty App.vue Dialogové okno - Go!
        }
      else {
        console.log("Výběr 6 náhodných zvířat selhal, není možné provést náhodný výběr jednoho zvířete z tohoto pole");
        }
      }
    },


    // funkce otestuje jestli klik na určité zvíře odpovídá přehrávanému zvuku zvířete
    async testAnAnimal(id: number) {
      if (this.currentAnimal && this.currentAnimal.id === id) {
        console.log('Správné zvíře!');
        this.soundAnimalstop(); // funkce, zastaví zvuk zvířete, který se přehrává
        await this.spustAnimaci(id); // spustí asynchronní animaci buttonu se správně vybraným zvířetem
        const myFilter=this.selectAnimals.filter((animal)=>{
        return animal.id !== id; // myFilter bude obsahovat všechny zvířata, kromně toho, který má id == tomu id, které bylo zasláno do funkce
        }); // odfiltrování zvířete, který má id, které bylo zasláno do funkce
        this.selectAnimals=myFilter; // přepsání pole s náhodnými zvířaty, polem, který neobsahuje již správně určené zvíře
        this.currentRandomAnimal(); // Funkce vybere náhodného zvířete z pole this.selectAnimals do pole this.currentAnimal
      } else {
          console.log('Špatné zvíře.');
          const app=document.getElementById("app") as HTMLElement; // tělo Vue aplikace
          if(app) {
            // pokud HTML element existuje
            const bodyStyleBackgroundColor:string = window.getComputedStyle(document.body,null).getPropertyValue("background-color"); // načte hodnotu bacground-color body z CSS, vestavěná funkce getComputedStyle umí číst z CSS stylu
            const appStyleBackgroundColor:string = window.getComputedStyle(app,null).getPropertyValue("background-color"); // načte hodnotu bacground-color id="app" z CSS, vestavěná funkce getComputedStyle umí číst z CSS stylu
            this.setKrytActive(true); // aktivuje kryt, aby uživatel nemohl dočasně klikat do aplikace po dobu animace

            app.style.backgroundColor="red"; // změní barvu pozadí těla Vue aplikace
            document.body.style.backgroundColor="red"; // nastaví background-color body na red
            setTimeout(()=>{
              app.style.backgroundColor=appStyleBackgroundColor; // změní barvu pozadí těla Vue aplikace
              document.body.style.backgroundColor=bodyStyleBackgroundColor; // vrátí background-color body na default hodnotu
              this.setKrytActive(false); // deaktivuje kryt, aby uživatel po dokončení animace mohl klikat do aplikace
            },500); // vrátí background-color body na default hodnotu za čas odpovídající transition v CSS
          }
        }
    },

    // funkce přehraje zvuk zvířete, které se má označit pomocí jeho obrázku
    soundAnimalplay(){
      if (this.currentAnimal!==null){
        // pokud není objekt this.currentAnimal === null, tedy byl naplněn potřebnými parametry
        this.sound.src=this.currentAnimal.mp3;
        this.sound.loop=true; // zajistí opakující se smyčku přehrávání zvuku
        if (!this.sound_play) {
          // pokud se zvuk nepřehrává
          this.sound.play(); // aktivuje přehrávání zvuku
          this.sound_play=true; // proměnná hlídá, zda se přehrává zvuk (true===zvuk se přehrává; false===zvuk byl zastaven), díky tomu vypíná a zapíná buttony v template SoundController
        }
        else {
          // pokud se zvuk přehrává
          this.soundAnimalstop(); // zastaví zvuk přehrávání
          setTimeout(()=>{
          this.soundAnimalplay(); // zapne zvuk přehrávání
          },500); // pokusí se za 500 ms zapnout zvuk přehrávání
        }
      }
      else {
        console.log("se zvukem se nedalo pracovat - this.currentAnimal===null");
      }
    },

    //  funkce zastaví zvuk zvířete, které se má označit pomocí jeho obrázku
    soundAnimalstop(){
    // Zkontrolujeme, jestli se přehrává zvuk zvířete
      if (this.sound_play) {
        // pokud se zvuk přehrává
        this.sound.pause(); // zastaví přehrávání zvuku
        this.sound_play=false; // proměnná hlídá, zda se přehrává zvuk (true===zvuk se přehrává; false===zvuk byl zastaven), díky tomu vypíná a zapíná buttony v template SoundController
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
    },
    setKrytActive(active: boolean) {
    // funkce zajišťuje změnu proměnné this.krytActive a tím mění aktivaci, nebo deaktivaci krytu
      this.krytActive = active; // nastaví proměnnou na true anebo false
    },
    async spustAnimaci(id:number): Promise<void> {
      const element = document.getElementById(`button-${id}`) as HTMLButtonElement | null; // Najde požadovaný button
      if (element) {
        await this.vykonejAnimaci(element); // Počkejte na dokončení animace
        console.log("Animace dokončena!"); // Tento kód se spustí až po animaci
      } else {
        console.error("Element s ID 'mojeAnimace' nebyl nalezen.");
      }
    },

    async vykonejAnimaci(element: HTMLButtonElement): Promise<void> {
      return new Promise((resolve) => {
        if (element) {
          this.setKrytActive(true); // aktivuje kryt, aby uživatel nemohl dočasně klikat do aplikace po dobu animace

          // Získání aktuální velikosti viewportu
          const vyska_obrazovky = window.innerHeight; // výška viewportu
          const sirka_obrazovky = window.innerWidth; // šířka viewportu
          const vyska_buttonu_default = element.clientHeight; // původní výška butttonu v px
          const sirka_buttonu_default = element.clientWidth; // původní šířka butttonu v px
          const odsazeni = 16; // Okrajový prostor
    
          // Zajistíme, že button bude vždy čtvercový a nepřeroste obrazovku
          let velikost_buttonu = Math.min(sirka_obrazovky, vyska_obrazovky) - (2 * odsazeni);
          if (velikost_buttonu < 32) velikost_buttonu = 32; // Zabránění příliš malému buttonu
    
          // Výpočet pozice pro správné vycentrování
          const top = Math.max((vyska_obrazovky - velikost_buttonu) / 2, odsazeni);
          const left = Math.max((sirka_obrazovky - velikost_buttonu) / 2, odsazeni);
    
          console.log(`top: ${top}, left: ${left}, velikost buttonu: ${velikost_buttonu}`);
    
          // Nastavení stylů ANIMACE pro button
          element.style.position = "absolute";
          element.style.zIndex = "9";
          element.style.top = `${top}px`;
          element.style.left = `${left}px`;
          element.style.width = `${velikost_buttonu}px`;
          element.style.height = `${velikost_buttonu}px`;
          element.style.backgroundColor = "green";
          element.style.padding = "4rem";
          // Konec: Nastavení stylů ANIMACE pro button
          
          setTimeout(()=>{
            // Odstranění stylů ANIMACE pro button
            element.style.backgroundColor = "transparent"; // default hodnota CSS
            element.style.width = `${sirka_buttonu_default}px`; // nastaví default šířku buttonu
            element.style.height = `${vyska_buttonu_default}px`; // nastaví default výšku buttonu
            element.style.position = "static"; // default hodnota CSS
            element.style.zIndex = "auto"; // default hodnota CSS
            element.style.padding = "1rem"; // default hodnota CSS
            // Konec: Odstranění stylů ANIMACE pro button
            this.setKrytActive(false); // deaktivuje kryt, aby uživatel po dokončení animace mohl klikat do aplikace
            resolve(); // ukončení promise
          },1250); // Čekáme 1250 ms před pokračováním
        } else {
          resolve(); // ukončení promise
        }
      });
    }
    

  },

  
  
  getters: {}
});

