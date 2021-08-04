
document.addEventListener("DOMContentLoaded", function(event) {
    const $ = s => document.querySelector(s);
  
    const tower = document.querySelectorAll("[data-tower]");
    const disc = document.querySelectorAll("[data-disc]");
  
    const numOfDisc = disc.length;
    let startTower = tower[0];
  
    tower.forEach(e => e.addEventListener("click", towersOfHanoi));
  
    let counter = 0,
      moves = 0;
  
    function towersOfHanoi() {
      if (counter % 2 == 0) getTopDisc(this).classList.add("selected");
  
      if (counter % 2 == 1) {
        $(".selected-tower") &&
          $(".selected-tower").classList.toggle("selected-tower");
        this.classList.add("selected-tower");
        if (isValid(this)) addDisc(this, $(".selected"));
      }
      counter++;
    }
  
    function isValid(newTower) {
      if (newTower.children.length == 0) return true;
  
      let n = Number(getDataValue(getTopDisc(newTower))),
        o = Number(getDataValue($(".selected")));
      if (o < n) return true;
      tower.forEach(cell => cell.classList.remove("selected-tower"));
      disc.forEach(cell => cell.classList.remove("selected"));
    }
  
    function addDisc(selectedTower, selectedDisc) {
      selectedDisc.classList.remove("selected");
      selectedTower.appendChild(selectedDisc);
      $("#moves").innerText++
      checkForWin(selectedTower);
    }
  
    function checkForWin(tower) {
      $("#announce-game-won").style.visibility = "hidden";
      disc.forEach(cell => cell.classList.remove("game-win"));
  
      if (tower.children.length == numOfDisc && tower != startTower) {
       
        disc.forEach(cell => cell.classList.add("game-win"));
        $("#announce-game-won").style.visibility = "visible";
        $("#announce-game-won").innerHTML = "completed!"
        
        moves = 0;
        startTower = tower;
      }
    }
  
    function getTopDisc(id) {
  
      if (typeof id == "object") id = getDataValue(id);
  
      let len = tower[Number(id) - 1].children.length;
    
      if (len > 0) return tower[Number(id) - 1].children[len - 1];
      return 0;
    }
  
    function getDataValue(e) {
      if (typeof e == "object") {
        let objAttr = e.attributes[0].name;
        return Number(e.getAttribute(objAttr));
      }
      return e;
    }
  });