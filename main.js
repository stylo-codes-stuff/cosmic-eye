//for  brevity a location is an interactable item that can generate new harvestable items
// a harvestable is an item that  can be interacted with to generate resources such as wood iron and stone


//variable for keeping track of the total amount of actions locations and harvestables
var things = 2;
//resources  and equipment variables
var inventory = {weapons:[],armor:[]}
var equipment = {head:null,chest:null,legs:null,feet:null,hands:null};
var items = [];
var stone = 0;
var acorns = 0;
var iron = 0;
var wood = 0;
var shells = 0;
//resource multipliers
var current_enemy = null;
var shovel_mult =1; //increases the amount of resources gained from finding_shells and other digging activities
var pick_mult=1; //increases the amount of resources gained from mining
var glove_mult =1; //increases the amount of resources gained from looting and foraging
//update the debugging display for the amount of things currently generated
function update_things_count() {
    var count = document.getElementById("things_count");
    count.innerHTML = things;
}
function combat(enemy_count){
    
}
//function for generating weapons objects
function generateWeapon(type,tier,enchantment){
    //switch to generate an object based on the 
        switch(type){
            //item with moderate damage(5-10) decent evasion(50%) and poor block chance(10%)
            // has a passive ability that deals bonus damage on a suprise attack
            case "dirk":
                if(randomNum())
                var new_weapon = new weapon("dirk",minmaxRandomInt(5,10),50,)
                inventory[weapons].push()
        }
}
function updateInventory(){}
//updates the display for the amount of each resource you've collected
function update_resource_count() {
    var stone_count = document.getElementById("stone_count");
    var wood_count = document.getElementById("wood_count");
    var iron_count = document.getElementById("iron_count");
    var shell_count = document.getElementById("shell_count");
    var acorns_count = document.getElementById("acorns_count");
    stone_count.innerHTML = "stone: " + stone;
    wood_count.innerHTML = "wood: " + wood;
    iron_count.innerHTML = "iron: " + iron;
    shell_count.innerHTML = "shells: " + shells;
    acorns_count.innerHTML = "acorns: " + acorns;
}
function craft(){}
//harvests a resource and updates its values and then decrements its amount of uses
function harvestResource(element) {
    var uses = element.getAttribute("data-uses")
    var name = element.getAttribute("data-name")
    var parent_element = element.parentElement;
    uses -= 1;
    element.setAttribute("data-uses", uses - 1)
    //switch to perform logic based on the harvested resource
    switch (name) {
        case "tree":
            wood += randomInt(5,10);
            acorns += randoInt(10,20);
            break;
        case "stone":
            stone += randomInt(5,10);
            break;
        case "iron vein":
            iron += randomInt(5,10)
            break;
        case "beach":
            shells += randomInt(5,10)
            break;
    }
    //checks to see if the amount of uses on the interacted harvestable is up
    // if it is the html associated with it is deleted and the things variable is decremented
    if (uses - 1 <= 0) {
        element.remove()
        parent_element.remove()
        things--
    }
    //logic to update the resource and thing displays
    update_resource_count();
    update_things_count();

}
//generate and fill a location template with the given name and with a random amount of uses
function generateLocation(name) {

    return `<div id="div${things}container">
      <button id="div${things}"onclick="generateThings(this.id)" data-name="${name}" data-uses="${randomInt(5,10)}">
        +
      </button>
            ${name}
    </div>`;
}
//generates and fills in template html for a new harvestable item with a random amount of uses
function generateHarvestable(name) {
    console.log(name)

    return `<div id="div${things}container">
      <button id="div${things}"onclick="harvestResource(this)" data-name="${name}" data-uses="${randomInt(2,5)}">
        harvest
      </button>
            ${name}
    </div>`;
}
//function to perform logic based on interactions under the actions tab
function perform_action(action_name) {
    var resources = document.getElementById("resource_container")
    //switch statement to perform logic based on the action performed
    switch (action_name) {
        //removes 5 acorns to generate a forest location
        case "plant trees":
            if (acorns >= 5) {
                resources.innerHTML += generateLocation("forest")
                acorns -= 5
            }
            break;
        //summons either a forest, a cave location or a beach harvestable
        case "search":
            var test = [generateHarvestable("beach"), generateLocation("forest")]
            resources.innerHTML += random_choice(test)
            break;
        //debug action to summon a single tree harvestable
        case "summon tree":
            resources.innerHTML += generateHarvestable("tree");
            break;
        //debug action to summon a single stone harvestable
        case "summon stone":
            resources.innerHTML += generateHarvestable("stone");
            break;
        //debug action to summon a single beach harvestable
        case "summon beach":
            resources.innerHTML += generateHarvestable("beach");
            break;
        //debug action to summon a single cave location
        case "summon cave":
            resources.innerHTML += generateLocation("cave");
            break;
        //debug action to summon a single plains location
        case "summon plain":
            resources.innerHTML += generateLocation("plains")
    }
    //update resource and things displays
    update_resource_count();
    update_things_count();
}
//generates harvestables and locations based on the type of interaction
function generateThings(item) {
    //sets variables for both the origin element and its parent div
    var element = document.getElementById(item)
    var parent = document.getElementById(item).parentElement;
    var container = document.getElementById("resource_container")
    //gets what kind of location it is so it can generate its respective things
    var name = element.getAttribute("data-name");
    //get and decrements the amount of uses a location has left
    var uses = element.getAttribute("data-uses");
    element.setAttribute("data-uses", uses - 1)
    //checks if the location is out of uses and removes it if it is
    if (uses <= 0) {
        element.remove()
        parent.remove()
    }
    //switch to perform logic based on the type of item being interacted with
    switch (name) {
        //generates up to 6 iron vein or stone harvestables
        case "cave":
            for (var i = 0; i < randomInt(2,5); i++) {
                things++;
                container.innerHTML += generateHarvestable(random_choice(["stone", "iron vein"]))
                update_things_count();

            }
            break;
        //generates up to 6 of either a beach or forest location, or a beach harvestable
        case "plains":
            var test = [generateHarvestable("beach"), generateLocation("forest"),generateLocation("cave")]
            for (var i = 0; i < randomInt(2,5); i++) {
                things++;
                container.innerHTML += random_choice(test);
            }
            update_things_count();
            break;
        //generates a random amount of tree harvestables up to 6
        case "forest":
            for (var i = 0; i < randomInt(2,5); i++) {
                things++;
                container.innerHTML += generateHarvestable("tree");
                update_things_count()
            }
            break;



    }

}
console.log(Math.round(Math.random(),3))
console.log(Math.random().toFixed(2))