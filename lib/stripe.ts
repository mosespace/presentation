import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil', // Use the latest stable API version
});

// Calculate application fee if needed
export const calculateApplicationFee = (amount: number): number => {
  // Example: 2% fee with a minimum of 30 cents
  const feePercentage = 0.02;
  const minimumFee = 30;
  
  const calculatedFee = Math.max(
    Math.round(amount * feePercentage),
    minimumFee
  );
  
  return calculatedFee;
};