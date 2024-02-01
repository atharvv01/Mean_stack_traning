/*
function fibonacciSeries(n) {
  const series = [];
  for (let i = 0; i < n; i++) {
    series.push(fibonacci(i));
  }
  return series;
}

function fibonacci(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

// Take input from the user
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter the index of the Fibonacci series you want to generate: ', (n) => {
  // Convert input to an integer
  n = parseInt(n);

  // Validate input
  if (isNaN(n) || n < 0) {
    console.log('Please enter a non-negative integer.');
  } else {
    // Generate and display the Fibonacci series up to index n
    console.log(`The Fibonacci series up to index ${n} is:`, fibonacciSeries(n));
  }

  // Close the readline interface
  readline.close();
});
*/

function getNthFib(n) {
  const series = [0, 1]; // Initialize series with first two Fibonacci numbers
  for (let i = 2; i < n; i++) {
    const nextFib = series[i - 1] + series[i - 2];
    series.push(nextFib);
  }
  return series;
}

// Function to generate Fibonacci series up to a given index n
function generateFibonacciSeries(n) {
  // Validate input
  if (!Number.isInteger(n) || n < 0) {
    console.log('Invalid input. Please enter a non-negative integer.');
    n = 10; // Default value if input is invalid
  }

  // Generate and return the Fibonacci series up to index n
  return getNthFib(n);
}

// Test the function with a predefined range
const n = 'three'; // Input as a string
const fibonacciSeriesResult = generateFibonacciSeries(parseInt(n));
console.log(`The Fibonacci series up to index ${n} is:`, fibonacciSeriesResult);
