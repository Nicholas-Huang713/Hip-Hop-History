const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');

//GET ALL USERS
router.get('/', (req, res) => {
    Users.find({})
    .then((data) => {res.json(data)})
    .catch((error) => {console.log('Error: ' + error)});
});

//CHOOSE BACKGROUND THEME
router.put('/theme/:bgurl', verifyToken, (req, res) => {
    const decodedId = jwt.verify(req.token,  process.env.TOKEN_SECRET);
    Users.updateOne({_id: decodedId}, {$set: {theme: req.params.bgurl}})
    .then(() => {
        Users.find({_id: decodedId})
        .then((data) => {res.json(data)})
        .catch((error) => {res.json(error)});
    })
    .catch(err => res.json(err));
});

//GET USER PLAYLIST
router.get('/playlist/:id', verifyToken, (req,res) => {
    Users.find({_id: req.params.id})
    .then((data) => {res.json(data);})
    .catch((error) => {console.log('Error: ' + error)});
})

//GET A USER
router.get('/getuser', verifyToken, (req, res) => {
    jwt.verify(req.token,  process.env.TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.sendStatus(403);
        } else {
            Users.find({_id: decoded})
            .then((data) => {res.json(data)})
            .catch((error) => {console.log('Error: ' + error)});
        }
    })
});

//REGISTER
router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const emailExist = await Users.findOne({email: req.body.email});
    if(emailExist) return res.status(400).json('Email already exists');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new Users({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email, 
        password: hashedPassword
    });
    try{
        await user.save();
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);
    } catch(err){
        res.status(400).send(err);
    }   
});

//LOGIN
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await Users.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email does not exist');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

//LIKE SONG
router.put('/like', verifyToken, (req, res) => {
    const decodedId = jwt.verify(req.token,  process.env.TOKEN_SECRET);
    Users.updateOne({_id: decodedId}, {$push: {favelist: req.body}})
    .then(() => {
        Users.find({_id: decodedId})
        .then((data) => {res.json(data);})
        .catch((error) => {console.log('Error: ' + error)});
    })
    .catch(err => res.json(err));
});

//UNLIKE SONG
router.put('/unlike', verifyToken, (req, res) => {
    const decodedId = jwt.verify(req.token,  process.env.TOKEN_SECRET);
    Users.findOneAndUpdate({_id: decodedId}, {$pull: {favelist: req.body}})
    .then(() => {
        Users.find({_id: decodedId})
        .then((data) => {res.json(data)})
        .catch((error) => {console.log('Error: ' + error)});
    })
    .catch(err => res.json(err));
});

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;