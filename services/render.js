const axios = require("axios");


exports.vote = (req, res)=>{
    //make get req to api
    axios.get("http://localhost:9000/questions/create")
    .then(function(questions){
        res.render('vote', {questions: questions})
        console.log("hoi",questions);
    })
    
    .catch(err=>{
        res.send(err)
    })
}

exports.getAddForm=(req,res)=>{
   return  res.render('index')
}

exports.addNewProduct=(req,res)=>{
    console.log(req.body);
    res.render('index',{questions:questions})
}

// exports.update_user=(req,res)=>{
//     axios.get("http://localhost:3000/api/users", {params:{id:req.query.id}})
//     .then(function(userdata){
//         res.render('update_user', {user: userdata.data})
//     })
//     .catch(err=>{
//         res.send(err);
//     })
// }