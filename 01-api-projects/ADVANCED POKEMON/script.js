const card = document.querySelector('.tcg-card');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const randomBtn = document.getElementById('randomBtn');

const typeGradients = {
  fire: 'linear-gradient(180deg,#ff9a9e,#fad0c4)',
  water: 'linear-gradient(180deg,#a1c4fd,#c2e9fb)',
  grass: 'linear-gradient(180deg,#d4fc79,#96e6a1)',
  electric: 'linear-gradient(180deg,#f9d71c,#f4c430)',
  psychic: 'linear-gradient(180deg,#f6d365,#fda085)',
  ghost: 'linear-gradient(180deg,#8e9eab,#735797)',
  dragon: 'linear-gradient(180deg,#667eea,#764ba2)',
  dark: 'linear-gradient(180deg,#434343,#000000)',
  water: 'linear-gradient(180deg,#74ebd5,#ACB6E5)',
  normal: 'linear-gradient(180deg,#e0e0e0,#f5f5f5)'
};

async function fetchPokemon(query){
  try{
    card.classList.add('loading');

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toString().toLowerCase()}`
    );

    if(!res.ok) throw new Error('Pokemon not found');

    const data = await res.json();
    await updateCard(data);

  }catch(err){
    alert('Pokemon nahi mila!');
    console.error(err);
  }finally{
    card.classList.remove('loading');
  }
}

async function updateCard(data){

  document.getElementById('poke-name').textContent = data.name;

  document.getElementById('poke-hp').textContent =
    data.stats[0].base_stat;

  document.getElementById('poke-img').src =
    data.sprites.other['official-artwork'].front_default ||
    data.sprites.front_default;

  const feet = Math.floor(data.height * 3.937);
  const inches = Math.round((data.height * 3.937 % 1) * 12);

  document.getElementById('poke-info').textContent =
    `NO. ${String(data.id).padStart(4,'0')} ${data.types[0].type.name} Pokemon HT: ${Math.floor(feet/12)}'${inches}" WT: ${(data.weight/4.536).toFixed(1)} lbs.`;

  const mainType = data.types[0].type.name;

  document.getElementById('type-icon').className =
    `type-icon ${mainType}`;

  document.querySelector('.card-inner').style.background =
    typeGradients[mainType] || typeGradients.normal;

  try{
    const speciesRes = await fetch(data.species.url);
    const species = await speciesRes.json();

    const flavor = species.flavor_text_entries.find(
      e => e.language.name === 'en'
    );

    document.getElementById('flavor').textContent =
      flavor
      ? flavor.flavor_text.replace(/\f/g,' ')
      : 'No description available.';
  }catch{
    document.getElementById('flavor').textContent =
      'No description available.';
  }
}

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if(query) fetchPokemon(query);
});

randomBtn.addEventListener('click', () => {
  const randomId = Math.floor(Math.random() * 1010) + 1;
  fetchPokemon(randomId);
  searchInput.value = '';
});

searchInput.addEventListener('keyup', e => {
  if(e.key === 'Enter') searchBtn.click();
});

fetchPokemon(25);