const fs = require('node:fs')
const path = require('node:path')

const root = path.join(__dirname, '..')
const camdenRoot = path.join(root, 'node_modules/lbcamden-frontend')

const copies = [
  {
    from: path.join(camdenRoot, 'lbcamden/assets'),
    to: path.join(root, 'public/assets')
  },
  {
    from: path.join(camdenRoot, 'dist/lbcamden-frontend-1.0.7.min.css'),
    to: path.join(root, 'public/stylesheets/lbcamden-frontend-1.0.7.min.css')
  },
  {
    from: path.join(camdenRoot, 'dist/lbcamden-frontend-1.0.7.min.js'),
    to: path.join(root, 'public/javascripts/lbcamden-frontend-1.0.7.min.js')
  }
]

for (const directory of [
  path.join(root, 'public/assets'),
  path.join(root, 'public/stylesheets/node_modules'),
  path.join(root, 'public/javascripts/node_modules')
]) {
  fs.rmSync(directory, { force: true, recursive: true })
}

for (const { from, to } of copies) {
  fs.mkdirSync(path.dirname(to), { recursive: true })
  fs.cpSync(from, to, { recursive: true })
}
