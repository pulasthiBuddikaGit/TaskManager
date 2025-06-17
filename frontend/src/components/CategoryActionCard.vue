<template>
  <div
    class="category-action-card"
    :style="{ top: position.top + 'px', left: position.left + 'px' }"
    @click.stop
  >
    <div class="card-header">
      <h4>{{ category.name }}</h4>
      <button @click="$emit('close')" class="close-btn">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="card-body">
      <button
        @click="handleUpdate"
        class="action-btn update-btn"
      >
        <i class="fas fa-edit"></i>
        Update Category
      </button>

      <button
        @click="handleDelete"
        class="action-btn delete-btn"
      >
        <i class="fas fa-trash"></i>
        Delete Category
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryActionCard',
  props: {
    category: {
      type: Object,
      required: true
    },
    position: {
      type: Object,
      default: () => ({ top: 0, left: 0 })
    }
  },
  methods: {
    handleUpdate() {
      this.$emit('update', this.category);
    },

    handleDelete() {
      this.$emit('delete', this.category.id);
    }
  }
};
</script>

<style scoped>
.category-action-card {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  transform: translate(-50%, -10px); /* Center horizontally and offset slightly */
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.card-header h4 {
  margin: 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
}

.close-btn:hover {
  background-color: #e9ecef;
  color: #333;
}

.card-body {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.update-btn {
  background-color: #28a745;
  color: white;
}

.update-btn:hover {
  background-color: #218838;
  transform: translateY(-1px);
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
  transform: translateY(-1px);
}

.action-btn i {
  font-size: 0.9rem;
}

/* Animation */
.category-action-card {
  animation: slideIn 0.2s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -10px) scale(1);
  }
}
</style>
