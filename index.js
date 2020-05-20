import { createRoutes } from '@nuxt/utils'

const fs = require('fs')
const path = require('path')

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}

export default function AuthModule(moduleOptions) {
  this.options.router.extendRoutes = (routes, _) => {
    const srcDir = __dirname
    const files = getAllFiles(path.join(__dirname, 'pages')).map((item) =>
      item.replace(srcDir, '').substr(1)
    )
    const pagesDir = 'pages'
    const modRoutes = createRoutes({
      files,
      pagesDir,
      srcDir,
    })

    modRoutes.forEach((route) => {
      routes.push(route)
    })
  }
}
