function integerMultiplication(x, y) {
    // because it's multiplication of only one-digit numbers, we can use parseInt
    const xInt = parseInt(x);
    const yInt = parseInt(y);
    const result = (xInt * yInt).toString();
    return result;
}

// pass by reference so we can make changes instantly and not copy the string
function putZero(num, n) {
    for (let i = 0; i < n; i++) {
        num += "0";
    }
}

function combine(str1, str2) {
    let result = "";

    // We make sure str2 is longer
    if (str1.length > str2.length) {
        [str1, str2] = [str2, str1]; // Swap using destructuring assignment
    }

    let n1 = str1.length;
    let n2 = str2.length;

    let carry = 0;
    let j = n2 - 1;

    for (let i = n1 - 1; i >= 0; i--) {
        const sum = parseInt(str1[i]) + parseInt(str2[j]) + carry;
        result += (sum % 10).toString();
        j--;
        carry = Math.floor(sum / 10);
    }

    for (; j >= 0; j--) {
        const sum = parseInt(str2[j]) + carry;
        result += (sum % 10).toString();
        carry = Math.floor(sum / 10);
    }

    if (carry !== 0) {
        result += carry.toString();
    }

    return result.split("").reverse().join("");
}

function karatsuba(x, y, n) {
    if (n !== 1) {
        const a = x.substr(0, n / 2);
        const b = x.substr(n / 2);
        const c = y.substr(0, n / 2);
        const d = y.substr(n / 2);

        const ac = karatsuba(a, c, n / 2);
        const bd = karatsuba(b, d, n / 2);
        const ad = karatsuba(a, d, n / 2);
        const bc = karatsuba(b, c, n / 2);

        const adPlusBc = combine(ad, bc);

        putZero(ac, n);
        putZero(adPlusBc, n / 2);

        const result = combine(combine(ac, adPlusBc), bd);
        return result;

    } else {
        return integerMultiplication(x, y);
    }
}

// Assuming input is read from a file or another source
const x = "123"; // replace with actual value
const y = "456"; // replace with actual value

console.log("x \t= " + x);
console.log("y \t= " + y);
console.log("");

console.log("Karatsuba Multiplication : " + karatsuba(x, y, x.length));

//output : 8539734222673567065463550869546574495034888535765114961879601127067743044893204848617875072216249073013374895871952806582723184
