// TASTS:

// 1) Capire quante celle generare per il mese corrente (dovrà funzionare per OGNI mese, non solo quello corrente) (bisogna considerare gli anni bisestili)

// 2) Con il numero esatto, trovato in precedenza, di giorni in questo mese dobbiamo generare il numero corrispondente di celle nel calendario

// 3) Il giorno corrente dovrebbe "illuminarsi"

// 4) Visualizzare il nome del mese nell'h1

// 5) Rendere cliccabili le celle per poter salvare gli appuntamenti in quel dato giorno (applicare un bordo alla selezione)

// _____________________________________________________________________________________________________________________________

// 1) abbiamo il valore numerico, di nr di giorni in questo mese, in uscita dalla funzione daysInThisMonth
const now = new Date(); // estrae il momento nel tempo attuale in cui si esegue in forma di data

const daysInThisMonth = () => {
  // versione estesa:
  const getYear = now.getFullYear(); // 2024
  const getMonth = now.getMonth(); // 1 per Febbraio (alla data attuale di registrazione)

  const lastDayDate = new Date(getYear, getMonth + 1, 0); // anno attuale, mese attuale + 1, giorno zero (ultimo giorno mese precedente)
  const lastDayOfThisMonth = lastDayDate.getDate(); // mi torna indietro SOLO il numero del giorno (l'ultmio del mese corrente)
  return lastDayOfThisMonth; // 29 (nel mese attuale)

  // si può riassumere in questa forma:
  // return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
};

// 2) creazione dinamica delle celle in base al numero di giorni in arrivo come parametro
const createDays = days => {
  const calendar = document.getElementById("calendar");

  for (let i = 0; i < days; i++) {
    // generiamo le nostre celle per ogni giorno...

    const dayCellDiv = document.createElement("div"); // creo un nuovo div vuoto
    dayCellDiv.className = "day"; // gli assegno la classe che dovrà avere, si poteva fare anche con un .classList.add("day")

    const dayCellH3 = document.createElement("h3");
    dayCellH3.innerText = i + 1; // aggiungo il numero del giorno in base 1 all'h3

    const today = now.getDate(); // verifichiamo l'effetivo numero del giorno di oggi, a partire dalla data precedentemente estratta (vedi sopra)

    if (i + 1 === today) {
      // confrontiamo il numero del ciclo +1 con il numero del giorno,
      // se matchano vogliamo colorare la cella che viene creata in questo ciclo, prima che venga inserita nel DOM
      dayCellH3.classList.add("color-epic"); // applichiamo una classe già definita nel nostro CSS
    }

    dayCellDiv.appendChild(dayCellH3);
    calendar.appendChild(dayCellDiv);
  }
};

// 4)
const monthNames = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

const printCurrentMonthInH1 = () => {
  const title = document.querySelector("h1");
  const monthIndex = now.getMonth();
  const monthName = monthNames[monthIndex];
  title.innerText = monthName;
};

// 👇👇👇 punto di ingresso del nostro codice
window.onload = function () {
  // tutte le risorse sono a questo punto già caricate nel browser
  // è il momento più sicuro per cominciare a cercare gli elementi nel DOM
  printCurrentMonthInH1();

  const numberOfDays = daysInThisMonth(); // 29
  createDays(numberOfDays); // createDays(29)
};

// window.addEventListener("DOMContentLoaded", function () {
//   const calendar = document.getElementById("calendar");
//   console.log("DOMContentLoaded", calendar);
// });

// const calendar = document.getElementById("calendar");
// console.log("Root Context", calendar);
