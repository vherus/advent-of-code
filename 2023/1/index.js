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
    const nums = line.match(/\d/g)
    return Number(nums[0] + nums[nums.length-1])
}

function partTwo(line) {
    const numMap = { one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' }
    const nums = line
        .replace('oneight', 'oneeight')
        .replace('twone', 'twoone')
        .replace('threeight', 'threeeight')
        .replace('fiveight', 'fiveeight')
        .replace('sevenine', 'sevennine')
        .replace('nineight', 'nineeight')
        .replace('eighthree', 'eightthree')
        .replace('eightwo', 'eighttwo')
        .match(/(?:one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9)/g)

    let num = nums[0].length > 1 ? numMap[nums[0]] : nums[0]

    if (nums.length === 1) {
        num += num
    }

    if (nums.length > 1) {
        num += nums[nums.length-1].length > 1 ? numMap[nums[nums.length-1]] : nums[nums.length-1]
    }

    return Number(num)
}

run(__dirname + '/input.txt', partOne).then(console.log)
run(__dirname + '/input.txt', partTwo).then(console.log)
