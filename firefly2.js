/* 
 * Jugnu Program:
 * The program generates a 30 by 50 grid with only one random place populated by a '*' character
 * and the rest of the cells filled with spaces. The '*' character ('star') is then moved randomly
 * in one of the 9 possible directions while ensuring it stays within the bounds of the grid.
 */

// Constants defining grid dimensions
const M = 30; // Number of rows
const N = 50; // Number of columns

// Variables to store star's position and count
let starRow;
let starColumn;
let count = 0;

/** 
 * Initializes the position of the star at a random location within the grid.
 */
function initializeStarPosition() {
    starRow = Math.floor(Math.random() * M);
    starColumn = Math.floor(Math.random() * N);
}

/** 
 * Moves the star in a random direction while ensuring it stays within the bounds of the grid.
 */
function moveStar() {
    // Generate random offsets for row and column
    const rowDiff = Math.floor(Math.random() * 3) - 1; // [-1, 0, 1]
    const columnDiff = Math.floor(Math.random() * 3) - 1; // [-1, 0, 1]

    // Update star's position with the random offsets
    starRow += rowDiff;
    starColumn += columnDiff;

    // Ensure star stays within the bounds of the grid
    starRow = Math.max(0, Math.min(M - 1, starRow));
    starColumn = Math.max(0, Math.min(N - 1, starColumn));
}

/** 
 * Main function that animates the movement of the star within the grid.
 */
async function fireFly() {
    // Initialize star's position if it's the first iteration
    if (count === 0) {
        initializeStarPosition();
        count = 1;
    }

    // Clear the console before printing the grid
    console.clear();

    // Generate the grid with the star's current position
    for (let i = 0; i < M; i++) {
        let row = '';
        for (let j = 0; j < N; j++) {
            if (i === starRow && j === starColumn) {
                row += '*'; // Place '*' at star's position
            } else {
                // Fill the rest of the grid with appropriate characters
                if ((i === 0 || i === M - 1) && (j === 0 || j === N - 1)) {
                    row += '+';
                } else if (i === 0 || i === M - 1) {
                    row += '-';
                } else if (j === 0 || j === N - 1) {
                    row += '|';
                } else {
                    row += ' ';
                }
            }
        }
        console.log(row); // Print each row of the grid
    }

    moveStar(); // Move the star to a new position

    // Pause for a short duration before animating the next frame
    await new Promise(resolve => setTimeout(resolve, 200));

    // Recursive call to continue animating the movement of the star
    fireFly();
}

// Start the animation
fireFly();
