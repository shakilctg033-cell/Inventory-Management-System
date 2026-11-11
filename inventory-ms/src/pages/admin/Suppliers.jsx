import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import service from "../../appwrite/service";
import {Button, Input} from "../../components";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState("");
  const {register, handleSubmit, reset} = useForm();

  const loadSuppliers = () => {
    service.getSuppliers().then(setSuppliers);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const addSupplier = async (data) => {
    setError("");
    try {
      await service.createSupplier({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
      reset();
      loadSuppliers();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSupplier = async (supplier) => {
    if (!window.confirm(`Delete "${supplier.name}"?`)) return;
    await service.deleteSupplier(supplier.$id);
    loadSuppliers();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Suppliers Management</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-white rounded-lg shadow p-6 w-full lg:w-96 shrink-0">
          <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit(addSupplier)} className="space-y-4">
            <Input
              label="Supplier Name"
              placeholder="Enter Name"
              required
              {...register("name")}
            />
            <Input
              label="Supplier Email"
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <Input
              label="Supplier Phone"
              placeholder="Enter Phone"
              {...register("phone")}
            />
            <Input
              label="Supplier Address"
              placeholder="Enter Address"
              {...register("address")}
            />
            <Button type="submit" className="w-full py-3">
              Add Supplier
            </Button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto w-full">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s, index) => (
                <tr key={s.$id} className="border-t border-gray-100">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => deleteSupplier(s)}
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
    </div>
  );
}

export default Suppliers;
