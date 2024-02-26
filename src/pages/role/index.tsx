import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
  ProColumns,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer } from 'antd';
import { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { queryRoleList } from '../../services/role/RoleController';
import TableTransfer from './components/TableTransfer';

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
const handleUpdate = async (fields: FormValueType) =>
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

const RolePage = () => {
  // const { data, isLoading, error, refetch } = useFetch("products", {})
  // console.log('data: ', data);
  // console.log('isLoading:console.log(); ', isLoading);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [roleAccessModalVisible, handleRoleAccessModalVisible] = useState<boolean>(false);
  const [roleAccessValues, setRoleAccessValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.UserInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.UserInfo[]>([]);
  const columns: ProColumns<API.UserInfo>[] = [
    {
      title: '权限id',
      dataIndex: 'id',
      tip: 'id是唯一的 key',
      hideInForm: true,
    },
    {
      title: '角色名称',
      dataIndex: 'title',
      valueType: 'text',
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
      title: '角色描述',
      dataIndex: 'description',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updatedAt',
      valueType: 'text',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <button
            onClick={() => {
              handleRoleAccessModalVisible(true);
              setRoleAccessValues(record);
            }}
          >
            授权
          </button>
          <Divider type="vertical" />
          <button
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </button>
          <Divider type="vertical" />
          <button>订阅警报</button>
        </>
      ),
    },
  ];
  return (
    <PageContainer
      header={{
        title: '角色管理',
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
          const { data } = await queryRoleList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            // success,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
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
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="id"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
      {roleAccessValues && Object.keys(roleAccessValues).length ? (
        <TableTransfer
          onSubmit={async (value) => {
            handleRoleAccessModalVisible(false);
            setRoleAccessValues({});
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }}
          onCancel={() => {
            handleRoleAccessModalVisible(false);
            setRoleAccessValues({});
          }}
          updateModalVisible={roleAccessModalVisible}
          values={roleAccessValues}
        />
      ) : null}
      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions<API.UserInfo>
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserInfo>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
}

export default RolePage
