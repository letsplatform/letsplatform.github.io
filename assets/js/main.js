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

  // 🔍 Elemente sammeln
  const previewItems = document.querySelectorAll('.preview-image-item');
  const linkListItems = document.querySelectorAll('.link-list-item');
  const containerText = document.querySelector('.container-text');

  const projectDetails = document.getElementById('project-details');
  const detailTitle = document.getElementById('detail-title');
  const detailAuthor = document.getElementById('detail-author');
  const detailDescription = document.getElementById('detail-description');

  // 🖼️ Bild-Hover: Detail anzeigen + Text ausblenden
  previewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      isHoveringImage = true;

      detailAuthor.textContent = item.dataset.author;
      detailTitle.innerHTML = `${item.dataset.title}&nbsp;<sup>(Let’s&nbsp;Platform)</sup>`;
      detailDescription.innerHTML = item.dataset.descriptionHtml;
      projectDetails.classList.add('visible');

      // 👉 container-text ausblenden
      containerText.style.opacity = '0';
      containerText.style.pointerEvents = 'none';
    });

    item.addEventListener('mouseleave', () => {
      isHoveringImage = false;
      projectDetails.classList.remove('visible');

      // 👉 container-text wieder einblenden
      containerText.style.opacity = '1';
      containerText.style.pointerEvents = '';
    });
  });

  // 🔗 Linkliste-Hover: Bild scrollen + Text ausblenden
  linkListItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
      isHoveringLink = true;

      const title = link.dataset.title;
      const imageEl = document.querySelector(`.preview-image-item[data-title="${title}"]`);
      if (imageEl) {
        let imageOffset = imageEl.offsetTop;
  
        // Berechne den zusätzlichen Offset in vh
        const additionalOffset = window.innerHeight * -0.2; // 10% der Viewporthöhe als Offset
        imageOffset += additionalOffset;
  
        currentOffset = imageOffset;
        container.style.transition = 'transform 0.6s ease';
        container.style.transform = `translateY(-${imageOffset}px)`;
      }
      // 👉 container-text ausblenden
      containerText.style.opacity = '0';
      containerText.style.pointerEvents = 'none';
    });

    link.addEventListener('mouseleave', () => {
      isHoveringLink = false;
      container.style.transition = '';

      // 👉 container-text wieder einblenden
      containerText.style.opacity = '1';
      containerText.style.pointerEvents = '';
    });
  });
});
