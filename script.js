const searchForm = document.getElementById("form");
const searchBox = document.getElementById("searchBox");

const displayField = document.getElementById("heroField");


window.addEventListener('DOMContentLoaded', () => {
	displayField.innerHTML = `<h3 class="h3 text-danger">Start typing in the search bar to find your favorite superhero</h3>`
})


searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const searchVal = searchBox.value.toLowerCase();
	searchVal.length === 0 ? displayField.innerHTML = `<h3 class="h3 text-warning">You haven't typed anything yet...</h3>` : filterSuperHero(searchVal);

})

const filterSuperHero = async (data) => {
	const fetchHero = await fetch(`https://www.superheroapi.com/api.php/727054372039115/search/${data}`);
	const parseHero = await fetchHero.json();
	let filteredHeroes = parseHero;
	displayHeroes(filteredHeroes);
}

const displayHeroes = (data) => {
	if (data.response == 'error') {
		displayField.innerHTML = `<h3 class="h3 text-white text-center">Superhero wasn't found</h3>
									<p class="text-warning text-center">${data.error}</p>`
	}
	else if (data.response == 'success') {
		displayField.innerHTML = `<div class="text-success col-12 text-center h3">${data.results.length} superheroes matched for ${data['results-for']}</div>` +
			data.results.map(hero => {
				const { id, name, biography: { publisher }, image: { url } } = hero;
				return (
					`<div class="card col-3 bg-dark text-white">
									<img
									src="${url}"
									class="card-img-top h-50" alt="...">
									<div class="card-body">
									<h5 class="card-title">${name}</h5>
									<p class="card-text">${publisher}</p>
									</div>
									<div class="card-footer">
									<button href="#" onclick="modalSup(${id})" class="btn btn-sm btn-primary">See More</button>
									</div>
								</div>`
				)
			}).join();
	}

}
const modalSup = async (id) => {
	let getModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
	let superHeroName = document.getElementById('superHeroName');
	let img = document.getElementById('img')
	let superHeroFullName = document.getElementById('superHeroFullName');
	let gender = document.getElementById('gender');
	let race = document.getElementById('race');
	let intelligence = document.getElementById('intelligence'),
		power = document.getElementById('power'),
		strength = document.getElementById('strength'),
		speed = document.getElementById('speed'),
		durability = document.getElementById('durability'),
		combat = document.getElementById('combat')

	const fetchHero = await fetch(`https://www.superheroapi.com/api.php/727054372039115/${id}`);
	const data = await fetchHero.json();

	img.src = data.image.url;
	superHeroName.innerText = data.name;
	superHeroFullName.innerText = data.biography['full-name'];
	gender.innerText = data.appearance.gender;
	race.innerText = data.appearance.race;
	intelligence.style.width = `${data.powerstats.intelligence}%`;
	power.style.width = `${data.powerstats.power}%`;
	strength.style.width = `${data.powerstats.strength}%`;
	speed.style.width = `${data.powerstats.speed}%`;
	durability.style.width = `${data.powerstats.durability}%`;
	combat.style.width = `${data.powerstats.combat}%`;
	console.log(power.style.width);

	await getModal.toggle();
}



