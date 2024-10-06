import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal, Input } from 'antd';

const { Meta } = Card;

const Item = ({ item, refreshStudent, setRefreshStudent, refreshTeacher, setRefreshTeacher }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ name: item.name, surname: item.surname, study: item.study, job: item.job });

  function handleDeleteUser(user) {
    if (user.job) {
      fetch(`http://localhost:3000/teachers/${user.id}`, { method: "DELETE" })
        .then(() => setRefreshTeacher((prev) => !prev))
        .catch((error) => console.error("Error deleting teacher:", error));
    } else {
      fetch(`http://localhost:3000/students/${user.id}`, { method: "DELETE" })
        .then(() => setRefreshStudent((prev) => !prev))
        .catch((error) => console.error("Error deleting student:", error));
    }
    setIsDeleteModalOpen(false);  
  }

  function handleEditUser() {
    const userData = item.job ? { ...editedData, job: editedData.job } : { ...editedData, study: editedData.study };

    fetch(`http://localhost:3000/${item.job ? 'teachers' : 'students'}/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        if (item.job) {
          setRefreshTeacher((prev) => !prev);
        } else {
          setRefreshStudent((prev) => !prev);
        }
      })
      .catch((error) => console.error("Error editing user:", error));

    setIsEditModalOpen(false);  
  }

  const showDeleteModal = () => setIsDeleteModalOpen(true);
  const handleDeleteCancel = () => setIsDeleteModalOpen(false);
  
  const showEditModal = () => {
    setEditedData({ name: item.name, surname: item.surname, study: item.study || '', job: item.job || '' }); // Reset edited data
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => setIsEditModalOpen(false);

  return (
    <>
      <Card
        className='w-72 transform transition duration-300 hover:scale-105 hover:shadow-lg'
        hoverable
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" onClick={showEditModal} className='hover:!text-green-500'/>,
          <DeleteOutlined onClick={showDeleteModal} className='hover:!text-red-500' />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={`${item.name} - ${item.surname}`}
          description={item?.study ? item.study : item.job}
        />
      </Card>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-40 bg-red bg-opacity-50 backdrop-blur-sm transition-all duration-300"></div>
      )}

      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalOpen}
        onOk={() => handleDeleteUser(item)}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
        centered
        maskClosable={true}  
        className="z-50"
      >
        <p>Are you sure you want to delete <b>"{item.name}"</b> card?</p>
      </Modal>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-40 bg-red bg-opacity-50 backdrop-blur-sm transition-all duration-300"></div>
      )}

      <Modal
         title={<div className="text-center text-green-700">Edit User</div>}
        visible={isEditModalOpen}
        onOk={handleEditUser}
        onCancel={handleEditCancel}
        centered
        maskClosable={true} 
        className="z-50"
      >
        <div>
          <label><b>Name:</b></label>
          <Input
            placeholder="Enter First Name"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <label><b>Surname:</b></label>
          <Input
            placeholder="Enter Last Name"
            value={editedData.surname}
            onChange={(e) => setEditedData({ ...editedData, surname: e.target.value })}
          />
        </div>
        <div className="mt-2">
          {item.job ? (
            <>
              <label><b>Job Title:</b></label>
              <Input
                placeholder="Enter Job Title"
                value={editedData.job}
                onChange={(e) => setEditedData({ ...editedData, job: e.target.value })}
              />
            </>
          ) : (
            <>
              <label><b>Study Place:</b></label>
              <Input
                placeholder="Enter Study Place"
                value={editedData.study}
                onChange={(e) => setEditedData({ ...editedData, study: e.target.value })}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Item;
