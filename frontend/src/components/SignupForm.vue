<template>
                      <!-- onSubmit -->
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="title">Sign Up</h2>

    <div class="form-group">
      <label>Name</label>
                        <!-- v-model is a two-way binding shortcut. -->
      <input type="text" v-model="name" required />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" v-model="email" required />
    </div>

    <div class="form-group">
      <label>Password</label>
      <div class="password-wrapper">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" required minlength="6" />
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
    </div>

    <button type="submit">Sign Up</button>

    <p class="link">
      Already signed up?
      <router-link to="/login">Login here</router-link>
    </p>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false
    }
  },
  methods: {
    ...mapActions(['registerUser']),
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    async handleSubmit() {
      try {
        await this.registerUser({ name: this.name, email: this.email, password: this.password })
        this.$router.push('/login')
      } catch (err) {
        alert(err.response?.data?.message || 'Registration failed')
      }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.password-wrapper {
  display: flex;
  align-items: center;
}

.password-wrapper input {
  flex: 1;
}

.toggle {
  margin-left: 0.5rem;
  cursor: pointer;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.link {
  text-align: center;
  font-size: 0.9rem;
}

.link a {
  color: #3b82f6;
  text-decoration: none;
}
</style>
