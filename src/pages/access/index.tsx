import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Input, message } from 'antd';
import { useRef, useState } from 'react';
import { deleteAccess, queryAccessList } from '../../services/access/AccessController';
import { MyModalForm } from '../../components/MyModalForm';
import { MySelect } from '../../components/MySelect';

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
const handleUpdate = async (fields: API.AccessInfo) =>
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
const handleRemove = async (selectedRows: API.AccessInfo[]) => {
  console.log('selectedRows: ', selectedRows);
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteAccess({
      id: selectedRows.find((row) => row.id)?.id || '',
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const AccessPage = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<API.UserInfo>[] = [
    {
      title: '权限id',
      dataIndex: 'id',
      tip: 'id是唯一的 key',
      hideInForm: true,
      search: false,
    },
    {
      title: '模版名称',
      dataIndex: 'moduleName',
      valueType: 'text',
    },
    {
      title: '节点类型',
      dataIndex: 'type',
      valueEnum: {
        1: { text: '模块', status: '1' },
        2: { text: '菜单', status: '2' },
        3: { text: '操作', status: '3' },
      },
      renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
        if (type === 'form') {
          return null;
        }
        const stateType = form.getFieldValue('state');
        if (stateType === 3) {
          return <Input />;
        }
        if (stateType === 4) {
          return null;
        }
        return (
          <MySelect
            {...rest}
          />
        );
      },
    },
    {
      title: '操作名称',
      dataIndex: 'actionName',
      valueType: 'text',
    },
    {
      title: '跳转地址',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '模块id',
      dataIndex: 'moduleId',
      valueType: 'text',
    },
    {
      title: '排序',
      dataIndex: 'status',
      valueType: 'text',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
    },
    {
      title: '增加时间',
      dataIndex: 'createdAt',
      valueType: 'text',
      search: false,
    },
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
              // { key: 'copy', name: '复制' },
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
        title: '权限管理',
      }}
    >
      <ProTable<API.AccessInfo>
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
          return await queryAccessList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
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
          modalVisible={updateModalVisible}
          columns={columns}
          values={updateFormValues}
        />
      ) : null}
    </PageContainer>
  );
}

export default AccessPage
