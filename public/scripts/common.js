const delay = ms => new Promise(res => setTimeout(res, ms));


function reloadTagsOrGroups(type){
    superagent.get('/admin/'+type).send().
    end(function (err, res) {
        JSON.parse(res.text).forEach(element => {
            $("#"+type+"s").append('<option value="'+element["_id"]+'">'+element[type+"Name"]+'</option>')
        });
        // $("#tags").append('<option value="newTag">New Tag</option>')
        console.log("Error\\/");
        console.log(err)
    });
}