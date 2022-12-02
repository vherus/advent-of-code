const fs = require('fs').promises

const pointMap = {
    'A': 1,
    'X': 1,
    'B': 2,
    'Y': 2,
    'C': 3,
    'Z': 3
}

const winningCombinations = [['A', 'Y'], ['B', 'Z'], ['C', 'X']]
const losingCombinations = [['A', 'Z'], ['B', 'X'], ['C', 'Y']]

async function main(file) {
    const data = await fs.readFile(file, 'utf-8')
    const rounds = data.split('\r\n')

    let score = 0

    for (const round of rounds) {
        const hands = round.split(' ')
        const handToPlay = determineHands(hands)

        score += pointMap[handToPlay[1]] + determineResult(handToPlay)
    }

    return score
}

function determineHands(hands) {
    if (hands[1] === 'Z') {
        return winningCombinations.find(wc => wc[0] === hands[0])
    }

    if (hands[1] === 'X') {
        return losingCombinations.find(lc => lc[0] === hands[0])
    }

    return [hands[0], hands[0]]
}

function determineResult(hands) {
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