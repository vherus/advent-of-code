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
    const limits = {
        red: 12,
        green: 13,
        blue: 14
    }
    const [game, results] = line.split(': ')
    const id = Number(game.split(' ')[1])
    const rounds = results.split('; ')
    
    let impossible = false
    for (const round of rounds) {
        const selections = round.split(', ')
        
        for (const result of selections) {
            const [amount, colour] = result.split(' ')

            if (Number(amount) > limits[colour]) {
                impossible = true
            }
        }
    }

    return impossible ? 0 : id
}

run(__dirname + '/input.txt', partOne).then(console.log)