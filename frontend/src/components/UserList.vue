<template>
  <div>
    <h2>用户列表</h2>
    <table>
      <thead>
        <tr>
          <th>企业邮箱</th>
          <th>GitHub 用户名</th>
          <th>GitHub 邮箱</th>
          <th>邀请状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.corporateEmail }}</td>
          <td>{{ user.githubUsername }}</td>
          <td>{{ user.githubEmail }}</td>
          <td>{{ user.isInvited ? '已邀请' : '未邀请' }}</td>
          <td>
            <button v-if="!user.isInvited" @click="reinviteUser(user.id)">再次邀请</button>
            <button @click="deleteUser(user.id)">删除记录</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">上一页</button>
      <span>第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      currentPage: 1,
      totalPages: 1,
      limit: 10
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`http://localhost:3000/api/users?page=${this.currentPage}&limit=${this.limit}`);
        this.users = response.data.users;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      } catch (error) {
        console.error('获取用户列表失败:', error);
      }
    },
    async reinviteUser(userId) {
      try {
        await axios.post(`http://localhost:3000/api/users/${userId}/reinvite`);
        await this.fetchUsers(); // 重新加载用户列表以更新状态
      } catch (error) {
        console.error('重新邀请用户失败:', error);
      }
    },
    async deleteUser(userId) {
      if (confirm('确定要删除这条记录吗？')) {
        try {
          await axios.delete(`http://localhost:3000/api/users/${userId}`);
          alert('用户记录已删除');
          this.fetchUsers(); // 刷新用户列表
        } catch (error) {
          console.error('删除用户记录失败:', error);
          alert('删除用户记录失败');
        }
      }
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchUsers();
    }
  },

};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination button {
  margin: 0 10px;
}
</style>