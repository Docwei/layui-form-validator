const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));


app.listen(port,() => {
  console.log(`服务已启动,访问地址 http://localhost:${port}/`);
})