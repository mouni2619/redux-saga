import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserRequest } from './redux/userSlice';
import UserTable from './components/userTable'; 
import UserModal from './components/userModal';

const App = () => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleView = (user) => {
    setCurrentUser(user);
    setIsReadOnly(true);
    setIsModalVisible(true);
  };
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsReadOnly(false);
    setIsModalVisible(true);
  };
  const handleSubmit = (updatedUser) => {
    const userWithId = { ...currentUser, ...updatedUser }; 
    dispatch(updateUserRequest(userWithId));
    setIsModalVisible(false);
  };
  return (
    <div>
      <UserTable onView={handleView} onEdit={handleEdit} />
      <UserModal
        visible={isModalVisible}
        user={currentUser}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        readOnly={isReadOnly}
      />
    </div>
  );
};

export default App;
