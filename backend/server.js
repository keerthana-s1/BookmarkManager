var express = require('express')
var cors = require('cors')
var BodyParser = require('body-parser')
var Mongoose = require('mongoose')
var jwt = require('jwt-simple')
var app=express()

var User = require('./models/User.js')
var Bookmark = require('./models/Bookmark.js')
const { find } = require('./models/User.js')

var posts = [
    {message: 'hello'},
    {message: 'hi'}
]

app.use(cors())
app.use(BodyParser.json())

function checkAuthenticated(req,res,next)
{
    if(!req.header('authorization'))
      return res.status(401).send({message:'Unauthorized '})

    var token = req.header('authorization').split(' ')[1]
    var payload = jwt.decode(token,'123')
    req.userId = payload
    next()
}

app.get('/posts',checkAuthenticated,(req,res) => {
    //console.log(posts)
    res.send(posts)

})

app.get('/cat',checkAuthenticated, async (req,res) => {
    var data
    var fdata=[]
    data = await Bookmark.find({OwnerID: req.userId}).distinct('Category')
    console.log(data)
    data.forEach((item)=> {
        //console.log(item)
        fdata=fdata.concat({item})
    })
    console.log(fdata)
    fdata= JSON.stringify(fdata)
   res.send(fdata)  
})

app.get('/tag', async (req,res) => {
    var data
    var fdata=[]
    data = await Bookmark.find({}).distinct('tags.tag')
    console.log(data)
    data.forEach((item)=> {
        //console.log(item)
        fdata=fdata.concat({item})
    })
    
    fdata= JSON.stringify(fdata)
    console.log(fdata)
   res.send(fdata)  
})

app.get('/cat/:id',checkAuthenticated, async (req,res) => {
    var data
    data = await Bookmark.find({OwnerID: req.userId, Category: req.params.id})
    console.log(data)
   res.send(data)  
})

app.get('/update/:id',checkAuthenticated, async (req,res) => {
    var data
    data = await Bookmark.findOne({OwnerID: req.userId, _id: req.params.id})
    console.log(data)
   res.send(data)  
})

app.get('/tag/:id',checkAuthenticated, async (req,res) => {
    var data
    data = await Bookmark.find({OwnerID: req.userId, 'tags.tag':req.params.id })
    console.log(data)
   res.send(data)  
})

app.get('/all',checkAuthenticated,async (req,res) => {
    var bms = await Bookmark.find({ OwnerID : req.userId} )
    //console.log(bms)
    res.send(bms)

})

app.get('/fav',checkAuthenticated,async (req,res) => {
    var fbms = await Bookmark.find({ OwnerID : req.userId, favourite:true} )
    console.log(fbms)
    res.send(fbms)

})

app.get('/favfromext',async (req,res) => {
    var fbms = await Bookmark.find({ favourite:true} )
    console.log(fbms)
    res.send(fbms)

})

app.get('/users',checkAuthenticated, async (req,res) => {
    try{
        console.log(req.userId)
        var users = await User.find({}, '-password -__v')
        res.send(users)
    }catch (error){
       console.log(error)
       res.sendStatus(500)
    }

   
})

app.get('/home',checkAuthenticated, async (req,res) => {
    try{
        if(req.userId)
        {console.log(req.userId)
        var users = await User.find({_id: req.userId})
        res.send(users)}
        else {
            res.redirect('/login')
        }
    }catch (error){
       console.log(error)
       res.redirect('/login')
    }

   
})

app.post('/register', (req,res) => {
    var UserData = req.body;
    var user = new User(UserData)

    user.save( (err, result) => {
        if(err)
         console.log('error')
         var payload = user._id
         var token = jwt.encode(payload, '123')
         res.status(200).send({token})
         
    })
    
})

app.post('/newBM',checkAuthenticated, (req,res) => {
    req.body.OwnerID = req.userId
    var BMData = req.body;
    var bookmark = new Bookmark (BMData)
    //bookmark.OwnerID = req.userId
    console.log(bookmark)
    bookmark.save( (err, result) => {
    console.log(bookmark)     
    })
    
})

app.post('/newBMfromext', (req,res) => {
    //req.body.OwnerID = req.userId
    console.log(req.body)
    var BMData = req.body;
    var bookmark = new Bookmark (BMData)
    //bookmark.OwnerID = req.userId
   // console.log(bookmark)
    bookmark.save( (err, result) => {
   // console.log(bookmark)     
    })
    
})

app.post('/update',checkAuthenticated, async (req,res) => {
     
   // console.log(req.body)
    Bookmark.findOneAndUpdate({_id : req.body._id},{name:req.body.name,
        Url: req.body.Url,
        Category: req.body.Category,
     tags : req.body.tags},function(err,result) {
       //console.log(result)
    })
    
    
})

app.post('/change',checkAuthenticated, (req,res) => {
   console.log(req.body)
   Bookmark.findOne({ _id: req.body._id}, function(err, bookmark) {
    if (err)
    {
    }
    else
    {
        bookmark.favourite = !bookmark.favourite;
        bookmark.save(function (err) {
            if (err)
            {
            }
            res.send();
        });
    }
})
    
})

app.post('/delete',checkAuthenticated, (req,res) => {
    //console.log(req.body)
    Bookmark.findOneAndDelete({_id: req.body._id}, function(result,err){

    })
     res.send()
 })

app.post('/login', async (req,res) => {
    var UserData = req.body;
    var user = await User.findOne({email:UserData.email})
    console.log(user)
    
    if(!user)
       return res.status(401).send({message: "email or password is invalid"})
    
    if(UserData.password != user.password)
       return res.status(401).send({message: "email or password is invalid"})
    var payload = user._id
    var token = jwt.encode(payload, '123')
   res.status(200).send({token})
})

Mongoose.connect('mongodb://127.0.0.1:27017/user-data', (err)=> {
    if(!err)
    console.log('connected')
})

app.listen(3000)