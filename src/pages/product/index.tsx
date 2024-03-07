import {
  ActionType,
  PageContainer,
  ProTable,
  ProColumns,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, message, Image } from 'antd';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteProduct, queryProductList } from '../../api/ProductController';


/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
  console.log('selectedRows: ', selectedRows);
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteProduct({
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

const ProductPage = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<any>[] = [
    {
      title: '权限id',
      dataIndex: 'id',
      tip: 'id是唯一的 key',
      search: false,
      fieldProps: {
        disabled: true,
      }
    },
    {
      title: '菜品名称',
      dataIndex: 'title',
      valueType: 'text',
    },
    // {
    //   title: '菜品分类',
    //   dataIndex: 'moduleName',
    //   valueType: 'text',
    // },
    {
      title: '菜品图片',
      dataIndex: 'image',
      key: 'image',
      valueType: 'image',
      render: (_, row) => {
        // console.log(row)
        return row.img_url.map((el: any) => (
          <Image
            width={80}
            src={el.url}
            style={{
              marginRight: "10px"
            }}
          />
        ))
      },
    },

    // {
    //   title: '增加时间',
    //   dataIndex: 'createdAt',
    //   valueType: 'text',
    //   hideInForm: true,
    //   search: false,
    // },
    // {
    //   title: '推荐',
    //   dataIndex: 'moduleName',
    //   valueType: 'text',
    // },
    // {
    //   title: '节点类型',
    //   dataIndex: 'type',
    //   // valueEnum: {
    //   //   1: { text: '模块', status: '1' },
    //   //   2: { text: '菜单', status: '2' },
    //   //   3: { text: '操作', status: '3' },
    //   // },
    //   valueType: 'select',
    //   fieldProps: {
    //     options: [
    //       { label: '模块', value: 1 },
    //       { label: '菜单', value: 2 },
    //       { label: '操作', value: 3 },
    //     ]
    //   },
    //   renderFormItem: (item, { type, defaultRender, ...rest }, form) => {
    //     // console.log('rest: ', rest);
    //     // if (type === 'form') {
    //     //   return null;
    //     // }
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
    // {
    //   title: '模块id',
    //   dataIndex: 'moduleId',
    //   valueType: 'text',
    // },
    // {
    //   title: '排序',
    //   dataIndex: 'sort',
    //   valueType: 'text',
    //   search: false,
    // },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   valueType: 'text',
    //   search: false,
    // },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <NavLink to={`/product/update/${record.id}`}>
            <Button
              type='link'
              onClick={() => {
                // handleUpdateModalVisible(true);
                // setStepFormValues(record);
              }}
            >
              编辑
            </Button>
          </NavLink>
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
      <ProTable<any>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button
          //   key="1"
          //   type="primary"
          //   onClick={() => handleModalVisible(true)}
          // >
          //   新建
          // </Button>,
          <NavLink to={`/product/create`}>
            <Button
              key="1"
              type="primary"
              // onClick={() => handleModalVisible(true)}
            >
              新建
            </Button>
          </NavLink>
        ]}
        request={async (params, sorter, filter) => {
          const { data } = await queryProductList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
            console.log('data: ', data);
          return {
            data: data?.list || [],
            // success,
          };
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </PageContainer>
  );
}

export default ProductPage
