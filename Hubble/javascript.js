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

// 🔐 Inserisci qui la tua API Key Google Gemini
const API_KEY = "AIzaSyAhGKxYoaq1q1vIItjx8bCfZHDUtCRtX9o"; // Sostituisci con la tua API key

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
}

// Invio con Enter - CORRETTO
inputField.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleUserInput();
  }
});

// Funzione principale per gestire l'input dell'utente - UNIFICATA E CORRETTA
function handleUserInput() {
  const message = inputField.value.trim();
  if (!message) return;

  // Se è il primo messaggio, nascondi il contenuto iniziale
  if (isFirstMessage) {
    hideInitialContent();
    isFirstMessage = false;
  }

  // Aggiungi il messaggio dell'utente
  addMessage(message, false);
  
  // Pulisci il campo input
  inputField.value = '';
  
  // Simula l'indicatore "sta scrivendo" prima di mostrare la risposta
  simulateTyping(async () => {
    try {
      const risposta = await getBotResponse(message);
      simulateBotResponse(risposta);
    } catch (error) {
      console.error('Errore:', error);
      addMessage("Mi dispiace, si è verificato un errore. Riprova più tardi.", true);
    }
  });
}

function hideInitialContent() {
  if (discoveryCards) {
    discoveryCards.classList.add('hidden');
    setTimeout(() => {
      discoveryCards.style.display = 'none';
    }, 500);
  }
  
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
  
  chatSection.classList.add('chat-active');
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
  }, 1200);
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
  }, 30);
}

// 🔁 Funzione API aggiornata per Google Gemini
async function getBotResponse(msg) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Sei Hubble, un assistente virtuale esperto in astronomia e scienze spaziali. 

REGOLE IMPORTANTI:
- Risposte BREVI e CONCISE (massimo 2-3 frasi)
- Linguaggio SEMPLICE e diretto
- Evita spiegazioni troppo tecniche
- Vai subito al punto
- Usa un tono amichevole ma essenziale

Domanda: ${msg}

Rispondi in modo breve e chiaro:`
            }]
          }],
          generationConfig: {
            temperature: 0.6,
            maxOutputTokens: 200,
            topP: 0.8,
            topK: 40
          }
        })
      }
    );

    const data = await response.json();
    
    if (data && data.candidates && data.candidates.length > 0) {
      const content = data.candidates[0].content;
      if (content && content.parts && content.parts.length > 0) {
        return content.parts[0].text;
      }
    }
    
    return "Mi dispiace, non ho capito la domanda. Potresti riformularla?";
    
  } catch (error) {
    console.error("Errore nella richiesta API:", error);
    return "Si è verificato un errore nel contattare l'AI. Riprova più tardi.";
  }
}