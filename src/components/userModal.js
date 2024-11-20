import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';

const UserModal = ({ visible, onClose, user, onSubmit, readOnly = false }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
      console.log(form.getFieldsValue());
      
    }
  }, [user]);

  const handleSubmit = () => {
    if (!readOnly) {
      form.validateFields().then((values) => {
        onSubmit(values);
      }).catch((err)=>console.log(err)
      );
    }
  };

  return (
    <Modal
      title={readOnly ? 'View User' : 'Edit User'}
      open={visible}
      onCancel={onClose}
      onOk={!readOnly ? handleSubmit : onClose}
      okText={readOnly ? 'Close' : 'Submit'}
      cancelButtonProps={{ style: { display: readOnly ? 'none' : 'inline' } }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name">
          <Input disabled={readOnly} />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled={readOnly} />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input disabled={readOnly} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
