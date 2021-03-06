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
		const res = await fetch('/weather?address= '+location)
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


