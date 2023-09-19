const fs = require('fs');
const request = require('request');
const path = require('path');

module.exports = 
{
  pwd: function(done)
  {
    done(process.cwd());
  },
  date: function(done)
  {
    done(new Date().toString());
  },
  ls: function (done)
  {
    fs.readdir('.', function(err, files)
    {
      if (err) throw err;
      done(files.join("\n"));
    });
  },

  echo: function (done, arr)
  {
    done(arr.join(' '));
  },
  
  cat: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },

  head: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      let arrLines = data.toString().split('\n').slice(0, 5);
      done(arrLines.join('\n'));
    });
  },

  tail: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      let arrLines = data.toString().split('\n').slice(-5);
      done(arrLines.join('\n'));
    });
  },

  sort: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data)  => {
      if (err) throw err;
      let arrLines = data.toString().split('\n').sort((a,b) => {
        a=a.toLowerCase();
        b=b.toLowerCase();
        return a > b ? 1 : (a < b ? -1 : 0);
    });
    done(arrLines.join('\n'));
    });
  },

  wc: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      let cont = data.toString().split('\n').length;
      done(cont.toString());
    });
  },

  uniq: function (done, arr)
  {
    filename = arr.join('').toString();
    fs.readFile(filename, (err, data) => {
      if (err) throw err;
      let arrLines = data.toString().split('\n');
      let arrEnd = [];
      for (let i = 0; i < arrLines.length; i++)
      {
        if (arrLines[i] !== arrLines[i+1]) arrEnd.push;(arrLines[i]);
      };
      done(arrEnd.join('\n'));
    });
  },

  curl: function (done, arr)
  {
    url = arr.join('').toString();
    request(url, (error, codeResponse, body) => {
      if (error) throw error;
      done(body);
    });
  },

  find: function (done, arr)
  {
    let directory = arr[0] || '.';
    let output = '';
    let stack = [directory];

    while (stack.length > 0) {
        const currentDir = stack.pop();
        const items = fs.readdirSync(currentDir);

        for (let item of items) {
            const itemPath = path.join(currentDir, item);
            const itemStat = fs.statSync(itemPath);

            if (itemStat.isDirectory()) {
                output += `./${path.relative(".", itemPath)}/\n`;
                stack.push(itemPath);
            } else {
                output += `./${path.relative(".", itemPath)}\n`;
            }
        }
    }
    done(output);
  }
}