import Cookies from 'js-cookie';

const TokenKey = localStorage.getItem('token');

// 读取
function geToken() {
  return Cookies.get(localStorage.getItem('token'));
}

// 存下token值
function setToken() {
  return Cookies.set(TokenKey);
}

// 移除
function removeToken() {
  return Cookies.remove(TokenKey);
}

export default {
  geToken,
  setToken,
  removeToken,
};
