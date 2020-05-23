const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');  //  #1
const port = 3000;


mongoose.connect('mongodb://localhost:27017/social', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //  #2  connection code. social is the db name

const db = mongoose.connection;      // #3
db.on('error', err => console.log(err));        // #4
db.once('open', () => console.log('connected to MongoDB'));     // #5

const User = mongoose.model('User', {
    name: String,
    username: {
        type: String,
        required: true
    },
    email:String,
    created: {
        type: Date,
        default: new Date()
    }
}); //  #6

const Post = mongoose.model('Post', {
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: String,
        required: true
    }  
}); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// USERS REST

app.put('/user', (req, res) => {
    const user = new User (req.body);
    user.save()
        .then((user)=> res.status(201).json(user))
        .catch (err=> res.status(400).json(err));
});

app.get('/user', (req, res) => {
    User.find()
        .then (users=> res.json(users))
        .catch(err=> res.json(err))
});

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
		.then(user => {
			if(!user) {
				res.sendStatus(404);
				return;
			}
			res.json(user);
		})
        .catch(err => res.json(err));
        
        //  option 2: (IF WE DONT SEARCH BY ID)
        // User.findOne({ 
        //     _id: req.params.id
        // })
        //     .then (user => res.json(user))
        //     .catch(err => res.json(err));
});

app.post('/user/:id', (req, res) => {
    User.findById(req.params.id)
    .then (user=> {
        if(!user){
            res.sendStatus(404);
            return
        }
        user.update(req.body)
            .then(()=> res.sendStatus(200))
            .catch( err => res.status(400).json(err));
    })
    .catch (err=> res.status(400).json(err));
});

app.delete('/user/:id', (req, res) => {
    User.findById(req.params.id)
    .then (user=> {
        if(!user){
            res.sendStatus(404);
            return
        }
        user.remove()
            .then(()=> res.sendStatus(204))
            .catch( err => res.status(400).json(err));
    })
    .catch (err=> res.status(400).json(err));
});


// POSTS REST

app.put('/post', (req, res) => {
    const post = new Post (req.body);
    post.save()
        .then((post)=> res.status(201).json(post))
        .catch (err=> res.status(400).json(err));
});


app.get('/post', (req, res) => {
    Post.find()
        .then (posts=> res.json(posts))
        .catch(err=> res.json(err))
});

app.get('/post/:id', (req, res) => {
    Post.findById(req.params.id)
		.then(post => {
			if(!post) {
				res.sendStatus(404);
				return;
			}
			res.json(post);
		})
        .catch(err => res.json(err));
});

app.post('/post/:id', (req, res) => {
    Post.findById(req.params.id)
    .then (post=> {
        if(!post){
            res.sendStatus(404);
            return
        }
        post.update(req.body)
            .then(()=> res.sendStatus(200))
            .catch( err => res.status(400).json(err));
    })
    .catch (err=> res.status(400).json(err));
});

app.delete('/post/:id', (req, res) => {
    Post.findById(req.params.id)
    .then (post=> {
        if(!post){
            res.sendStatus(404);
            return
        }
        post.remove()
            .then(()=> res.sendStatus(204))
            .catch( err => res.status(400).json(err));
    })
    .catch (err=> res.status(400).json(err));
});

app.get('/user/:id/posts', (req, res) => {
    Post.find({ 
        userId: req.params.id
    })
      .then (post => res.json(post))
      .catch(err => res.json(err));
});


app.listen(port, () => console.log(`Server listening on port ${port}!`));

