"use client";

import useCart from "@/lib/hooks/useCart";
import Link from "next/link";
import { useEffect } from "react";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 text-center">
      <p className="text-heading4-bold text-red-1">Successful</p>
      <p>Thank you for your purchase!</p>
      <p className="text-body-medium">
        You will soon be contacted by the company for more information and payment details. Stay tuned and keep shopping!
      </p>
      <Link
        href="/"
        className="p-4 border text-base-bold hover:bg-black hover:text-white rounded-lg"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
