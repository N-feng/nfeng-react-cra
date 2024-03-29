import { notification } from 'antd';

export const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface error {
  name: string;
  data: any;
  type: string;
  response: {
    status: number;
    statusText: string;
    data: {
      code: number;
      msg: string;
      message: string[];
    }
  };
  config: {
    url: string;
  }
}

/**
 * 响应处理程序
 */
const responseHandler = (data: any) => {
  if (data.code !== 200) {
    notification.error({
      message: `请求错误 ${data.code}`,
      description: data.msg,
    });
  }
}

/**
 * 异常处理程序
 */
const errorHandler = (error: error) => {
  console.log('error: ', error);
  if (error.name === 'BizError') {
    notification.error({
      message: `请求错误 ${error.data.code}`,
      description: error.data.msg,
    });
    return error.data.code;
  }
  const { response } = error;
  // const errortext = codeMessage[response.status] || response.statusText;
  const { status } = response;
  if (status === 401) {
    notification.error({
      message: error.response.data.msg || '登录令牌过期',
      description: '请重新登录哦！',
    });
    // return window.location.href = '/login';
  }
  const { url } = error.config;
  const { data } = error.response;
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    // description: errortext,
    description: data.message || data.message?.[0] || data.msg,
  });
};

export {
  responseHandler,
  errorHandler
};
