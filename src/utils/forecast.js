const request = require('request')


const forecast = (lat,long,callback) =>{
	const url = 'https://api.darksky.net/forecast/60c673bb4fbaf7571e34fa7f6c71bada/'+lat+','+long
	
  //response.body = {body}
	request({url,json:true},(error,{body})=>{
		if(error){
			callback('Unable to connect to service provider',undefined)
		}else if(body.error){
			callback('Failed to connect. Try another location',undefined)
		}else{
			callback(undefined, body.daily.data[0].summary+' It is currently at '+ body.currently.temperature + ' degrees out' + ' There is a ' + body.currently.precipProbability +' % chance of rain . ' + "Lowest Temperature is "+body.daily.data[0].temperatureLow+" . "+" Highest Temperature is "+ body.daily.data[0].temperatureHigh + " .")
		}
	})
}

module.exports = forecast



