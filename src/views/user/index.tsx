import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Icon from "../../components/icons";
import { User } from "../../types/type";
import Modal from "../../components/modal";
import CreateUser from "../../components/modal/user/create";
import DeleteUser from "../../components/modal/user/delete";
import UpdateUser from "../../components/modal/user/update";
import { fetchGet } from "../../utils/fetchers";

export default function UserList() {
  const [userList, setUserList] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserList = async () => {
    await fetchGet("UserAPI", "/user").then((data) =>
      setUserList(data as unknown as User[])
    );
    setLoading(false);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <section className="flex items-center justify-center h-screen w-full bg-gray-100 p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-scroll rounded-lg border border-gray-200 shadow-lg m-5 w-3/4">
          <span className="text-3xl font-sans font-bold p-4 float-left text-gray-500 opacity-50">
            User List
          </span>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gray-500 text-white  w-12 h-12 rounded m-4 text-lg float-end hover:opacity-75"
          >
            +
          </button>

          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  ID
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  First Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Email
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Mobile Number
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {userList.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.firstName}</td>
                  <td className="px-6 py-4">{user.lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.mobileNumber}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <span
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUpdateModal(true);
                        }}
                      >
                        <Icon icon="edit" />
                      </span>
                      <span
                        className="cursor-pointer hover:opacity-75"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Icon icon="delete" />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateModal && (
        <Modal show={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <CreateUser
            onCreate={getUserList}
            onClose={() => setShowCreateModal(false)}
          />
        </Modal>
      )}

      {showDeleteModal && selectedUser && (
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
          <DeleteUser
            user={selectedUser}
            onDelete={getUserList}
            onClose={() => setShowDeleteModal(false)}
          />
        </Modal>
      )}

      {showUpdateModal && selectedUser && (
        <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
          <UpdateUser
            user={selectedUser}
            onUpdate={getUserList}
            onClose={() => setShowUpdateModal(false)}
          />
        </Modal>
      )}
    </section>
  );
}
