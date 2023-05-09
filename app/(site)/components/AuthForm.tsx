'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
type Varient = 'LOGIN' | 'REGISTER';


const AuthForm = () => {
  const [varient, setVarient] = useState<Varient>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVarient = useCallback(() => {
    if (varient === 'LOGIN') {
      setVarient('REGISTER');
    } else {
      setVarient('LOGIN');
    }
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      emael: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (varient === 'REGISTER') {
      // register end point
    }

    if (varient === 'LOGIN') {
      // nexthauth
    }
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-6 text-center text-3xl font-bold tracking-tighter text-gray-900">{varient === "LOGIN" ? "Sign in" : "Register"}</h2>
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === 'REGISTER' && (
            <Input id="name" label="Name" register={register} errors={errors} />
          )}
          <Input id="email" label="Email" type="email" register={register} errors={errors} />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {varient === 'REGISTER' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </form>
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">new to messenger?</span>
            </div>
          </div>
        </div> */}
        <div className='flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500'>
          <div>{varient === "LOGIN" ? "New to messenger?" : "Alredy have an account?"}</div>
          <div onClick={toggleVarient} className='underline cursor-pointer'>{varient === "LOGIN" ? 'Create an account' : "Login"}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
