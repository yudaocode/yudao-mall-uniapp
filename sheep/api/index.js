const files = import.meta.globEager('./*.js');
let api = {};
Object.keys(files).forEach((key) => {
  api = {
    ...api,
    [key.replace(/(.*\/)*([^.]+).*/gi, '$2')]: files[key].default,
  };
});

// TODO 芋艿：直接在 useModal 引入 AuthUtil 会报错，所以采用这用这方式先
api.AuthUtil = import.meta.globEager('./member/auth.js')['./member/auth.js'].default;

export default api;