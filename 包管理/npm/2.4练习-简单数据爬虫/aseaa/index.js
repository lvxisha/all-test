var axiosReq = require('axios');

async function test(){
   const resp = await axiosReq.get('https://movie.douban.com/chart');
   const body = resp.data;
   console.log(body);
}
test();