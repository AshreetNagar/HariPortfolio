// ---------------------- Pagination section ----------------------
// Display gallery from var in .ejs file
// On reaching bottom of page, add more data to that variable, and append

// Optional: Top loading? Upon reaching top of page, reload previously displayed things? 

console.log(data)
function loadNewGallery(){
  
}


// ---------------------- Fullscreen Loading section ----------------------
// Load YT API lib
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var fadeEffect = setInterval(function(){},1000);

function closeFullscreen(){
  console.log("hi")
  clearInterval(fadeEffect);
  fadeEffect = setInterval(function () {
      var fadeTarget = document.getElementById("fullscreen-frame");
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
          fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) - 0.05;
      } else {
          console.log("clear")
          clearInterval(fadeEffect);
      }
  }, 25);
  document.getElementById("fullscreen-frame").style.zIndex = -10000;

  document.getElementById("fullscreen-content").remove()

}

function fullscreen(contentId){
  console.log(contentId)

  // Loading a full screen video
  document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<video id="fullscreen-content" src="" controls></video>')
  var fullscreenImg = document.getElementById("fullscreen-content");
  fullscreenImg.src = "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4"


  // Loading a full screen image
  // document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<img id="fullscreen-content" src="">')
  // var fullscreenImg = document.getElementById("fullscreen-content");
  // fullscreenImg.src = "images/gallery/img1.jpg"

  // Loading a yt video
  // document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<div class="popupMedia" id="fullscreen-content"></div>')
  // var player2 = new YT.Player('fullscreen-content', {
  //     videoId: 'TxJtoBAa2w0',
  //     playerVars: {
  //         'playsinline': 1
  //     },
  // })


  document.getElementById("fullscreen-frame").style.zIndex = 10000;
  clearInterval(fadeEffect);
  fadeEffect = setInterval(function () {
      var fadeTarget = document.getElementById("fullscreen-frame");
      if (!fadeTarget.style.opacity) {
          fadeTarget.style.opacity = 0;
      }
      if (fadeTarget.style.opacity < 1) {
          fadeTarget.style.opacity = parseFloat(fadeTarget.style.opacity) + 0.05;
      } else {
          console.log("clear")
          clearInterval(fadeEffect);
      }
  }, 25);


}

// ---------------------- Filters section animations ----------------------
var coll = document.getElementsByClassName("filter-group-collapsible");
console.log(coll)
console.log(coll.length)
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    console.log("click")
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
} 


function showGroup(){
    var groupContent = document.getElementById("group-content")
    if (groupContent.style.maxHeight){
        groupContent.style.maxHeight = null;
    } else {
        groupContent.style.maxHeight = groupContent.scrollHeight + "px";
    } 
}

function showTag(){
    var groupContent = document.getElementById("tag-content")
    if (groupContent.style.maxHeight){
        groupContent.style.maxHeight = null;
    } else {
        groupContent.style.maxHeight = groupContent.scrollHeight + "px";
    } 
}