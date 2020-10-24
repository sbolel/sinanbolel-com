const { exception } = require('console')
const fs = require('fs')
const md5 = require('md5')
const path = require('path')
const exit = require('process').exit

async function getHash(args) {
  if (args.length !== 1) {
    throw new ReferenceError('Path argument not provided.')
  }

  const filePath = path.resolve(args[0])

  if (!fs.existsSync(filePath)) {
    throw new Error('File not read.')
  }

  const filePromise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) throw new Error(err)
      return resolve(data)
    })
  })

  const fileContent = await filePromise
  const hash = md5(fileContent)
  return hash
}

async function main() {
  try {
    const hash = await getHash(process.argv.slice(2))

    console.log(`hash:${hash}`)

    return exit(0)
  } catch(err) {
    console.error(err)
    return exit(1)
  }
}

module.exports = main()
