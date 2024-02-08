function generateBoard(Cells) {

    // for column = 1 to 4
    //   for row = 1  to 4
    //     id = "cell_" + row + "_" + col;
    //     setAttribute("row", row);
    //     setAttribute("column", col );

    //todo gebruik custom elements in plaats van divs
    // generate sudokuboard & add row/col/block values to cells
    for (let row = 1; row < 5; row++) {
        for (let col = 1; col < 5; col++) {
            console.log("row:", row, "col:", col)
            let cell = document.createElement("div");
            document.getElementById("Cells").appendChild(cell);
            console.log(cell);
            cell.setAttribute("row", row);
            cell.setAttribute("col", col);
            cell.classList.add("Cells");
            CellArray.push(Cells);
            if ((row === 1 || row === 2) && (col === 1 || col === 2)) {
                cell.setAttribute("block", 1)
            }
            else if ((row === 1 || row === 2) && (col === 3 || col === 4)) {
                cell.setAttribute("block", 2)
            }
            else if ((row === 3 || row === 4) && (col === 1 || col === 2)) {
                cell.setAttribute("block", 3)
            }
            else if ((row === 3 || row === 4) && (col === 3 || col === 4)) {
                cell.setAttribute("block", 4)
            }
        }
    }

}
let CellArray = [];
generateBoard(Cells);

let currentnumber = null;

const exampleRow1 = [1, 3, 2, 4];
console.log([...new Set(exampleRow1)]);

// let randomnumber = Math.floor(Math.random() * 4 + 1);
// console.log(randomnumber);

// click on numbers in choicerow to choose the number to input into grid (add color feedback later)
document.addEventListener("click", (event) => {
    const target = event.target;
    const ValidChosenNumber = target.classList.contains("chosenNumber");
    if (ValidChosenNumber === true) {
        currentnumber = target.id;
    }
    console.log(currentnumber);
});
//todo kleur currentnumber zodat speler weet welke geselecteerd is
// check for click to input number in grid
document.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target);
    const validCell = target.classList.contains("Cells")
    if (validCell === true) {
        target.textContent = currentnumber;
        target.setAttribute("number", currentnumber);
    }
});

// check answer button 
document.addEventListener("click", (event) => {
    const target = event.target;
    const checkAnswer = target.classList.contains("CheckAnswerButton");
    if (checkAnswer === true) {
        rowcheck();
        colCheck();
        blockCheck();
    }
});

// checking each row for errors 
function rowcheck(row) {
    // let selector = `[row="${ row }"]`;
    // // let rowcells = Array.from(document.querySelectorAll(selector));
    for (let rownr = 1; rownr < 5; rownr++) {
        let checkrow = document.querySelectorAll(`[row="${rownr}"]`);
        let checkRows = Array.from(checkrow).map((cell, idx) => cell.innerHTML);
        let checkSet = new Set(checkRows);
        console.log("check", checkRows, checkSet);
        checkDuplicates(checkRows);

        if (checkSet.size === 4) {
            console.log('row ', { rownr }, ' is correct')
        }
        else {
            console.log('row ', { rownr }, ' is incorrect')
        }
    }
};

// checking each column for errors
function colCheck(col) {
    for (let colnr = 1; colnr < 5; colnr++) {
        let checkcol = document.querySelectorAll(`[col="${colnr}"]`);
        let checkcols = Array.from(checkcol).map((cell, idx) => cell.innerHTML);
        let checkColset = new Set(checkcols);
        checkDuplicates(checkcols);
        if (checkColset.size === 4) {
            console.log('col ', { colnr }, ' is correct')
        }
        else {
            console.log('col ', { colnr }, ' is incorrect')
        }
    }
}

//checking each block for errors
function blockCheck(block) {
    for (let blocknr = 1; blocknr < 5; blocknr++) {
        let checkblock = document.querySelectorAll(`[block="${blocknr}"]`);
        let checkblocks = Array.from(checkblock).map((cell, idx) => cell.innerHTML);
        let checkblockset = new Set(checkblocks);
        checkDuplicates(checkblocks);
        if (checkblockset.size === 4) {
            console.log('block ', { blocknr }, ' is correct')
        }
        else {
            console.log('block ', { blocknr }, ' is incorrect')
        }
    }
}

//todo backgroundcolor van errors moet rood worden
// function for checking for duplicates in row/clo/block (not inplemented in row/col/block check)
function checkDuplicates(inputArray) {
    const arraylength = inputArray.length;
    console.log("duplicatecheck activated", arraylength, inputArray)
    const verwerktArray = [];
    const duplicateArray = [];
    for (let i = 0; i < arraylength; i++) {
        if (verwerktArray.includes(inputArray[i]) === true) {
            duplicateArray.push(inputArray[i]);
        } else {
            verwerktArray.push(inputArray[i]);
        }
        console.log(i, duplicateArray, verwerktArray);
    }
    return duplicateArray
}

//   let testArray = [1, 1, 2, 3, 4, 3, 5];
//   checkDuplicates();
//   console.log(checkDuplicates()); 
