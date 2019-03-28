const inquirer   = require('inquirer');
const _          = require('lodash')
const files      = require('./files');

module.exports = {

  askRepoDetails: () => {

    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Repository name:',
        default: files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the repository.';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: null,
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: null,
      },
      {
        type: 'input',
        name: 'license',
        message: 'License:',
        default: null,
      },
      // {
      //   type: 'confirm',
      //   name: 'createGitIgnore',
      //   message: 'Create .gitignore?',
      // },
      // {
      //   type: 'checkbox',
      //   name: 'gitIngnore',
      //   message: 'Select .gitignore files/directories:',
      //   choices: [_.without(fs.readdirSync('.'), '.git', '.gitignore')],
      //   default: ['node_modules', 'bower_components'],
      //   when: answers => answers.createGitIgnore
      // },
      // {
      //   type: 'confirm',
      //   name: 'createNPMIgnore',
      //   message: 'Create .npmignore?',
      //   choices: 
      // }
      // {
      //   type: 'list',
      //   name: 'visibility',
      //   message: 'Public or private:',
      //   choices: [ 'public', 'private' ],
      //   default: 'public'
      // }
    ];
    return inquirer.prompt(questions);
  },
}