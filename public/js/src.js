console.log('client side recieved ')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
// 	response.json().then((data) =>{
// 		console.log(data)
// 	})
// })

const search = document.querySelector('input')

const weather = document.querySelector('form')

const forecast = document.getElementById('forecast')
const searchTerm = document.getElementById('location')

weather.addEventListener('submit',(e)=>{
	e.preventDefault()

	const location = search.value

	forecast.textContent = "Loading....!"
	searchTerm.textContent = ''

	async function f() {
		const res = await fetch('http://localhost:3000/weather?address= '+location)
		const result = await res.json()
		if(result.error){
			console.log(result.error)
		}else{
			forecast.innerHTML = result.forecast
			searchTerm.innerHTML = result.location
		}
	}

	f()
})

	// async function f() {
	// 	const res = await fetch('http://localhost:3000/weather?address= '+location)
	// 	const result = await res.json()
	// 	if(result.error){
	// 		console.log(result.error)
	// 	}else{
	// 		console.log(result.forecast)
	// 		console.log(result.location)
	// 	}
	// }

	// f()

