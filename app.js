//jshint esversion:6
const express = require("express");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/scrts', {useNewUrlParser: true}).then(() =>{
    console.log('mongo connected!');
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

const userSchema = {
    email : {
     type :   String ,
     required : true
    },
    password : {
        type : String,
        required : true
    }
}

const User = new mongoose.model('User',userSchema);


app.get("/", function (req,res) { 
   
    res.render('home');
});

app.get("/register", function (req,res) { 
   
    res.render('register');
});

app.get("/login", function (req,res) { 
   
    res.render('login');
});

app.post('/register', function (req,res) {
   
    const mail  =  req.body.username;
    const pass  =  req.body.password;

    const func = async () => {
        const foundUser = await User.findOne({email : mail});

        if(foundUser){ //if it does not return null
            console.log('already exist!');
            res.redirect('/register');
        }else{ 
        
            const user = new User({
                email : mail,
                password : pass
            });

            user.save().then(() => {
                console.log('new user registered!');
                res.redirect('/login')
            });
        }
    }
    func();
})

// app.post('/login', function (req,res) {
//     const mail  =  req.body.username;
//     const pass  =  req.body.password;
    
//     console.log(mail);
//     console.log(pass);

//     const func = async () => {
//         const foundUser = await User.find({email : mail});
      
//         if(foundUser){ 
//             if(foundUser[0].password === pass){
//               res.redirect('/secrets');
//             }else{
//               console.log('wrong password!');
//               res.redirect('/login');  
//             } 
      
//         }else{ 
//             console.log('no user with such credentials found!');
//             res.redirect('/register');
//         }
//     }
//     func();
// })


app.listen(3000, function (req,res) {

     console.log('server is running on port port.');
});