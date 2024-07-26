



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
  // fullscreenImg.src = "https://lh3.googleusercontent.com/fife/ALs6j_FmCcJjgO4XfABJeztorvhTi953xOzM0WISMT0lVya2Nmd-7HTiwANXn7TNb3SvM2TAGyoFuSItOZOSwvfD7i0fNE7dem8RvEv4QWR8Y1RxZ_dXmpJW0AzhAP4rAQt9V8wXm1mJkYHRZ5GanIvbYzRDf3smJSM8sFlchd_NIqU5qMH7vBlwV5kLATPDX4pVOnmhElff0t_me5Mf8T0Li2zA7VfYhgYsv5a7XbrojETYdicUPDHRI3gId6HwOXD_AUrDe59I6eh4X6mVPfmMWJ1ecBT6OzHEl_xjO0XX3UBxk1iMzjUyq-RGdfPklzixq-zq43XbfKkvHTNi3w7gSTnRxIaSgwW5LdEfIHuHbRaayzSZ4dbnlgqvsE2J2nc3Cm5AwqnLTPkbJvk2fW1HTLsNRzOM0XeZUhbkXNzjo_hPoUH240S-77rL5Z13iuOnAVEilHMU5oxaxyXBFPJwp0QxXkVEk9ydugky8tKkxccPm7TzEBhy7u7REcGey-ccdFT3HFdSbvq1M8JDt8MNDKvhtTa6jnqjacqQtblGx9d2worid9wXyD0hoNpht-a-FVAHrZEWkh0iNIGNPrWGK4vh5q3dJK0C80rGH1l3Z4i6cVBII_l-uM0CKwLOmkN46wf4a0ZoYBkJh9qgmEr6Lh-LRDP9lpuy173iY6O8HduXk22PRkiqJl8-pBOzi7SRcASFDRjjrrpWkmOpYe225J4x7tbmxyKPuulko1WtwME2vq2mgTDN0LPAlEKZ2apkc1jH3JeO-M6wS4-zCuKSyBvUZsqXJJN2d1WJFrcGDvJ_CCWAtFbtQ-j2ig5QJrwzqrWfy6uZck-wjy6Dugi9D5qeJ2QEqGs92LSCHYyHswLErSZRcFe7FKCRcanrA3rhtSYHFElFD0-iTKtbAEY78sygbAEt0hg1NPQpc26cWyScxrTNQnniU3LjB8WsIjRsdNMKhMBQxUKxOTy79DI7eKioBgl4X-SemBRV9KSPL2x2NeTH4obU11dy-LDpsLhWUFmzLmZBnBNAVF9i_SZHcIj1dogi62sCwDjl6bXa7ItFSCPHk_0840sMOelRGiZcJROhbMe9EXW_24Y__OWX08pm-IEETqQQEknnYoO5f--R6RAJPaBEuOSEFXO5R0Vy-cIIX54QCqIkchJI21lv_DF0boaKzPIPXCTNoW4ny1ZG_hbIHG1HP9cGQK69UPjUQuyDe-pLXJTbptcFmg2tkMyEm6EjciQRjb95SCExqjDLsDDFnPZ7COaJa9jnVgv_ye0CAFrGLx8SFga34ppNm_8r1q4j_1CgQlIdbBSBY4y8V6V-osj8gRfqmqrtMHkO7f9dy_erT46tDZ8slR6cl2LWd2l_YAzHHqX3uany_4lLR_cNQIkgGOGpr1jGFWB3o2KjNSxfDdigHF4KRqmBSxS5RNPn_pFiyeVCAdlB2-IjizE_bxI7niBy7PRVmOgc95lwavKaxldOQCyh3FzuDGJ415yvlgqYjlKwJVKUpHX9mBGI281ZKG8Pwj23iGWx8p8Eb3bETzU2B9za-claVml03UMu2Pio0PIKzyOR3TydpkwtqCvd1ADXZxB3CCCbqKkuenLBOgam5s4441lnbtQWLxlwT6gJvCu490Gm9guvrbwFCQyJ2gs=w1920-h940"

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