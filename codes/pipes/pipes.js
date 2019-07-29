console.log(`running pipes.js...`)
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip(); //  everytime a chunk is sent to this it will compress it and make it readable

const csvfile = `${__dirname}/fundings.csv`
const csvfilecopy = `${__dirname}/fundings_copy.csv`
const csvFileGzip = `${__dirname}/fundings_copy.csv.gz`

const streamOptions = {
   encoding: `utf8`,
   highWaterMark: 16 * 1024
}

let readable = fs.createReadStream(csvfile, streamOptions)
let writable = fs.createWriteStream(csvfilecopy)
let copmpressed = fs.createWriteStream(csvFileGzip)

readable.pipe(writable)
readable
   .pipe(gzip)
   .pipe(copmpressed)