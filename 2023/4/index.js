const { open } = require('fs').promises

async function run(fileName, lineFunc) {
    const input = await open(fileName)
    let sum = 0

    for await (const l of input.readLines()) {
        sum += lineFunc(l)
    }

    return sum
}

function partOne(line) {
    const [_, cardValues] = line.split(': ')
    const [winningNumbersStr, myNumbersStr] = cardValues.split(' | ')
    const winningNumbers = winningNumbersStr.split(/[ ]+/).filter(Boolean)
    const myNumbers = myNumbersStr.split(/[ ]+/).filter(Boolean)

    let score = 0
    for (const num of myNumbers) {
        if (!winningNumbers.includes(num)) {
            continue
        }

        score === 0 ? score += 1 : score *= 2
    }

    return score
}

run(__dirname + '/input.txt', partOne).then(console.log)