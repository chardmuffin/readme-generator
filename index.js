// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project? (Required)',
        validate: titleInput => {
            if (titleInput) {
              return true;
            } else {
              console.log('Please enter a title for your project!');
              return false;
            }
          }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a short description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Provide step-by-step instructions for use.',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select a license',
        choices: ['MIT', 'ISC', 'Apache License 2.0', 'GNU GPLv3', 'BSD', 'None']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'List any collaborators, third-party assets that require attribution, and links to tutorials used, if any.',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Provide examples on how to run any tests.',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username',
    }
    ,
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email',
    }
];

// this function writes the README file
// badge links created with reference https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
// professional readme template based on https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide
function writeToFile(fileName, data) {

    //build license string
    switch(data.license) {
        case 'MIT':
            data.license = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
            break;
        case 'ISC':
            data.license = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
            break;
        case 'Apache License 2.0':
            data.license = '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
            break;
        case 'GNU GPLv3':
            data.license = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
            break;
        case 'BSD':
            data.license = '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)';
            break;
        default:
            break;
    }

    //put data in fileContent in format;
    const fileContent =
`# ${data.title}
## Description

${data.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## License

${data.license}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

I am on GitHub at [https://github.com/${data.github}](https://github.com/${data.github})


I can also be reached by email at [${data.email}](mailto:${data.email})`;

    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
    
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

// initialize app, calls functions
function init() {
    console.log("Any information not entered will be left blank in the generated README.me file")
    inquirer
    .prompt(questions)
    //.then(answers => console.log(answers))
    .then(answers => writeToFile('./generated/README.md', answers));
}

// Function call to initialize app
init();
