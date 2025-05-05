export const generateApiKey = (): string => {
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `sk_live_${rand}`;
};
