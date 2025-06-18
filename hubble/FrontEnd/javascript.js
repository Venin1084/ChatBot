function inserisciTesto(testo) {
      document.getElementById("campoDomanda").value = testo;
    }

    const slider = document.getElementById('slider');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const scrollAmount = 150;

    prev.addEventListener('click', () => {
      slider.scrollLeft -= scrollAmount;
    });
    next.addEventListener('click', () => {
      slider.scrollLeft += scrollAmount;
    });

    // Invio con Enter
    document.getElementById("campoDomanda").addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleUserInput();
      }
    });

    function handleUserInput() {
      const input = document.getElementById('campoDomanda');
      const message = input.value.trim();
      if (!message) return;

      addMessage(message, false);
      const risposta = getBotResponse(message);
      addMessage(risposta, true);

      input.value = '';
    }

    function addMessage(text, isBot) {
      const msgDiv = document.createElement('div');
      msgDiv.className = isBot ? 'bot-message' : 'user-message';
      msgDiv.innerText = text;
      document.getElementById('chatMessages').appendChild(msgDiv);
      document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    function getBotResponse(msg) {
      msg = msg.toLowerCase();

      if (msg.includes('ciao')) return 'Ciao! Come posso aiutarti?';
      if (msg.includes('come stai')) return 'Sto bene, grazie!';
      if (msg.includes('buco nero')) return 'È una regione dello spazio dove la gravità è così forte che nulla può sfuggire, nemmeno la luce. Si forma dopo il collasso di una stella molto massiccia.';
      if (msg.includes('stella')) return 'Una stella nasce da una nube di gas e polveri chiamata nebulosa, che collassa su sé stessa a causa della gravità fino ad accendersi per fusione nucleare.';
      if (msg.includes('galassie')) return 'Le galassie sono enormi gruppi di stelle, gas, polveri e materia oscura. La nostra, la Via Lattea, ne contiene più di 100 miliardi.';
      if (msg.includes('luna') && msg.includes('forma')) return 'La Luna cambia forma apparente perché vediamo porzioni diverse della sua superficie illuminate dal Sole durante il suo movimento attorno alla Terra.';
      if (msg.includes('eclissi')) return 'Succede quando la Luna si posiziona esattamente tra la Terra e il Sole, oscurandolo completamente per alcuni minuti.';
      if (msg.includes('distanza')) return 'Si usano unità come l’anno luce o i parsec per misurare distanze nello spazio.';
      if (msg.includes('meteora') || msg.includes('cometa')) return 'Una meteora è un piccolo frammento che brucia entrando nell’atmosfera. Una cometa è un corpo ghiacciato che orbita e forma una coda visibile.';
      if (msg.includes('pianeti giganti')) return 'Si formano lontano dalla stella madre, dove è possibile accumulare gas e materiali.';
      if (msg.includes('via lattea')) return 'È la galassia a spirale in cui si trova il nostro sistema solare.';
      if (msg.includes('muto') || msg.includes('silenzioso')) return 'Perché nello spazio non c’è aria o materia sufficiente a trasmettere onde sonore.';
      if (msg.includes('che ore sono')) return new Date().toLocaleTimeString('it-IT');

      return "Mi dispiace, non ho capito.";
    }