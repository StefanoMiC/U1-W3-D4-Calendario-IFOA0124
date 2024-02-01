// TASTS:

// ✅ 1) Capire quante celle generare per il mese corrente (dovrà funzionare per OGNI mese, non solo quello corrente) (bisogna considerare gli anni bisestili)

// ✅ 2) Con il numero esatto, trovato in precedenza, di giorni in questo mese dobbiamo generare il numero corrispondente di celle nel calendario

// ✅ 3) Il giorno corrente dovrebbe "illuminarsi"

// ✅ 4) Visualizzare il nome del mese nell'h1

// ✅ 5) Rendere cliccabili le celle per poter salvare gli appuntamenti in quel dato giorno (applicare un bordo alla selezione)

// ________________________________

// ✅ 6) Modificare il meeting day alla selezione di un giorno

// 7) Salvare un appuntamento con l'ora e una stringa sempre per il giorno selezionato

// 8) devo poter selezionare altri giorni, potendo inserire un appuntamento per loro, pur mantenendo la possibilità di RIVEDERE appuntamenti già creati su altri giorni

// extra 9) un giorno contenente un appuntamento dovrà riflettere questo stato con un pallino colorato dentro la cella

// _____________________________________________________________________________________________________________________________

// 7a)
const appointments = [];

/* vedi ciclo for per la generazione delle celle interne dell'array
[
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], [], [], [], [], [], [], 
    [], 
] 
*/

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

// 5b) deselezionare eventuali altri elementi selezionati
const unselectPreviousDay = () => {
  // funzione chiamata dentro all'onclick della singola cella dentro a createDays
  const previouslySelected = document.querySelector(".selected");
  console.log("previouslySelected", previouslySelected);
  if (previouslySelected) {
    // se finiamo qui, verosimilmente dal secondo click in poi, rimuoveremo la classe all'elemento trovato
    console.log("abbiamo trovato un precedente elemento selezionato", previouslySelected);
    previouslySelected.classList.remove("selected");
  }
};

// 6) cambiare numero in newMeetingDay
const changeDayNumber = dayNumber => {
  // dayNumber è l'indice che arriva dal for loop (vedi esecuzione della funzione in basso)
  const dayNumberSpan = document.getElementById("newMeetingDay");
  dayNumberSpan.classList.add("hasDay");
  dayNumberSpan.innerText = dayNumber;
};

// 8) creo una funzione per gestire la visualizzazione dei miei appuntamenti
const showAppointments = dayIndex => {
  // questa funzione si occuperà di:
  // - prelevare gli appuntamenti (stringhe) dalla cella dell'array corrispondente tramite dayIndex

  const appointmentsPerDay = appointments[dayIndex]; // array del giorno selezionato

  // elemento <ul> già presente nella pagina che aspetta gli elementi della lista da visualizzare
  const ulForAppointments = document.getElementById("appointmentsList");
  ulForAppointments.innerHTML = ""; // svuotiamo la lista ad ogni avvio della funzione (per evitare di vedere dati non corrispondenti al giorno selezionato, quindi vecchi)

  // se l'array del giorno contiene appuntamenti, quindi stringhe, ciclalo e crea per ogni stringa un <li>, da inserire poi nella sua <ul>
  appointmentsPerDay.forEach(appointmentStr => {
    const li = document.createElement("li");
    li.innerText = appointmentStr;
    ulForAppointments.appendChild(li);
  });

  // la sezione è nascosta di default dal CSS, andiamo a cambiargli la proprietà display per vederla:
  const appointmentsContainer = document.getElementById("appointments");
  appointmentsContainer.style.display = "block";
};

// 7c) salvare appuntamento
const saveMeeting = function (e) {
  // da fare sempre per una funzione collegata al submit di un form
  e.preventDefault();
  // se siamo qua il bottone save meeting è stato cliccato e i dati sono sicuramente contenuti nei due input (altrimenti la funzione non parte)
  const meetingTime = document.getElementById("newMeetingTime"); // reference dell'input type "time"
  const meetingName = document.getElementById("newMeetingName"); // reference dell'input type "text"

  const meetingString = meetingTime.value + " — " + meetingName.value;

  const selectedDay = document.getElementById("newMeetingDay").innerText; // stringa col numero del giorno

  // controlliamo che sia selezionato un giorno prima di provare a pushare nel sotto array di appointments
  if (selectedDay !== "Click on a Day") {
    // selectedDay dovrà essere una cifra numerica quindi diversa dalla stringa iniziale
    const dayIndex = parseInt(selectedDay) - 1; // la stringa del numero viene convertita e il numero portato in base 0 per avere l'indice corrispondente al giorno
    // andiamo a selezionare la posizione corrispondente nell'array appointments

    appointments[dayIndex].push(meetingString); // inserimento della stringa nel sotto array corrispondente
    console.log("NEW APPOINTMENTS", appointments);

    meetingTime.value = "";
    meetingName.value = "";

    showAppointments(dayIndex); // abilitiamo la sezione appuntamenti passando l'indice del giorno di cui vogliamo visualizzare gli appuntamenti
  } else {
    // se siamo qui significa che il testo nel newMeetgingDay è ancora "Click on a Day"
    alert("devi selezionare un giorno per procedere");
  }
};

// 2) creazione dinamica delle celle in base al numero di giorni in arrivo come parametro
const createDays = days => {
  const calendar = document.getElementById("calendar");

  for (let i = 0; i < days; i++) {
    // 7b) generiamo le posizioni dell'array globale appointments
    appointments.push([]); // questo mi crea tutte e 29 le celle vuote dentro l'array

    // generiamo le nostre celle per ogni giorno...

    const dayCellDiv = document.createElement("div"); // creo un nuovo div vuoto
    dayCellDiv.className = "day"; // gli assegno la classe che dovrà avere, si poteva fare anche con un .classList.add("day")

    const dayCellH3 = document.createElement("h3");
    dayCellH3.innerText = i + 1; // aggiungo il numero del giorno in base 1 all'h3

    // 5a) su OGNI cella del calendario agganciamo una funzione (eventListener), per tutti specifica e un po' diversa nel contenuto
    // la funzione si eseguirà SOLO SE l'utente cliccherà una cella
    dayCellDiv.onclick = event => {
      console.log(event.currentTarget, i);
      // 5b (vedi sopra)
      unselectPreviousDay();
      event.currentTarget.classList.add("selected");

      changeDayNumber(i + 1);

      // 8b) per ogni click di una cella del calendario controlla se ci sono appuntamenti nello spazio corrispondente all'array appointments
      if (appointments[i].length > 0) {
        // se ci sono, avvia la funzione per gestire la visualizzazione degli appuntamenti, e passagli l'indice dell'elemento cliccato
        showAppointments(i);
      } else {
        // in caso contrario, se l'array del giorno è ancora vuoto, nascondi la sezione appointments
        const appointmentsContainer = document.getElementById("appointments");
        appointmentsContainer.style.display = "none";
      }
    };

    const today = now.getDate(); // verifichiamo l'effetivo numero del giorno di oggi, a partire dalla data precedentemente estratta (vedi sopra)

    // 3) illuminiamo il giorno corrente
    if (i + 1 === today) {
      // confrontiamo il numero del ciclo +1 con il numero del giorno,
      // se matchano vogliamo colorare la cella che viene creata in questo ciclo, prima che venga inserita nel DOM
      dayCellH3.classList.add("color-epic"); // applichiamo una classe già definita nel nostro CSS
    }

    dayCellDiv.appendChild(dayCellH3);
    calendar.appendChild(dayCellDiv);
  }

  console.log("APPOINTMENTS", appointments);
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

  // 7d) prendo il form e gli aggancio la funzione saveMeeting all'evento submit (scatenato dal click sul bottone save meeting)
  const form = document.querySelector("form");
  form.onsubmit = saveMeeting;
};

// window.addEventListener("DOMContentLoaded", function () {
//   const calendar = document.getElementById("calendar");
//   console.log("DOMContentLoaded", calendar);
// });

// const calendar = document.getElementById("calendar");
// console.log("Root Context", calendar);
