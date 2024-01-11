function generateBoard(Cells) {

    // for column = 1 to 4
    //   for row = 1  to 4
    //     id = "cell_" + row + "_" + col;
    //     setAttribute("row", row);
    //     setAttribute("column", col );

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
        let checkRows = Array.from(checkrow);
        let checkSet = new Set(checkRows.map((cell, idx) => {
            console.log(idx, cell);
            return cell.innerHTML
        }));
        let testArray = checkRows;
        checkDuplicates(testArray);

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
        let checkColset = new Set();
        checkcol.forEach(cell => {
            let value = cell.innerHTML;
            checkColset.add(value);
        })
        console.warn(checkColset);
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
        let checkblockset = new Set();
        checkblock.forEach(cell => {
            let value = cell.innerHTML;
            checkblockset.add(value);
        })
        console.warn(checkblockset);
        if (checkblockset.size === 4) {
            console.log('block ', { blocknr }, ' is correct')
        }
        else {
            console.log('block ', { blocknr }, ' is incorrect')
        }
    }
}


// function for checking for duplicates in row/clo/block (not inplemented in row/col/block check)
function checkDuplicates() {
    console.log("duplicatecheck activated")
    const arraylength = testArray.length;
    const verwerktArray = [];
    const duplicateArray = [];
    for (let i = 0; i < arraylength; i++) {
      console.log(testArray[i]);
      if (verwerktArray.includes(testArray[i]) === true) {
        duplicateArray.push(testArray[i]);
        console.log(duplicateArray);
      } else {
        verwerktArray.push(testArray[i]);
        console.log(verwerktArray);
      }
    }
    return duplicateArray
  }
  let testArray = [];
//   let testArray = [1, 1, 2, 3, 4, 3, 5];
//   checkDuplicates();
//   console.log(checkDuplicates()); 
  