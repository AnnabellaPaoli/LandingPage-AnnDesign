var contactForm = document.getElementById('contactForm');
  var contactStatus = document.getElementById('contactStatus');
  var contactSubmit = document.getElementById('contactSubmit');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      var accessKey = contactForm.access_key.value;
      contactStatus.style.display = 'block';
      if(accessKey === 'TU_ACCESS_KEY_AQUI'){
        contactStatus.textContent = 'Falta configurar la Access Key de Web3Forms para que este formulario funcione.';
        contactStatus.style.color = '#b5484c';
        return;
      }
      contactSubmit.disabled = true;
      contactSubmit.textContent = 'Enviando…';
      var formData = new FormData(contactForm);
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      })
      .then(function(res){ return res.json(); })
      .then(function(data){
        contactSubmit.disabled = false;
        contactSubmit.textContent = 'Enviar mensaje';
        if(data.success){
          contactStatus.textContent = 'Gracias — recibí tu mensaje y te responderé pronto.';
          contactStatus.style.color = 'var(--gold-deep)';
          contactForm.reset();
        }else{
          contactStatus.textContent = 'No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.';
          contactStatus.style.color = '#b5484c';
        }
      })
      .catch(function(){
        contactSubmit.disabled = false;
        contactSubmit.textContent = 'Enviar mensaje';
        contactStatus.textContent = 'No se pudo enviar. Intenta de nuevo o escríbeme por WhatsApp.';
        contactStatus.style.color = '#b5484c';
      });
    });
  }
