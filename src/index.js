const MORSE_TABLE = {
    '.-': 'a',
    '-...': 'b',
    '-.-.': 'c',
    '-..': 'd',
    '.': 'e',
    '..-.': 'f',
    '--.': 'g',
    '....': 'h',
    '..': 'i',
    '.---': 'j',
    '-.-': 'k',
    '.-..': 'l',
    '--': 'm',
    '-.': 'n',
    '---': 'o',
    '.--.': 'p',
    '--.-': 'q',
    '.-.': 'r',
    '...': 's',
    '-': 't',
    '..-': 'u',
    '...-': 'v',
    '.--': 'w',
    '-..-': 'x',
    '-.--': 'y',
    '--..': 'z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
};

function decode(expr) {
    let binary_letters = stringToTensArray(expr);
    let morse_letters = [];

    for (let string of binary_letters) {
        morse_letters.push(binaryLetterToMorse(string));
    }

    let result = '';

    for (let item of morse_letters) {

        if (item === ' ') {
            result += ' ';
            continue;
        }

        for (key of Object.keys(MORSE_TABLE)) {
            if (key === item) {
                result += MORSE_TABLE[key];
                break;
            }
        }
    }
    return result;
}

function stringToTensArray(string) {
    let binary_letters = [];

    for (let i = 0; i < string.length; i += 10) {
        binary_letters.push(string.slice(i, i + 10));
    }

    return binary_letters;
}

function binaryLetterToMorse(string) {
    const space = {
        binary_code: '*'.repeat(10),
        morse_code: ' ',
    };
    const dot = {
        binary_code: '10',
        morse_code: '.',
    }
    const dash = {
        binary_code: '11',
        morse_code: '-',
    };

    let result = '';

    if (string === space.binary_code) {
        return space.morse_code;
    }

    for (let i = string.length; i > 0; i -= 2) {
        let substring = string.slice(i - 2, i);
        if (substring === dot.binary_code) {
            result = dot.morse_code + result;
        }
        if (substring === dash.binary_code) {
            result = dash.morse_code + result;
        }
        if (substring === '00') {
            break;
        }
    }
    return result;
}



module.exports = {
    decode
}