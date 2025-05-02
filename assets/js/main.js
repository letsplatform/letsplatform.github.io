window.addEventListener('load', () => {
  const container = document.querySelector('.container-images');
  const originalContent = container.innerHTML;

  // 🔁 Dupliziere für visuelles Endlos-Scrolling
  container.innerHTML += originalContent;

  let currentOffset = 0;
  let isHoveringImage = false;
  let isHoveringLink = false;
  const scrollSpeed = 1.4;

  // 🔁 Auto-Scroll-Loop
  function autoScroll() {
    if (!isHoveringImage && !isHoveringLink) {
      currentOffset += scrollSpeed;
      container.style.transform = `translateY(-${currentOffset}px)`;

      // 🔁 Wenn duplizierter Teil erreicht → zurück auf 0, visuell nahtlos
      const halfHeight = container.scrollHeight / 2;
      if (currentOffset >= halfHeight) {
        currentOffset = 0;
        container.style.transition = 'none'; // kein Sprung sichtbar
        container.style.transform = `translateY(0)`;

        // Trick: transition wieder aktivieren nach 1 Frame
        requestAnimationFrame(() => {
          container.style.transition = '';
        });
      }
    }

    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  const previewItems = document.querySelectorAll('.preview-image-item');
  const projectDetails = document.getElementById('project-details');
  const detailTitle = document.getElementById('detail-title');
  const detailAuthor = document.getElementById('detail-author');
  const detailDescription = document.getElementById('detail-description');
  
  previewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      detailAuthor.textContent = item.dataset.author;
      detailTitle.innerHTML = `${item.dataset.title}&nbsp;<sup>(Let’s&nbsp;Platform)</sup>`
      detailDescription.innerHTML = item.dataset.descriptionHtml; // wichtig!
      projectDetails.classList.add('visible');
    });
  
    item.addEventListener('mouseleave', () => {
      projectDetails.classList.remove('visible');
    });
  });

  // 🧭 Bei Link-Hover: springe zum passendem Bild
  document.querySelectorAll('.link-list-item').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const title = link.dataset.title;
      const imageEl = document.querySelector(`.preview-image-item[data-title="${title}"]`);
      if (imageEl) {
        isHoveringLink = true;

        const imageOffset = imageEl.offsetTop;
        currentOffset = imageOffset;
        container.style.transition = 'transform 0.6s ease';
        container.style.transform = `translateY(-${imageOffset}px)`;
      }
    });

    link.addEventListener('mouseleave', () => {
      isHoveringLink = false;
      container.style.transition = '';
    });
  });
});
