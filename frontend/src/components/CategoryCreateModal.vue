<template>
  <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Create New Category</h3>
        <button @click="$emit('close')" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="categoryName">Category Name</label>
          <input
            id="categoryName"
            v-model="categoryName"
            type="text"
            class="form-input"
            placeholder="Enter category name"
            required
            :disabled="loading"
            ref="nameInput"
          />
        </div>

        <!-- <div class="form-group">
          <label for="categoryDescription">Description (Optional)</label>
          <textarea
            id="categoryDescription"
            v-model="categoryDescription"
            class="form-textarea"
            placeholder="Enter category description"
            rows="3"
            :disabled="loading"
          ></textarea>
        </div> -->

        <div class="modal-actions">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-cancel"
            :disabled="loading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-submit"
            :disabled="loading || !categoryName.trim()"
          >
            <span v-if="loading" class="loading-spinner"></span>
            {{ loading ? 'Creating...' : 'Create Category' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategoryCreateModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categoryName: '',
      categoryDescription: ''
    };
  },
  computed: {
    ...mapGetters('categories', ['loading'])
  },
  watch: {
    // Reset form when modal is closed
    isOpen(newValue) {
      if (!newValue) {
        this.resetForm();
      } else {
        // Focus on input when modal opens
        this.$nextTick(() => {
          if (this.$refs.nameInput) {
            this.$refs.nameInput.focus();
          }
        });
      }
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.categoryName.trim()) {
        return;
      }

      try {
        const categoryData = {
          name: this.categoryName.trim(),
          description: this.categoryDescription.trim() || null
        };

        await this.$store.dispatch('categories/createCategory', categoryData);

        this.$emit('created', categoryData);
        this.$emit('close');
      } catch (error) {
        console.error('Failed to create category:', error);
        alert('Failed to create category. Please try again.');
      }
    },

    handleOverlayClick() {
      if (!this.loading) {
        this.$emit('close');
      }
    },

    resetForm() {
      this.categoryName = '';
      this.categoryDescription = '';
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.2s ease-out;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.close-btn:hover {
  background-color: #e9ecef;
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-input:disabled,
.form-textarea:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover:not(:disabled) {
  background-color: #5a6268;
}

.btn-submit {
  background-color: #28a745;
  color: white;
}

.btn-submit:hover:not(:disabled) {
  background-color: #218838;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
