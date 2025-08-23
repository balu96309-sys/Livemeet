import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  role: z.enum(['customer', 'farmer', 'meat_seller']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'customer',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const { data: authData, error } = await signUp(data.email, data.password, {
        full_name: data.fullName,
        role: data.role,
        phone: data.phone,
        address: data.address,
      });
      
      if (error) {
        toast.error(error.message);
        return;
      }

      if (authData.user) {
        toast.success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in here
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
              label="Full Name"
              type="text"
              icon={<User />}
              error={errors.fullName?.message}
              {...register('fullName')}
            />

            <Input
              label="Email Address"
              type="email"
              icon={<Mail />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Phone Number"
              type="tel"
              icon={<Phone />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Input
              label="Address"
              type="text"
              icon={<MapPin />}
              error={errors.address?.message}
              {...register('address')}
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirm Password"
              type="password"
              icon={<Lock />}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            size="lg"
          >
            Create Account
          </Button>

          <div className="text-xs text-gray-600 text-center">
            By creating an account, you agree to our{' '}
            <Link to="/terms" className="text-green-600 hover:text-green-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-green-600 hover:text-green-500">
              Privacy Policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};