const { open } = require('fs').promises

async function main(fileName) {
    const input = await open(fileName)

    let sum = 0

    for await (const l of input.readLines()) {
        const nums = l.match(/\d/g)
        sum += Number(nums[0] + nums[nums.length-1])
    }

    return sum
}

main(__dirname + '/input.txt').then(console.log)