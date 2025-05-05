'use client';

import ButtonLoader from '@/components/button-loader';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useUpdateChild } from '@/hooks/useChildrenQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@mosespace/toast';
import { CreditCard, Eye, EyeOff, History, Settings } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface ChildTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
}

interface ChildData {
  id: string;
  name: string;
  class?: string;
  isActive: boolean;
  parentId: string;
  cardBalance: number;
  transactions: ChildTransaction[];
}

interface ChildCardProps {
  child: ChildData;
  parentId: string;
  refetch: any;
}

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  class: z.string().optional(),
  isActive: z.boolean().default(true),
});

export function ChildCard({ child, parentId, refetch }: ChildCardProps) {
  const [showBalance, setShowBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const updateChild = useUpdateChild();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: child.name,
      class: child.class || '',
      isActive: child.isActive,
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const dataToUpdate = {
        id: child.id,
        data: {
          parentId,
          name: values.name,
          class: values.class as string,
          isActive: values.isActive,
        },
      };

      const updatedChild = await updateChild.mutateAsync(dataToUpdate);

      refetch();

      toast.success(
        'Updated successfully',
        `${values.name}'s information has been updated.`,
      );
    } catch (error) {
      console.log('Error:', error);
      toast.error(
        'Update failed',
        'There was an error updating the information.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-secondary/5 z-0"></div>
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center justify-between">
          <span>{child.name}</span>
          <div className="flex items-center space-x-2">
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
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Student Information</DialogTitle>
                  <DialogDescription>
                    Update {child.name}'s details below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 py-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Student name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="class"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class</FormLabel>
                          <FormControl>
                            <Input placeholder="Student class" {...field} />
                          </FormControl>
                          <FormDescription>
                            The class or grade the student is in
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Active Status</FormLabel>
                            <FormDescription>
                              Whether this student account is active
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <ButtonLoader className="bg-white" />
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>
          {child.class ? `Class: ${child.class} · ` : ''}
          {child.isActive ? 'Active' : 'Inactive'} · Card balance and
          transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Card Balance</p>
            <p className="text-2xl font-bold">
              {showBalance
                ? `UGX ${child.cardBalance.toFixed(2)}`
                : '••••••••••••'}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Recent Transactions</h3>
          {child.transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No recent transactions
            </p>
          ) : (
            <div className="space-y-2">
              {child.transactions.slice(0, 2).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center rounded-md border p-2"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    -${transaction.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="relative z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <History className="mr-2 h-4 w-4" />
              View All Transactions
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{child.name}'s Transactions</DialogTitle>
              <DialogDescription>
                Complete transaction history for {child.name}'s card
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {child.transactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No transactions found
                </p>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {child.transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell className="text-right">
                            -${transaction.amount.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
