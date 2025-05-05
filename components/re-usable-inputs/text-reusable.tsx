import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

type TextInputProps = {
  label: string;
  register: any;
  name: string;
  errors: any;
  type?: string;
  page?: string;
  currency?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isRequired?: boolean;
};

export default function CustomText({
  label,
  register,
  name,
  errors,
  type = 'text',
  currency = '$',
  placeholder,
  disabled = false,
  isRequired = true,
  page,
  className = 'col-span-full',
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn('grid gap-2', className)}>
      {type === 'password' && page === 'login' ? (
        <div className="flex items-center">
          <Label htmlFor={name}>{label}</Label>
          <Link
            href="/forgot-password"
            className="ml-auto inline-block text-sm underline"
          >
            Forgot your password?
          </Link>
        </div>
      ) : (
        <Label className="text-sm font-medium" htmlFor={name}>
          {label}
        </Label>
      )}

      {type === 'password' ? (
        <div className="relative">
          <Input
            disabled={disabled}
            {...register(name, { required: isRequired })}
            id={name}
            name={name}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder={placeholder || ''}
            className="bg-transparent border-brandBorder pr-10"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-2 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      ) : type === 'phone' ? (
        <div className="flex">
          <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md border-brandBorder bg-transparent">
            +256
          </div>
          <Input
            disabled={disabled}
            {...register(name, { required: isRequired })}
            id={name}
            name={name}
            type="tel"
            autoComplete="tel"
            placeholder={placeholder || ''}
            className="bg-transparent border-brandBorder rounded-l-none"
          />
        </div>
      ) : type === 'currency' ? (
        <div className="flex">
          <div className="flex items-center justify-center px-3 border border-r-0 rounded-l-md border-brandBorder bg-transparent">
            {currency}
          </div>
          <Input
            disabled={disabled}
            {...register(name, { required: isRequired })}
            id={name}
            name={name}
            type="number"
            placeholder={placeholder || ''}
            className="bg-transparent border-brandBorder rounded-l-none"
          />
        </div>
      ) : (
        <Input
          disabled={disabled}
          {...register(name, { required: isRequired })}
          id={name}
          name={name}
          type={type}
          autoComplete="name"
          placeholder={placeholder || ''}
          className="bg-transparent border-brandBorder"
        />
      )}

      {errors[name] && (
        <span className="text-red-600 text-sm">{label} is required</span>
      )}
    </div>
  );
}
