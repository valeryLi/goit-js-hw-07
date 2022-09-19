import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryItem = document.querySelector(".gallery");
galleryItem.addEventListener("click", onGalleryClick);
galleryItem.innerHTML = createGalleryMarkup(galleryItems);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src= "${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;

  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: () => document.addEventListener("keydown", onEscapeButtonPress),
      onClose: () =>
        document.removeEventListener("keydown", onEscapeButtonPress),
    }
  );

  instance.show();

  function onEscapeButtonPress(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}
