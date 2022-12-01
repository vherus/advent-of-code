const fs = require('fs').promises

async function main(file) {
    const data = await fs.readFile(file, 'utf-8')
    
    const inventories = data.split('\r\n')
        .join(' ')
        .split('  ')
        .map(item => {
            const calories = item.split(' ').map(item => Number(item))

            return {
                calories,
                total: calories.reduce((a, b) => a + b, 0)
            }
        })

    return inventories.sort((a, b) => b.total - a.total).slice(0, 3)
}

main('./input.txt').then(top3 => {
    console.log(top3.reduce((a, b) => a + b.total, 0))
})