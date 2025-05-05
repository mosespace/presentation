'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletTransactionHistory } from '@/components/wallet/transaction-history';
import { siteConfig } from '@/constants/siteConfig';
import { useSuspenseUserWallet } from '@/hooks/useWalletQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@mosespace/toast';
import { CreditCard, DollarSign, Eye, EyeOff, Plus } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const fundWalletSchema = z.object({
  amount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: 'Amount must be a positive number' },
  ),
});

const transferSchema = z.object({
  childId: z.string({
    required_error: 'Please select a child',
  }),
  amount: z.string().refine(
    (val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    { message: 'Amount must be a positive number' },
  ),
});

interface IProps {
  userId: string;
}

export default function WalletPage({ userId }: IProps) {
  const { wallet, refetch } = useSuspenseUserWallet(userId);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check for Stripe success or canceled parameters
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && sessionId) {
      toast.success(
        'Payment successful',
        'Your wallet has been funded successfully.',
      );
      refetch();

      // Clean up URL parameters after processing
      router.replace('/dashboard/wallet');
    }

    if (canceled === 'true') {
      toast.error('Payment canceled', 'Your payment was canceled.');

      // Clean up URL parameters after processing
      router.replace('/dashboard/wallet');
    }
  }, [searchParams, refetch, router]);

  const fundWalletForm = useForm<z.infer<typeof fundWalletSchema>>({
    resolver: zodResolver(fundWalletSchema),
    defaultValues: {
      amount: '',
    },
  });

  const transferForm = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      childId: '',
      amount: '',
    },
  });

  async function onFundWallet(values: z.infer<typeof fundWalletSchema>) {
    setIsLoading(true);

    try {
      const amount = Number.parseFloat(values.amount);

      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount');
      }

      // Call the server action to create a checkout session
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error('Failed to fund wallet', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onTransfer(values: z.infer<typeof transferSchema>) {
    setIsLoading(true);

    try {
      // Call the API to transfer funds to child's card

      // Refresh wallet data
      refetch();

      toast.success(
        'Transfer successful',
        `${siteConfig.currency} ${Number.parseFloat(values.amount).toLocaleString()} has been transferred to your child's card.`,
      );

      transferForm.reset();
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error(
        'Transfer failed',
        error instanceof Error
          ? error.message
          : 'There was a problem transferring funds.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  const formattedBalance = wallet?.balance
    ? (wallet.balance / 100).toLocaleString()
    : '0.00';

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your wallet and transfer funds to your children's cards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center justify-between">
              <span>Your Wallet</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="h-8 w-8"
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </CardTitle>
            <CardDescription>
              Fund your wallet and manage your balance
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Current Balance
                </p>
                <p className="text-2xl font-bold">
                  {showBalance
                    ? `${siteConfig.currency} ${formattedBalance}`
                    : '••••••••••••••••••'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="fund" className="flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fund">Fund Wallet</TabsTrigger>
            <TabsTrigger value="transfer">Transfer to Child</TabsTrigger>
          </TabsList>
          <div className="flex-1 mt-4">
            <TabsContent value="fund" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Fund Your Wallet</CardTitle>
                  <CardDescription>
                    Add funds to your wallet using your credit card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...fundWalletForm}>
                    <form
                      onSubmit={fundWalletForm.handleSubmit(onFundWallet)}
                      className="space-y-4"
                    >
                      <FormField
                        control={fundWalletForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-xs text-muted-foreground">
                                  UGX
                                </span>
                                <Input
                                  className="pl-9"
                                  placeholder="0.00"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Enter the amount you want to add to your wallet
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Fund Wallet'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transfer" className="h-full">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Transfer to Child's Card</CardTitle>
                  <CardDescription>
                    Transfer funds from your wallet to your child's card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...transferForm}>
                    <form
                      onSubmit={transferForm.handleSubmit(onTransfer)}
                      className="space-y-4"
                    >
                      <FormField
                        control={transferForm.control}
                        name="childId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Child</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="" disabled>
                                  Select a child
                                </option>
                                {wallet?.user?.childProfiles?.map((child) => (
                                  <option key={child.id} value={child.id}>
                                    {child.name} (Balance:
                                    {siteConfig.currency}{' '}
                                    {child.cardBalance.toFixed(2)})
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={transferForm.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  className="pl-9"
                                  placeholder="0.00"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Enter the amount you want to transfer
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Transfer Funds'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <WalletTransactionHistory transactions={wallet?.transactions} />
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Load More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
