import React, { useState } from "react";
import { User } from "../../../types/type";
import { fetchPost } from "../../../utils/fetchers";
import Loader from "../../loader";

interface CreateUserProps {
  onCreate: () => void;
  onClose: () => void;
}

export default function CreateUser({ onCreate, onClose }: CreateUserProps) {
  const [formData, setFormData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await fetchPost("UserAPI", "/user", JSON.parse(JSON.stringify(formData)));
    onCreate();
    onClose();
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Create User</h2>
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
          {loading ? <Loader className="w-6 h-6" /> : <span>Create</span>}
        </button>
      </form>
    </div>
  );
}
