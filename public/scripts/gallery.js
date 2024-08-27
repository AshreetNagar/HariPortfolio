const delay = ms => new Promise(res => setTimeout(res, ms));


// ---------------------- Pagination section ----------------------
// Display gallery from var in .ejs file
// On reaching bottom of page, add more data to that variable, and append

// Optional: Top loading? Upon reaching top of page, reload previously displayed things? 
// const picturesGrid = document.querySelector('.pictures-grid');

const categoryGrid = document.querySelector('.hoverEffect');
async function loadImages(){
    for (let index = 0; index < (data.length); index++) {
        if (count<2){
            divisor = ((count%2)+1)
            categoryGrid.style.gridTemplateColumns = Array(divisor+1).join(((100/divisor)+"% "))
        }else{ categoryGrid.style.gridTemplateColumns = "50% 50%"}
        console.log(data[count]["title"])
        newHtml = `
        <figure id="image-`+index+`" onclick="fullscreen(`+count+`)" class="picture-card-container">
            <div class="picture-card" ><img src="`+data[count]["thumbnailLink"]+`" alt="image 1" referrerPolicy="no-referrer"></div>       
            <figcaption>
                <h1>`+data[count]["title"]+`</h1>
                <small>`+data[count]["caption"]+`</small>
                <p href="#" class="more-button">Expand</p>
            </figcaption>
        </figure>`
        categoryGrid.insertAdjacentHTML('beforeend',newHtml)
        count ++;
        // <a onclick="fullscreen(`+count+`)" href="#" class="more-button">Expand</a>
        // <div class="picture-card" id="imgthumb`+count+`" ></div>    

    }
}
document.addEventListener('DOMContentLoaded', function() {
    $.ajax({
        type: 'GET',
        url: '/media',
        data: {
            groupId : groupId
        }
    }).then((responseBody)=>{
        // for (let index = 0; index < 4; index++) {
        //     data.push({
        //         "title": "Two Cameras",
        //         "caption": "A picture of two cameras taken with one camera.",
        //         "type": "youtube_embed",
        //         "fullLink": "TxJtoBAa2w0",
        //         "thumbnailLink": "https://lh3.googleusercontent.com/fife/ALs6j_FmCcJjgO4XfABJeztorvhTi953xOzM0WISMT0lVya2Nmd-7HTiwANXn7TNb3SvM2TAGyoFuSItOZOSwvfD7i0fNE7dem8RvEv4QWR8Y1RxZ_dXmpJW0AzhAP4rAQt9V8wXm1mJkYHRZ5GanIvbYzRDf3smJSM8sFlchd_NIqU5qMH7vBlwV5kLATPDX4pVOnmhElff0t_me5Mf8T0Li2zA7VfYhgYsv5a7XbrojETYdicUPDHRI3gId6HwOXD_AUrDe59I6eh4X6mVPfmMWJ1ecBT6OzHEl_xjO0XX3UBxk1iMzjUyq-RGdfPklzixq-zq43XbfKkvHTNi3w7gSTnRxIaSgwW5LdEfIHuHbRaayzSZ4dbnlgqvsE2J2nc3Cm5AwqnLTPkbJvk2fW1HTLsNRzOM0XeZUhbkXNzjo_hPoUH240S-77rL5Z13iuOnAVEilHMU5oxaxyXBFPJwp0QxXkVEk9ydugky8tKkxccPm7TzEBhy7u7REcGey-ccdFT3HFdSbvq1M8JDt8MNDKvhtTa6jnqjacqQtblGx9d2worid9wXyD0hoNpht-a-FVAHrZEWkh0iNIGNPrWGK4vh5q3dJK0C80rGH1l3Z4i6cVBII_l-uM0CKwLOmkN46wf4a0ZoYBkJh9qgmEr6Lh-LRDP9lpuy173iY6O8HduXk22PRkiqJl8-pBOzi7SRcASFDRjjrrpWkmOpYe225J4x7tbmxyKPuulko1WtwME2vq2mgTDN0LPAlEKZ2apkc1jH3JeO-M6wS4-zCuKSyBvUZsqXJJN2d1WJFrcGDvJ_CCWAtFbtQ-j2ig5QJrwzqrWfy6uZck-wjy6Dugi9D5qeJ2QEqGs92LSCHYyHswLErSZRcFe7FKCRcanrA3rhtSYHFElFD0-iTKtbAEY78sygbAEt0hg1NPQpc26cWyScxrTNQnniU3LjB8WsIjRsdNMKhMBQxUKxOTy79DI7eKioBgl4X-SemBRV9KSPL2x2NeTH4obU11dy-LDpsLhWUFmzLmZBnBNAVF9i_SZHcIj1dogi62sCwDjl6bXa7ItFSCPHk_0840sMOelRGiZcJROhbMe9EXW_24Y__OWX08pm-IEETqQQEknnYoO5f--R6RAJPaBEuOSEFXO5R0Vy-cIIX54QCqIkchJI21lv_DF0boaKzPIPXCTNoW4ny1ZG_hbIHG1HP9cGQK69UPjUQuyDe-pLXJTbptcFmg2tkMyEm6EjciQRjb95SCExqjDLsDDFnPZ7COaJa9jnVgv_ye0CAFrGLx8SFga34ppNm_8r1q4j_1CgQlIdbBSBY4y8V6V-osj8gRfqmqrtMHkO7f9dy_erT46tDZ8slR6cl2LWd2l_YAzHHqX3uany_4lLR_cNQIkgGOGpr1jGFWB3o2KjNSxfDdigHF4KRqmBSxS5RNPn_pFiyeVCAdlB2-IjizE_bxI7niBy7PRVmOgc95lwavKaxldOQCyh3FzuDGJ415yvlgqYjlKwJVKUpHX9mBGI281ZKG8Pwj23iGWx8p8Eb3bETzU2B9za-claVml03UMu2Pio0PIKzyOR3TydpkwtqCvd1ADXZxB3CCCbqKkuenLBOgam5s4441lnbtQWLxlwT6gJvCu490Gm9guvrbwFCQyJ2gs=w1920-h940"
        //     })
        // } 
        console.log(responseBody)
        data.push(...responseBody)
        // reloadTagsOrGroups("tag")
        loadImages();

    });
});
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        (async function(){
            // for (let index = 0; index < 1; index++) {
            //     data.push({
            //         "title": "Two Cameras",
            //         "caption": "A picture of two cameras taken with one camera.",
            //         "type": "youtube_embed",
            //         "fullLink": "TxJtoBAa2w0",
            //         "thumbnailLink": "https://lh3.googleusercontent.com/fife/ALs6j_FmCcJjgO4XfABJeztorvhTi953xOzM0WISMT0lVya2Nmd-7HTiwANXn7TNb3SvM2TAGyoFuSItOZOSwvfD7i0fNE7dem8RvEv4QWR8Y1RxZ_dXmpJW0AzhAP4rAQt9V8wXm1mJkYHRZ5GanIvbYzRDf3smJSM8sFlchd_NIqU5qMH7vBlwV5kLATPDX4pVOnmhElff0t_me5Mf8T0Li2zA7VfYhgYsv5a7XbrojETYdicUPDHRI3gId6HwOXD_AUrDe59I6eh4X6mVPfmMWJ1ecBT6OzHEl_xjO0XX3UBxk1iMzjUyq-RGdfPklzixq-zq43XbfKkvHTNi3w7gSTnRxIaSgwW5LdEfIHuHbRaayzSZ4dbnlgqvsE2J2nc3Cm5AwqnLTPkbJvk2fW1HTLsNRzOM0XeZUhbkXNzjo_hPoUH240S-77rL5Z13iuOnAVEilHMU5oxaxyXBFPJwp0QxXkVEk9ydugky8tKkxccPm7TzEBhy7u7REcGey-ccdFT3HFdSbvq1M8JDt8MNDKvhtTa6jnqjacqQtblGx9d2worid9wXyD0hoNpht-a-FVAHrZEWkh0iNIGNPrWGK4vh5q3dJK0C80rGH1l3Z4i6cVBII_l-uM0CKwLOmkN46wf4a0ZoYBkJh9qgmEr6Lh-LRDP9lpuy173iY6O8HduXk22PRkiqJl8-pBOzi7SRcASFDRjjrrpWkmOpYe225J4x7tbmxyKPuulko1WtwME2vq2mgTDN0LPAlEKZ2apkc1jH3JeO-M6wS4-zCuKSyBvUZsqXJJN2d1WJFrcGDvJ_CCWAtFbtQ-j2ig5QJrwzqrWfy6uZck-wjy6Dugi9D5qeJ2QEqGs92LSCHYyHswLErSZRcFe7FKCRcanrA3rhtSYHFElFD0-iTKtbAEY78sygbAEt0hg1NPQpc26cWyScxrTNQnniU3LjB8WsIjRsdNMKhMBQxUKxOTy79DI7eKioBgl4X-SemBRV9KSPL2x2NeTH4obU11dy-LDpsLhWUFmzLmZBnBNAVF9i_SZHcIj1dogi62sCwDjl6bXa7ItFSCPHk_0840sMOelRGiZcJROhbMe9EXW_24Y__OWX08pm-IEETqQQEknnYoO5f--R6RAJPaBEuOSEFXO5R0Vy-cIIX54QCqIkchJI21lv_DF0boaKzPIPXCTNoW4ny1ZG_hbIHG1HP9cGQK69UPjUQuyDe-pLXJTbptcFmg2tkMyEm6EjciQRjb95SCExqjDLsDDFnPZ7COaJa9jnVgv_ye0CAFrGLx8SFga34ppNm_8r1q4j_1CgQlIdbBSBY4y8V6V-osj8gRfqmqrtMHkO7f9dy_erT46tDZ8slR6cl2LWd2l_YAzHHqX3uany_4lLR_cNQIkgGOGpr1jGFWB3o2KjNSxfDdigHF4KRqmBSxS5RNPn_pFiyeVCAdlB2-IjizE_bxI7niBy7PRVmOgc95lwavKaxldOQCyh3FzuDGJ415yvlgqYjlKwJVKUpHX9mBGI281ZKG8Pwj23iGWx8p8Eb3bETzU2B9za-claVml03UMu2Pio0PIKzyOR3TydpkwtqCvd1ADXZxB3CCCbqKkuenLBOgam5s4441lnbtQWLxlwT6gJvCu490Gm9guvrbwFCQyJ2gs=w1920-h940"
            //     })
            // }   
            console.log("print")
            loadImages();
        })();
    }
});

// ---------------------- Fullscreen Loading section ----------------------
// Load YT API lib
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function closeFullscreen(){
    (async function(){
        $("#fullscreen-frame").fadeOut(400)
        await delay(400)
        document.getElementById("fullscreen-frame").style.zIndex = -10000;
        document.getElementById("fullscreen-content").remove()        
    })();
}

function fullscreen(contentId){

    (async function(){
        console.log("open fullscreen")
        // Loading a full screen video
        // document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<video id="fullscreen-content" src="" controls></video>')
        // var fullscreenImg = document.getElementById("fullscreen-content");
        // fullscreenImg.src = "https://filesamples.com/samples/video/mp4/sample_1280x720.mp4"

        $("#fullscreen-caption-title").text("")
        $("#fullscreen-caption-text").text("")
        $("#fullscreen-caption-title").text(data[contentId]["title"])
        $("#fullscreen-caption-text").text(data[contentId]["caption"])

        // Loading a full screen image
        if(data[contentId]["type"]=="image"){
            document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<img id="fullscreen-content" src="">')
            var fullscreenImg = document.getElementById("fullscreen-content");
            fullscreenImg.src = data[contentId]["link"]
        }

        // Loading a yt video
        if(data[contentId]["type"]=="youtube_embed"){
            document.getElementById("fullscreen-closebtn").insertAdjacentHTML('afterend','<div class="popupMedia" id="fullscreen-content"></div>')
            var player2 = new YT.Player('fullscreen-content', {
                videoId: data[contentId]["link"],
                playerVars: {
                    'playsinline': 1
                },
            })
        }
        document.getElementById("fullscreen-frame").style.zIndex = 10000;
        var fadeTarget = document.getElementById("fullscreen-frame");
        fadeTarget.style.opacity = 1;
        $("#fullscreen-frame").fadeOut(1)
        $("#fullscreen-frame").fadeIn(400)
        await delay(400)

        if(data[contentId]["type"]=="image"){
            $("#fullscreen-content").attr = ('src',data[contentId]["link"])
        }
        $("#fullscreen-content").css("opacity",1)
        $("#fullscreen-content").fadeOut(1)
        $("#fullscreen-content").fadeIn(400)

    })();


}

// ---------------------- Filters section animations ----------------------
var coll = document.getElementsByClassName("filter-group-collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
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

// ---------------------- Tag section  ----------------------
var tagList = []
getTags()
async function getTags(nameQuery){
    const responseBody = await $.ajax({
        type: 'GET',
        url: '/tags',
        data: {
            nameQuery : nameQuery
        }
    })
    tagList = responseBody
    $('#tag-checkbox-section').empty()
    tagList.forEach(element => {
        console.log(element)
        $("#tag-checkbox-section").append('<input type="checkbox" checked="checked"><span class="checkmark"></span>'+element.tagName+'<br>')
        
    });
    return responseBody
}
$('#tag-search-box').on('input',async function(){
    console.log("typed")
    const query = $('#tag-search-box').val()
    await delay(500)
    if (query != $('#tag-search-box').val()){
        return
    }
    console.log(await getTags(query))
})