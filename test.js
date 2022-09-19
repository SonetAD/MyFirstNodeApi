const { createHmac } = require('crypto');

function hash(inp, key) {
  return createHmac('sha256', key).update(inp).digest('hex');
}

const one = hash('Sonet', 'kaka');
const two = hash('Sonet', 'kakad');
console.log(one === two);
