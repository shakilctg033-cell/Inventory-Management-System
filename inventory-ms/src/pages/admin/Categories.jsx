import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import service from "../../appwrite/service";
import {Button, Input} from "../../components";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const {register, handleSubmit, reset} = useForm();

  const loadCategories = () => {
    service.getCategories().then(setCategories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (data) => {
    setError("");
    try {
      await service.createCategory({name: data.name});
      reset();
      loadCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCategory = async (category) => {
    if (!window.confirm(`Delete "${category.name}"?`)) return;
    await service.deleteCategory(category.$id);
    loadCategories();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit(addCategory)} className="flex gap-4 mb-6">
        <Input placeholder="Enter category name" required {...register("name")} />
        <Button type="submit" className="whitespace-nowrap">
          Add Category
        </Button>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c, index) => (
              <tr key={c.$id} className="border-t border-gray-100">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteCategory(c)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categories;
