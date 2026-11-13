import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import service from "../appwrite/service";

function Orders() {
  const userData = useSelector((state) => state.auth.userData);
  const profile = useSelector((state) => state.auth.profile);
  const isAdmin = profile.role === "admin";
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const request = isAdmin
      ? service.getOrders()
      : service.getOrdersByUser(userData.$id);
    request.then(setOrders);
  }, [isAdmin, userData.$id]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Total</th>
              {isAdmin && <th className="p-3">Ordered By</th>}
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.$id} className="border-t border-gray-100">
                <td className="p-3">{order.productname}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">${Number(order.total).toFixed(2)}</td>
                {isAdmin && <td className="p-3">{order.username}</td>}
                <td className="p-3">
                  {new Date(order.$createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan="5">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
