const { open } = require('fs').promises

async function extractData(fileName) {
  const input = await open(fileName)
  const directions = []
  const locationMap = {}
  let firstLine = true

  for await (const l of input.readLines()) {
    if (firstLine) {
      directions.push(...l.split(''))
      firstLine = false
      continue
    }

    if (!l) {
      continue
    }

    const lineSplit = l.split(' = ')
    locationMap[lineSplit[0]] = lineSplit[1].split(', ').map(i => i.replace(/[()]/g, ''))
  }

  return { directions, locationMap }
}

function calculateNumSteps({ directions, locationMap }) {
  const directionsIndices = directions.map(dir => Number(dir === 'R'))

  let numSteps = 0
  let currentLoc = 'AAA'

  while (currentLoc !== 'ZZZ') {
    currentLoc = locationMap[currentLoc][directionsIndices[numSteps % directionsIndices.length]]
    numSteps++
  }
  
  return numSteps
}

extractData(__dirname + '/input.txt')
  .then(calculateNumSteps)
  .then(console.log)