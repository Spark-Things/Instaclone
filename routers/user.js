const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');
const { json } = require('stream/consumers');
const Post = mongoose.model("Post");

router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name username")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
});

router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: {_id : req.user._id, name: req.body.followername,username: req.body.followerusername,pic: req.body.followerpic }}
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: {_id : req.body.followId, name: req.body.name,username: req.body.username,pic: req.body.pic }}

        }, { new: true })
        .select("-password")
        .then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })

    }
    )
});

router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: {_id:req.user._id} }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: {_id :req.body.unfollowId}}

        }, { new: true }).select("-password").then(result => {
            res.json(result)
        }).catch(err => {
            return res.status(422).json({ error: err })
        })

    }
    )
});

router.put('/updatepic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $set: { pic: req.body.pic } }, { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "pic canot set" })
            }
            res.json(result)
        })
});

router.post('/search-users',(req,res)=>{
    let userPattern=new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email name pic")
    .then(user=>{
        res.json(user)
    }).catch(err=>{
        console.log(err);
    })
})


router.get('/allUsers', (req,res) => {
    User.find()
    .select("_id name pic")
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        res.json(err);
    })
})


router.get('/profile/:userId',(req,res)=>{
     User.findOne({_id: req.params.userId})
     .populate("posts")
     .exec((err,post) => {
        if(err){
            return res.json({error : err});
        }
        if(post._id.toString() == req.params.userId.toString()){
           return res.json(post)
        }
    } 
     )})

router.get('/profile/:userId/following',(req,res) =>{
    User.findOne({_id: req.params.userId})
    .exec((err,post) => {
       if(err){
           return res.json({error : err});
       }
       if(post._id.toString() === req.params.userId.toString()){
           res.json(post);
       }
    })
    }
 )


module.exports = router;