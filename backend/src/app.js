require('dotenv').config();

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const sequelize = require('./config/database');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
sequelize.authenticate()
  .then(() => console.log('已连接到MySQL数据库'))
  .catch(err => console.error('连接MySQL数据库失败:', err));

// 同步模型到数据库
sequelize.sync()
  .then(() => console.log('数据库模型已同步'))
  .catch(err => console.error('数据库模型同步失败:', err));

// 路由
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`服务器运行在端口 ${PORT}`));