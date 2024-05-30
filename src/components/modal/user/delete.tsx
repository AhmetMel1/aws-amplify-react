import React, { useState } from "react";
import { User } from "../../../types/type";
import Loader from "../../loader";
import { fetchDelete } from "../../../utils/fetchers";

interface DeleteUserProps {
  user: User;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteUser({
  user,
  onDelete,
  onClose,
}: DeleteUserProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetchDelete("UserAPI", `/user/${user.id}`);
    onDelete();
    setLoading(false);
    onClose();
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Delete User</h2>
      <p>
        Are you sure you want to delete {user.firstName} {user.lastName}?
      </p>
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-gray-300 text-black p-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? <Loader className="w-6 h-6" /> : <span>Delete</span>}
        </button>
      </div>
    </div>
  );
}
