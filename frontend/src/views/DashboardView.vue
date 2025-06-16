<template>
  <div class="dashboard">
    <Sidebar
      :categories="categories"
      :user="user"
      :activeCategory="activeCategory"
      @selectCategory="selectCategory"
    />
    <div class="content">
      <h2 v-if="activeCategory">Tasks for {{ activeCategory.name }}</h2>
      <h2 v-else>Inbox</h2>

      <div class="task-list">
        <div
          v-for="task in filteredTasks"
          :key="task._id"
          class="task-item"
        >
          <h3>{{ task.heading }}</h3>
          <p>{{ task.description }}</p>
          <span class="status">{{ task.status }}</span>
          <span class="priority">{{ task.priority }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'DashboardView',
  components: { Sidebar },
  data() {
    return {
      activeCategory: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('categories', ['categories']),
    ...mapGetters('tasks', ['tasks']),
    filteredTasks() {
      if (!this.activeCategory) {
        return this.tasks.filter((t) => !t.categoryId);
      }
      return this.tasks.filter((t) => t.categoryId === this.activeCategory._id);
    },
  },
  methods: {
    selectCategory(category) {
      this.activeCategory = category;
    },
  },
  created() {
    this.$store.dispatch('categories/fetchCategories');
    this.$store.dispatch('tasks/fetchTasks');
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  flex-direction: row;
}

.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.task-list {
  display: grid;
  gap: 1rem;
}

.task-item {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
}

.status,
.priority {
  display: inline-block;
  margin-top: 0.5rem;
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #555;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .content {
    padding: 0.5rem;
  }
}
</style>

