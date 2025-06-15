<template>
                      <!-- onSubmit -->
  <form class="form" @submit.prevent="handleSubmit">
    <h2 class="title">Sign Up</h2>

    <div class="form-group">
      <label>Name*</label>
                        <!-- v-model is a two-way binding shortcut. -->
      <input type="text" v-model="name" required />
      <p class="error" v-if="errors.name">{{ errors.name }}</p>
    </div>

    <div class="form-group">
      <label>Email*</label>
      <input type="email" v-model="email" required />
      <p class="error" v-if="errors.email">{{ errors.email }}</p>
    </div>

    <div class="form-group">
      <label>Password*</label>
      <div class="password-wrapper">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" required minlength="6" />
        <span class="toggle" @click="togglePassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
      <p class="error" v-if="errors.password">{{ errors.password }}</p>
    </div>
    <!-- disable the button if loading is true and change the text on the button to Signing up...-->
    <button
      type="submit"
      :disabled="loading"
      @click="handleSubmit"
      class="submit-button"
    >
      <span v-if="loading">Signing up...</span>
      <span v-else>Sign Up</span>
    </button>

    <p class="link">
      Already signed up?
      <router-link to="/login">Login here</router-link>
    </p>
  </form>
  <!-- error msg from auth.js modules(global error state) -->
  <div v-if="error" class="error-message">{{ error }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SignupForm',
  data() {
    //local state to hold form data
    return {
      name: '',
      email: '',
      password: '',
      showPassword: false,
      errors: {} //local state to hold validation errors
    }
  },
  computed: {
    ...mapGetters('auth', ['loading', 'error'])
  },
  methods: {
    ...mapActions('auth', ['register']),

    validateForm() {
      this.errors = {};

      //validation on name field
      if (!this.name) {
        this.errors.name = 'Name is required.';
      } else if (!/^[A-Za-z\s]+$/.test(this.name)) {
        this.errors.name = 'Only alphabets are allowed.';
      }

      //validation on email field
      if (!this.email) {
        this.errors.email = 'Email is required.';
      } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      ) {
        this.errors.email = 'Please enter a valid email address.';
      }

      //validation on password field
      if (!this.password) {
        this.errors.password = 'Password is required.';
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)
      ) {
        this.errors.password =
          'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.';
      }

      return Object.keys(this.errors).length === 0;
    },

    async handleSubmit() {

      // Validate form before submission(call validation method)
      if (!this.validateForm()) return;

      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      await this.register(payload)

      if (!this.error) {
        this.$router.push('/login') // Redirect to login page on success
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
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

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
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
/* once the btn is disabled color it to a lighter shade of indigo */
button:disabled {
  background-color: #a5b4fc; /* Lighter indigo */
  opacity: 0.6;
  cursor: not-allowed;
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
