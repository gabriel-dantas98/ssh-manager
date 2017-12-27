let shell = require('shelljs');
let chalk = require('chalk');
let clear = require('clear');
let inquirer = require('inquirer');

let KEYPAIRS_FILE = [];
let KEYPAIRS_FOLDER = [];
let KEYPAIRS_PATCH = "/home/gabs/devops/aws/key-pairs";

let readKeypairs = () => {
            
    shell.ls(KEYPAIRS_PATCH + '/*').forEach(function (patchFile, index) { 
    let lastIndex = patchFile.lastIndexOf("/");    
    let pem = patchFile.substring(lastIndex+1);

        KEYPAIRS_FILE[index] = pem;
        KEYPAIRS_FOLDER[index] = patchFile;
    });
}
readKeypairs();

console.log('Hi, welcome to SSH Manager');

inquirer
.prompt([
  {
    type: 'list',
    name: 'server',
    message: 'What server?',
    choices: [
        'mensmarket-jenkins - NV - ec2-54-90-74-58.compute-1.amazonaws.com',
        'mensmarket-backoffice - SP - ec2-54-233-83-11.sa-east-1.compute.amazonaws.com',
        'mensmarket-blog - SP - ec2-54-94-132-202.sa-east-1.compute.amazonaws.com',
        'mensmarket-services -  SP - ec2-54-233-228-182.sa-east-1.compute.amazonaws.com', 
        'mensmarket-store - SP - ec2-54-233-80-83.sa-east-1.compute.amazonaws.com',
        'mensmarket-reconf - SP - ec2-52-67-239-18.sa-east-1.compute.amazonaws.com'     
    ]
  },
  {
    type: 'list',
    name: 'keypair',
    message: 'What key?',
    choices: KEYPAIRS_FOLDER, 
    filter: function(val) {
      return val.toLowerCase();
    }
  }
])
.then(answers => {
    console.log(JSON.stringify(answers, null, '  '));
    let connect = (JSON.stringify(answers, null, '  '));
    let comando = JSON.parse(connect);
    let serverChoice = comando.server;

    let Lastindex = comando.server.lastIndexOf(" "); 
    let URL = serverChoice.substring(Lastindex+1);

    let SSH_COMMAND ='gnome-terminal -x bash -c "ssh -i ' + comando.keypair + " " + "ec2-user@" + URL + '; exec $SHELL"';
  
    shell.exec(SSH_COMMAND);
});

