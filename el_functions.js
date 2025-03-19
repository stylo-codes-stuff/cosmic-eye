//functions for event listeners such as onclick
function hide_resources() {
    var resource_div = document.getElementById("resource_div");
    var resource_check = document.getElementById("resource_check");
    if (resource_check.checked == true) {
        resource_div.style.display = "none";
    } else {
        resource_div.style.display = "";
    }
}
function hide_actions() {
    var actions_div = document.getElementById("action_div");
    var actions_check = document.getElementById("action_check");
    if (actions_check.checked == true) {
        actions_div.style.display = "none";
    } else {
        actions_div.style.display = "";
    }
}
function hide_inventory() {
    var inventory_div = document.getElementById("inventory_div");
    var inventory_check = document.getElementById("inventory_check");
    if (inventory_check.checked == true) {
        inventory_div.style.display = "none";
    } else {
        inventory_div.style.display = "";
    }
}
function hide_equipment() {
    var equipment_div = document.getElementById("equipment_div");
    var equipment_check = document.getElementById("equipment_check");
    if (equipment_check.checked == true) {
        equipment_div.style.display = "none";
    } else {
        equipment_div.style.display = "";
    }
}