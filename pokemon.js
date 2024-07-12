let offset = 0;
let limit = 20;
let data = "";
let finalData = [];
const main = document.querySelector("main");
const search = document.querySelector("header input");
const filterType = document.querySelector("header select");
const loadMore = document.querySelector("#loadMore");

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

window.addEventListener("load", async () => {
  loadPokemons();
});

search.addEventListener("keyup", searchPokemon);
filterType.addEventListener("change", filterPokemon);
loadMore.addEventListener("click", async () => {
  offset = offset + limit;
  loadPokemons();
});

function showData(data) {
  main.innerHTML = "";
  // console.log(data);
  data.forEach((dt) => {
    const flipCard = document.createElement("div");
    const flipCardInner = document.createElement("div");
    const flipCardFront = document.createElement("div");
    const flipCardBack = document.createElement("div");
    const pokeImg = document.createElement("img");
    const pokeName = document.createElement("h3");
    const pokeID = document.createElement("p");
    const pokeType = document.createElement("p");
    const backPara = document.createElement("p");

    flipCard.classList.add("flip-card");
    flipCardInner.classList.add("flip-card-inner");
    flipCardFront.classList.add("flip-card-front");
    flipCardBack.classList.add("flip-card-back");

    backPara.innerHTML =
      "<span>Height: " +
      dt.height +
      "</span><span>Weight: " +
      dt.weight +
      "</span>";
    pokeImg.src = dt.sprites.other.dream_world.front_default;
    pokeID.innerHTML = "ID: " + dt.id;
    pokeName.innerHTML = dt.name;
    pokeType.innerHTML = "TYPE: " + dt.types[0].type.name;

    flipCardBack.append(backPara);
    flipCardFront.append(pokeID, pokeImg, pokeName, pokeType);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    main.append(flipCard);
  });
}

function searchPokemon(e) {
  if (e.target.value.length === 0) {
    showData(finalData);
  } else {
    //make copy of the pokemons displayed on screen
    let forSearching = finalData;
    // find the searchterm in that copy
    forSearching = forSearching.filter((obj) =>
      obj.name.includes(e.target.value)
    );
    //display pokemons matching the searchterm
    showData(forSearching);
  }
}

function filterPokemon(e) {
  const type = e.target.value;
  if (type === "all") showData(finalData);
  else {
    //make copy of the pokemons displayed on screen
    let forSearching = finalData;
    // find the searchterm in that copy
    forSearching = forSearching.filter((obj) =>
      obj.types[0].type.name.includes(type)
    );
    //display pokemons matching the searchterm
    showData(forSearching);
  }
}

async function loadPokemons() {
  data = await getDataFromAPI(
    "https://pokeapi.co/api/v2/pokemon?limit=" + limit + "&offset=" + offset
  );
  data.results.forEach(async (obj) => {
    const temp = await getDataFromAPI(obj.url);
    finalData.push(temp);
    console.log(finalData.length);
    showData(finalData);
  });
}
