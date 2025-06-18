
    function handleUserInput() {
      const input = document.getElementById('campoDomanda');
      const message = input.value.trim();
      if (!message) return false;

      // DOMANDA DELL'UTENTE
      addMessage(message, false);

      // SIMULAZIONE RISPOSTA
      const risposta = getBotResponse(message);
      addMessage(risposta, true);

      input.value = '';
      return false;
    }

    function addMessage(text, isBot) {
      const chat = document.getElementById('chat');
      const div = document.createElement('div');
      div.className = 'bubble';
      const input = document.createElement('input');
      input.type = 'text';
      input.value = text;
      input.disabled = true;
      div.appendChild(input);
      chat.appendChild(div);
      chat.scrollTop = chat.scrollHeight;
    }

    function getBotResponse(msg) {
        msg = msg.toLowerCase();

      if (msg.includes('ciao')) return 'Ciao! Come posso aiutarti?';
      if (msg.includes('come stai')) return 'Sto bene, grazie!';
      if (msg.includes('Cos’è un buco nero nello spazio profondo?')) { return 'È una regione dello spazio dove la gravità è così forte che nulla può sfuggire, nemmeno la luce. Si forma dopo il collasso di una stella molto massiccia.'};
      if (msg.includes('Come nasce una stella nell’universo?')) return 'Una stella nasce da una nube di gas e polveri chiamata nebulosa, che collassa su sé stessa a causa della gravità fino ad accendersi per fusione nucleare';
      if (msg.includes('Cosa sono le galassie esattamente?')) return 'Le galassie sono enormi gruppi di stelle, gas, polveri e materia oscura. La nostra, la Via Lattea, ne contiene più di 100 miliardi.';
      if (msg.includes('Perché la Luna cambia forma visibile?')) return 'La Luna cambia forma apparente perché vediamo porzioni diverse della sua superficie illuminate dal Sole durante il suo movimento attorno alla Terra.';
      if (msg.includes('Che cos’è un’eclissi solare totale?')) return 'Succede quando la Luna si posiziona esattamente tra la Terra e il Sole, oscurandolo completamente per alcuni minuti in alcune zone del pianeta.';
      if (msg.includes('Come si misura la distanza spaziale?')) return 'Si usano unità come l’anno luce (distanza che la luce percorre in un anno: circa 9.460 miliardi di km) o i parsec.';
      if (msg.includes('Che differenza c’è tra meteora e cometa?')) return 'Una meteora è un piccolo frammento che brucia entrando nell’atmosfera. Una cometa è un corpo ghiacciato che orbita e forma una coda visibile';
      if (msg.includes('Come si formano i pianeti giganti?')) return 'Si formano lontano dalla stella madre, dove è possibile accumulare gas e materiali. Sono composti principalmente da idrogeno ed elio';
      if (msg.includes('Che cos’è la Via Lattea galattica?')) return 'È la galassia a spirale in cui si trova il nostro sistema solare. Ha un diametro di circa 100.000 anni luce e miliardi di stelle.';
      if (msg.includes('perche lo spazio e completamente muto')) return 'Perché nello spazio non c’è aria o materia sufficiente a trasmettere onde sonore. È letteralmente un vuoto silenzioso.';







      if (msg.includes('che ore sono')) return new Date().toLocaleTimeString('it-IT');
      return "Mi dispiace, non ho capito.";
    }