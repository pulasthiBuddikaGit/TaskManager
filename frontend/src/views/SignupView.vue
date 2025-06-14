<template>
  <div class="container">
    <!-- Left side animation -->
    <div class="animation-box">
      <img src="../assets/signup-task.gif" alt="Task Animation" class="animation" />
    </div>

    <!-- Right side form -->
    <div class="form-box">
      <SignupForm />
    </div>
  </div>
</template>

<script>
import SignupForm from '../components/SignupForm.vue'

export default {
  name: 'SignupView',
  components: {
    SignupForm
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  gap: 2rem;
}

.animation-box {
  flex: 1;
  text-align: center;
  max-width: 700px;
}

.animation {
  width: 100%;
  max-width: 600px;
  height: auto;
}

.form-box {
  flex: 1;
  max-width: 450px;
}

/* media query to make the layout responsive */
@media screen and (max-width: 1024px) {
  .container {
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
  }

  .animation-box, .form-box {
    width: 100%;
    text-align: center;
  }

  .animation {
    max-width: 300px;
  }
}

@media screen and (max-width: 600px) {
  .animation {
    max-width: 200px;
  }
}
</style>
