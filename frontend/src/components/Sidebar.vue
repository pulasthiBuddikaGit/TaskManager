<template>
  <aside :class="{ collapsed }" class="sidebar">
    <div class="header">
      <h2>{{ user?.name }}</h2>
      <button @click="collapsed = !collapsed">☰</button>
    </div>

    <button class="add-task-btn">+ Add Task</button>

    <div class="nav-section">
      <h3>Tasks</h3>
      <ul>
        <li @click="$emit('selectCategory', null)">View Tasks</li>
      </ul>
    </div>

    <div class="nav-section">
      <h3>My Categories</h3>
      <ul>
        <li
          v-for="cat in categories"
          :key="cat._id"
          @click="$emit('selectCategory', cat)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    user: Object,
    categories: Array,
    activeCategory: Object,
  },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 1rem;
  overflow-y: auto;
  transition: width 0.3s ease;
  border-right: 1px solid #ddd;
}

.collapsed {
  width: 60px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-task-btn {
  margin: 1rem 0;
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
}

.nav-section {
  margin-top: 1.5rem;
}

.nav-section h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
}

.nav-section ul {
  list-style: none;
  padding-left: 0;
}

.nav-section li {
  padding: 0.5rem 0;
  cursor: pointer;
  color: #007bff;
}

.nav-section li:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
  }

  .collapsed {
    width: 100%;
  }
}
</style>
