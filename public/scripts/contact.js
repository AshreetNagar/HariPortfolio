const rotatingImages = document.querySelector('.rotating-images');
const images = rotatingImages.querySelectorAll('img');
const totalImages = images.length;

let currentIndex = 0;
const pauseTime = 3000; // Time to pause on each image (in milliseconds)
const rotateTime = 1000; // Time to rotate to the next image (in milliseconds)

function rotateImages() {
    rotatingImages.style.transition = `transform ${rotateTime}ms ease`;
    currentIndex = (currentIndex + 1) % totalImages;
    rotatingImages.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === totalImages - 4) {
        setTimeout(() => {
            rotatingImages.style.transition = 'none'; // Disable transition for reset
            rotatingImages.style.transform = `translateX(0)`; // Reset to first image
            currentIndex = 0;
            setTimeout(() => {
                rotatingImages.style.transition = `transform ${rotateTime}ms ease`; // Re-enable transition
                rotateImages();
            }, pauseTime); // Wait for pause time before next rotation
        }, rotateTime + pauseTime);
    } else {
        setTimeout(rotateImages, pauseTime + rotateTime); // Continue normal rotation
    }
}

setTimeout(rotateImages, pauseTime); // Initial delay before starting rotation
