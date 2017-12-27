let shell = require('shelljs');

NARIZ = 'gnome-terminal -x bash -c "ssh -i /home/gabs/devops/aws/key-pairs/northvirginia.pem ec2-user@ec2-54-90-74-58.compute-1.amazonaws.com; exec $SHELL"';
part1 = "'gnome-terminal -x bash -c ";
part2 = '"ssh -i /home/gabs/devops/aws/key-pairs/northvirginia.pem ec2-user@ec2-54-90-74-58.compute-1.amazonaws.com; ';
part3 = 'exec $SHELL"';
part4 = "'";
comando = part1 + part2 + part3 + part4;



console.log(NARIZ2);
console.log(NARIZ);

shell.exec(NARIZ2);



