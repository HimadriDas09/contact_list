const express = require('express');
const path = require('path');

const port = 8000;
const app = express();//app contain all the functionalities of express

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.get('/') is like a controller
app.get('/', function(req, res){
    // console.log(req);
    // res.send('<h1>Cool, it is running or is it?</h1>');

    return res.render('home', {title : "I am flying"});/* res.render() for ejs files i.e dynamic files, res.send() for static html files */
});

/* route is practice, In practise.ejs there is a dynamic title => whose value we're sending from here which is "let us play with ejs" */
app.get('/practice', function(req, res){
    return res.render('practise', {
        title : "Let us play with ejs"  //this is making changes to view via controller
    })
});


app.listen(port, function(err){
    if(err){
        console.log('error is encountered', err);
    }
    console.log('Yup! My Express Server is running, or is it?')
})
