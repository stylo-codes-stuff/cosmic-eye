var things = 2;

//resources variables
var stone = 0;
var iron = 0;
var wood = 0;
//update the debugging display for the amount of things currently generated
function update_things_count(){
    var count = document.getElementById("things_count");
    count.innerHTML = things;
}
//updates the display for the amount of each resource you've collected
function update_resource_count(){}
//harvests a resource and updates its values
function harvestResource(element){
    var uses = element.getAttribute("data-uses")
    var name = element.getAttribute("data-name")
    var parent_element = element.parentElement;
    console.log(uses);
    uses -= 1;
    element.setAttribute("data-uses",uses-1)
    console.log(uses)
    if (uses-1 <=0){
        element.remove()
        parent_element.remove()
        things--
    }

    update_things_count();

}
//generate a location with unique id
function generateLocation(name){

    console.log(name)
    return `<div id="div${things}container">
      <button id="div${things}"onclick="generateLocation(this.id)" data-name="${name}">
        +
      </button>
            ${name}
    </div>`;
}
function generateHarvestable(name){


    return `<div id="div${things}container">
      <button id="div${things}"onclick="harvestResource(this)" data-name="${name}" data-uses="${randomNum(5)}">
        harvest
      </button>
            ${name}
    </div>`;
}
function generateThings(item){
    //sets variables for both the origin element and its parent div
    var element = document.getElementById(item)
    var parent = document.getElementById(item).parentElement;
    //gets what kind of location it is so it can generate 
    console.log(element,parent)
    var name= element.getAttribute("data-name");
    switch (name){
        //generates up to 6 iron vein harvestables when interacted with inside the parent element
        case "cave":
            for(var i = 0; i<randomNum(5);i++){
                things++;
                console.log(name)
                parent.innerHTML += generateHarvestable("iron vein")
                update_things_count();

            }
            break;
        //generates a varying amount of forest and cave locations up to 5.
        case "plains":
            for(var i = 0; i<randomNum(5);i++){
                things++;
                parent.innerHTML += generateLocation(random_choice(["forest","cave","beach"]))
            }
            update_things_count();    
            break;
        case "forest":
            break;
    //left here for future debugging purposes should generally not be visible in production
}}
