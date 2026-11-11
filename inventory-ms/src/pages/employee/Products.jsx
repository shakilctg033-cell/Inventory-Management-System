import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import service from "../../appwrite/service";
import {Button, Input, Select} from "../../components";

function Products() {
  const userData = useSelector((state) => state.auth.userData);
  const profile = useSelector((state) => state.auth.profile);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");

  const loadData = () => {
    service.getProducts().then(setProducts);
    service.getCategories().then(setCategories);
  };

  useEffect(() => {
    loadData();
  }, []);

  const categoryName = (id) => {
    const category = categories.find((c) => c.$id === id);
    return category ? category.name : "-";
  };

  const categoryOptions = categories.map((c) => ({value: c.$id, label: c.name}));

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (categoryId === "" || p.categoryid === categoryId),
  );

  const orderProduct = async (product) => {
    setError("");
    try {
      await service.placeOrder({
        product,
        userid: userData.$id,
        username: profile.name,
      });
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex justify-between gap-4 mb-6">
        <div className="w-1/2">
          <Select
            placeholder="Select Category"
            options={categoryOptions}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />
        </div>
        <div className="w-1/3">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, index) => (
              <tr key={p.$id} className="border-t border-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{categoryName(p.categoryid)}</td>
                <td className="p-3">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <Button
                    bgColor="bg-green-500"
                    className="py-1"
                    disabled={p.stock === 0}
                    onClick={() => orderProduct(p)}
                  >
                    Order
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
