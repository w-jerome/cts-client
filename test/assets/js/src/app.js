import CTSClient from '../../../../src/cts-client';

const cts_client = new CTSClient(`${process.env.API_KEY}:`);

cts_client
  .linesDiscovery()
  .then(lines => {
    console.log(lines);
  })
  .catch(error => {
    console.error(error);
  });
