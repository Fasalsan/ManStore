import React, { useState } from 'react';
import ModalUser from '../components/modal/ModalUser';


function Order() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleCreate = () => {
    setIsEditMode(false);
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEditMode(true);
    setSelectedData(item);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (isEditMode) {
      // Handle update logic here
      console.log('Updated item:', data);
    } else {
      // Handle create logic here
      console.log('Created item:', data);
    }
  };

  return (
    <div>
      <h2>Submit a Category</h2>


      <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded">
        Create Item
      </button>
      <button
        onClick={() => handleEdit({ name: 'John Doe', email: 'john@example.com' })}
        className="px-4 py-2 bg-green-600 text-white rounded ml-2"
      >
        Edit Item
      </button>
      <ModalUser
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedData}
        mode={isEditMode ? 'update' : 'create'}
      />
    </div>
  );
}

export default Order;
