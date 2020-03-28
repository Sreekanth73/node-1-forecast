const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const staticPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)


app.use(express.static(staticPath))

app.get('', (req,res)=>{
	res.render('index',{
		name:'Weather',
		message:'You can check the weather here.'
	})
})

app.get('/about',(req,res)=>{
	res.render('about',{
		name:'About page',
		message:'Sreekanth'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		name:'Help',
		message:'This is Help Page'
	})
})

app.get('/weather',(req,res)=>{

	if(!req.query.address){
		return res.send({
			Error:"Please provide the location name"
		})
	}

	geocode(req.query.address,(error,{lat,long,placeName})=>{
		if(error){
			return res.send({error})
		}
		forecast(lat,long, (error,response)=>{
			if(error){
				res.send({error})
			}

			res.send({
				forecast:response,
				location:placeName,
				address:req.query.address
			})
		})
	})

	// res.send({
	// 	forecast:'it is Snowing',
	// 	location:'india',
	// 	address:req.query.address
	// })
})

app.get('/products',(req,res)=>{

	if(!req.query.search){
		return res.send({
			error:'please provide a correct search term'
		})
	}

	console.log(req.query.search);
	res.send({
		products:[]
	})
})

app.get('/help/*', (req,res)=>{
	res.render('404page', {
		pageMessage:'help article not found'
	})
})

app.get('*',(req,res)=>{
	res.render('404page')
})


app.listen(3000, ()=>{
	console.log('server is runnin on port number ' + 3000)
})