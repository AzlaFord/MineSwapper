function onDificultyChange(dificulatatea){
    restartGame()
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
// function hideMenu(){

//     const menu = document.getElementsByClassName("menu")
    
//     for(let i=0;i<menu.length;i++){
//         menu[i].style.display ='none'
//     }
// }
//-------------------------------------------------------------
function generateBord(size){
    
    const parentDiv = document.getElementById('con')

    parentDiv.style.gridTemplateRows = `repeat(${size}, 1fr)`
    parentDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`

    let j = 0
    let k =1

    for(let i =1;i<= (size * size);i++){
        const newBord = document.createElement('div')
        newBord.classList.add('box');
        newBord.id = (`${i}`)
        parentDiv.appendChild(newBord);
        j++

        if(j > size){
            j = 1
            k++ 
        }
        newBord.classList.add(`row-${k}`)
        newBord.classList.add(`col-${j}`)
    }

    function randomPlace(){
        var seed = Date.now();
        for (let i = 0; i < size *1.2; i++) {
            seed = pseudoRandom(seed);
            let n = randomInt(0,(size * size), seed);
        let targetBox = document.getElementById(`${n}`)
        targetBox.classList.add('red');
    }}
    
    randomPlace()
    
    startGame(size)
}
//-------------------------------------------------------------
function startGame(size) {
  const menu = document.getElementsByClassName("menu")  
  const parentDiv = document.getElementById('con');
  let countBlue = 0;

  parentDiv.addEventListener('click', function boxClicked(event) {
    let targetBox = document.getElementById(`${event.target.id}`);
    let numIndex = event.target.classList;
    const rowClass  = numIndex[1]
    const colClass  = numIndex[2]
    let numRow = Number(rowClass.split('-')[1]); 
    let numCol = Number(colClass.split('-')[1]);
    
    let allBombs = document.querySelectorAll('.red');

    if (targetBox.classList.contains('red')) {
            for (let i = 0; i < allBombs.length; i++) {
                allBombs[i].style.backgroundColor = 'red';
            }

            for(let i=0;i<menu.length;i++){
                menu[i].style.display ='flex'
            }

            return;
    }else{
        clickBox(numRow,numCol,targetBox,size)
    }
    //-------------------------------------------------------------
    function clickBox(numRow, numCol, targetBox, size) {
        
        if (targetBox.style.backgroundColor === 'blue') {
            return;
        }

        let bombsFound = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newRow = numRow + i;
                const newCol = numCol + j;
                if (newRow >= 1 && newCol >= 1 && newRow <= size && newCol <= size) {
                    const neighborBox = document.querySelector(`.row-${newRow}.col-${newCol}`);
                    if (neighborBox && neighborBox.classList.contains('red')) {
                        bombsFound++;
                    }
                }
            }
        }
        
        targetBox.style.backgroundColor = 'blue';
        countBlue++;

        if (bombsFound === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue;
                    const newRow = numRow + i;
                    const newCol = numCol + j;
                    if (newRow >= 1 && newCol >= 1 && newRow <= size && newCol <= size) {
                        const neighborBox = document.querySelector(`.row-${newRow}.col-${newCol}`);
                        if (neighborBox && neighborBox.style.backgroundColor !== 'blue' && !neighborBox.classList.contains('red')) {
                            clickBox(newRow, newCol, neighborBox, size);
                        }
                    }
                }
            }
        } else {
            targetBox.textContent = bombsFound;
            
        }
        if (countBlue === (size * size) - (size * 1.2)) {
            for (let i = 0; i < allBombs.length; i++) {
                allBombs[i].style.backgroundColor = 'red';
            }
        return;
    }
    }
    //-------------------------------------------------------------
});
}
function restartGameBut() {
    restartGame()
    onDificultyChange(document.getElementById('dificul').value)
}
function restartGame() {
    const parentDiv = document.getElementById('con');
    parentDiv.innerHTML = '';
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