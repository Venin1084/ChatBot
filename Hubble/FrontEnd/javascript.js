    // Loader
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loader').style.display = 'none';
        }, 500);
      }, 1500);
    });

// Toggle sidebar open/close buttons
const toggleOpenBtn = document.getElementById('toggleOpenSidebar');
const toggleCloseBtn = document.getElementById('toggleCloseSidebar');
const resetChatBtn = document.getElementById('resetChat');
const sidebar = document.getElementById('sidebarMenu');
const chatMessages = document.getElementById('chatMessages');
const inputField = document.getElementById('campoDomanda');
const searchWrapper = document.getElementById('searchWrapper');
const mainContent = document.getElementById('mainContent');
const botName = document.querySelector('.botName');
const welcomeMessage = document.querySelector('.welcome-message');
const discoveryCards = document.querySelector('.discovery-cards');
const chatSection = document.querySelector('.chatSection');

// Variabile per tracciare il primo messaggio
let isFirstMessage = true;

// Funzione per aprire la sidebar
toggleOpenBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  toggleOpenBtn.style.display = 'none';
  toggleCloseBtn.style.display = 'block';
  mainContent.classList.add('sidebar-active');
});

// Funzione per chiudere la sidebar
toggleCloseBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  toggleCloseBtn.style.display = 'none';
  toggleOpenBtn.style.display = 'block';
  mainContent.classList.remove('sidebar-active');
});

// Funzione per resettare la chat
resetChatBtn.addEventListener('click', resetChat);

function resetChat() {
  // Pulisci i messaggi della chat
  chatMessages.innerHTML = '';
  chatMessages.classList.remove('active');
  searchWrapper.classList.remove('active');
  
  // Ripristina il contenuto iniziale
  if (botName) {
    botName.style.display = 'inline-block';
    botName.classList.remove('hidden');
  }
  
  if (welcomeMessage) {
    welcomeMessage.style.display = 'block';
    welcomeMessage.classList.remove('hidden');
  }
  
  if (discoveryCards) {
    discoveryCards.style.display = 'grid';
    discoveryCards.classList.remove('hidden');
  }
  
  chatSection.classList.remove('chat-active');
  isFirstMessage = true;
}

// Funzione per inserire testo nel campo di input
function inserisciTesto(testo) {
  inputField.value = testo;
  inputField.focus();
  
  // Rimosso l'invio automatico - ora bisogna premere invio manualmente
}

// Invio con Enter
inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleUserInput();
  }
});

function handleUserInput() {
  const message = inputField.value.trim();
  if (!message) return;

  // Se è il primo messaggio, nascondi il contenuto iniziale
  if (isFirstMessage) {
    hideInitialContent();
    isFirstMessage = false;
  }

  addMessage(message, false);
  
  // Simula l'indicatore "sta scrivendo" prima di mostrare la risposta
  simulateTyping(() => {
    const risposta = getBotResponse(message);
    simulateBotResponse(risposta);
  });

  inputField.value = '';
}

function hideInitialContent() {
  if (discoveryCards) {
    discoveryCards.classList.add('hidden');
    // Rimuovi completamente l'elemento dopo l'animazione
    setTimeout(() => {
      discoveryCards.style.display = 'none';
    }, 500);
  }
  
  // Nascondi anche il titolo Hubble e il messaggio di benvenuto
  if (botName) {
    botName.classList.add('hidden');
    setTimeout(() => {
      botName.style.display = 'none';
    }, 500);
  }
  
  if (welcomeMessage) {
    welcomeMessage.classList.add('hidden');
    setTimeout(() => {
      welcomeMessage.style.display = 'none';
    }, 500);
  }
  
  // Aggiungi la classe per modificare il margin-top della chat
  chatSection.classList.add('chat-active');
  
  // Attiva la chat
  chatMessages.classList.add('active');
  searchWrapper.classList.add('active');
}

function addMessage(text, isBot) {
  const msgDiv = document.createElement('div');
  msgDiv.className = isBot ? 'bot-message' : 'user-message';
  msgDiv.innerText = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateTyping(callback) {
  const typingEl = document.createElement('div');
  typingEl.classList.add('typing-indicator');
  typingEl.textContent = 'Hubble sta pensando...';
  chatMessages.appendChild(typingEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    typingEl.remove();
    callback();
  }, 1200); // Durata dell'indicatore "sta scrivendo"
}

function simulateBotResponse(text) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('bot-message');
  chatMessages.appendChild(msgDiv);

  let i = 0;
  const typingInterval = setInterval(() => {
    msgDiv.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typingInterval);
    }
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 30); // Velocità effetto macchina da scrivere
}

// Funzione getBotResponse adattata dal chatbot.js originale
function getBotResponse(msg) {
  msg = msg.toLowerCase();

  // Saluti e conversazione base
  if (msg.includes('ciao')) return 'Ciao! Come posso aiutarti a esplorare l\'universo?';
  if (msg.includes('come stai')) return 'Sto bene, grazie! Pronto per un viaggio tra le stelle!';
  
  // Domande astronomiche specifiche dal chatbot.js
  if (msg.includes('cos\'è un buco nero nello spazio profondo') || msg.includes('buco nero')) {
    return 'È una regione dello spazio dove la gravità è così forte che nulla può sfuggire, nemmeno la luce. Si forma dopo il collasso di una stella molto massiccia.';
  }
  
  if (msg.includes('come nasce una stella nell\'universo') || (msg.includes('stella') && msg.includes('nasce'))) {
    return 'Una stella nasce da una nube di gas e polveri chiamata nebulosa, che collassa su sé stessa a causa della gravità fino ad accendersi per fusione nucleare.';
  }
  
  if (msg.includes('cosa sono le galassie esattamente') || msg.includes('galassie')) {
    return 'Le galassie sono enormi gruppi di stelle, gas, polveri e materia oscura. La nostra, la Via Lattea, ne contiene più di 100 miliardi.';
  }
  
  if (msg.includes('perché la luna cambia forma visibile') || (msg.includes('luna') && msg.includes('forma'))) {
    return 'La Luna cambia forma apparente perché vediamo porzioni diverse della sua superficie illuminate dal Sole durante il suo movimento attorno alla Terra.';
  }
  
  if (msg.includes('che cos\'è un\'eclissi solare totale') || msg.includes('eclissi solare')) {
    return 'Succede quando la Luna si posiziona esattamente tra la Terra e il Sole, oscurandolo completamente per alcuni minuti in alcune zone del pianeta.';
  }
  
  if (msg.includes('come si misura la distanza spaziale') || (msg.includes('distanza') && msg.includes('spaziale'))) {
    return 'Si usano unità come l\'anno luce (distanza che la luce percorre in un anno: circa 9.460 miliardi di km) o i parsec.';
  }
  
  if (msg.includes('che differenza c\'è tra meteora e cometa') || (msg.includes('meteora') && msg.includes('cometa'))) {
    return 'Una meteora è un piccolo frammento che brucia entrando nell\'atmosfera. Una cometa è un corpo ghiacciato che orbita e forma una coda visibile.';
  }
  
  if (msg.includes('come si formano i pianeti giganti') || (msg.includes('pianeti') && msg.includes('giganti'))) {
    return 'Si formano lontano dalla stella madre, dove è possibile accumulare gas e materiali. Sono composti principalmente da idrogeno ed elio.';
  }
  
  if (msg.includes('che cos\'è la via lattea galattica') || msg.includes('via lattea')) {
    return 'È la galassia a spirale in cui si trova il nostro sistema solare. Ha un diametro di circa 100.000 anni luce e miliardi di stelle.';
  }
  
  if (msg.includes('perché lo spazio è completamente muto') || (msg.includes('spazio') && msg.includes('muto'))) {
    return 'Perché nello spazio non c\'è aria o materia sufficiente a trasmettere onde sonore. È letteralmente un vuoto silenzioso.';
  }

  // Ora e default
  if (msg.includes('che ore sono')) return 'Sono le ' + new Date().toLocaleTimeString('it-IT') + ' qui sulla Terra!';
  
  return "Mi dispiace, non ho capito. Prova a chiedermi qualcosa sull'astronomia!";
}


