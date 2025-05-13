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
    let numIndex = event.target.classList;
    const rowClass  = numIndex[1]
    const colClass  = numIndex[2]
    let numRow = Number(rowClass.split('-')[1]); 
    let numCol = Number(colClass.split('-')[1]);

    clickBox()
    if (
      targetBox.style.backgroundColor === 'blue' ||
      targetBox.classList.contains('red')
    ) {
      return;
    }
    function clickBox(){
        if(!targetBox.classList.contains('red')){
            targetBox.style.backgroundColor ='blue'
            for(let i = -1;i<=1;i++){
                for(let j = -1;j<=1;j++){
                    const newRow = numRow + i;
                    const newCol = numCol + j;
                    if(newRow >= 1 && newCol >= 1 && newRow <= size && newCol <= size){
                        const neighborBox  = document.querySelector(`.row-${newRow}.col-${newCol}`)
                        if(neighborBox && !neighborBox.classList.contains('red')){
                            neighborBox.style.backgroundColor ='blue'
                            revealNeighbor(newRow,newCol)
                        }
                    }
                    
                } 
            }
    
        }else{
            console.log('game over')
        }
    }
    function revealNeighbor(row,col){
        const neighborBox2  = document.querySelector(`.row-${row}.col-${col}`)
        for(let i = -1;i<=0;i++){
                for(let j = -1;j<=0;j++){
                    const newRow1 = row + i;
                    const newCol1 = col + j;

                    if(newRow1 >= 1 && newCol1 >= 1 && newRow1 <= size && newCol1 <= size){
                        let neighborBox3  = document.querySelector(`.row-${newRow1}.col-${newCol1}`)
                        if(neighborBox3 && !neighborBox3.classList.contains('red')){
                            neighborBox3.style.backgroundColor ='blue'
                            revealNeighbor(newRow1,newCol1)
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