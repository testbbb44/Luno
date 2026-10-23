export const isWalletAddress = value => typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
export async function requestWalletAddress(provider) {
  if (!provider?.request) throw new Error('Open this page in your wallet browser, or enable a compatible browser wallet.');
  const accounts = await provider.request({ method: 'eth_requestAccounts' });
  if (!Array.isArray(accounts) || !isWalletAddress(accounts[0])) throw new Error('No public address was shared. Choose an account in your wallet and try again.');
  return accounts[0];
}
export function walletError(error) {
  if (error?.code === 4001) return 'Connection cancelled. You can try again whenever you are ready.';
  if (error?.code === -32002) return 'A connection request is already open. Check your wallet.';
  if (error?.code === 4900) return 'Your wallet is offline. Reconnect it and try again.';
  return error?.message || 'Could not connect. Check your wallet and try again.';
}
