console.log(`running streams.js...`)
const fs = require('fs')

const csvfile = `${__dirname}/fundings.csv`
const csvfilecopy = `${__dirname}/fundings_copy.csv`
const streamOptions = {
   encoding: `utf8`,
   highWaterMark: 16 * 1024
}

let readable = fs.createReadStream(csvfile, streamOptions)

let writable = fs.createWriteStream(csvfilecopy)

let noOfChunks = 0
readable.on('data', (chunk) => {
   noOfChunks++
   console.log(`chunk ${noOfChunks} processed...`)
   writable.write(chunk)
})