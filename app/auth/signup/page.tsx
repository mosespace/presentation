import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/constants/siteConfig';
import SignUpForm from '@/components/forms/sign-up-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a company account to manage your employees',
};

export default function SignUpPage() {
  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-screen flex-col p-10 text-white lg:flex dark:border-r">
        <img
          src="/signup.jpg"
          alt="Authentication background"
          className="absolute inset-0 object-cover w-full h-full brightness-50"
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img
            src={siteConfig.logo}
            className="mr-2 h-8 w-8"
            alt={siteConfig.name}
          />
          {siteConfig.name}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-md">
              “Every time I used to be in class and a friend I don't trust gets
              out to go to the dormitory, I would stop concentrating in class
              worried that he would steal my money from the suitcase. But with
              my money on my canteen-flow I worry no more in class and sleep
              like a king knowing my pocket money is very safe.”
            </p>
            <footer className="text-sm text-[#f6416c]">
              Sofia Davis, Student At Kings College
            </footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create an account with us today!
            </p>
          </div>
          <SignUpForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/auth/signin"
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
