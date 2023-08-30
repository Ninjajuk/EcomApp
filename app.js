// const express=require('express')
// const{MongoClient}=require('mongodb')

// const app=express()
// const port =3000

// const uri_String='mongodb+srv://samsu:ninjaking@cluster0.hne9oli.mongodb.net/?retryWrites=true&w=majority'
// const client=new MongoClient(uri_String)

// async function connectToDb(){
//     try{
//         await client.connect()
//         console.log("MongoBd connected")
//         const dbName = 'products'; // Replace with your desired database name
//         const db = client.db(dbName);
//         console.log(`Using database: ${dbName}`);
    
//         const usersCollection = db.collection('products');
    
//         // Insert data into the "users" collection
//         const newUser = {
//           name: 'Ajuk',
//           age: 24,
//           email: 'ajuk@example.com'
//         };
    
//         await usersCollection.insertOne(newUser);
//         console.log('Data inserted successfully');
//     }
//     catch(error){
//         console.log(error)
//     }
// }
// connectToDb()
// app.get("/",async(req,resp)=>{
//     try {
       
//         resp.send("Hello Samsu");
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         resp.status(500).send('Internal Server Error');
//       }
    

// })
// app.listen(port,(req,resp)=>{
//     console.log(`Server is running at ${port}`)
// })




//Using Mongoose

const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt')
require('dotenv').config(); // Load the dotenv configuration
const User=require('./Model/userModel')
const addressRouter = require('./routes/userAddressRoute');


const app=express()

// Use the PORT environment variable for the local port
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  //Method 2 starts here
//   const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });
  //Method 2 ends here

app.use(express.json());
app.use(cors())
app.use('/', addressRouter)


app.post('/register', async (req, res) => {
  try {
    const {username, password } = req.body;
    const existingUser=await User.findOne({username})
    if (existingUser){
      return res.json({ error: 'Username already taken.' })

    }
const hashedPassowrd=await bcrypt.hash(password,10)
    const newUser = new User({ username, password: hashedPassowrd});

    await newUser.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



app.listen(port,(req,resp)=>{
    console.log(`Server is running at ${port}`)
})
