"use client";
import { useEffect } from 'react';
import { toast } from 'sonner';

const LoginAlert = () => {
  useEffect(() => {
    toast.warning("Please login first", {
      className: 'bg-yellow-500',
    });
  }, []);

  return null;
};

export default LoginAlert;
