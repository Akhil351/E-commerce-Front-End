import { useEffect, useState } from "react";
import UserProfileContext from "../context/UserContext";
import { getOrdersApi } from "../service/BackEnd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const DUMMY_ORDERS = [
  {
    orderId: "",
    orderDate: "",
    status: "",
    totalAmount: 0,
    orderItems: [],
  },
];

function Orders() {
  const [orders,setOrders] = useState(DUMMY_ORDERS);
  const { token } = UserProfileContext();
  const navigator = useNavigate();
  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await getOrdersApi(token);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("An unexpected error occurred while loading orders");
      }
    }
    if (token === "") {
      toast.error("need to sign in to view orders");
      navigator("/login");
    } else {
      loadOrders();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Order #{order.orderId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="border-t pt-4">
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div>
                      <p className="font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
