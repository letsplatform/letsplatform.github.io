window.addEventListener('load', () => {
  const container = document.querySelector('.container-images');
  const originalContent = container.innerHTML;

  // Dupliziere den Inhalt für visuelles Endlos-Scrolling
  container.innerHTML += originalContent;

  let currentOffset = 0;
  let isHoveringImage = false;
  let isHoveringLink = false;
  const scrollSpeed = 1.4;

  // Auto-Scroll-Loop (wird bei Bedarf angepasst)
  function autoScroll() {
    if (!isHoveringImage && !isHoveringLink) {
      currentOffset += scrollSpeed;
      container.style.transform = `translateY(-${currentOffset}px)`;

      const halfHeight = container.scrollHeight / 2;
      if (currentOffset >= halfHeight) {
        currentOffset = 0;
        container.style.transition = 'none';
        container.style.transform = `translateY(0)`;
        requestAnimationFrame(() => {
          container.style.transition = '';
        });
      }
    }

    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // Holen der relevanten Elemente
  const previewItems = document.querySelectorAll('.preview-image-item');
  const linkListItems = document.querySelectorAll('.container-link-list-item');
  const containerText = document.querySelector('.container-text');

  const projectDetails = document.getElementById('project-details');
  const detailTitle = document.getElementById('detail-title');
  const detailAuthor = document.getElementById('detail-author');
  const detailDescription = document.getElementById('detail-description');

  // Bild-Hover: Detail anzeigen und Text ausblenden
  previewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      isHoveringImage = true;

      detailAuthor.textContent = item.dataset.author;
      detailTitle.innerHTML = `${item.dataset.title}&nbsp;<sup>(Let’s&nbsp;Platform)</sup>`;
      detailDescription.innerHTML = item.dataset.descriptionHtml;
      projectDetails.classList.add('visible');

      // container-text ausblenden
      containerText.style.opacity = '0';
      containerText.style.pointerEvents = 'none';
    });

    item.addEventListener('mouseleave', () => {
      isHoveringImage = false;
      projectDetails.classList.remove('visible');

      // container-text wieder einblenden
      containerText.style.opacity = '1';
      containerText.style.pointerEvents = '';
    });
  });

  // Linkliste-Hover: Bild scrollen und Text ausblenden
  linkListItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
      isHoveringLink = true;

      const title = link.dataset.title;
      const imageEl = document.querySelector(`.preview-image-item[data-title="${title}"]`);
      if (imageEl) {
        // Berechne die Position des Bildes
        const imageElRect = imageEl.getBoundingClientRect(); // Bild-Position im Viewport
        const containerRect = container.getBoundingClientRect(); // Container-Position im Viewport

        // Berechne den Versatz, um das Bild in die Mitte zu verschieben
        const centerOffset = imageElRect.top - containerRect.top - window.innerHeight / 2 + imageElRect.height / 2;

        // Setze die Transformation, um das Bild in die Mitte zu bekommen
        container.style.transition = 'transform 0.6s ease';  // Setze sanfte Animation
        container.style.transform = `translateY(-${centerOffset}px)`;
      }

      // container-text ausblenden
      containerText.style.opacity = '0';
      containerText.style.pointerEvents = 'none';
    });

    link.addEventListener('mouseleave', () => {
      isHoveringLink = false;
      container.style.transition = '';  // Entferne die Animation

      // container-text wieder einblenden
      containerText.style.opacity = '1';
      containerText.style.pointerEvents = '';
    });
  });
});
