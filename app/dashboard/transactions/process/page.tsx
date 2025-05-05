'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search, User } from 'lucide-react';
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
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@mosespace/toast';
import { useSession } from 'next-auth/react';

// Types
interface Product {
  id: string;
  name: string;
  price: number;
}

interface Child {
  id: string;
  name: string;
  card: {
    id: string;
    balance: number;
  };
  parent: {
    id: string;
    email: string;
  };
}

// Form schema
const transactionSchema = z.object({
  childId: z.string({
    required_error: 'Please select a child',
  }),
  products: z.array(z.string()).min(1, {
    message: 'Please select at least one product',
  }),
});

export default function ProcessTransactionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [childSearchQuery, setChildSearchQuery] = useState('');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      childId: '',
      products: [],
    },
  });

  // Fetch products and children
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsResponse = await fetch('/api/v1/canteen/products');
        const productsData = await productsResponse.json();

        console.log('Products Data:', productsData);

        if (productsData.products) {
          setProducts(productsData.products);
        }

        // Fetch children
        const childrenResponse = await fetch('/api/v1/canteen/children');
        const childrenData = await childrenResponse.json();

        if (childrenData.children) {
          setChildren(childrenData.children);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error', 'Failed to load products or children');
      }
    };

    fetchData();
  }, [toast]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Filter children based on search query
  const filteredChildren = children.filter((child) =>
    child.name.toLowerCase().includes(childSearchQuery.toLowerCase()),
  );

  // Calculate total amount
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price,
    0,
  );

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
      form.setValue(
        'products',
        form.getValues('products').filter((id) => id !== product.id),
      );
    } else {
      setSelectedProducts([...selectedProducts, product]);
      form.setValue('products', [...form.getValues('products'), product.id]);
    }
  };

  // Handle child selection
  const handleChildSelect = (child: Child) => {
    setSelectedChild(child);
    form.setValue('childId', child.card.id);
  };

  // Process transaction
  const onSubmit = (values: z.infer<typeof transactionSchema>) => {
    // Open confirmation dialog
    setIsConfirmDialogOpen(true);
  };

  // Confirm and process transaction
  const confirmTransaction = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/canteen/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cardId: form.getValues('childId'),
          productIds: form.getValues('products'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process transaction');
      }

      toast.success(
        'Transaction successful',
        `Transaction processed for ${selectedChild?.name}`,
      );

      // Reset form and state
      form.reset();
      setSelectedProducts([]);
      setSelectedChild(null);
      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error('Transaction error:', error);
      toast.error(
        'Transaction failed',
        'There was a problem processing the transaction',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Process Transaction
        </h1>
        <p className="text-muted-foreground">
          Select products and a child to process a canteen transaction.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Select Products</CardTitle>
            <CardDescription>
              Choose the products the child is purchasing
            </CardDescription>
            <div className="mt-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No products found
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filteredProducts.map((product) => {
                    const isSelected = selectedProducts.some(
                      (p) => p.id === product.id,
                    );
                    return (
                      <div
                        key={product.id}
                        className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                          isSelected ? 'bg-primary/10 border-primary' : ''
                        }`}
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleProductSelect(product)}
                          />
                          <span>{product.name}</span>
                        </div>
                        <span className="font-medium">
                          UGX {product.price.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedProducts.length} products selected
            </div>
            <div className="font-medium">
              Total: UGX {totalAmount.toLocaleString()}
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Child</CardTitle>
              <CardDescription>
                Choose the child making the purchase
              </CardDescription>
              <div className="mt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search children..."
                    className="pl-9"
                    value={childSearchQuery}
                    onChange={(e) => setChildSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredChildren.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No children found
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-2">
                    {filteredChildren.map((child) => {
                      const isSelected = selectedChild?.id === child.id;
                      return (
                        <div
                          key={child.id}
                          className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                            isSelected ? 'bg-primary/10 border-primary' : ''
                          }`}
                          onClick={() => handleChildSelect(child)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{child.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {child.parent.email}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              UGX {child.card.balance.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Card Balance
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>
                Review and process the transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="childId"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                      <FormItem hidden>
                        <FormControl>
                          <Input
                            type="hidden"
                            value={field.value.join(',')}
                            onChange={() => {}}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Child:</span>
                      <span className="font-medium">
                        {selectedChild?.name || 'None selected'}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Card Balance:
                      </span>
                      <span className="font-medium">
                        {selectedChild
                          ? `UGX ${selectedChild.card.balance.toLocaleString()}`
                          : 'N/A'}
                      </span>
                    </div>

                    <Separator />

                    <div>
                      <span className="text-muted-foreground">Products:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedProducts.length === 0 ? (
                          <span className="text-sm text-muted-foreground">
                            No products selected
                          </span>
                        ) : (
                          selectedProducts.map((product) => (
                            <Badge key={product.id} variant="outline">
                              {product.name} - UGX{' '}
                              {product.price.toLocaleString()}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold">
                        UGX {totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {selectedChild &&
                      totalAmount > selectedChild.card.balance && (
                        <div className="text-red-500 text-sm">
                          Insufficient balance. The child's card balance is less
                          than the total amount.
                        </div>
                      )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      isLoading ||
                      selectedProducts.length === 0 ||
                      !selectedChild ||
                      (selectedChild &&
                        totalAmount > selectedChild.card.balance)
                    }
                  >
                    {isLoading ? 'Processing...' : 'Process Transaction'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transaction</DialogTitle>
            <DialogDescription>
              Please confirm that you want to process this transaction.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Child:</span>
              <span className="font-medium">{selectedChild?.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Products:</span>
              <span className="font-medium">
                {selectedProducts.length} items
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount:</span>
              <span className="font-bold">
                UGX {totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                New Balance After Transaction:
              </span>
              <span className="font-medium">
                UGX{' '}
                {selectedChild
                  ? (selectedChild.card.balance - totalAmount).toLocaleString()
                  : '0'}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsConfirmDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={confirmTransaction} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Confirm Transaction'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
