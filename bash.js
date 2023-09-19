const commands = require("./commands")

process.stdout.write('\nprompt > ');


const done = function(output)
{
  process.stdout.write(output)
  process.stdout.write('\nprompt > ')
}

process.stdin.on('data', function (data)
{
  let arreglo = data.toString().trim().split(' ');
  let cmd = arreglo[0]
  let args = arreglo.slice(1)
  if (commands[cmd])
  {
    commands[cmd](done, args)
  }
  else 
  {
    done('you typed: ' + cmd);
  }
});