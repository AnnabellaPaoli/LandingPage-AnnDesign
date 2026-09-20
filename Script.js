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

  function toggleMenu(){
    document.getElementById('navLinks').classList.toggle('open');
  }
  function closeMenu(){
    document.getElementById('navLinks').classList.remove('open');
  }

  // Aparición suave de cada sección al entrar en pantalla
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduceMotion){
    document.querySelectorAll('section').forEach(function(sec){
      sec.style.opacity = '0';
      sec.style.transform = 'translateY(14px)';
      sec.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('section').forEach(function(sec){ revealObserver.observe(sec); });
  }