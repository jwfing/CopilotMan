<template>
  <form @submit.prevent="submitForm">
    <input v-model="corporateEmail" type="email" placeholder="企业邮箱" required>
    <button type="submit">移除用户</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      corporateEmail: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/remove', {
          corporateEmail: this.corporateEmail,
        });
        alert(response.data.message);
      } catch (error) {
        alert('移除失败: ' + error.response.data.message);
      }
    },
  },
};
</script>