const uploadInput = document.getElementById("upload-input");
const photoCanvas = document.getElementById("photo-canvas");
const brightenBtn = document.getElementById("brighten-btn");
const softenBtn = document.getElementById("soften-btn");
const cinematicBtn = document.getElementById("cinematic-btn");
const refreshBtn = document.getElementById("refresh-btn");
const downloadBtn = document.getElementById("download-btn");
const copyrightYear = document.getElementById("copyright-year");
const notification = document.getElementById("notification");
const warning = document.getElementById("warning");

let originalImage = null;

// Set dynamic copyright year
copyrightYear.textContent = new Date().getFullYear();

// Load image onto canvas
uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        photoCanvas.width = img.width;
        photoCanvas.height = img.height;
        const ctx = photoCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        originalImage = img; // Save original image
        enableButtons(); // Enable buttons after image is loaded
        hideNotification(); // Hide notification when a new image is uploaded
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Enable buttons
function enableButtons() {
  brightenBtn.disabled = false;
  softenBtn.disabled = false;
  cinematicBtn.disabled = false;
  downloadBtn.disabled = false;
}

// Disable a button after it's clicked
function disableButton(button) {
  button.disabled = true;
}

// Show notification
function showNotification() {
  notification.style.display = "block";
}

// Hide notification
function hideNotification() {
  notification.style.display = "none";
}

// Show warning
function showWarning() {
  warning.style.display = "block";
  warning.style.animation = "fadeIn 0.5s ease";

  // Hide the warning after 3 seconds
  setTimeout(() => {
    warning.style.animation = "fadeOut 0.5s ease";
    setTimeout(() => {
      warning.style.display = "none";
    }, 500); // Wait for fadeOut animation to complete
  }, 3000);
}

// Brighten skin (non-incremental)
brightenBtn.addEventListener("click", () => {
  Caman(photoCanvas, function () {
    this.brightness(10).contrast(5).render();
    disableButton(brightenBtn); // Disable button after applying effect
    showNotification(); // Show notification
  });
});

// Soften skin (natural effect)
softenBtn.addEventListener("click", () => {
  Caman(photoCanvas, function () {
    this.brightness(5).contrast(3).stackBlur(2).render(); // Subtle and natural softening
    disableButton(softenBtn); // Disable button after applying effect
    showNotification(); // Show notification
  });
});

// Cinematic film filter
cinematicBtn.addEventListener("click", () => {
  Caman(photoCanvas, function () {
    this.contrast(10).vignette("70%", 30).sepia(20).render();
    disableButton(cinematicBtn); // Disable button after applying effect
    showNotification(); // Show notification
  });
});

// Refresh page
refreshBtn.addEventListener("click", () => {
  window.location.reload(); // Refresh the page
});

// Download edited photo
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-photo.png";
  link.href = photoCanvas.toDataURL();
  link.click();
});

// Show warning if user clicks a disabled button
[brightenBtn, softenBtn, cinematicBtn, downloadBtn].forEach((button) => {
  button.addEventListener("click", () => {
    if (button.disabled) {
      showWarning(); // Show warning if the button is disabled
    }
  });
});