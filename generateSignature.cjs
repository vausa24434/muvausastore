const crypto = require('crypto');

const username = 'yitaxig4J76D';
const apiKey = '5507ddae-2f95-5190-bbd5-b8a97001f429';

const signature = crypto.createHash('md5').update(username + apiKey + "some1d").digest('hex');

console.log(signature);
