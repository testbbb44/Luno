import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchCrypto, usd, percent } from '../src/components/market/cryptoApi.js';

test('public requests are deduplicated and cached', async () => {
  const previous = globalThis.fetch; let calls = 0;
  globalThis.fetch = async () => { calls++; await new Promise(resolve => setTimeout(resolve, 5)); return { ok: true, json: async () => [{ id: 'bitcoin', current_price: 100 }] }; };
  try {
    const [a, b] = await Promise.all([fetchCrypto('/cache-test'), fetchCrypto('/cache-test')]);
    assert.deepEqual(a, b); assert.equal(calls, 1);
    await fetchCrypto('/cache-test'); assert.equal(calls, 1);
  } finally { globalThis.fetch = previous; }
});
test('rate limits are surfaced and failed requests can be retried', async () => {
  const previous = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: false, status: 429 });
    await assert.rejects(fetchCrypto('/retry-test'), /busy/);
    globalThis.fetch = async () => ({ ok: true, json: async () => [{ id: 'ethereum' }] });
    assert.deepEqual(await fetchCrypto('/retry-test'), [{ id: 'ethereum' }]);
  } finally { globalThis.fetch = previous; }
});
test('missing API data is rejected instead of generating fake prices', async () => {
  const previous = globalThis.fetch;
  try {
    globalThis.fetch = async () => ({ ok: true, json: async () => ({ error: 'unavailable' }) });
    await assert.rejects(fetchCrypto('/invalid-test'), /unavailable/);
    globalThis.fetch = async () => ({ ok: true, json: async () => [] });
    await assert.rejects(fetchCrypto('/empty-test'), /unavailable/);
  } finally { globalThis.fetch = previous; }
});
test('price and percentage formatting preserve missing data and losses', () => {
  assert.equal(usd(1234.5), '$1,234.50');
  assert.equal(percent(-2.345), '-2.35%');
  assert.equal(percent(2), '+2.00%');
  assert.equal(usd(undefined), '\u2014'); assert.equal(percent(null), '\u2014');
});
