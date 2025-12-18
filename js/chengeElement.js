export function enableInlineImageUpload(userImgElement) {
  userImgElement.style.cursor = 'pointer';
  userImgElement.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      userImgElement.src = url;
      userImgElement.dataset.tempFile = url;
    });
    input.click();
  });
}
export function enableImageUpload(imgElement) {
  imgElement.style.cursor = 'pointer';
  imgElement.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      imgElement.src = url;
      imgElement.dataset.tempFile = url;
    });
    input.click();
  });
}