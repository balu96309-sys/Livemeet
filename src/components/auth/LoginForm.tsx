import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'farmer', 'meat_seller']),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'customer',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const { data: authData, error } = await signIn(data.email, data.password);
      
      if (error) {
        toast.error(error.message);
        return;
      }

      if (authData.user) {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'customer', label: 'Customer', icon: User, description: 'Browse and buy products' },
    { value: 'farmer', label: 'Farmer', icon: UserCheck, description: 'Sell live animals' },
    { value: 'meat_seller', label: 'Meat Seller', icon: UserCheck, description: 'Sell cut meat products' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select your account type
            </label>
            <div className="space-y-3">
              {roleOptions.map((role) => {
                const IconComponent = role.icon;
                return (
                  <label
                    key={role.value}
                    className={`
                      relative flex cursor-pointer rounded-lg border p-4 focus:outline-none
                      ${selectedRole === role.value
                        ? 'border-green-600 ring-2 ring-green-600 bg-green-50'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      value={role.value}
                      className="sr-only"
                      {...register('role')}
                    />
                    <div className="flex items-center">
                      <div className={`
                        flex h-10 w-10 items-center justify-center rounded-full
                        ${selectedRole === role.value ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}
                      `}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <div className={`
                          text-sm font-medium
                          ${selectedRole === role.value ? 'text-green-900' : 'text-gray-900'}
                        `}>
                          {role.label}
                        </div>
                        <div className={`
                          text-sm
                          ${selectedRole === role.value ? 'text-green-700' : 'text-gray-500'}
                        `}>
                          {role.description}
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Email address"
              type="email"
              icon={<Mail />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock />}
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            size="lg"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};