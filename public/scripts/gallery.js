// Filters section
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