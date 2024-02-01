let m = 30;
let n = 50;
let starRow;
let starColumn;
let count = 0;

function initializeStarPosition() {
    starRow = Math.floor(Math.random() * m);
    starColumn = Math.floor(Math.random() * n);
}

function moveStar() {
    const rowDiff = Math.floor(Math.random() * 3) - 1;
    const columnDiff = Math.floor(Math.random() * 3) - 1;

    starRow += rowDiff;
    starColumn += columnDiff;

    starRow = Math.max(0, Math.min(m - 1, starRow));
    starColumn = Math.max(0, Math.min(n - 1, starColumn));
}

async function fireFly() {
    if (count === 0) {
        initializeStarPosition();
        count = 1;
    }

    // Clear the console
    console.clear();

    for (let i = 0; i < m; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            if (i === starRow && j === starColumn) {
                row += '*';
            } else {
                if ((i === 0 || i === m - 1) && (j === 0 || j === n - 1)) {
                    row += '+';
                } else if (i === 0 || i === m - 1) {
                    row += '-';
                } else if (j === 0 || j === n - 1) {
                    row += '|';
                } else {
                    row += ' ';
                }
            }
        }
        console.log(row);
    }

    moveStar();

    // Wait for 200 milliseconds before the next iteration
    await new Promise(resolve => setTimeout(resolve, 200));

    // Call fireFly function recursively after waiting
    fireFly();
}

// Call fireFly function initially to start the animation
fireFly();
