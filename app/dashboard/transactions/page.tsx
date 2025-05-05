'use client';

import { useState } from 'react';
import { CreditCard, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - would come from your database
const mockTransactionsData = [
  {
    id: '1',
    date: '2025-03-28',
    time: '12:35 PM',
    studentName: 'Amy Smith',
    items: ['Sandwich', 'Apple Juice'],
    amount: 5.5,
  },
  {
    id: '2',
    date: '2025-03-28',
    time: '12:15 PM',
    studentName: 'John Doe',
    items: ['Pizza Slice', 'Water'],
    amount: 4.75,
  },
  {
    id: '3',
    date: '2025-03-28',
    time: '11:45 AM',
    studentName: 'Sarah Johnson',
    items: ['Salad', 'Orange Juice'],
    amount: 6.25,
  },
  {
    id: '4',
    date: '2025-03-27',
    time: '12:30 PM',
    studentName: 'Michael Brown',
    items: ['Burger', 'Chips', 'Soda'],
    amount: 7.5,
  },
  {
    id: '5',
    date: '2025-03-27',
    time: '12:05 PM',
    studentName: 'Emily Wilson',
    items: ['Yogurt', 'Fruit Cup'],
    amount: 3.75,
  },
];

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredTransactions = mockTransactionsData.filter((transaction) => {
    const matchesSearch = transaction.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (dateFilter === 'all') return matchesSearch;
    if (dateFilter === 'today')
      return transaction.date === '2025-03-28' && matchesSearch;
    if (dateFilter === 'yesterday')
      return transaction.date === '2025-03-27' && matchesSearch;

    return matchesSearch;
  });

  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  );

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage your canteen transactions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue="all" onValueChange={setDateFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Recent transactions from your canteen
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.time}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.studentName}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {transaction.items.map((item, index) => (
                          <span key={index} className="text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredTransactions.length} transactions
          </div>
          <Button variant="outline" size="sm">
            Load More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
