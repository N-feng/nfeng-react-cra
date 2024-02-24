import { ProLayout } from '@ant-design/pro-layout';
import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from '../routes';
import { notification } from 'antd';

export default function Layout() {
  const location = useLocation();
  const [pathname, setPathname] = useState('/welcome');
  const token = localStorage.getItem('token');
  if (!token) {
    notification.error({
      message: '登录令牌为空',
      description: '请重新登录哦！',
    });
    return <Navigate to="/login" replace />
  }
  if (location.pathname === '/login') {
    return <><Outlet /></>
  }
  return (
    <ProLayout
      route={routes}
      location={{pathname}}
      title="Umi x Ant Design"
      menuItemRender={(item, dom) => (
        <button onClick={() => { setPathname(item.path || '/welcome'); }}>
          {dom}
        </button>
      )}
    >
      <Outlet />
    </ProLayout>
  );
}
