// this file to create separate files and import into app.js
const express = require('express');
// use this router rather than the app to create our routes
const router = express.Router();
// import the model
const post = require('../models/post');

// GET BACK ALL THE POST

router.get('/', async (req, res)=>{
    try{
        const postss = await post.find();
        res.json(postss);
    }catch(err){
        res.json({message: err});
    }
});

// SUBMIT THE POST
router.post('/', async (req,res)=>{
    const ppost = new post({
        title: req.body.title,
        description: req.body.description
    });
    /*ppost.save()
    .then(data =>{
        res.status(200).json(data);
    }).catch(err => {
        res.json({message: err})
    });
    => We can simplify
    */
   try{
    const savedpost = await ppost.save();
    res.json(savedpost);
   }catch(err){
    res.json({message: err});
   }
});

router.get('/:postID', async(req,res) =>{
    try{
    const Post = await post.findById(req.params.postID);
    res.json(Post)
    }catch(err){
        res.json({message: err});
    }
});

//Delete post
router.delete('/:postId', async(req, res) =>{
    
    try{
       const removePost = await post.remove({_id: req.params.postId});
       res.json(removePost);
    }catch(err){
        res.json({message: err});
    }
    
});

//Update a post
router.patch('/:postId', async (req, res) => {
    try{
   const updatedPost = await post.updateOne(
    { _id: req.params.postId }, 
    { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;
