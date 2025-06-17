<template>
  <aside :class="{ collapsed }" class="sidebar">
    <div class="header">
      <h2>{{ user?.name }}</h2>
      <button @click="collapsed = !collapsed">☰</button>
    </div>

    <button @click="$emit('addTask')" class="add-task-btn">+ Add Task</button>

    <div class="nav-section">
      <h3>Tasks</h3>
      <ul>
        <li
          @click="$emit('selectCategory', null)"
          :class="{ active: !activeCategory }"
        >
          View Tasks
        </li>
      </ul>
    </div>

    <div class="nav-section">
      <!-- 🔴 CHANGE 1: Modified section header with flex layout for categories -->
      <div class="section-header">
        <h3>My Categories</h3>
        <button @click="$emit('addCategory')" class="add-category-btn" title="Add Category">
          +
        </button>
      </div>
      <ul>
        <li
          v-for="cat in categories"
          :key="cat._id"
          :class="{ active: activeCategory && activeCategory.id === cat.id }"
          class="category-item"
        >
          <!-- 🔴 CHANGE 1: Modified category item structure -->
          <span @click="$emit('selectCategory', cat)" class="category-name">
            {{ cat.name }}
          </span>
          <i
            @click.stop="toggleCategoryMenu(cat)"
            class="fas fa-ellipsis-vertical category-menu-icon"
          ></i>
        </li>
      </ul>
    </div>

    <!-- 🔴 CHANGE 2: Add CategoryActionCard component -->
    <CategoryActionCard
      v-if="showCategoryMenu"
      :category="selectedCategory"
      :position="menuPosition"
      @close="closeCategoryMenu"
      @delete="handleDeleteCategory"
      @update="handleUpdateCategory"
    />
  </aside>
</template>

<script>
// 🔴 CHANGE 3: Import CategoryActionCard component
import CategoryActionCard from './CategoryActionCard.vue';

export default {
  name: 'Sidebar',
  emits: ['selectCategory', 'addTask', 'updateCategory', 'addCategory'], // 🔴 CHANGE 2: Added 'addCategory' to emits array
  components: {
    CategoryActionCard // 🔴 CHANGE 4: Register component
  },
  props: {
    user: Object,
    categories: Array,
    activeCategory: Object,
  },
  data() {
    return {
      collapsed: false,
      showCategoryMenu: false, // 🔴 CHANGE 5: Add menu state
      selectedCategory: null,
      menuPosition: { top: 0, left: 0 }
    };
  },
  methods: {
    // 🔴 CHANGE 6: Add category menu methods
    toggleCategoryMenu(category) {
      if (this.showCategoryMenu && this.selectedCategory?.id === category.id) {
        this.closeCategoryMenu();
      } else {
        this.selectedCategory = category;
        this.showCategoryMenu = true;

        // Calculate menu position (you might need to adjust this based on your layout)
        this.$nextTick(() => {
          const event = window.event;
          if (event) {
            this.menuPosition = {
              top: event.clientY,
              left: event.clientX
            };
          }
        });
      }
    },

    closeCategoryMenu() {
      this.showCategoryMenu = false;
      this.selectedCategory = null;
    },

    async handleDeleteCategory(categoryId) {
      if (confirm(`Are you sure you want to delete this category?`)) {
        try {
          await this.$store.dispatch('categories/deleteCategory', categoryId);
          console.log('Category deleted successfully');
          this.closeCategoryMenu();
        } catch (error) {
          console.error('Failed to delete category:', error);
          alert('Failed to delete category. Please try again.');
        }
      }
    },

    // handleUpdateCategory(category) {
    //   // 🔴 TODO: Implement update functionality later
    //   console.log('Update category:', category);
    //   this.closeCategoryMenu();
    // }
    // 🔴 CHANGE 1: Update the handleUpdateCategory method in methods section
    handleUpdateCategory(category) {
      // 🔴 CHANGE: Emit event to parent (DashboardView) to open update modal
      this.$emit('updateCategory', category);
      this.closeCategoryMenu();
    }
  },

  // 🔴 CHANGE 7: Close menu when clicking outside
  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeCategoryMenu();
      }
    });
  }
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
  position: relative; /* 🔴 CHANGE 8: Add relative positioning */
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
  padding: 0.75rem;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.add-task-btn:hover {
  background-color: #0056b3;
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
  transition: color 0.2s;
}

.nav-section li:hover {
  text-decoration: underline;
}

.nav-section li.active {
  color: #0056b3;
  font-weight: 600;
}

/* 🔴 CHANGE 3: Added section-header class for flex layout */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

/* 🔴 CHANGE 3: Added add-category-btn styles for circular green plus button */
.add-category-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #28a745;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, transform 0.1s ease;
  padding: 0;
  line-height: 1;
}

.add-category-btn:hover {
  background-color: #218838;
  transform: scale(1.1);
}

.add-category-btn:active {
  transform: scale(0.95);
}

/* 🔴 CHANGE 9: Add new styles for category items */
.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  cursor: pointer;
}

.category-name {
  flex: 1;
  color: #007bff;
  transition: color 0.2s;
}

.category-item:hover .category-name {
  text-decoration: underline;
}

.category-item.active .category-name {
  color: #0056b3;
  font-weight: 600;
}

.category-menu-icon {
  color: #666;
  padding: 0.25rem;
  border-radius: 50%;
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;
}

.category-menu-icon:hover {
  background-color: #e9ecef;
  color: #333;
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
