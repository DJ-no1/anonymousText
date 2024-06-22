// 'use client';

// import { ApiResponse } from '@/types/ApiResponse';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import {  useDebounceCallback } from 'usehooks-ts'
// import * as z from 'zod';

// import { Button } from '@/components/ui/button';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { useToast } from '@/components/ui/use-toast';
// import axios, { AxiosError } from 'axios';
// import { Loader2 } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { signUpSchema } from '@/schemas/signUpSchema';
// import { signInSchema } from '@/schemas/signInSchema';
// import { signIn } from 'next-auth/react';

// export default function SignInForm() {

//     const router = useRouter();
//     const { toast } = useToast();
//         // zod impleentation for signin
//     const form = useForm<z.infer<typeof signInSchema>>({
//         resolver: zodResolver(signInSchema),
//         defaultValues: {
//         indentifier : '',
//         password: '',
//         },
//     });


//     const onSubmit = async (data: z.infer<typeof signInSchema>) => {
//       const result = await signIn('credentials', {
//         redirect: false,
//         identifier: data.identifier, 
//         password: data.password,
//       })
//       if (result?.error) {
//         if (result.error=='CredentialsSignin') {
//         toast({
//           title: 'Error',
//           description: 'Invalid credentials',
//           variant: 'destructive',
//         });
//       }
//     if (result?.url){
//       router.replace('/dashboard')
//     }
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-800">
//         <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
//             <div className="text-center">
//             <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
//                 Join True Feedback
//             </h1>
//             <p className="mb-4">Sign in to start your anonymous adventure</p>
//             </div>
//             <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
//                 <FormField
//                 name="indentifier" // Fix: Change "identifier" to "indentifier"
//                 control={form.control}
//                 render={({ field }) => (
//                   <FormItem>
//                   <FormLabel>Email/Username</FormLabel>
//                   <FormControl>
//                   <Input placeholder='Email/Username' 
//                   {...field} name="email" />
                  
//                   </FormControl>
//                   <FormMessage />
//                   </FormItem>
//                 )}
//                 />

//                 <FormField
//                 name="password"
//                 control={form.control}
//                 render={({ field }) => (
//                     <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <Input type="password" {...field} name="password" />
//                     <FormMessage />
//                     </FormItem>
//                 )}
//                 />
//                 <Button type="submit" className='w-full' >
//                     Sign in 
              
//                 </Button>
//             </form>
//             </Form>
//             <div className="text-center mt-4">
            
//             </div>
//         </div>
//         </div>
//     );
//   }}
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      indentifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.indentifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboardd');
    }
  };

  return (
    <> 
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="indentifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
}