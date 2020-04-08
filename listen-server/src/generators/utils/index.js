const fs = require('fs')
const path = require('path')
const viewsComponents = fs.readdirSync(path.join(__dirname, '../../src/views'))
const pageComponents = fs.readdirSync(path.join(__dirname, '../../src/components'))

const componentExist = comp => {
  return [...pageComponents, ...viewsComponents].indexOf(comp) > -1
}

module.exports = componentExist
