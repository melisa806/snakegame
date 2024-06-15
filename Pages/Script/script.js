let slideIndex = 0;
const slides = document.querySelectorAll('.video-slide');
const cards = document.querySelectorAll('.card-1, .card-2');

function showSlide(index) {
  if (index < 0) {
    slideIndex = slides.length - 1;
  } else if (index >= slides.length) {
    slideIndex = 0;
  }

  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.classList.add('active'); // Add the "active" class to the current slide
      slide.play(); // Start playing the selected video
    } else {
      slide.classList.remove('active'); // Remove the "active" class from other slides
      slide.pause(); // Pause other videos
    }
  });

  cards.forEach((card, index) => {
    if (index === slideIndex) {
      card.style.display = 'block'; // Show the card corresponding to the current slide
    } else {
      card.style.display = 'none'; // Hide other cards
    }
  });
}

function changeSlide(n) {
  slideIndex += n;
  showSlide(slideIndex);
}

showSlide(slideIndex);
