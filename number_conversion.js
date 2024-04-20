/** This is my first implement of number conversion program.
 * requirement is to implement four functions ,
 * 1st is to get 2's compliment from decimal number
 * 2nd is to decimal number from 2's compliment 
 * 3rd is to provide a 64-bit javascript representation of a number
 * 4th is to provide the number from the 64-bit representation
 */


/** Convert the number into its binary representation of requested length 
 * @param {Number} num decimal number to convert
 * @param {Number} numLen length of bits to prepresent
 * @returns {[Number]} binary representation of inputNumber with lengthOfOutput length
 * @throws {Error} when the inputNumber cannot be fit into the lengthOfOutput array
 */
function giveBinary(num, numLen) {

	// declaring an empty array to be populated for returning as output
	let outputArray = []
	let inputNumberCopy = num

	// repeatedly divide to find the quotient and populate the binary representation
	while (num != 0) {
		outputArray.unshift(num % 2)
		num = Math.floor(num / 2)
	}


	// return the outputArray of minimum length, if lengthOfOutput not specified
	if (numLen == undefined) {
		return outputArray
	}

	if (numLen - outputArray.length < 0) {
		throw new Error(`The ${inputNumberCopy} cannot be fit into an array of ` + 
		`length ${numLen}`)
	} 
	
	let iterationCount = (numLen - outputArray.length)

	for (let i = 0; i < iterationCount; i++) {
		outputArray.unshift(0)
	}

	return outputArray
}

/** give 2's complement of array
 * @param {[]} inputBinaryArray binary array
 * @returns {[]} 2's complement of the given array
 */
function give_2s_Complement(inputBinaryArray) {
	// Do 1's complement by simply substituting 0 by 1 nad vice-versa 
	for (let i = 0; i < inputBinaryArray.length; i++) {
		if (inputBinaryArray[i] == 0) {

			inputBinaryArray[i] = 1

		}
		else {
			inputBinaryArray[i] = 0
		}
	}


	//2's complement by adding 1 to last bit
	let carry = 1
	for (let i = inputBinaryArray.length - 1; i >= 0; i--) {
		let sum = inputBinaryArray[i] + carry
		inputBinaryArray[i] = sum % 2
		carry = Math.floor(sum / 2)

	}
	//return the 2's complement binary
	return inputBinaryArray
}

/** Convert any decimal number to its 2's complement
 * @param {Number} num decimal number
 * @param {Number} numLen length of bits to represent 2's complement 
 * @returns {[]} binary 2's complement
 * @throws {Error} digits length should be less then 52
*/
function get_Simple_2s_Compliment(num, numLen) {
	//check if the length of output mentioned is not greater then 52
	if (numLen > 52) {
		throw new Error("Length of digit should not exceed 52")

	}
	// check if the number is negative or not
	// if number posistive then simply return the binary representation
	if (Math.sign(num) == 1 || Math.sign(num) == 0) {
		return giveBinary(num, numLen)
	}
	// if the number is negative then perform 2's complement 
	else {
		num = -num

		let outputBinaryArray = giveBinary(num, numLen)

		return give_2s_Complement(outputBinaryArray)
	}

}

/** This is function to give decimal from 2s complement
 * @param {number[]} binaryArray the 2s complement which you want to convert
 * @returns {Number} a decimal conversion of the 2s complement
 * @throws {Error} if the 2s complement have values other than 0 and 1
 */
function get_Simple_Decimal_From_2s_Compliment(binaryArray) {
    // to check if the input is an integer
    // to check if the input contains only 0s and 1s
    for (let i = 0; i <= binaryArray - 1; i++) {
        if (
            binaryArray[i] !== 0 ||
            binaryArray[i] !== 1 ||
            !Number.isInteger(binaryArray[i])
        ) {
            throw new Error("Enter a valid 2s complement");
        }
    }
    //power variable to add to binary
    let power = 0;

    let sum = 0;
    let superScript = 0;
    // If the first element is 0 then the decimal conversion is +ve
    if (binaryArray[0] === 0) {
        for (let i = binaryArray.length - 1; i >= 1; i--) {
            power = Math.pow(2, superScript);
            multiple = binaryArray[i] * power;
            sum = sum + multiple;
            superScript++;
        }
        return sum;
    }
    // If the first element is 1 then the decimal conversion is -ve
    else {
        sum = sum * -1;
        return sum;
    }
}

/**This is a function to give a 64-bit javascript binary representation
 * @param {Number} num the number that you want to convert
 * @throws {Error} when the input number is not valid
 * @returns {String} the output of the conversion
 */
function javascript_Representation_of_Number(num) {
    // Check if the input is a valid number
    if (typeof num !== "number" || isNaN(num)) {
        throw new Error("Invalid input. Please provide a valid number.");
    }

    // Create a Float64Array with a single element
    var float64Array = new Float64Array(1);

    // Set the value of the array to the given number
    float64Array[0] = num;

    // Get the DataView of the array
    var dataView = new DataView(float64Array.buffer);

    // Extract the 64-bit binary representation as a string
    var binaryRepresentation = "";
    for (var i = 7; i >= 0; i--) {
        binaryRepresentation += (
            "00000000" + dataView.getUint8(i).toString(2)
        ).slice(-8);
    }

    return binaryRepresentation;
}

/**This is a function to give a number from the 64-bit representation
 * @param {*} input the input to convert in decimal
 * @throws {Error} when there is some issue while converting
 * @returns {Number} the number representation of the 64-bit binary
 */
function javascript_to_Decimal(input) {
    let binaryRepresentation;

    // Check if the input is a number and convert it to a binary string
    if (typeof input === "number") {
        binaryRepresentation = input.toString(2);
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation =
            "0".repeat(64 - binaryRepresentation.length) + binaryRepresentation;
    } else if (Array.isArray(input)) {
        // Check if the input is an array of binary digits
        if (!input.every((bit) => bit === 0 || bit === 1)) {
            throw new Error(
                "Invalid input. Please provide a valid array of binary digits (0 or 1)."
            );
        }
        // Join the array into a string
        binaryRepresentation = input.join("");
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation =
            "0".repeat(64 - binaryRepresentation.length) + binaryRepresentation;
    } else if (typeof input === "string") {
        // Check if the input is a valid binary string
        if (!/^[01]+$/.test(input)) {
            throw new Error("Invalid input. Please provide a valid binary string.");
        }
        // Pad with zeros to ensure it's 64 bits long
        binaryRepresentation = "0".repeat(64 - input.length) + input;
    } else {
        throw new Error(
            "Invalid input. Please provide a number, an array of binary digits, or a binary string."
        );
    }

    // Split the binary string into sign, exponent, and fraction parts
    const sign = parseInt(binaryRepresentation.charAt(0), 2) === 0 ? 1 : -1;
    const exponent = parseInt(binaryRepresentation.substr(1, 11), 2) - 1023;
    const fraction =
        parseInt(binaryRepresentation.substr(12), 2) / Math.pow(2, 52);

    // Calculate the final number
    const result = sign * Math.pow(2, exponent) * (1 + fraction);

    return result;
}


/**This function is for unit testing to check the sanity of the code */
function unitTesting() {

    // for getSimple2sComplement function
    console.log(get_Simple_2s_Compliment(-12, 11));

    // for getSimpleDecimal funtion
    let arr = [0, 0, 0, 0, 0, 0, 0, 1, 1] // this is the array that we will pass
    console.log(get_Simple_Decimal_From_2s_Compliment(arr));

    // for jsRepresentation function
    const jsNumber = javascript_Representation_of_Number(3.14);
    console.log(jsNumber);

    // for decimal of 64-bit js number
    const numberFromBinaryString = javascript_to_Decimal('0100000000001001000111101011100001010001111010111000010100011111');
    console.log(numberFromBinaryString); // Output: 3.14
}
unitTesting();