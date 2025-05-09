const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
  });
}

// Main function to download all images
function downloadImages() {
  // Reset previous output and error
  output.innerHTML = "";
  errorDiv.textContent = "";

  // Show loading spinner
  loading.style.display = "block";

  const imagePromises = images.map(img => downloadImage(img.url));

  Promise.all(imagePromises)
    .then(imgElements => {
      // Hide spinner
      loading.style.display = "none";

      // Append all images to the output div
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      // Hide spinner
      loading.style.display = "none";

      // Show error message
      errorDiv.textContent = err.message;
    });
}

// Attach click handler
btn.addEventListener("click", downloadImages);
