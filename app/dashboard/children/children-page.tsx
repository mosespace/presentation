'use client';

import { IChild } from '@/actions/children';
import ButtonLoader from '@/components/button-loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  useCreateChild,
  useSuspenseChildren,
} from '@/hooks/useChildrenQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@mosespace/toast';
import { Plus, User } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChildCard } from './child-card';

const addChildSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  class: z.string().min(2, { message: 'Class must be at least 2 characters' }),
});

export default function ChildrenPage({ userId }: { userId: string }) {
  const { children, refetch } = useSuspenseChildren(userId);

  const createChildMutation = useCreateChild();

  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof addChildSchema>>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onAddChild(values: z.infer<typeof addChildSchema>) {
    setIsLoading(true);

    try {
      const childData: IChild = {
        name: values.name,
        parentId: userId as string,
        class: values.class || '',
      };

      const newChild = await createChildMutation.mutateAsync(childData);
      refetch();

      toast.success(
        'Child added successfully',
        `${values.name} has been added to your account.`,
      );

      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.log('Failed to create children:', error);

      toast.error(
        'Failed to add child',
        'There was a problem adding your child.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 px-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Children</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Child
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a Child</DialogTitle>
                <DialogDescription>
                  Add a child to your account to manage their card.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onAddChild)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Child's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter child's name" {...field} />
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
                        <FormLabel>Child's Class</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter child's class" {...field} />
                        </FormControl>
                        <FormMessage />
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
                        'Add Child'
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          Manage your children's cards and view their transaction history.
        </p>
      </div>

      {children?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Children Added</h3>
            <p className="text-muted-foreground text-center mb-6">
              You haven't added any children to your account yet.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Child
                </Button>
              </DialogTrigger>
              <DialogContent></DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {children?.map((child: any) => (
            <ChildCard refetch={refetch} parentId={userId} key={child.id} child={child} />
          ))}
        </div>
      )}
    </div>
  );
}
