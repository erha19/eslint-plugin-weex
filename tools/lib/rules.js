/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const ROOT = path.resolve(__dirname, '../../lib/rules')

const findSync = (startPath) => {
  const result = []
  const finder = (localpath) => {
    const files = fs.readdirSync(localpath)
    files.forEach((val, index) => {
      const fPath = path.join(localpath, val)
      const stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) result.push(path.relative(ROOT, fPath))
    })
  }
  finder(startPath)
  return result
}
module.exports =
  findSync(ROOT)
    .filter(file => { console.log(file); return path.extname(file) === '.js' })
    .map(file => {
      return file.replace('.js', '')
    })
    .map(name => ({
      ruleId: `weex/${name}`,
      name,
      meta: require(path.join(ROOT, name)).meta
    }))
