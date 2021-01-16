// I LOVE POKEMON


// Stored variable for list of pokemon

let pokemonRepo = (function() {

// Declares our list of pokemon
  let pokemonList = [
    {
      id: 001,
      name: 'Bulbasaur',
      type: ['grass', 'poison'],
      height: 2.33
    },
    {
      id: 002,
      name: 'Ivysaur',
      type: ['grass', 'poison'],
      height: 3.25
    },
    {
      id: 003,
      name: 'Venusaur',
      type: ['grass', 'poison'],
      height: 6.58
    },
    {
      id: 004,
      name: 'Charmander',
      type: ['fire'],
      height: 2
    },
    {
      id: 005,
      name: 'Charmeleon',
      type: ['fire'],
      height: 3.58
    },
    {
      id: 006,
      name: 'Charizard',
      type: ['fire', 'flying'],
      height: 5.58
    },
    {
      id: 007,
      name: 'Squirtle',
      type: ['water'],
      height: 1.67
    },
    {
      id: 008,
      name: 'Wartortle',
      type: ['water'],
      height: 3.25
    },
    {
      id: 009,
      name: 'Blastoise',
      type: ['water'],
      height: 5.25
    }
  ];

// Creates a button for each pokemon in the pokemon list
  function addListItem(pokemon) {
    let selectList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-node');
    listItem.appendChild(button);
    addListener(button, pokemon);
    selectList.appendChild(listItem);
  }

// Shows the pokemon's name in the console
  function showDetails(pokemon) {
      console.log(pokemon);
    }

// Adds an event listener to the button that shows pokemon's name
  function addListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon.name);
    })
  }

// Retrieves the full pokemon list
  function getAll() {
    return pokemonList;
  }

// Adds a pokemon to the list only if the passed argument is an object
  function add(pokemon) {
    let test = ['id', 'name', 'type', 'height'];
    if (typeof pokemon === "object" && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(test)) {
      pokemonList.push(pokemon);
    }
    else {
      return "Sorry, Pokemon must have an Id, Name, Type, and Height.";
    }
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }
})();

// Loops through Pokemon List and displays each pokemon's name

pokemonRepo.getAll().forEach(function(pokemon) {
  pokemonRepo.addListItem(pokemon);
});
