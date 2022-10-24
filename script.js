// Fetching buttons and divs
let buyBigBuildingBtn = document.getElementById("buy-building-2-btn");
let buySwordBtn = document.getElementById("buy-sword-btn");
let buySmallBuildingBtn = document.getElementById("buy-building-1-btn");
let getMetalBtn = document.getElementById("metal-mine");
let monsterDiv = document.getElementById("monster-div");
let healtPotion = document.getElementById("healt-potion");
let shield = document.getElementById("armor-1");
let helmet = document.getElementById("armor-2");
let inventoryBoard = document.getElementById("board");
let gameContainer = document.getElementById("container");
// Trees
let treeOne = document.getElementById("tree-1");
let treeTwo = document.getElementById("tree-2");
let treeThree = document.getElementById("tree-3");

let buttonMenu = document.getElementById("button-menu");

// LifeBar
let lifeBar = document.getElementById("life-bar");

// Where actions gets outputted
let outputDiv = document.getElementById("output-div");

// Where Building gets outputted
let buildingDiv = document.getElementById("building-div");

// Where material status gets outputted
let materialInfo = document.getElementById("material-info");

// Life Bar
let healthBar = document.getElementById("life-bar");

// Warrior
let warrior = document.getElementById("warrior-1");
let equipedSword = document.getElementById("equiped-sword");
let equipedHelmet = document.getElementById("equiped-helmet");
let equipedShield = document.getElementById("equiped-shield");

// Counters
let treeCountOne = 0;
let treeCountTwo = 0;
let treeCountThree = 0;
let metalClicked = 0;
let monsterDefaultHealth = 40;
let monsterDefaultDamage = 10;
let monsters = [];
let totalMetal = 1000;
let totalGold = 150;
let totalWood = 0;
let totalSmallBuildings = 0;
let totalBigBuildings = 0;
let totalStrenght = 10;
let health = 100;
let swordEquiped = false;
let goldClickCount = 0;

// Functions

// Gameover
function gameOver(bool) {
  let styleGameOverElements = bool === true ? "block" : "none";
  let styleContainerElement = bool === true ? "none" : "block";

  let gameOverElements = document.getElementsByClassName("game-over");

  for (let i = 0; i < gameOverElements.length; i++) {
    gameOverElements[i].style.display = styleGameOverElements;
  }

  gameContainer.style.display = styleContainerElement;
}

// Displays what how much and what kind of materials you have
function displayMaterials() {
  materialInfo.innerHTML = `Wood: ${totalWood} units. Metal: ${totalMetal} units. Gold: ${totalGold} Small budilding: ${totalSmallBuildings} buildings. Big buildings: ${totalBigBuildings} buildings. Strenght: ${totalStrenght} power!`;
}

function displayHealth() {
  healthBar.innerHTML = `${health}`;
}

function displayEquipedArmor(e) {
  if (e.target.classList.contains("equiped")) {
    equipedHelmet.style.display = "block";
  } else if (e.target && e.target.classList.contains("equiped-shield"))
    equipedShield.style.display = "block";
}

displayHealth();
// Displays the different resources
displayMaterials();

// Reusable function
function outputInfo(text) {
  outputDiv.innerHTML += `<p>${text}</p>`;
  if (outputDiv.children.length > 3) {
    outputDiv.removeChild(outputDiv.firstChild);
  }
}
// Rename - clickTreeCount1, clickTreeCount2, ClickTreecount3 - Lag egen funksjon getWood - AHROW
// When clicking on trees this function runs
function clickTreeCount1() {
  treeCountOne++;
  totalWood += 25;
  if (treeCountOne >= 10) {
    treeOne.style.display = "none";
  }
  outputInfo(`you got ${totalWood} wood units`);
  displayMaterials();
}

function clickTreeCount2() {
  treeCountTwo++;
  totalWood += 25;
  if (treeCountTwo > 10) {
    treeTwo.style.display = "none";
  }
  outputInfo(`you got ${totalWood} wood units`);
  displayMaterials();
}

function clickTreeCount3() {
  treeCountThree++;
  totalWood += 25;
  if (treeCountThree > 10) {
    treeThree.style.display = "none";
  }
  outputInfo(`you got ${totalWood} wood units`);
  displayMaterials();
}

// When clicking the 'Mine' this function runs
function getMetal() {
  totalMetal += 10;
  outputInfo(`you got ${totalMetal} Metal units`);
  displayMaterials();
  populateMonsters();
  getGold();
}

function getGold() {
  randomNunber = Math.ceil(Math.random() * 100);
  if (randomNunber > 70) {
    totalGold += 10;
    outputInfo(`you got ${totalGold} gold units`);
    displayMaterials();
  }
}

function buyHealtPotion() {
  if (totalGold >= 100) {
    totalGold -= 100;
    health += 100;
    outputInfo("You bought 1 health potion for 100 gold units + 100hp");
    displayMaterials();
    displayHealth();
  } else {
    outputInfo("You dont have enough gold");
  }
}

// When clicking buy small building this function runs
function buyBuilding(type) {
  let buildingData = {
    small: {
      metal: 10,
      wood: 50,
      image: "building-1.png",
    },
    big: {
      metal: 30,
      wood: 150,
      image: "building-3.png",
    },
  };

  if (!buildingData.hasOwnProperty(type)) {
    return false;
  }

  let selectedBuilding = buildingData[type];

  if (
    totalMetal >= selectedBuilding.metal &&
    totalWood >= selectedBuilding.wood
  ) {
    buildingDiv.innerHTML +=
      '<img src="/images/' + selectedBuilding.image + '" alt="">';
    totalMetal -= selectedBuilding.metal;
    totalWood -= selectedBuilding.wood;
  } else {
    outputInfo("You dont have enogh resources");
  }
  outputInfo("You bought a " + type + " building");
  displayMaterials();
}

// When clicking 'Buy Sword' this function runs
function buySword() {
  if (totalMetal >= 200) {
    totalMetal -= 200;
    swordEquiped = true;
    totalStrenght = 40;
    outputInfo("You bought a sword");
    displayMaterials();
    equipedSword.style.display = "block";
  } else {
    outputInfo("You dont have enough resources");
  }
}

// buy helmet
function buyArmor(e) {
  let type = e.target.getAttribute("data-type");

  let armorData = {
    helmet: {
      gold: 50,
      image: "helmet.png",
    },
    shield: {
      gold: 75,
      image: "shield.png",
    },
  };

  if (!armorData.hasOwnProperty(type)) {
    return false;
  }

  let selectedArmor = armorData[type];

  if (totalGold >= selectedArmor.gold) {
    inventoryBoard.innerHTML +=
      `<img  src="/images/` + selectedArmor.image + `" alt="">`;
    totalGold -= selectedArmor.gold;
    outputInfo("You bought a " + type + " armor");
    displayMaterials();
  } else {
    outputInfo("You dont have enogh resources");
  }
}

// When clicking on monsters this function runs
function monsterDmg(e) {
  if (health <= 0) {
    return;
  }

  let monsterId = e.target.getAttribute("data-id");
  monsters[monsterId].health -= totalStrenght;
  health -= monsterDefaultDamage;

  if (health < 0) {
    health = 0;
  }

  outputInfo(
    `You hit a monster ${totalStrenght} hp. Monster hit you ${monsterDefaultDamage}`
  );

  displayMaterials();
  displayHealth();

  if (monsters[monsterId].health <= 0) {
    e.target.remove();
    monsters[monsterId].health = 0;
  }

  if (health <= 0) {
    gameOver(true);
  }
}

// Monsters
function populateMonsters() {
  let chance = Math.floor(Math.random() * 100);
  let monsterPopulated = false;
  if (swordEquiped == true && chance > 85) {
    monsterDiv.innerHTML +=
      '<img data-id="' +
      monsters.length +
      '" src="/images/saw.png" class="monster" alt="A picture of the saw character">';

    monsterPopulated = true;
  } else if (chance > 85) {
    monsterDiv.innerHTML +=
      '<img data-id="' +
      monsters.length +
      '" src="/images/cute-wolfman.png" class="monster" alt="">';

    monsterPopulated = true;
  }

  if (monsterPopulated === true) {
    monsters.push({
      health: monsterDefaultHealth,
      damage: monsterDefaultDamage,
    });
  }
}

// When clicking on mine the getMetal function is triggered
getMetalBtn.onclick = getMetal;

// listens for a click on getMetalBtn and when a click occurs the populateMonsters function runs

// When clicking on trees the clickTreeCount functions gets triggered
treeOne.onclick = clickTreeCount1;
treeTwo.onclick = clickTreeCount2;
treeThree.onclick = clickTreeCount3;

// When clicking on buy small building buySmallBuilding-function is triggered
buySmallBuildingBtn.onclick = function () {
  buyBuilding("small");
};

// When clicking on 'Buy Big House' the buyBigBuilding-function is triggered
buyBigBuildingBtn.onclick = function () {
  buyBuilding("big");
};

// When clicking on 'Buy Sword' the buySword-function is triggered
buySwordBtn.onclick = buySword;

// Global click listener (for dynamically created content)
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("monster")) {
    monsterDmg(e);
  } else if (e.target && e.target.classList.contains("armor")) {
    buyArmor(e);
  } else if (e.target && e.target.classList.contains("retry-btn")) {
    reload();
  } else if (e.target && e.target.classList.contains("helmet")) {
    // displayEquipedArmor();
  }
});

// When clicking on 'Buy healt potion' the buyHealtPotion function runs
healtPotion.onclick = buyHealtPotion;
