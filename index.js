#!/usr/bin/env node

const argv           = require('yargs').argv
const chalk          = require('chalk')
const clear          = require('clear')
const files          = require('./lib/files')
const inquirer       = require('./lib/inquirer')
const fileTextHelper = require('./lib/fileTextHelper')
const CLI            = require('clui');
const Spinner        = CLI.Spinner;
const execSync       = require('child_process').execSync

clear();
console.log(
  chalk.yellow('init-react-repo')
);

const run = async () => {
  const status = new Spinner('...Initializing React Repository');
  try {

    let answers = await inquirer.askRepoDetails()
    
    status.start();

    let directoryBaseAlreadyCreated = answers.name === files.getCurrentDirectoryBase()

    if (!directoryBaseAlreadyCreated) {
      files.createDirectorySync(answers.name)
      process.chdir(answers.name)
    }

    files.writeFileSync('package.json', fileTextHelper.getPackageJson(answers))

    console.log('Installing React...')
    execSync('npm i react react-dom')
    console.log('Installing Webpack...')
    execSync('npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin')
    console.log('Installing Babel...')
    execSync('npm i -D @babel/core @babel/preset-env @babel/preset-react')
    console.log('Installing loaders...')
    execSync('npm i -D babel-loader css-loader style-loader')
    if (argv.typescript) {
      console.log('Installing Typescript...')
      execSync('npm i -D typescript ts-loader @types/react')
    }
  
    files.writeFile('webpack.config.js', fileTextHelper.getWebpackConfig(argv.typescript))
    files.writeFile('.babelrc', fileTextHelper.babelrc)
    files.writeFile('.gitignore', fileTextHelper.gitIgnore)
    files.writeFile('.npmignore', fileTextHelper.getNpmIgnore(argv.typescript))
    files.writeFile('README.md', fileTextHelper.getReadMe(answers.name))
  
    files.createDirectory('src').then(() => {
      files.writeFile('src/index.js', fileTextHelper.src.getIndex(argv.typescript))
      files.writeFile('src/style.css', fileTextHelper.src.style)
    })
  
    files.createDirectory('examples').then(() => {
      files.createDirectory('examples/src').then(() => {
        files.writeFile('examples/src/index.html', fileTextHelper.examples.src.indexHTML)
        files.writeFile('examples/src/index.js', fileTextHelper.examples.src.indexJS)
      })
    })
    status.stop()


    console.log()
    console.log(chalk.green('Successfully created repository ') + chalk.blue(answers.name))
    console.log()
    console.log('********************************************')
    console.log('*  Recommended commands to run:')
    if (!directoryBaseAlreadyCreated)
      console.log('*      - cd "' + answers.name + '"')
    console.log('*      - npm i')
    console.log('*      - npm start')
    console.log('********************************************')
  }
  catch (err) {
    status.stop()
    console.log(err)
  }
}

run()
