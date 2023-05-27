//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1/contacts_list_db');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error', console.error.bind(console,'error connecting to db'));

//once connection is open for me to interact with the database, cb fn
db.once('open', function(){
    console.log('Successfully connected to the database');
});
