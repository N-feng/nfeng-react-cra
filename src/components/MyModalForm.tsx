import { ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export interface FormValueType extends Partial<any> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
};

interface ModalFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  modalVisible: boolean;
  values?: Partial<any>;
  columns: any[];
  type?: string;
}

const MyModalForm: React.FC<ModalFormProps> = (props) => {
  const { onCancel, onSubmit, modalVisible, values, columns, type = 'create' } = props;

  return (
    <Modal
      destroyOnClose
      title={type==='create' ? '新建' : '编辑'}
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      // footer={null}
      onOk={() => onSubmit(values || {})}
    >
      <ProTable 
        onSubmit={onSubmit}
        rowKey="id"
        type="form"
        columns={columns}
        form={{
          initialValues: values,
          submitter: {
            // 配置按钮的属性
            resetButtonProps: {
              style: {
                // 隐藏重置按钮
                display: 'none',
              },
            },
            // 完全自定义整个区域
            render: (props, doms) => {
              // console.log(props);
              return [];
            },
          },
        }}
      />
    </Modal>
  );
};

export { MyModalForm };
