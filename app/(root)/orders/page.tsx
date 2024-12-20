// This component will now be a Server Component (i.e., server-side only code)
import { getOrders } from "@/lib/actions/actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

const Orders = async () => {
  const { userId } = auth();
  const orders = await getOrders(userId as string);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your Orders</p>

      {(!orders || orders.length === 0) && (
        <p className="text-body-bold my-5">You have no orders yet.</p>
      )}

      <div className="flex flex-col gap-10">
        {orders?.map((order: OrderType) => (
          <div key={order._id} className="flex flex-col gap-8 p-4 hover:bg-grey-1 border rounded-lg">
            <div className="flex flex-col gap-3">
              <p className="text-base-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: <span className="text-small-bold">₹{order.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-base-bold">
                Status: <span className={`capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
              </p>
              {order.phoneNumber && (
                <p className="text-base-bold">
                  Phone Number: <span className="text-small-bold">{order.phoneNumber}</span>
                </p>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {order.items.map((orderItem: OrderItemType) => (
                <div key={orderItem.product._id} className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title:{" "}
                      <span className="text-small-bold">
                        {orderItem.product.title}
                      </span>
                    </p>
                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color:{" "}
                        <span className="text-small-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}
                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:{" "}
                        <span className="text-small-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}
                    <p className="text-small-medium">
                      Unit Price:{" "}
                      <span className="text-small-bold">₹{orderItem.product.price.toFixed(2)}</span>
                    </p>
                    <p className="text-small-medium">
                      Quantity:{" "}
                      <span className="text-small-bold">{orderItem.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "accepted":
      return "text-green-500";
    case "rejected":
      return "text-red-500";
    case "shipped":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export default Orders;
