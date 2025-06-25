function inserisciTesto(testo) {
      document.getElementById("campoDomanda").value = testo;
      // Opzionale: focus sul campo input dopo l'inserimento
      document.getElementById("campoDomanda").focus();
      
      // Se è il primo messaggio, attiva l'invio automatico
      if (isFirstMessage) {
        handleUserInput();
      }
    }

  // Loader
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
          document.getElementById('loader').style.display = 'none';
        }, 500);
      }, 1500);
    });

    // Invio con Enter
    document.getElementById("campoDomanda").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleUserInput();
      }
    });

    let isFirstMessage = true; // Flag per il primo messaggio

    function handleUserInput() {
      const input = document.getElementById('campoDomanda');
      const message = input.value.trim();
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

      input.value = '';
    }

    function hideInitialContent() {
      const containerProva = document.querySelector('.containerProva');
      if (containerProva) {
        containerProva.classList.add('hidden');
        // Rimuovi completamente l'elemento dopo l'animazione
        setTimeout(() => {
          containerProva.style.display = 'none';
        }, 500);
      }
    }

    function addMessage(text, isBot) {
      const msgDiv = document.createElement('div');
      msgDiv.className = isBot ? 'bot-message' : 'user-message';
      msgDiv.innerText = text;
      document.getElementById('chatMessages').appendChild(msgDiv);
      document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    function simulateTyping(callback) {
      const typingEl = document.createElement('div');
      typingEl.classList.add('typing-indicator');
      typingEl.textContent = 'Hubble sta pensando...';
      document.getElementById('chatMessages').appendChild(typingEl);
      document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;

      setTimeout(() => {
        typingEl.remove();
        callback();
      }, 1200); // Durata dell'indicatore "sta scrivendo"
    }

    function simulateBotResponse(text) {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('bot-message');
      document.getElementById('chatMessages').appendChild(msgDiv);

      let i = 0;
      const typingInterval = setInterval(() => {
        msgDiv.textContent += text[i];
        i++;
        if (i >= text.length) {
          clearInterval(typingInterval);
        }
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
      }, 30); // Velocità effetto macchina da scrivere
    }

    function getBotResponse(msg) {
      msg = msg.toLowerCase();

      if (msg.includes('ciao')) return 'Ciao! Come posso aiutarti?';
      if (msg.includes('come stai')) return 'Sto bene, grazie!';
      if (msg.includes('buco nero')) return 'È una regione dello spazio dove la gravità è così forte che nulla può sfuggire, nemmeno la luce. Si forma dopo il collasso di una stella molto massiccia.';
      if (msg.includes('stella')) return 'Una stella nasce da una nube di gas e polveri chiamata nebulosa, che collassa su sé stessa a causa della gravità fino ad accendersi per fusione nucleare.';
      if (msg.includes('galassie')) return 'Le galassie sono enormi gruppi di stelle, gas, polveri e materia oscura. La nostra, la Via Lattea, ne contiene più di 100 miliardi.';
      if (msg.includes('luna') && msg.includes('forma')) return 'La Luna cambia forma apparente perché vediamo porzioni diverse della sua superficie illuminate dal Sole durante il suo movimento attorno alla Terra.';
      if (msg.includes('eclissi')) return 'Succede quando la Luna si posiziona esattamente tra la Terra e il Sole, oscurandolo completamente per alcuni minuti in alcune zone del pianeta.';
      if (msg.includes('distanza')) return 'Si usano unità come l\'anno luce (distanza che la luce percorre in un anno: circa 9.460 miliardi di km) o i parsec.';
      if (msg.includes('meteora') || msg.includes('cometa')) return 'Una meteora è un piccolo frammento che brucia entrando nell\'atmosfera. Una cometa è un corpo ghiacciato che orbita e forma una coda visibile.';
      if (msg.includes('pianeti giganti')) return 'Si formano lontano dalla stella madre, dove è possibile accumulare gas e materiali. Sono composti principalmente da idrogeno ed elio.';
      if (msg.includes('via lattea')) return 'È la galassia a spirale in cui si trova il nostro sistema solare. Ha un diametro di circa 100.000 anni luce e miliardi di stelle.';
      if (msg.includes('muto') || msg.includes('silenzioso')) return 'Perché nello spazio non c\'è aria o materia sufficiente a trasmettere onde sonore. È letteralmente un vuoto silenzioso.';
      if (msg.includes('che ore sono')) return new Date().toLocaleTimeString('it-IT');

      return "Mi dispiace, non ho capito.";
    }


      /* SIDE BAR */

const openBtn = document.getElementById('toggleOpenSidebar');
const closeBtn = document.getElementById('toggleCloseSidebar');
const sidebar = document.getElementById('sidebarMenu');
const main = document.getElementById('mainContent');

openBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
  openBtn.style.display = 'none';
  closeBtn.style.display = 'inline-block';
  main.classList.add('sidebar-active');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
  openBtn.style.display = 'inline-block';
  closeBtn.style.display = 'none';
  main.classList.remove('sidebar-active');
});