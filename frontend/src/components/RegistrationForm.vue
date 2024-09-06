<template>
  <form @submit.prevent="submitForm">
    <input v-model="corporateEmail" type="email" placeholder="企业邮箱" required>
    <input v-model="githubUsername" type="text" placeholder="GitHub用户名" required>
    <input v-model="githubEmail" type="email" placeholder="GitHub邮箱" required>
    <button type="submit">提交申请</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      corporateEmail: '',
      githubUsername: '',
      githubEmail: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/register', {
          corporateEmail: this.corporateEmail,
          githubUsername: this.githubUsername,
          githubEmail: this.githubEmail,
        });
        alert(response.data.message);
      } catch (error) {
        alert('注册失败: ' + error.response.data.message);
      }
    },
  },
};
</script>