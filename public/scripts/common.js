const delay = ms => new Promise(res => setTimeout(res, ms));

function addTagOrGroup(ok) {
    const field = ok+'Name'
    if(!$('#'+ok+'New').val()){
        alert("Please fill the box next to the button")
        return false;
    }
    var data = {}
    data[field] =  $('#'+ok+'New').val()
    $.ajax({
        type: 'POST',
        url: '/admin/'+ok,
        data: data
    }).then(()=>{
        reloadTagsOrGroups(ok)
    });
    return true;
}

function reloadTagsOrGroups(type){
    superagent.get('/admin/'+type).send().
    end(function (err, res) {
        $("#"+type+"s").empty()
        JSON.parse(res.text).forEach(element => {
            $("#"+type+"s").append('<option value="'+element["_id"]+'">'+element[type+"Name"]+'</option>')
        });
        // $("#tags").append('<option value="newTag">New Tag</option>')
        console.log("Error\\/");
        console.log(err)
    });
}