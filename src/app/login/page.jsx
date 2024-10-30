"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NextRequest, NextResponse } from 'next/server';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      
      router.push('/');
    } else {
      const data = await response.json();
      setMessage(data.error);
      router.push('/login');
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    
    if (data) {
      router.push('/');
    } else {
      router.push('/login');
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-400 to-green-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-5 text-center">Petani Login <br />Green House</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-4">
          Not a member?{' '}
          <Link href="/login/register" className="text-teal-500 hover:underline">
            Create Account
          </Link>
        </p>
        <p className="text-center mt-2">
          <Link href="/login/fix-password" className="text-teal-500 hover:underline">
            Forgot Password?
          </Link>
        </p>
        {message != null ? (
          <div>
            <p className="text-red-500 text-center mt-2">{message}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
