document.addEventListener('DOMContentLoaded', function() {

  //codice per effetto parlalax
    const arrows = document.querySelectorAll(".scroll-arrow");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = arrow.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // Scroll fluido
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });

  const arrows2 = document.querySelectorAll(".scroll-arrow-special");

  arrows2.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = arrow.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      // Scroll fluido
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    });
  });



  //codice per sidebar

    
    // Apri e chiudi la sidebar
    document.getElementById('menu-toggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });

    
    // Gestisci l'apertura delle sottocategorie al clic
    const hasSubcategoriesLinks = document.querySelectorAll('.has-subcategories');
    hasSubcategoriesLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.stopPropagation(); // Impedisce la chiusura della sidebar
            const subcategories = this.nextElementSibling; // Ottieni il prossimo elemento che è le sottocategorie
            const isOpen = subcategories.classList.contains('open'); // Controlla se sono già aperte
            
            // Chiudi tutte le sottocategorie
            document.querySelectorAll('.subcategories.open').forEach(subcat => {
                subcat.classList.remove('open');
            });

            // Se non erano aperte, aprile
            if (!isOpen) {
                subcategories.classList.add('open');
            }
        });
    });

    // Chiudi la sidebar e le sottocategorie quando si fa clic su un altro link
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a:not(.has-subcategories)');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.getElementById('sidebar').classList.remove('open');
            // Chiudi anche le sottocategorie
            document.querySelectorAll('.subcategories.open').forEach(subcat => {
                subcat.classList.remove('open');
            });
        });
    });


    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item2');
    const prevButton = document.querySelector('.carousel-button.left');
    const nextButton = document.querySelector('.carousel-button.right');
    
    let currentIndex = 0;
    const totalItems = carouselItems.length;
    const visibleItems = 5; // 5 elementi visibili alla volta
    const itemWidth = carouselItems[0].offsetWidth;
    
    function moveToIndex(index) {
      carouselTrack.style.transform = `translateX(${-index * itemWidth}px)`;
    }
    
    // Nuova funzione per scorrere senza tornare indietro
    function nextSlide() {
      currentIndex++;
      if (currentIndex >= totalItems) {
        // Quando si raggiunge la fine, riposiziona all'inizio senza l'effetto di ritorno
        currentIndex = 0;
        carouselTrack.style.transition = 'none'; // Disattiva la transizione
        moveToIndex(currentIndex);
        setTimeout(() => {
          carouselTrack.style.transition = 'transform 0.5s ease'; // Riattiva la transizione
          nextSlide(); // Riprendi a scorrere
        }, 20); // Piccola attesa per il ripristino della transizione
      } else {
        carouselTrack.style.transition = 'transform 0.5s ease'; // Riattiva la transizione
        moveToIndex(currentIndex);
      }
    }
    
    function prevSlide() {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = totalItems - 1; // Torna all'ultima immagine
      }
      moveToIndex(currentIndex);
    }
    
    // Loop continuo: aggiungi duplicati alla fine del track
    function duplicateItems() {
      const firstItems = Array.from(carouselItems).slice(0, visibleItems);
      firstItems.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
      });
    }
    
    duplicateItems(); // Duplicare gli elementi all'inizio
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Funzione per il trascinamento
    let isDragging = false;
    let startX, currentTranslate = 0, prevTranslate = 0, animationID;
    
    carouselTrack.addEventListener('mousedown', startDrag);
    carouselTrack.addEventListener('mousemove', drag);
    carouselTrack.addEventListener('mouseup', endDrag);
    carouselTrack.addEventListener('mouseleave', endDrag);
    
    function startDrag(e) {
      isDragging = true;
      startX = e.pageX;
      animationID = requestAnimationFrame(animation);
    }
    
    function drag(e) {
      if (isDragging) {
        currentTranslate = e.pageX - startX;
        carouselTrack.style.transform = `translateX(${prevTranslate + currentTranslate}px)`;
      }
    }
    
    function endDrag() {
      isDragging = false;
      cancelAnimationFrame(animationID);
      prevTranslate += currentTranslate;
    
      // Limitare il movimento del carosello
      if (prevTranslate > 0) {
        prevTranslate = 0;
      } else if (prevTranslate < -(totalItems) * itemWidth) {
        prevTranslate = -(totalItems) * itemWidth;
      }
    
      carouselTrack.style.transform = `translateX(${prevTranslate}px)`;
    }
    
    // Animazione fluida del trascinamento
    function animation() {
      if (isDragging) {
        requestAnimationFrame(animation);
      }
    }
    
   


    
});


