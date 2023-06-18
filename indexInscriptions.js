const crypto = require('crypto');
const fs = require('fs');
const fetch = require('node-fetch');

const explorer = 'https://ordinals.com';

async function indexInscriptions(fromGenesisBlockHeight, toGenesisBlockHeight, inscriptionContentHash) {
  const baseUrl = 'https://api.hiro.so/ordinals/v1/inscriptions';
  const mimeType = 'text/html';

  const url = `${baseUrl}?from_genesis_block_height=${fromGenesisBlockHeight}&to_genesis_block_height=${toGenesisBlockHeight}&mime_type=${mimeType}`;

  let offset = 0;
  let limit = 20;
  let allResults = [];

  while (true) {
    let response = await fetch(`${url}&limit=${limit}&offset=${offset}`);
    let data = await response.json();

    if (data.results && data.results.length > 0) {
      allResults.push(...data.results);
      offset += limit;
    } else {
      break;
    }
  }

  // Sort by timestamp
  allResults.sort((a, b) => a.timestamp - b.timestamp);

  let inscriptions = [];
  let inscriptionCount = 1;

  for (let item of allResults) {
    if (item.genesis_block_height >= toGenesisBlockHeight) {
      continue;
    }

    let inscriptionId = item.id;
    let url = `${explorer}/content/${inscriptionId}`;

    try {
      let res = await fetch(url);
      let text = await res.text();
      let hash = crypto.createHash('sha256').update(text).digest('hex');

      if (hash === inscriptionContentHash) {
        inscriptions.push({
          id: inscriptionId,
          meta: {
            name: `Inscription #${inscriptionCount}`,
          },
        });
        inscriptionCount++;
      }
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  }

  // Save to inscriptions.json
  fs.writeFile('inscriptions.json', JSON.stringify(inscriptions, null, 2), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Successfully wrote inscriptions.json');
    }
  });
}

const fromGenesisBlockHeight = 794543;
const toGenesisBlockHeight = 797536;
const inscriptionContentHash = '1816a5cc285047c1c80462d09177e5cdc53c5e086b9f1a735710755f1b5d72f2';

indexInscriptions(fromGenesisBlockHeight, toGenesisBlockHeight, inscriptionContentHash);
