

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports =async function(app) {

  try{


  
  app.use(
    '/api',   //---> as http://localhost:5000/...  ------>>>  await axios.post(`/user/login`, {...user})
    createProxyMiddleware({
      target: 'http://localhost:5000/',
      changeOrigin: true,
    })
  );
  }catch(err){
    console.log(err)
  }
};