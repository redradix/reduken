const package = require('../package.json')
const fs = require('fs-extra')
const path = require('path')

for (const file of package.files) {
  const filePath = path.join(__dirname, '../', file)
  fs.removeSync(filePath)
}
