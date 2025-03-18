//variable for keeping track of the total amount of actions locations and harvestables
var things = 2;
//resources variables
var equipment = {head:null,chest:null,legs:null}
var items = []
var stone = 0;
var acorns = 0;
var iron = 0;
var wood = 0;
var shells = 0
//resource multipliers
//update the debugging display for the amount of things currently generated
function update_things_count() {
    var count = document.getElementById("things_count");
    count.innerHTML = things;
}
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
//harvests a resource and updates its values
function harvestResource(element) {
    var uses = element.getAttribute("data-uses")
    var name = element.getAttribute("data-name")
    var parent_element = element.parentElement;
    uses -= 1;
    element.setAttribute("data-uses", uses - 1)
    switch (name) {
        case "tree":
            wood += randomNum(10);
            acorns += randomNum(20);
            break;
        case "stone":
            stone += randomNum(10);
            break;
        case "iron vein":
            iron += randomNum(10)
            break;
        case "beach":
            shells += randomNum(10)
            break;
    }
    if (uses - 1 <= 0) {
        element.remove()
        parent_element.remove()
        things--
    }
    update_resource_count();
    update_things_count();

}
//generate a location with unique id
function generateLocation(name) {

    return `<div id="div${things}container">
      <button id="div${things}"onclick="generateThings(this.id)" data-name="${name}" data-uses="${randomNum(10) + 4}">
        +
      </button>
            ${name}
    </div>`;
}
function generateHarvestable(name) {
    console.log(name)

    return `<div id="div${things}container">
      <button id="div${things}"onclick="harvestResource(this)" data-name="${name}" data-uses="${randomNum(5)}">
        harvest
      </button>
            ${name}
    </div>`;
}
function perform_action(action_name) {
    var resources = document.getElementById("resource_container")
    switch (action_name) {
        //removes 5 acorns to generate a forest location
        case "plant trees":
            if (acorns >= 5) {
                resources.innerHTML += generateLocation("forest")
                acorns -= 5
            }
            break;
        //summons either a forest or cave location or a beach harvestable
        case "search":
            var test = [generateHarvestable("beach"), generateLocation("forest")]
            resources.innerHTML += random_choice(test)
            break;
        case "summon tree":
            resources.innerHTML += generateHarvestable("tree");
            break;
        case "summon stone":
            resources.innerHTML += generateHarvestable("stone");
            break;
        case "summon beach":
            resources.innerHTML += generateHarvestable("beach");
            break;
        case "summon cave":
            resources.innerHTML += generateHarvestable("cave");
            break;
        case "summon plain":
            resources.innerHTML += generateLocation("plains")
    }
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

    switch (name) {
        //generates up to 6 iron vein or stone harvestables
        case "cave":
            for (var i = 0; i < randomNum(5); i++) {
                things++;
                container.innerHTML += generateHarvestable(random_choice(["stone", "iron vein"]))
                update_things_count();

            }
            break;
        //generates a varying amount of forest, beach and cave locations up to 6 times.
        case "plains":
            var test = [generateHarvestable("beach"), generateLocation("forest")]
            for (var i = 0; i < randomNum(5); i++) {
                things++;
                container.innerHTML += random_choice(test);
            }
            update_things_count();
            break;
        //generates a random amount of tree harvestables up to 6
        case "forest":
            for (var i = 0; i < randomNum(5); i++) {
                things++;
                container.innerHTML += generateHarvestable("tree");
                update_things_count()
            }
            break;



    }

}
