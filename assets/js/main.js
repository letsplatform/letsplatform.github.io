window.addEventListener('load', () => {
  const container = document.querySelector('.container-images');
  const track = container; // für Klarheit
  const images = track.innerHTML;
  let currentOffset = 0;
  let isHoveringImage = false;
  let isHoveringLink = false;
  let scrollSpeed = 1.2;

  // 🔁 Verdopple die Bilder für Endlos-Loop
  track.innerHTML += images;

  // 🌀 Endlos-Scroll-Loop
  function autoScroll() {
    if (!isHoveringImage && !isHoveringLink) {
      currentOffset += scrollSpeed;
      if (currentOffset >= track.scrollHeight / 2) {
        currentOffset = 0; // Zurück an den Anfang
      }
      track.style.transform = `translateY(-${currentOffset}px)`;
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // 📋 Detail-Anzeige bei Bild-Hover
  const previewItems = document.querySelectorAll('.preview-image-item');
  const projectDetails = document.getElementById('project-details');
  const detailTitle = document.getElementById('detail-title');
  const detailAuthor = document.getElementById('detail-author');
  const detailDescription = document.getElementById('detail-description');

  previewItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      isHoveringImage = true;
      detailTitle.textContent = item.dataset.title;
      detailAuthor.textContent = item.dataset.author;
      detailDescription.textContent = item.dataset.description;
      projectDetails.classList.add('visible');
    });

    item.addEventListener('mouseleave', () => {
      isHoveringImage = false;
      projectDetails.classList.remove('visible');
    });
  });

  // 🧭 Springe zum Bild bei Hover auf Link
  document.querySelectorAll('.link-list-item').forEach(link => {
    link.addEventListener('mouseenter', () => {
      const title = link.dataset.title;
      const imageEl = document.querySelector(`.preview-image-item[data-title="${title}"]`);
      if (imageEl) {
        isHoveringLink = true;

        const imageOffset = imageEl.offsetTop;
        currentOffset = imageOffset;
        track.style.transition = 'transform 0.6s ease';
        track.style.transform = `translateY(-${imageOffset}px)`;
      }
    });

    link.addEventListener('mouseleave', () => {
      isHoveringLink = false;
      track.style.transition = '';
    });
  });
});
