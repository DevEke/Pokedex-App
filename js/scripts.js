// I LOVE POKEMON


// Stored variable for list of pokemon

let pokemonRepo = (function() {

// Declares our list of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=250';


//Displays Status Messages
  let status = document.querySelector('.status');
  function showLoadingMessage() {
    status.innerHTML = "Loading..."
  }
  
  function showDoneMessage() {
    status.innerHTML = "Ready";
  }


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
      loadDetails(pokemon).then(function () {
        showDoneMessage();
        console.log(pokemon);
      })
    }

// Adds an event listener to the button that shows pokemon's name
  function addListener(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    })
  }

// Retrieves the full pokemon list
  function getAll() {
    return pokemonList;
  }

// Adds a pokemon to the list only if the passed argument is an object
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    }
    else {
      return "Sorry, Pokemon must have an Id, Name, Type, and Height.";
    }
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      showDoneMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      showDoneMessage();
      console.log(error);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (error) {
      console.log(error);
    });
  }



  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  }
})();

// Loops through Pokemon List and displays each pokemon's name
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
})
