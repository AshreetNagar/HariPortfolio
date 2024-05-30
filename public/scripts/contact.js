document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".video-player");
    let currentVideoIndex = 0;

    videos[currentVideoIndex].play();

    videos.forEach((video, index) => {
        video.addEventListener("ended", () => {
            currentVideoIndex = (index + 1) % videos.length;
            videos[currentVideoIndex].play();
        });

        video.addEventListener("click", () => {
            videos.forEach(v => v.pause());
            currentVideoIndex = index;
            videos[currentVideoIndex].play();
        });
    });
});
