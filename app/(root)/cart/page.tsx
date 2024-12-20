"use client";

import useCart from "@/lib/hooks/useCart";
import { useUser } from "@clerk/nextjs";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cart = () => {
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const total = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );
  const totalRounded = parseFloat(total.toFixed(2));

  const handleCheckout = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      setShowPhonePopup(true);
    }
  };

  const handlePhoneSubmit = async () => {
    try {
      if (!phoneNumber) {
        alert("Please enter a phone number.");
        return;
      }

      // Prepare data for the checkout request
      const orderDetails = {
        cartItems: cart.cartItems,
        customer: user,
        phoneNumber, // Include phone number in the request
      };

      // Send data to the backend API to initiate checkout
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect the user to the payment success page
        router.push("/payment_success");
      } else {
        // Handle errors from the server
        console.error("Error during checkout:", data);
        alert("Error during checkout. Please try again.");
      }
    } catch (err) {
      console.error("[handlePhoneSubmit]", err);
      alert("An error occurred during checkout. Please try again.");
    }
  };

  return (
    <div className="flex gap-20 py-16 px-10 max-lg:flex-col max-sm:px-3">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No item in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="w-full flex max-sm:flex-col max-sm:gap-3 hover:bg-grey-1 px-4 py-3 items-center max-sm:items-start justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    width={100}
                    height={100}
                    className="rounded-lg w-32 h-32 object-cover"
                    alt="product"
                  />
                  <div className="flex flex-col gap-3 ml-4">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && <p className="text-small-medium">{cartItem.color}</p>}
                    {cartItem.size && <p className="text-small-medium">{cartItem.size}</p>}
                    <p className="text-small-medium">Rs. {cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <MinusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="hover:text-red-1 cursor-pointer"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="hover:text-red-1 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 max-lg:w-full flex flex-col gap-8 bg-grey-1 rounded-lg px-4 py-5">
        <p className="text-heading4-bold pb-4">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>Rs. {totalRounded}</span>
        </div>
        <button
          className="border rounded-lg text-body-bold bg-white py-3 w-full hover:bg-black hover:text-white"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>

      {showPhonePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-heading4-bold mb-4">Enter Your Phone Number</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border rounded-lg w-full p-2 mb-4"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
              onClick={handlePhoneSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
