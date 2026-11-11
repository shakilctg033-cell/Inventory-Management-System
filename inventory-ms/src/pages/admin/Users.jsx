import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import authService from "../../appwrite/auth";
import service from "../../appwrite/service";
import {Button, Input, Select} from "../../components";

const roleOptions = [
  {value: "admin", label: "admin"},
  {value: "user", label: "user"},
];

function Users() {
  const me = useSelector((state) => state.auth.userData);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const {register, handleSubmit, reset} = useForm();

  const loadUsers = () => {
    service.getProfiles().then(setUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // step 1: create the login in Appwrite Auth, step 2: save name/role in the table
  const addUser = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      await service.createProfile(account.$id, {
        name: data.name,
        email: data.email,
        address: data.address,
        role: data.role,
      });

      reset();
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  // this removes the profile row, so the person can no longer enter the app
  const deleteUser = async (user) => {
    if (!window.confirm(`Delete "${user.name}"?`)) return;
    await service.deleteProfile(user.$id);
    loadUsers();
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users Management</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="bg-white rounded-lg shadow p-6 w-full lg:w-96 shrink-0">
          <h2 className="text-xl font-bold mb-4">Add New User</h2>
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={handleSubmit(addUser)} className="space-y-4">
            <Input
              label="User Name"
              placeholder="Enter Name"
              required
              {...register("name")}
            />
            <Input
              label="User Email"
              type="email"
              placeholder="Enter Email"
              required
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              required
              minLength={8}
              {...register("password")}
            />
            <Input
              label="User Address"
              placeholder="Enter Address"
              {...register("address")}
            />
            <Select
              placeholder="Select Role"
              options={roleOptions}
              required
              {...register("role")}
            />
            <Button type="submit" className="w-full py-3">
              Add User
            </Button>
          </form>
        </div>

        <div className="w-full">
          <Input
            className="mb-4"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, index) => (
                  <tr key={u.$id} className="border-t border-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{u.name}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.role}</td>
                    <td className="p-3">
                      {u.$id !== me.$id && (
                        <button
                          className="text-red-600 font-semibold hover:underline"
                          onClick={() => deleteUser(u)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
