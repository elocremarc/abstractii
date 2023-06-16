const crypto = require('crypto');

//run the ord explorer locally with command
//`ord server --http-port 8080`

//change the explorer to the one you are running locally or use your trusted ord explorer
const explorer = 'https://ordinals.com';
const inscriptionId =
  '990120b00a464949170b76beec5580ffc57c0ac0d5fe25fc03e61d39dd1bb264i0';
const url = `${explorer}/content/${inscriptionId}`;

const abstractiiHash =
  'eaa87520ad421aa7bc40c43fd30d0beb8dd490cc4080a8945c86c715e7db2406';
fetch(url)
  .then((res) => res.text())
  .then((text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    console.log(hash === abstractiiHash);
  })
  .catch((err) => console.error('error:' + err));
