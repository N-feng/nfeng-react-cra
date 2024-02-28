import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { MyModalForm } from '../../components/MyModalForm';
import { queryUserList } from '../../services/user/UserController';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.UserInfo) =>
  new Promise<any>((resolve, reject) => {
  setTimeout(() => {
    resolve(true);
  }, 2000);
  // reject('error');
});

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: API.UserInfo) =>
new Promise<any>((resolve, reject) => {
setTimeout(() => {
  resolve(true);
}, 2000);
// reject('error');
});

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = (params: any) => 
new Promise<any>((resolve, reject) => {
setTimeout(() => {
  resolve(true);
}, 2000);
// reject('error');
});

const UserPage = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  // const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);
  const columns: ProColumns<API.UserInfo>[] = [
    {
      title: '用户名称',
      dataIndex: 'username',
      tip: '名称是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '用户密码',
      dataIndex: 'password',
      valueType: 'text',
      hideInForm: true,
      search: false,
    },
    {
      title: '用户电话',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    // {
    //   title: '用户角色',
    //   dataIndex: 'roles',
    //   hideInForm: true,
    //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //     if (type === 'form') {
    //       return null;
    //     }
    //     const stateType = form.getFieldValue('state');
    //     if (stateType === 3) {
    //       return <Input />;
    //     }
    //     if (stateType === 4) {
    //       return null;
    //     }
    //     return (
    //       <MySelect
    //         {...rest}
    //       />
    //     );
    //   },
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type='link'
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            编辑
          </Button>
          <TableDropdown
            key="more"
            onSelect={async (key) => {
              if (key === 'delete') {
                await handleRemove([record])
                actionRef.current?.reloadAndRest?.();
              }
            }}
            menus={[
              { key: 'delete', name: '删除' },
            ]}
          />
        </>
      ),
    },
  ];
  return (
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          return await queryUserList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
        }}
        columns={columns}
        // rowSelection={{
        //   onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        // }}
      />
      {/* {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <button style={{ fontWeight: 600 }}>{selectedRowsState.length}</button>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )} */}
      <MyModalForm
        onSubmit={async (value: any) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        columns={columns}
      />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <MyModalForm
          onSubmit={async (value: any) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setUpdateFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          values={updateFormValues}
          modalVisible={updateModalVisible}
          columns={columns}
        />
      ) : null}
    </PageContainer>
  );
}

export default UserPage
