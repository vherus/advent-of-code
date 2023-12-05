const { open } = require('fs').promises

async function extractData(fileName) {
    const input = await open(fileName)

    const seeds = []
    const maps = {}

    let firstLine = false
    for await (const l of input.readLines()) {
        if (!firstLine) {
            seeds.push(...l.split('seeds: ')[1].split(' ').map(Number))
            firstLine = true
            continue
        }

        if (!l) {
            continue
        }

        if (l.includes(' map:')) {
            maps[l.substring(0, l.indexOf(' '))] = []
            continue
        }

        const mapKeys = Object.keys(maps)
        const ranges = l.split(' ')
        const rangeMap = { destinationStart: Number(ranges[0]), sourceStart: Number(ranges[1]), length: Number(ranges[2]) }
        maps[mapKeys[mapKeys.length - 1]].push(rangeMap)
    }

    return { maps, seeds }
}

async function calculateLowestLocation({ maps, seeds }) {

    const extractDestination = (key, source) => {
        const mapping = maps[key].find(map => source >= map.sourceStart && source <= map.sourceStart + (map.length-1))
        return !mapping ? source : mapping.destinationStart + (source - mapping.sourceStart)
    }

    const locations = []

    for (const seed of seeds) {
        let source = seed
        for (const key of Object.keys(maps)) {
            source = extractDestination(key, source)
        }

        locations.push(source)
    }

    locations.sort()
    return locations[0]
}

extractData(__dirname + '/input.txt').then(calculateLowestLocation).then(console.log)
