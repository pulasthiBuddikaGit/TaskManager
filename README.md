# 📋 Task Manager

Task Manager is a full-stack task management application that allows users to create, update, organize, and manage tasks with real-time updates. It supports task categorization and provides a seamless experience with real-time WebSocket updates.

---

## 📘 Project Description

This project revolves around **three core entities**:

- **User**
- **Task**
- **Category**

An **ER diagram** was used to design and understand relationships between these entities. The app supports:

- Full **CRUD operations on tasks**
- **Moving tasks between categories**
- **CRUD operations on categories**
- **Real-time updates** via **WebSockets**
- **Indexed task collection references** (`user_id`, `category_id`) for **faster lookups**

---

## ⚙️ Setup Instructions

### 1. 🛠 Prerequisites

Make sure the following are installed:

- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- [PHP](https://www.php.net/downloads) (v8.1 or higher)
- [Composer](https://getcomposer.org/)
- [MongoDB PHP Driver](https://www.php.net/manual/en/mongodb.installation.pecl.php)
  - You must download the appropriate **PECL DLL file** matching your PHP version
  - Then **add the DLL to your `ext` folder** and enable it in your `php.ini`
- Git

### 2. 📂 Clone the Repository

```bash
git clone https://github.com/pulasthiBuddikaGit/TaskManager
cd TaskManager
