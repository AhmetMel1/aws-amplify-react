// components/UpdateUser.js
import React, { useState } from "react";
import { User } from "../../../types/type";
import { fetchPut } from "../../../utils/fetchers";
import Loader from "../../loader";

interface UpdateUserProps {
  user: User;
  onUpdate: () => void;
  onClose: () => void;
}

export default function UpdateUser({
  user,
  onUpdate,
  onClose,
}: UpdateUserProps) {
  const [formData, setFormData] = useState<User>(user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await fetchPut("UserAPI", "/user", JSON.parse(JSON.stringify(formData)));

    onUpdate();
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg font-bold mb-4">Update User</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="mobileNumber"
        placeholder="Mobile Number"
        value={formData.mobileNumber}
        onChange={handleChange}
        className="w-full mb-2 p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-gray-500 text-white rounded"
        disabled={loading}
      >
        {loading ? <Loader className="w-6 h-6" /> : <span>Update</span>}
      </button>
    </form>
  );
}
