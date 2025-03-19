
//class for making weapon data storage objects
class weapon{
  constructor(name,damage,hit_chance,enchantment,upgrade_level){
    this.name = name;
    this.damage = damage;
    this.hit_chance = hit_chance;
    //stores the name of the weapons ability to be applied during combat:
    this.ability = ability;
    //chance for the weapon to be crafted immediately after crafting
    this.enchantment= enchantment;
    this.upgrade_level= upgrade_level;
  }  
}
//class for making armor data storage objects
class armor{
    constructor(name,defense,enchantment){
        this.name = name;
        this.defense =defense;
        this.enchantment =enchantment;
    }
}
class enemy{
  constructor(){
    
  }
}