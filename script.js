//tougle button
function toggleMenu() {
    document.querySelector("nav ul").classList.toggle("show");
}

//coversion box
function convertNumber() {
    let number = document.getElementById("numberInput").value.trim();
    let fromBase = parseInt(document.getElementById("fromBase").value);
    let toBase = parseInt(document.getElementById("toBase").value);
    let explanationBox = document.getElementById("explanation");

    if (number === "") {
        document.getElementById("result").innerText = "-";
        explanationBox.innerText = "Enter a number to see the conversion steps.";
        return;
    }

    let validChars = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9A-Fa-f]+$/
    };

    if (!validChars[fromBase].test(number)) {
        document.getElementById("result").innerText = "⚠ Invalid Input!";
        explanationBox.innerText = "⚠ Error: Invalid number for the selected base.";
        return;
    }

    let decimalValue = parseInt(number, fromBase);
    let convertedValue = decimalValue.toString(toBase).toUpperCase();
    
    document.getElementById("result").innerText = convertedValue;

    // Step-by-Step Calculation Breakdown for Selected Conversion
    let steps = generateConversionSteps(number, fromBase, toBase);
    explanationBox.innerText = steps;
}

// Function to generate conversion steps based on selected bases
function generateConversionSteps(number, fromBase, toBase) {
    if (fromBase === toBase) return `✅ Same Base: No conversion needed!`;

    let steps = `🔹 Convert "${number}" from Base ${fromBase} to Base ${toBase}:\n`;

    if (fromBase === 10) {
        steps += convertFromDecimal(parseInt(number), toBase);
    } else if (toBase === 10) {
        steps += convertToDecimal(number, fromBase);
    } else {
        let decimalValue = parseInt(number, fromBase);
        steps += `1️⃣ Convert to Decimal: ${convertToDecimal(number, fromBase)}\n\n`;
        steps += `2️⃣ Convert to Base ${toBase}: ${convertFromDecimal(decimalValue, toBase)}\n`;
    }

    return steps;
}

// Convert FROM Decimal to another base (Binary, Octal, Hex)
function convertFromDecimal(decimal, base) {
    let num = decimal;
    let stepDetails = "";
    let remainderStack = [];

    while (num > 0) {
        let remainder = num % base;
        remainderStack.push(remainder);
        stepDetails += `\n👉 ${num} ÷ ${base} = ${Math.floor(num / base)}, remainder = ${remainder}`;
        num = Math.floor(num / base);
    }

    let finalResult = remainderStack.reverse().map(val => (base === 16 ? val.toString(16).toUpperCase() : val)).join('');
    stepDetails += `\n✅ Final Answer: ${finalResult}`;
    return stepDetails;
}

// Convert TO Decimal from another base (Binary, Octal, Hex)
function convertToDecimal(number, base) {
    let decimalValue = 0;
    let stepDetails = "";

    let reversedDigits = number.split("").reverse();
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = parseInt(reversedDigits[i], base);
        decimalValue += digit * Math.pow(base, i);
        stepDetails += `\n👉 (${digit} × ${base}^${i}) = ${digit * Math.pow(base, i)}`;
    }

    stepDetails += `\n✅ Final Decimal Value: ${decimalValue}`;
    return stepDetails;
}

function copyResult() {
    let resultText = document.getElementById("result").innerText;
    if (resultText !== "-" && resultText !== "⚠ Invalid Input!") {
        navigator.clipboard.writeText(resultText);
        alert("Copied to clipboard: " + resultText);
    }
}

