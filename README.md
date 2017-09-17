# Electron + Webpack

This repository can be used as quick start for any Electron application using Webpack to bundle source files. It also contains a node server boilerplate in case you need it.

### Webpack config

The webpack configuration file is set up to work with:

* Hot module replacement
* **Sass** style preprocessor files
* **es2015** and **stage-0** babel transforms

## Development environment
Run de command:
```
npm run dev
```

This will run both the **webpack-dev-server** (on port 8080) by default and launch Electron.

## Production environment
Run the program in production mode:

(This will create the **bundle.js** file in the app directory and launch Electron)

```
npm start
```

To launch Electron without having to build the bundle file again you can run:

```
npm run start-no-build
```
