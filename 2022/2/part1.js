const fs = require('fs').promises

const pointMap = {
    'X': 1,
    'Y': 2,
    'Z': 3
}

async function main(file) {
    const data = await fs.readFile(file, 'utf-8')
    const rounds = data.split('\r\n')

    let score = 0

    for (const round of rounds) {
        const hands = round.split(' ')
        const myHand = hands[1]

        score += pointMap[myHand] + determineResult(hands)
    }

    return score
}

function determineResult(hands) {
    const winningCombinations = [['A', 'Y'], ['B', 'Z'], ['C', 'X']]
    const losingCombinations = [['A', 'Z'], ['B', 'X'], ['C', 'Y']]

    const win = Boolean(winningCombinations.find((hand) => hands[0] === hand[0] && hands[1] === hand[1]))

    if (win) {
        return 6
    }

    const lose = Boolean(losingCombinations.find((hand) => hands[0] === hand[0] && hands[1] === hand[1]))

    if (lose) {
        return 0
    }

    return 3
}

main('./input.txt').then(console.log)