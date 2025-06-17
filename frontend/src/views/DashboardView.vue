<template>
  <div class="dashboard">
    <!-- 🔴 CHANGE: Update the Sidebar component to handle updateCategory event -->
    <Sidebar
      :categories="categories"
      :user="user"
      :activeCategory="activeCategory"
      @selectCategory="selectCategory"
      @addTask="openCreateModal"
      @updateCategory="openCategoryUpdateModal"
    />
     <!-- Add @addTask event handler to Sidebar -->
    <div class="content">
      <h2 v-if="activeCategory">Tasks for {{ activeCategory.name }}</h2>
      <h2 v-else>Tasks</h2>
      <!-- Loading Spinner -->
      <div v-if="loading" class="spinner-container">
        <div class="spinner"></div>
      </div>
      <!-- Task List -->
      <div v-else class="task-list">
        <div
          v-for="task in filteredTasks"
          :key="task.id"
          class="task-item"
        >
          <div class="task-content">
            <h3>{{ task.heading }}</h3>
            <p>{{ task.description }}</p>
            <div class="task-meta">
              <span class="status">{{ task.status }}</span>
              <span class="priority">{{ task.priority }}</span>
            </div>
          </div>
          <div class="task-actions">
            <button
              @click="openUpdateModal(task)"
              class="update-btn"
              :disabled="loading"
            >
              Update
            </button>
            <button
              @click="deleteTask(task.id)"
              class="delete-btn"
              :disabled="loading"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

        <!-- Add TaskCreateModal component -->
    <TaskCreateModal
      :isOpen="showCreateModal"
      @close="closeCreateModal"
      @created="handleTaskCreated"
    />

    <!-- Update Task Modal -->
    <TaskUpdateModal
      :isOpen="showUpdateModal"
      :task="selectedTask"
      @close="closeUpdateModal"
      @updated="handleTaskUpdated"
    />

    <!-- 🔴 CHANGE 5: Add CategoryUpdateModal component to template (add this after TaskUpdateModal) -->
<!-- Category Update Modal -->
    <CategoryUpdateModal
      :isOpen="showCategoryUpdateModal"
      :category="selectedCategory"
      @close="closeCategoryUpdateModal"
      @updated="handleCategoryUpdated"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';
import TaskUpdateModal from '@/components/TaskUpdateModal.vue';
import TaskCreateModal from '@/components/TaskCreateModal.vue'; // Import TaskCreat
import CategoryUpdateModal from '@/components/CategoryUpdateModal.vue'; // Import CategoryUpdateModal if needed
import echo from '@/echo'; // import your Echo instance

export default {
  name: 'DashboardView',
  components: {
    Sidebar,
    TaskUpdateModal,
    TaskCreateModal, // Add TaskCreateModal to components
    CategoryUpdateModal // 🔴 CHANGE 2: Register CategoryUpdateModal component
  },
  data() {
    return {
      activeCategory: null,
      showUpdateModal: false,
      selectedTask: null,
      showCreateModal: false, // Add showCreateModal state
            // 🔴 CHANGE 3: Add state for category update modal
      showCategoryUpdateModal: false,
      selectedCategory: null
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('categories', ['categories']),
    ...mapGetters('tasks', ['tasks', 'loading']),
    filteredTasks() {
      if (!this.activeCategory) {
        return this.tasks.filter((t) => !t.categoryId);
      }
      const activeCatId = this.activeCategory.id?.toString();
      return this.tasks.filter((t) => {
        const taskCatId = t.categoryId?.toString();
        return taskCatId === activeCatId;
      });
    }
  },
  methods: {
    selectCategory(category) {
      this.activeCategory = category;
    },

        //  Add methods for create modal
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeCreateModal() {
      this.showCreateModal = false;
    },
    handleTaskCreated() {
      console.log('Task created successfully');
      // Task list will be automatically updated via Vuex state
    },

        // 🔴 CHANGE 4: Add methods for category update modal
    openCategoryUpdateModal(category) {
      this.selectedCategory = category;
      this.showCategoryUpdateModal = true;
    },
    closeCategoryUpdateModal() {
      this.showCategoryUpdateModal = false;
      this.selectedCategory = null;
    },
    handleCategoryUpdated() {
      console.log('Category updated successfully');
      // Categories list will be automatically updated via Vuex state
    },

    openUpdateModal(task) {
      this.selectedTask = task;
      this.showUpdateModal = true;
    },
    closeUpdateModal() {
      this.showUpdateModal = false;
      this.selectedTask = null;
    },
    handleTaskUpdated() {
      console.log('Task updated successfully');
      // Task list will be automatically updated via Vuex state
    },
    async deleteTask(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        try {
          await this.$store.dispatch('tasks/deleteTask', taskId);
          console.log('Task deleted successfully');
        } catch (error) {
          console.error('Failed to delete task:', error);

          // Check if it's a 500 error but task might still be deleted
          if (error.response?.status === 500) {
            console.log('Got 500 error, checking if task was actually deleted...');
            // Wait a moment and refresh tasks to see if deletion worked
            setTimeout(() => {
              this.$store.dispatch('tasks/fetchTasks');
            }, 1000);
            alert('Delete request completed, but server returned an error. Refreshing task list...');
          } else {
            alert('Failed to delete task. Please try again.');
          }
        }
      }
    },
    // Listen for task events using Echo
    listenForTaskEvents() {
      echo.channel('tasks')
        .listen('.task.created', () => {
          this.$store.dispatch('tasks/fetchTasks');
        })
        .listen('.task.updated', () => {
          this.$store.dispatch('tasks/fetchTasks');
        })
        .listen('.task.deleted', () => {
          this.$store.dispatch('tasks/fetchTasks');
        });
    }
  },
  created() {
    this.$store.dispatch('categories/fetchCategories');
    this.$store.dispatch('tasks/fetchTasks').then(() => {
      this.listenForTaskEvents(); // Start listening for task events
    });
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.task-content {
  flex: 1;
}

.task-meta {
  margin-top: 0.5rem;
}

.status,
.priority {
  display: inline-block;
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #555;
}

.task-actions {
  margin-left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.update-btn,
.delete-btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.update-btn {
  background-color: #28a745;
  color: white;
}

.update-btn:hover:not(:disabled) {
  background-color: #218838;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.update-btn:disabled,
.delete-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Spinner Styles */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
  }

  .content {
    padding: 0.5rem;
  }

  .task-item {
    flex-direction: column;
    align-items: stretch;
  }

  .task-actions {
    margin-left: 0;
    margin-top: 1rem;
    justify-content: flex-end;
  }
}
</style>
