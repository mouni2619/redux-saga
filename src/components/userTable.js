import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Spin } from 'antd';
import { fetchUsersRequest, deleteUserRequest } from '../redux/userSlice';

const UserTable = ({ onView, onEdit }) => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest()); 
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUserRequest(id));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Actions',
      render: (_, record) => (
        <>
          <Button onClick={() => onView(record)}>View</Button>
          <Button onClick={() => onEdit(record)} style={{ marginLeft: '8px' }}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: '8px' }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin />;

  return <Table dataSource={data} columns={columns} rowKey="id" />;
};

export default UserTable;
