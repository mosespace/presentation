import { ArrowDown, ArrowUp } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Transaction } from '@prisma/client';

interface WalletTransactionHistoryProps {
  transactions: Transaction[] | undefined | null;
}

export function WalletTransactionHistory({
  transactions,
}: WalletTransactionHistoryProps) {
  if (transactions?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-sm text-muted-foreground">No transaction history</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="mr-2 rounded-full p-1 bg-primary/10">
                    {transaction.type === 'DEPOSIT' ? (
                      <ArrowDown className="h-3 w-3 text-primary" />
                    ) : (
                      <ArrowUp className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  {transaction.type}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    transaction.type === 'DEPOSIT'
                      ? 'text-green-600 dark:text-green-500'
                      : 'text-primary'
                  }
                >
                  {transaction.type === 'DEPOSIT' ? '+' : '-'}$
                  {transaction.amount.toFixed(2)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
