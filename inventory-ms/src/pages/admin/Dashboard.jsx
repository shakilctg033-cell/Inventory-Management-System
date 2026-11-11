import React, {useEffect, useState} from "react";
import service from "../../appwrite/service";
import {StatCard} from "../../components";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    service.getProducts().then(setProducts);
    service.getCategories().then(setCategories);
    service.getOrders().then(setOrders);
  }, []);

  const categoryName = (id) => {
    const category = categories.find((c) => c.$id === id);
    return category ? category.name : "-";
  };

  // ----- numbers for the 4 coloured boxes -----
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const today = new Date().toDateString();
  const ordersToday = orders.filter(
    (o) => new Date(o.$createdAt).toDateString() === today,
  ).length;
  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

  // ----- lists in the 3 white cards -----
  const outOfStock = products.filter((p) => p.stock === 0);
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);

  // highest sale = the product with the most units sold in orders
  const sold = {};
  orders.forEach((o) => {
    sold[o.productid] = (sold[o.productid] || 0) + o.quantity;
  });
  let highest = null;
  products.forEach((p) => {
    const units = sold[p.$id] || 0;
    if (units > 0 && (!highest || units > highest.units)) {
      highest = {...p, units};
    }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Products" value={products.length} color="bg-blue-500" />
        <StatCard title="Total Stock" value={totalStock} color="bg-green-500" />
        <StatCard title="Order Today" value={ordersToday} color="bg-yellow-500" />
        <StatCard
          title="Revenue"
          value={`$${revenue.toFixed(2)}`}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-3">Out of Stock Products</h2>
          {outOfStock.length === 0 && <p className="text-gray-500">None</p>}
          {outOfStock.map((p) => (
            <p key={p.$id} className="text-gray-700">
              {p.name}{" "}
              <span className="text-gray-400">({categoryName(p.categoryid)})</span>
            </p>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-3">Highest Sale Product</h2>
          {!highest && <p className="text-gray-500">No sales yet</p>}
          {highest && (
            <div className="text-gray-700">
              <p>
                <span className="font-bold">Name:</span> {highest.name}
              </p>
              <p>
                <span className="font-bold">Category:</span>{" "}
                {categoryName(highest.categoryid)}
              </p>
              <p>
                <span className="font-bold">Total Units Sold:</span> {highest.units}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-3">Low Stock Products</h2>
          {lowStock.length === 0 && <p className="text-gray-500">None</p>}
          {lowStock.map((p) => (
            <p key={p.$id} className="text-gray-700">
              <span className="font-bold">{p.name}</span> - {p.stock} left{" "}
              <span className="text-gray-400">({categoryName(p.categoryid)})</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
