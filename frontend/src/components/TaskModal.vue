<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h3 class="text-xl font-semibold mb-4">{{ taskToEdit ? 'Edit Task' : 'Add Task' }}</h3>
      <form @submit.prevent="submitTask">
        <div class="mb-4">
          <label class="block text-sm font-medium">Heading</label>
          <input v-model="taskData.heading" type="text" class="input" required />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Description</label>
          <textarea v-model="taskData.description" class="input"></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Status</label>
          <select v-model="taskData.status" class="input">
            <option value="Not started">Not started</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Priority</label>
          <select v-model="taskData.priority" class="input">
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium">Category</label>
          <select v-model="taskData.categoryId" class="input">
            <option :value=null>No category</option>
            <option v-for="cat in categories" :key="cat.categoryId" :value="cat.categoryId">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="flex justify-end gap-3">
          <button type="button" class="btn-cancel" @click="close">Cancel</button>
          <button type="submit" class="btn-submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TaskModal',
  props: {
    taskToEdit: Object,
    show: Boolean
  },
  data() {
    return {
      taskData: {
        heading: '',
        description: '',
        status: 'In progress',
        priority: 'Normal',
        categoryId: null
      },
    };
  },
  computed: {
    ...mapGetters('categories', ['categories'])
  },
  watch: {
    taskToEdit: {
      immediate: true,
      handler(task) {
        if (task) {
          this.taskData = { ...task };
        } else {
          this.taskData = {
            heading: '',
            description: '',
            status: 'In progress',
            priority: 'Normal',
            categoryId: null
          };
        }
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async submitTask() {
      if (this.taskToEdit) {
        await this.$store.dispatch('tasks/updateTask', {
          id: this.taskToEdit.id,
          data: this.taskData
        });
      } else {
        await this.$store.dispatch('tasks/createTask', this.taskData);
      }
      this.close();
    }
  },
  created() {
    this.$store.dispatch('categories/fetchCategories');
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
}
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 0.25rem;
}
.btn-cancel {
  background: #ccc;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
.btn-submit {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}
</style>
