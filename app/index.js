const Generator = require('yeoman-generator');
const _ = require('lodash');
const askName = require('inquirer-npm-name');
const path = require('path');

const prefix = 'representy-source-';

function makeGeneratorName(name) {
  name = _.kebabCase(name);
  name = name.indexOf(prefix) === 0 ? name : prefix + name;
  return name;
}
function makeClassName(generatorName) {
  return _.chain(generatorName)
    .replace(prefix, '')
    .words()
    .map(_.capitalize)
    .join('')
    .value();
}

module.exports = class extends Generator {

  initializing() {
    this.props = {};
  }

  default() {
    this.composeWith(require.resolve('generator-node/generators/app'), {
      boilerplate: false,
      name: this.props.name,
      editorconfig: false,
      git: false,
      skipInstall: true
    });
  }

  prompting() {
    return askName({
      name: 'name',
      message: 'Your generator name',
      default: makeGeneratorName(path.basename(process.cwd())),
      filter: makeGeneratorName,
      validate: str => {
        return str.length > prefix.length;
      }
    }, this).then(props => {
      this.props.name = props.name;
      this.props.className = makeClassName(props.name);
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationPath('.'),
      this.props
    );
  }

};
