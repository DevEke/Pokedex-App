// I LOVE POKEMON!!!!


// Stored variable for list of pokemon

let pokemonRepo = (function() {

// Declares our list of pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';


// Displays Status Messages
  let status = document.querySelector('.status');
  function showLoadingMessage() {
    status.innerHTML = "Loading..."
  }

  function showReadyMessage() {
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


// Opens Modal
function openModal(pokemon) {

// Creates containers for Modal
  let modalContainer = document.querySelector('.modal-container');
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  let divTop = document.createElement('div');
  divTop.classList.add('div-top');
  let pokemonInfo = document.createElement('div');
  pokemonInfo.classList.add('pokemon-info');

// Creates the name of the pokemon to the modal
  let pokemonName = document.createElement('h1');
  pokemonName.classList.add('title');
  pokemonName.innerText = pokemon.name;

// Creates the pokemon id to the modal
  let pokemonId = document.createElement('p');
  pokemonId.classList.add('id-num');
  pokemonId.innerText = `ID: ${pokemon.id}`;

// Creates close button
  let closeButton = document.createElement('button');
  closeButton.classList.add('close');
  let closeIcon = document.createElement('img');
  closeIcon.src = 'img/close-icon2.svg';
  closeButton.addEventListener('click', hideModal);

// Creates Pokemon Image
  let pokemonImg = document.createElement('img');
  pokemonImg.src = pokemon.imageUrl;
  pokemonImg.classList.add('pokepic');

// Creates Pokemon Height and converts it to Centimeters
  let pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokeheight');
  pokemonHeight.innerText = `Height: ${pokemon.height / .10000 } cm`;

// Creates Pokemon Weight and converts it to Kilograms
  let pokemonWeight = document.createElement('p');
  pokemonWeight.classList.add('pokeheight');
  pokemonWeight.innerText = `Weight: ${pokemon.weight / 10 } kg`;

// Adds all elements to modal
  modalContainer.appendChild(modal);
  modal.appendChild(divTop);
  divTop.appendChild(pokemonInfo);
  pokemonInfo.appendChild(pokemonName);
  pokemonInfo.appendChild(pokemonId);
  divTop.appendChild(closeButton);
  closeButton.appendChild(closeIcon);
  modal.appendChild(pokemonImg);
  modal.appendChild(pokemonHeight);
  modal.appendChild(pokemonWeight);

// Loops through array of pokemon types
  pokemon.types.forEach(function(pokemon) {
    let pokemonType = document.createElement('div');
    pokemonType.classList.add('types');
    pokemonType.innerHTML = pokemon.type.name;

// Switch case for Pokemon types, assigns class based on element of Pokemon
    switch(pokemon.type.name) {
      case "normal": pokemonType.classList.add('normal'); break;
      case "water": pokemonType.classList.add('water'); break;
      case "electric": pokemonType.classList.add('electric'); break;
      case "fighting": pokemonType.classList.add('fighting'); break;
      case "ground": pokemonType.classList.add('ground'); break;
      case "psychic": pokemonType.classList.add('psychic'); break;
      case "rock": pokemonType.classList.add('rock'); break;
      case "dark": pokemonType.classList.add('dark'); break;
      case "steel": pokemonType.classList.add('steel'); break;
      case "fire": pokemonType.classList.add('fire'); break;
      case "grass": pokemonType.classList.add('grass'); break;
      case "ice": pokemonType.classList.add('ice'); break;
      case "poison": pokemonType.classList.add('poison'); break;
      case "flying": pokemonType.classList.add('flying'); break;
      case "bug": pokemonType.classList.add('bug'); break;
      case "ghost": pokemonType.classList.add('ghost'); break;
      case "dragon": pokemonType.classList.add('dragon'); break;
      case "fairy": pokemonType.classList.add('fairy'); break;
    }
    modal.appendChild(pokemonType);
  })

// Makes the Modal visible
  modalContainer.classList.add('is-visible');
}

// Shows the pokemon's name in the console
  function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        showReadyMessage();
        openModal(pokemon);
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

// Loads the list of Pokemon from the API
  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      showReadyMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (error) {
      showReadyMessage();
      console.log(error);
    })
  }

// Loads the details for each pokemon
  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.id = details.id;
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (error) {
      console.log(error);
    });
  }


// Returns to functions from IIFE
  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    openModal: openModal
  }
})();

// Loops through Pokemon List and displays each pokemon's name
pokemonRepo.loadList().then(function() {
  pokemonRepo.getAll().forEach(function(pokemon) {
    pokemonRepo.addListItem(pokemon);
  });
})

// Closes the Modal
function hideModal() {
  let modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('is-visible');
};

// Closes the Modal when pressing the Escape Key and Modal is open
window.addEventListener('keydown', function(e) {
  let modalContainer = document.querySelector('.modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

// Closes Modal when an area outside of Modal is clicked
 document.querySelector('.modal-container').addEventListener('click', function(e) {
    let target = e.target;
    if (target === document.querySelector('.modal-container')) {
      hideModal();
    }
  });
