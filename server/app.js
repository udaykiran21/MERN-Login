const express = require('express') //import the express library
const app = express()
const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const middleware = require('./middleware')
const mongoose = require('mongoose') //import mongoose
//const url = 'mongodb+srv://Udaykiran:udaykiran@uday.uuhmz.mongodb.net/peopledb?retryWrites=true&w=majority'
const url = 'mongodb://localhost/peopledb' //url to connect to DB

const RegisterModel = require("./models/users") //importing the schema

const router = express.Router()
const port = process.env.PORT || 5000 //assigns the port 5000 if available
//mongosdb connection
mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true})
			.then(() => console.log("db connected..."))
			.catch((err) => console.log(err))

app.use(express.json())
app.use(express.urlencoded({extended: true})) // these are to parse the body of request
app.use(cors({
  origin:'*'
}))


//this endpoint renders the html form for user input

app.get('/', (req,res) => {
	res.send('<h1>hello world<h1>')
})

app.post('/register', async (req,res) => {
	try{
		const {username,email,password,confirmpassword} = req.body;
		let user = await RegisterModel.findOne({email})
		if (user){
			return res.send('user already exists')
		}
		if (password !== confirmpassword){
			return res.send('passwords dont match')
		}
		let NewUser = new RegisterModel({
			username,
			email,
			password,
			confirmpassword
		})
		await NewUser.save();
		res.send('registered successfully')
	}
	catch(err){
		console.log(err)
	}
})

app.post('/login', async (req,res) => {
	try{
		const {username,password} = req.body;
		let user = await RegisterModel.findOne({username})
		if (!user){
			return res.send('please sign-up')
		}
		if (user.password !== password){
			return res.send('passwords dont match')
		}
		let payload = {
			User:{
				id:user.id
			}
		}
		jwt.sign(payload,'jwtKey',{expiresIn:6000000},(err,token)=>{
			if (err)
				throw err
			
			return res.json({token})
			
		})
		
	}
	catch(err){
		console.log(err)
	}
})

app.get('/profile',middleware,async(req,res)=>{
	try{
		let user = await RegisterModel.findById(req.User.id)
		if(!user){
			return res.send('user not found')
		}
		res.json(user)
	}
	catch(err){
		console.log(err)
		return res.send('error')

	}
})
// listens to the server at the port assigned
app.listen(port, () => {
	console.log('server running at:' + port)
})