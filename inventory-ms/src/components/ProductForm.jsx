import React from "react";
import {useForm} from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

// used for both "Add Product" and "Edit Product" (product = undefined for add)
function ProductForm({product, categories, suppliers, onSubmit, onCancel}) {
  const {register, handleSubmit} = useForm({
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price ?? "",
      stock: product?.stock ?? "",
      categoryid: product?.categoryid || "",
      supplierid: product?.supplierid || "",
    },
  });

  const categoryOptions = categories.map((c) => ({value: c.$id, label: c.name}));
  const supplierOptions = suppliers.map((s) => ({value: s.$id, label: s.name}));

  const submit = (data) => {
    // inputs give strings, Appwrite wants numbers for price and stock
    onSubmit({...data, price: Number(data.price), stock: Number(data.stock)});
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-4">
      <Input label="Name" placeholder="Product name" required {...register("name")} />

      <div className="w-full">
        <label className="inline-block mb-1 pl-1 font-medium">Description</label>
        <textarea
          rows="3"
          className="px-3 py-2 rounded-lg bg-white text-black outline-none
            focus:border-blue-500 border border-gray-300 w-full"
          {...register("description")}
        />
      </div>

      <Input
        label="Price"
        type="number"
        step="0.01"
        min="0"
        required
        {...register("price")}
      />
      <Input label="Stock" type="number" min="0" required {...register("stock")} />

      <Select
        label="Category"
        placeholder="Select Category"
        options={categoryOptions}
        required
        {...register("categoryid")}
      />
      <Select
        label="Supplier"
        placeholder="Select Supplier"
        options={supplierOptions}
        required
        {...register("supplierid")}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button bgColor="bg-gray-200" textColor="text-black" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{product ? "Update Product" : "Add Product"}</Button>
      </div>
    </form>
  );
}

export default ProductForm;
