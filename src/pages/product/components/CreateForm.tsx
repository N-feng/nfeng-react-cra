import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';
import EditorComponent from '../../../components/EditorComponent';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

export const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="新建"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

const ProductCreate = () => {
  return (
    <EditorComponent />
  )
}

export default ProductCreate;
