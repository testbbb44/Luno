import test from 'node:test';
import assert from 'node:assert/strict';
import { requestWalletAddress, isWalletAddress, walletError } from '../src/utils/walletConnection.js';
const address = '0x' + 'ab'.repeat(20);
test('connection requests only the public account through the wallet provider', async () => {
  const calls = [];
  const result = await requestWalletAddress({ request: async request => { calls.push(request); return [address]; } });
  assert.equal(result, address);
  assert.deepEqual(calls, [{ method: 'eth_requestAccounts' }]);
});
test('missing providers and invalid responses fail without simulating success', async () => {
  await assert.rejects(requestWalletAddress(null), /wallet browser/);
  for (const value of [[], null, ['invalid'], ['0x' + 'a'.repeat(64)]]) {
    await assert.rejects(requestWalletAddress({ request: async () => value }), /No public address/);
  }
  assert.equal(isWalletAddress(address), true);
  assert.equal(isWalletAddress('0x123'), false);
});
test('user rejection is preserved and displayed as a cancellation', async () => {
  const rejection = Object.assign(new Error('Rejected'), { code: 4001 });
  await assert.rejects(requestWalletAddress({ request: async () => { throw rejection; } }), error => error === rejection);
  assert.match(walletError(rejection), /cancelled/);
  assert.match(walletError({ code: -32002 }), /already open/);
});
