import React, {useEffect, useState} from "react";
import service from "../../appwrite/service";
import {Button, Input, Modal, ProductForm, StockBadge} from "../../components";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | "add" | a product
  const [error, setError] = useState("");

  const loadData = () => {
    service.getProducts().then(setProducts);
    service.getCategories().then(setCategories);
    service.getSuppliers().then(setSuppliers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const nameOf = (list, id) => {
    const item = list.find((x) => x.$id === id);
    return item ? item.name : "-";
  };

  const saveProduct = async (data) => {
    setError("");
    try {
      if (modal === "add") {
        await service.createProduct(data);
      } else {
        await service.updateProduct(modal.$id, data);
      }
      setModal(null);
      loadData();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.name}"?`)) return;
    await service.deleteProduct(product.$id);
    loadData();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="whitespace-nowrap"
          onClick={() => {
            setError("");
            setModal("add");
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.$id} className="border-t border-gray-100">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{nameOf(categories, p.categoryid)}</td>
                <td className="p-3">{nameOf(suppliers, p.supplierid)}</td>
                <td className="p-3">${Number(p.price).toFixed(2)}</td>
                <td className="p-3">
                  <StockBadge stock={p.stock} />
                </td>
                <td className="p-3">
                  <button
                    className="text-blue-600 hover:underline mr-3"
                    onClick={() => {
                      setError("");
                      setModal(p);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteProduct(p)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan="6">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <Modal
          title={modal === "add" ? "Add Product" : "Edit Product"}
          onClose={() => setModal(null)}
        >
          {error && <p className="text-red-600 mb-3">{error}</p>}
          <ProductForm
            product={modal === "add" ? undefined : modal}
            categories={categories}
            suppliers={suppliers}
            onSubmit={saveProduct}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Products;
