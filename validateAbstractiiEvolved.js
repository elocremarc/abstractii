const crypto = require('crypto');

//run the ord explorer locally with command
//`ord server --http-port 8080`

//change the explorer to the one you are running locally or use your trusted ord explorer
const explorer = 'http://0.0.0.0:8080';
const inscriptionId = '<inscription-Id>';
const url = `${explorer}/content/${inscriptionId}`;

const abstractiiHash =
  '1816a5cc285047c1c80462d09177e5cdc53c5e086b9f1a735710755f1b5d72f2';
fetch(url)
  .then((res) => res.text())
  .then((text) => {
    const hash = crypto.createHash('sha256').update(text).digest('hex');
    console.log(hash === abstractiiHash);
  })
  .catch((err) => console.error('error:' + err));
