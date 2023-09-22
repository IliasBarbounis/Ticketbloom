
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');


const { MongoClient } = require('mongodb');
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const databaseName = 'Ticketbloom';

var userNumber;

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
 
    async function firstDocs() {

      try {
        await client.connect();

  
      

        
  
        var db = client.db(databaseName);
  
        var collectionName = 'Users';
  
        var collection = db.collection(collectionName);
  
        const user0 = {
          userType: "U",
          username : "user0",
          password : "12345",
          name : "Nikos",
          surname : "Papadopoulos",
          phoneNumber : "6930229842",
          email : "nikospap@gmail.com",
          userID : 0
        };

        const admin0 = {
          userType: "A",
          username : "admin",
          password : "admin",
          name : "admin",
          surname : "admin",
          phoneNumber : "admin",
          email : "admin@gmail.com",
          userID : 100
        };

        const image0MinPath = fs.readFileSync('public/event_photos/artic_monkeys_out.png');
        const image0MaxPath = fs.readFileSync('public/event_photos/artic_monkeys_in.png');
        const image0MapPath = fs.readFileSync('public/event_photos/artic_monkeys_map.png');


        const event0 = {
          title: "Release Athens 2023 - ARCTIC MONKEYS",
          description : "Imagine Dragons is an American pop rock band based in Las Vegas, Nevada, consisting of lead singer Dan Reynolds, guitarist Wayne Sermon, bassist Ben McKee and drummer Daniel Platzman.",
          date :'18.7.2023',
          time : "17:00",
          place : "Faliro Olympic Complex",
          imageMin: image0MinPath,
          imageMax : image0MaxPath,
          map: image0MapPath,
          ticket1Price: 20,
          ticket1Seats: 40,
          ticket2Price: 40,
          ticket2Seats: 30,
          ticket3Price: 80,
          ticket3Seats: 30,
          eventID : 0
        };

        const image1MinPath = fs.readFileSync('public/event_photos/david_gueta_out.png');
        const image1MaxPath = fs.readFileSync('public/event_photos/david_gueta_in.png');
        const image1MapPath = fs.readFileSync('public/event_photos/david_gueta_map.png');

        const event1 = {
          title: "PRIMER 2023 - David Guetta",
          description : "Pierre David Guetta is a French DJ and music producer. He has over 10 million album and 65 million single sales globally, with more than 14 billion streams. In 2011, 2020 and 2021, Guetta was voted the number one DJ in the DJ Mag Top 100 DJs poll.In 2013, Billboard crowned 'When Love Takes Over' as the number one dance-pop collaboration of all time.",
          date : '27.08.2023',
          time : "17:00",
          place : "Faliro Olympic Complex",
          imageMin: Buffer.from(image1MinPath),
          imageMax : Buffer.from(image1MaxPath),
          map: Buffer.from(image1MapPath),
          ticket1Price: 40,
          ticket1Seats: 40,
          ticket2Price: 60,
          ticket2Seats: 30,
          ticket3Price: 100,
          ticket3Seats: 30,
          eventID : 1
        };
        
        const userNumber = {
          totalUsers : 1,
          counter : 1
        };
      
  
        if (await collection.countDocuments() == 0 && userNumber.totalUsers ==1) {
          await collection.insertOne(userNumber);


          await collection.insertOne(user0);

          await collection.insertOne(admin0);

          

          var document = { name:"about" ,title:"Athens Festival Campaign", text: "The specific campaign concerns the annual Athens Festival, in which particularly noteworthy artistic events are organized during the months of July and August. For the year 2023, a series of musical events by well-known musicians and bands, award-winning films and theatrical performances will be presented, covering the entire artistic content of the Athens Festival. We invite you to participate in the artistic events of the Athens Festival. You will find useful information for each one of the events on the Ticketbloom web pages. From the same application you can book your seats and receive your electronic tickets in your e-mail." };
          
          var collectionName = 'Informations';
  
          var collection = db.collection(collectionName);

          await collection.insertOne(document);

        }
        var collectionName = 'Events';
  
        var collection = db.collection(collectionName);

        if (await collection.countDocuments() == 0) {
          
          await collection.insertOne(event0);

          await collection.insertOne(event1);

        }

        if (await collection.countDocuments() == 0) {
          await collection.insertOne(user0);

          var collectionName = 'Events';
  
          var collection = db.collection(collectionName);

          await collection.insertOne(event0);
          
        }

        if (req.session.user) {
          
          const collectionName = 'Bookings';

          const db = client.db(databaseName);

          const collection = db.collection(collectionName);

          const data = await collection.find({username: req.session.user.username}).toArray();

          
          res.redirect("/logged_in");
         
        } else {

            res.render('index');
        }
  
      } finally {
        await client.close();
      }
    }
  
    firstDocs();
    
  
});

app.post('/login', function(req, res) {

  const { username, password} = req.body;

  async function Login() {
  try {
    await client.connect();
    
    const collectionName = 'Users';

    const db = client.db(databaseName);
    const collection = db.collection(collectionName);

    const user = await collection.findOne({ username: username, password: password });

    
    if (user) {
      req.session.user = { username: username };
      res.redirect('/logged_in');
    }
    else{
      res.status(401).send('Invalid Credentials');
    }

  } catch (error) {
    console.error('Failed to login:', error);
  } finally {
    await client.close();
  }
}

Login();
 
});

app.get('/login', (req, res) => {
  res.render('login_page' );
});

app.get('/register', (req, res) => {
  async function Count() {

    try {
      await client.connect();

      const db = client.db(databaseName);

      const collectionName = 'Users';

      const collection = db.collection(collectionName);

      const userNumber = await collection.findOne({ counter: 1 });
        
      res.render('register_page', {userNumber: userNumber["totalUsers"]});

    } finally {
      await client.close();
    }
  }

  Count();

});

app.post('/register', function(req, res) {
  

  async function Register() {

    try {
      await client.connect();

      const db = client.db(databaseName);

      const collectionName = 'Users';

      const collection = db.collection(collectionName);

      const {  password, name, surname, phoneNumber, email} = req.body;


      const docs = await collection.findOne({ counter: 1 });

      userNumber = docs["totalUsers"];


      var username = "user" + userNumber;

    
      const newUser = {
        userType: "U",
        username,
        password,
        name,
        surname,
        phoneNumber,
        email,
        userID: userNumber
      };
      
      
      const existEmail = await collection.findOne({ email: email});
      if (existEmail){
        console.log(`email already taken!`);
      }
      else{
        collection.updateOne(
          { counter: 1 },
          { $set: { totalUsers: userNumber + 1 } }
        )

        await collection.insertOne(newUser);

        res.render('index' , { message:"success"} );
      }

      

    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      await client.close();
    }
  }

  Register();

});

app.get('/my_profile', (req, res) => {
  if (req.session.user) {
    async function user_data() {

      try {
        await client.connect();
        
        const collectionName = 'Users';
  
        const db = client.db(databaseName);
        const collection = db.collection(collectionName);
        
        
        const user = await collection.findOne({ username: req.session.user.username});
        
        res.render('user_profile_page' , { username: req.session.user.username,  password: user.password, name: user.name, surname:user.surname, phoneNumber:user.phoneNumber, email:user.email});
  
      } catch (error) {
        console.error('Failed to register:', error);
      } finally {
        await client.close();
      }
    }
  
    user_data();
    
  } else {
    // User is not logged in, redirect to the login page
    res.render('index' , { message:"reject"} );
  }
});

app.get('/artistic_events', (req, res) => {
  async function get_events() {

    try {
      await client.connect();
      
      const collectionName = 'Events';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

      const data = await collection.find().toArray();
      
      
      if (req.session.user) {

        res.render('events_page', { in_session: "true", data });
      } else {
        
    
        res.render('events_page', { in_session: "false" , data });
      }

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  get_events();

  
});

app.get('/booking_page', (req, res) => {
  
  async function get_event_data() {

    try {
      await client.connect();
      
      const collectionName = 'Events';

      const db = client.db(databaseName);

      const collection = db.collection(collectionName);

      const eventId = req.query.event;

      const event = await collection.findOne({ eventID: parseInt(eventId) });
      
      if (req.session.user) {

        res.render('booking_page', { event , username: req.session.user.username});
      } else {

        res.render('index' , { message:"reject"} );
      }
      
    } catch (error) {
      console.error('Failed to get Events:', error);
    } finally {
      await client.close();
    }
  }

  get_event_data();
  

});

app.post('/submit_booking', (req, res) => {
  
  const formData = req.body;
  async function insert_booking() {

    try {
      await client.connect();

      var db = client.db(databaseName);

      var collectionName = 'Bookings';

      var collection = db.collection(collectionName);

      const data = await collection.find({username: req.session.user.username}).toArray();

      await collection.insertOne(formData);

         
      
      res.redirect("/");
      

    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      await client.close();
    }
  }

  

  insert_booking();
  
});


app.get('/logged_in', (req, res) => {
  async function get_bookings() {

    try {
      await client.connect();
      
      var collectionName = 'Bookings';

      const db = client.db(databaseName);
      var collection = db.collection(collectionName);

      const data = await collection.find({username: req.session.user.username}).toArray();


      var collectionName = 'Users';
      var collection = db.collection(collectionName);

      const users = await collection.find({}).toArray();
      const user = await collection.findOne({ username : req.session.user.username});


      
      if (req.session.user) {
        if(user["userType"] == "A"){
          res.render('admin_page', { username: req.session.user.username, data , users});
        }
        else{
          res.render('logged_in_page', { username: req.session.user.username, data });
        }
       
      } else {
        
    
        res.redirect('/');
      }

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  get_bookings();
  

});

app.get('/logout', (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy();
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/');
});



app.get('/about', (req, res) => {
  async function get_about() {

    try {
      await client.connect();
      
      const collectionName = 'Informations';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);


      const about = await collection.findOne({ name : "about"});
  
      
      if (req.session.user) {

        res.render('about_page', { in_session: "true", about });
      } else {
        
    
        res.render('about_page', { in_session: "false" , about });
      }
    
       
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  get_about();

  
});

app.get('/edit_about', (req, res) => {
  async function edit_about() {

    try {
      await client.connect();
      
      const collectionName = 'Informations';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);


      const about = await collection.findOne({ name : "about"});
  
      
   
        res.render('edit_about_page', {  about });   
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  edit_about();

  
});

app.post('/about_form', (req, res) => {
  async function edit_about_form() {

    const title = req.body.title;
    const content = req.body.content;


    try {
      await client.connect();
      
      const collectionName = 'Informations';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);


      const about = await collection.findOne({ name : "about"});
  
      
      await collection.findOneAndUpdate({ name:  "about"}, { $set: { title: title} });
      await collection.findOneAndUpdate({ name:  "about"}, { $set: { text: content} });

      res.redirect('/edit_about');   
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  edit_about_form();
  
});



app.get('/review', (req, res) => {
  async function get_events() {

    try {
      await client.connect();
      const eventId = req.query.event;

      var db = client.db(databaseName);

      
      var collectionName = 'Events';

      
      var collection = db.collection(collectionName);

      
      const event = await collection.findOne({ eventID: parseInt(eventId) });

      var collectionName = 'Reviews';

      var collection = db.collection(collectionName);


      var reviews = await collection.find({event_title: event.title}).toArray();

      res.render('review_page', { username: req.session.user.username, event, reviews });
      
    

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  get_events();

  
});



app.post('/submit_review', (req, res) => {
  
  const formData = req.body;
  async function insert_review() {

    try {
      await client.connect();

      var db = client.db(databaseName);

      var collectionName = 'Reviews';

      var collection = db.collection(collectionName);

      await collection.insertOne(formData);

         
      
      res.redirect("/");
      

    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      await client.close();
    }
  }

  

  insert_review();
  
});



app.post('/processForm', (req, res) => {
  const { username, name, surname, phone, email } = req.body;
  const action = req.body.action;


  async function update_user() {

    try {
      await client.connect();

      var db = client.db(databaseName);

      var collectionName = 'Users';

      var collection = db.collection(collectionName);

      if (action === 'edit') {
      
          await collection.findOneAndUpdate({ username:  username}, { $set: { name: name, surname: surname, phoneNumber: phone, email: email } });
      } else if (action === 'delete') {
        await collection.deleteOne({ username });
      }

  

      res.redirect("/");
      
    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      await client.close();
    }
  }

  update_user();
  
});

app.post('/update_user', (req, res) => {
  const { username,password, name, surname, phoneNumber, email } = req.body;

  async function update_user() {

    try {
      await client.connect();

      var db = client.db(databaseName);

      var collectionName = 'Users';

      var collection = db.collection(collectionName);



      await collection.findOneAndUpdate({ username:  username}, { $set: { name: name, password:password, surname: surname, phoneNumber: phoneNumber, email: email } });

      res.redirect("/my_profile");
      
    } catch (error) {
      console.error('Failed to register:', error);
    } finally {
      await client.close();
    }
  }

  update_user();
  
});

app.get('/edit_events', (req, res) => {
  async function edit_about() {

    try {
      await client.connect();
      
      const collectionName = 'Informations';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);


      const about = await collection.findOne({ name : "about"});
  
      
   
        res.render('edit_event_page');   
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  edit_about();

  
});

app.post('/edit_events_form', (req, res) => {
  async function edit_events_form() {




    try {
      await client.connect();
      
      const collectionName = 'Events';

      const db = client.db(databaseName);
      const collection = db.collection(collectionName);

      const image1MinPath = fs.readFileSync('public/event_photos/generic_min.jpg');
      const image1MaxPath = fs.readFileSync('public/event_photos/generic_max.jpg');
      const image1MapPath = fs.readFileSync('public/event_photos/david_gueta_map.png');


      const {  title, description, date, time, place, ticket1Price, ticket1Seats, ticket2Price, ticket2Seats, ticket3Price, ticket3Seats} = req.body;

    
      const newEvent = {
        title,
        description,
        date,
        time,
        place,
        imageMin: Buffer.from(image1MinPath),
        imageMax : Buffer.from(image1MaxPath),
        map: Buffer.from(image1MapPath),
        ticket1Price,
        ticket1Seats,
        ticket2Price,
        ticket2Seats,
        ticket3Price,
        ticket3Seats,
        eventID: Math.floor(Math.random() * 100000)
      };
      
      
      await collection.insertOne(newEvent);
  
    

      res.redirect('/edit_events');   
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  edit_events_form();
  
});

app.post('/search', (req, res) => {

  var formData = req.body["search"];


  async function search_form() {

    try {
      await client.connect();
      
      var collectionName = 'Events';

      var db = client.db(databaseName);
      var collection = db.collection(collectionName);

      
      var data = await collection.find({title: formData }).toArray();
      
      var alldata = await collection.find().toArray();
      
      

      if (req.session.user) {

        res.render('events_page', { in_session: "true", data });
      } else {
        
        res.render('events_page', { in_session: "false" , data });
      }
      
      

    } catch (error) {
      console.error('Failed to get Events:', error);
      
    } finally {
      await client.close();
    }
  }

  search_form();
  
  
});