const files = import.meta.glob('./*.js', { eager: true });
let api = {};
Object.keys(files).forEach((key) => {
  api = {
    ...api,
    [key.replace(/(.*\/)*([^.]+).*/gi, '$2')]: files[key].default,
  };
});

export default api;