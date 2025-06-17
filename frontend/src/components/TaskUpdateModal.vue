<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Update Task</h3>
        <button @click="closeModal" class="close-btn">&times;</button>
      </div>

      <form @submit.prevent="updateTask" class="modal-body">
        <div class="form-group">
          <label for="heading">Heading *</label>
          <input
            id="heading"
            v-model="form.heading"
            type="text"
            required
            maxlength="255"
            class="form-input"
            :class="{ 'error': errors.heading }"
          />
          <span v-if="errors.heading" class="error-message">{{ errors.heading[0] }}</span>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="4"
            class="form-input"
            :class="{ 'error': errors.description }"
          ></textarea>
          <span v-if="errors.description" class="error-message">{{ errors.description[0] }}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="status">Status *</label>
            <select
              id="status"
              v-model="form.status"
              required
              class="form-input"
              :class="{ 'error': errors.status }"
            >
              <option value="Not started">Not started</option>
              <option value="In progress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
            <span v-if="errors.status" class="error-message">{{ errors.status[0] }}</span>
          </div>

          <div class="form-group">
            <label for="priority">Priority *</label>
            <select
              id="priority"
              v-model="form.priority"
              required
              class="form-input"
              :class="{ 'error': errors.priority }"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
            <span v-if="errors.priority" class="error-message">{{ errors.priority[0] }}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="categoryId">Category</label>
          <select
            id="categoryId"
            v-model="form.categoryId"
            class="form-input"
            :class="{ 'error': errors.categoryId }"
          >
            <option value="">No Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span v-if="errors.categoryId" class="error-message">{{ errors.categoryId[0] }}</span>
        </div>

        <div class="modal-footer">
          <button type="button" @click="closeModal" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" :disabled="loading" class="btn-primary">
            <span v-if="loading">Updating...</span>
            <span v-else>Update Task</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskUpdateModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        heading: '',
        description: '',
        status: 'Not started',
        priority: 'Normal',
        categoryId: ''
      },
      errors: {}
    };
  },
  computed: {
    ...mapGetters('categories', ['categories']),
    ...mapGetters('tasks', ['loading'])
  },
  watch: {
    task: {
      handler(newTask) {
        if (newTask) {
          this.form = {
            heading: newTask.heading || '',
            description: newTask.description || '',
            status: newTask.status || 'Not started',
            priority: newTask.priority || 'Normal',
            categoryId: newTask.categoryId || ''
          };
        }
      },
      immediate: true
    },
    isOpen(newVal) {
      if (!newVal) {
        this.errors = {};
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async updateTask() {
      this.errors = {};

      try {
        const taskData = {
          heading: this.form.heading.trim(),
          description: this.form.description?.trim() || null,
          status: this.form.status,
          priority: this.form.priority,
          categoryId: this.form.categoryId || null
        };

        await this.$store.dispatch('tasks/updateTask', {
          id: this.task.id,
          taskData
        });

        this.$emit('updated');
        this.closeModal();
      } catch (error) {
        console.error('Failed to update task:', error);

        if (error.response?.status === 422) {
          this.errors = error.response.data.errors || {};
        } else {
          alert('Failed to update task. Please try again.');
        }
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.form-input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
}

.btn-secondary,
.btn-primary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2980b9;
}

.btn-primary:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-footer {
    flex-direction: column;
  }
}
</style>
