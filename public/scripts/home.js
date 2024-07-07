const delay = ms => new Promise(res => setTimeout(res, ms));

document.addEventListener('DOMContentLoaded', function () {
    var videos = document.querySelectorAll('.carousel img');
    const vidsDiv = document.querySelector('.carousel');
    var currentIndex = 0;

    async function doCarouselArrangements(currentIndex){
        await delay(1000); // Wait for animation to finish before moving things around
        let video0;
        vidsDiv.style.transition = "none"; // Temporarily disable transition animation (prepare for moving view)
        if (currentIndex == 0){
            video0 = document.querySelector('#image3'); // Get previous video
            videos[3].remove() // Remove previous video
        }else{
            video0 = document.querySelector('#image'+(currentIndex-1)); // Get previous video
            videos[currentIndex-1].remove() // Remove previous video
        }
        vidsDiv.insertAdjacentHTML('beforeend',video0.outerHTML)        
        vidsDiv.style.transform = "translateX("+(0*(-25))+"%)" // Move view backwards to compensate for deleting previous video
        vidsDiv.removeChild(video0)
        vidsDiv.style.transform = "translateX("+(0)+"%)" // Move view backwards to compensate for deleting previous video
        await delay(1000); // Wait for view move to finish before re-enabling animation 
        vidsDiv.style.transition = "transform 1s ease-in-out";
    }
    function goToNextImage() {
        currentIndex = (currentIndex + 1) % videos.length;
        vidsDiv.style.transition = "transform 1s ease-in-out";
        vidsDiv.style.transform = "translateX("+(1*(-25))+"%)"

        doCarouselArrangements(currentIndex)
    }
    async function doLoop(){
        while(true){
            await delay(3000);
            goToNextImage();
        }
    }
    doLoop()

});


document.addEventListener('DOMContentLoaded', function () {
    const vidsDiv = document.querySelector('.video-carousel');
    var currentIndex = 0;
    const videoAmnt = document.querySelectorAll('.video-carousel video').length

    async function doCarouselArrangements(currentIndex){
        await delay(1000); // Wait for animation to finish before moving things around
        let video0;
        vidsDiv.style.transition = "none"; // Temporarily disable transition animation (prepare for moving view)
        if (currentIndex == 0){
            video0 = document.querySelector('#video'+(videoAmnt-1) ); // Get previous video
            document.querySelector('#video'+(videoAmnt-1)).remove(); // Remove previous video
        }else{
            video0 = document.querySelector('#video'+(currentIndex-1)); // Get previous video
            document.querySelector('#video'+(currentIndex-1)).remove(); // Remove previous video
        }

        vidsDiv.style.transform = "translateX("+(0)+"%)" // Move view backwards to compensate for deleting previous video

        await delay(100); // Wait for view move to finish before re-enabling animation 
        vidsDiv.style.transition = "transform 1s ease-in-out";
        vidsDiv.insertAdjacentHTML('beforeend',video0.outerHTML)        

    }


    function playNextVideo() {

        videoscurrentIndex = document.querySelector('#video'+currentIndex);
        videoscurrentIndex.muted = true;
        videoscurrentIndex.pause();

        currentIndex = (currentIndex + 1) % videoAmnt;
        vidsDiv.style.transform = "translateX("+(1*(-25))+"%)"
        videoscurrentIndex = document.querySelector('#video'+currentIndex);
        videoscurrentIndex.addEventListener('ended', playNextVideo);

        videoscurrentIndex.muted = true;
        videoscurrentIndex.play();

        doCarouselArrangements(currentIndex)
    }

    document.querySelectorAll('.video-carousel video').forEach((video, index) => {
        video.addEventListener('ended', playNextVideo);
        if (index === 0) {
            vidsDiv.style.transform = "translate(0);"
            video.muted = true;
            video.play();
        }
    });
});