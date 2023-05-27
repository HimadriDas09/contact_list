const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');//db to access the db
const Contact = require('./models/contact');//Contact is used to populate a collection

const app = express();//app contain all the functionalities of express

app.use(express.static('assets')); /*to use static files => i.e all our .js, .css files will be stored over there only => it will look for the static files in 'assets' */


//middleware 1
// app.use(function(req, res, next){
//     req.myName = 'himadri';//manipulating the req object
//     // console.log("middleware 1 called");
//     next();
// })
// //middleware 2
// app.use(function(req,res, next){
//     console.log('req.myName from md2 : ',req.myName);
//     // console.log('middleware 2 called');
//     next();
// })

/*using a body parser to parse the encoded form data from request, app.use rep use of middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended : false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var contactList = [
    {
        name : "Arpan",
        phone : 1111111111
    },
    {
        name : "Tony Stark",
        phone : 1234567890
    },
    {
        name : "Coding Ninjas",
        phone : 3434342354
    }
]

//app.get('/') is like a controller
app.get('/', function(req, res){
    // console.log('from get controller for route / : ', req.myName);
    // console.log(req);
    // res.send('<h1>Cool, it is running or is it?</h1>');

    return res.render('home', {
        title : "I am flying",
        contact_list : contactList
    });
    /* res.render() for ejs files i.e dynamic files, res.send() for static html files */
});

/* route is practice, In practise.ejs there is a dynamic title => whose value we're sending from here which is "let us play with ejs" */
app.get('/practice', function(req, res){
    return res.render('practise', {
        title : "Let us play with ejs"  //this is making changes to view via controller
    })
});

app.post('/create-contact', function(req, res){
    // return res.redirect('/practice');
    /* res.redirect => redirects us to an url or a route */
    contactList.push(req.body);

    return res.redirect('back'); // instead of res.redirect('/') i.e redirecting to default route and res.redirect('back') -> redirecting to the route from where you asked for 'create-contact'
})

//for deleting a contact
app.get('/delete-contact', function(req,res){
    //get the query from the url
    let phone = req.query.phone;
    // console.log(req.params);
    // let phone = req.params.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');
})

app.listen(port, function(err){
    if(err){
        console.log('error is encountered', err);
    }
    console.log('Yup! My Express Server is running, or is it?')
})
