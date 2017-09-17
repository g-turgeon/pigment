const packager = require('electron-packager')

const ignore = [
  '.gitignore',
  '.babelrc',
  'webpack.config.js',
  'server.js',
  'README.md',
  '.git/',
  'src/',
  'server/',
  'icons/'
]

const options = {
  name: 'Pigment',
  dir: '.',
  out: './build',
  icon: './icons/icon',
  overwrite: true,
  asar: false,
  prune: false,
  ignore: ignore
}

packager(options, (err, path) => {
  console.log(path)
  if (err) {
    console.log(err)
  }
})
