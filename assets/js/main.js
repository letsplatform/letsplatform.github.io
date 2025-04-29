window.addEventListener('load', () => {
    const track = document.getElementById('imageTrack');
    const images = track.innerHTML; // Holt den HTML-Inhalt des Tracks (alle Bilder)
    
    // Funktion zum Duplizieren des Inhalts
    const duplicateImages = () => {
      // Füge die gleichen Bilder unten nochmal hinzu
      track.innerHTML += images;
    };
    
    // Dupliziere die Bilder nach dem Laden
    duplicateImages();
  });

  // Alle Bilder holen
const previewItems = document.querySelectorAll('.preview-image-item');
// Details-Container holen
const projectDetails = document.getElementById('project-details');
const detailTitle = document.getElementById('detail-title');
const detailAuthor = document.getElementById('detail-author');
const detailDescription = document.getElementById('detail-description');

// Für jedes Bild
previewItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    detailTitle.textContent = item.dataset.title;
    detailAuthor.textContent = item.dataset.author;
    detailDescription.textContent = item.dataset.description;
    projectDetails.classList.add('visible');
  });

  item.addEventListener('mouseleave', () => {
    projectDetails.classList.remove('visible');
  });
});
