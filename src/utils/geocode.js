const request = require('request')


const geocode = (address,callback) =>{
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic3Jpa2FudGgtcCIsImEiOiJjazg0a3o3dGcwNDl2M2Vxb2NxMnQ5cW04In0.I8tDSKQWybFcHHzidRY-vg&limit=1'
//response.body = body
	request({url:url,json:true},(error,{body})=>{
		if(error){
			callback('Unable to connect to service provider',undefined)
		}else if(body.error){
			callback('Failed to connect. Try another location',undefined)
		}else{
			callback(undefined,{
				placeName:body.features[0].place_name,
				lat:body.features[0].center[1],
				long:body.features[0].center[0]
			})
		}
	})
}

module.exports = geocode