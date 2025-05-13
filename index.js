function onDificultyChange(dificulatatea){
    switch (dificulatatea) {
        case "Easy":        
            generateBord(10)
            break;
        case "Medium":
            generateBord(20)       
            break;
        case "Hard":
            generateBord(30)
            break;        
        default:
            break;
        }
}
//-------------------------------------------------------------
function hideMenu(){

    const menu = document.getElementsByClassName("menu")
    
    for(let i=0;i<menu.length;i++){
        menu[i].style.display ='none'
    }
}
//-------------------------------------------------------------
function generateBord(size){
    
    hideMenu()
    const parentDiv = document.getElementById('con')

    parentDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`
    parentDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    for(let i =0;i< (size * size);i++){
        const newBord = document.createElement('div')
        newBord.classList.add('box');
        newBord.id = (`${i}`)
        parentDiv.appendChild(newBord);
    }

    function randomPlace(){
        var seed = Date.now();
        for (let i = 0; i < size *1.2; i++) {
            seed = pseudoRandom(seed);
            let n = randomInt(0,(size * size), seed);
            console.log(n);
        let targetBox = document.getElementById(`${n}`)
        targetBox.classList.add('red');
    }}
    
    randomPlace()
    
    startGame(size)
}
//-------------------------------------------------------------
function startGame(size) {
  const parentDiv = document.getElementById('con');

  parentDiv.addEventListener('click', function boxClicked(event) {
    let targetBox = document.getElementById(`${event.target.id}`);
    let numIndex = Number(event.target.id);

    const openBox = [
      [numIndex - 1 - size, numIndex - size, numIndex + 1 - size],
      [numIndex - 1, numIndex, numIndex + 1],
      [numIndex + size - 1, numIndex + size, numIndex + size + 1]
    ];
    if (!(targetBox.classList.contains('red'))) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let boxId = openBox[i][j];
          console.log([boxId])
        if (
            boxId > 0 &&
            boxId <= size * size &&
            (boxId % 10 != 9) &&
            (boxId % 10 != 0)){
                let secTargetBox = document.getElementById(`${boxId}`);
                if (secTargetBox && !(secTargetBox.classList.contains('red'))) {
                    secTargetBox.style.backgroundColor = 'blue';
                }
            }
        }
      }
    }
  });
}
//-------------------------------------------------------------
function pseudoRandom(seed) {
    seed = seed % 2147483647;
    if (seed <= 0) seed += 2147483646;
    return (seed * 16807) % 2147483647;
}
//-------------------------------------------------------------
function random01(seed) {
    return pseudoRandom(seed) / 2147483647;
}
//-------------------------------------------------------------
function randomInt(min, max, seed) {
    let r = random01(seed);
    return Math.floor(r * (max - min + 1)) + min;
}
//-------------------------------------------------------------