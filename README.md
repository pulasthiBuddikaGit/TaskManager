#  📋 Task Manager

A full-stack task management application built with Laravel and Vue.js that provides real-time task updates and comprehensive task organization capabilities.

## ðŸ“‹ Project Description

Task Manager is a comprehensive task management application that allows users to create, update, organize, and manage tasks with real-time updates. The application is built around three core entities: **User**, **Task**, and **Category**.

### Key Features:
- **Entity Relationships**: An ER diagram was designed to identify and establish proper references between the three main entities (User, Task, Category)
- **Task Management**: Users can perform full CRUD operations on tasks
- **Category Management**: Users can perform CRUD operations on categories and move tasks between different categories
- **Performance Optimization**: Task collection references (`user_id` and `category_id`) are indexed for faster database lookups
- **Real-time Updates**: The application features real-time task updates using WebSockets for instant synchronization across multiple clients
- **Authentication**: Secure JWT-based authentication system
- **RESTful API**: Clean and well-structured REST API endpoints

## ðŸš€ Setup Instructions

### Prerequisites

Before setting up the application, ensure you have the following installed on your system:

#### Required Software:
1. **PHP** (v8.1 or higher) - [Download PHP](https://www.php.net/downloads)
2. **Node.js** (v18+ recommended) - [Download Node.js](https://nodejs.org/en/)
3. **Composer** - [Download Composer](https://getcomposer.org/)
4. **Git** - [Download Git](https://git-scm.com/)

#### MongoDB Setup:
Since this application uses MongoDB with Laravel, you need to install the MongoDB PHP driver:

1. **Download PECL MongoDB Extension**:
   - Visit [MongoDB PHP Driver](https://www.php.net/manual/en/mongodb.installation.pecl.php)
   - Download the appropriate PECL DLL file that matches your PHP version
   - Extract the `php_mongodb.dll` file

2. **Configure PHP**:
   - Copy the `php_mongodb.dll` to your PHP `ext` folder
   - Open your `php.ini` file
   - Add the following line: `extension=mongodb`
   - Restart your web server

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/pulasthiBuddikaGit/TaskManager.git
   cd TaskManager
   ```

2. **Backend Setup**:
   ```bash
   # Install PHP dependencies
   composer install
   
   # Copy environment file (already configured for convenience)
   # The .env file is intentionally exposed for easier setup
   ```

3. **Frontend Setup**:
   ```bash
   # Navigate to frontend directory (if separate) or install from root
   npm install
   ```

4. **Install All Dependencies**:
   ```bash
   # Backend dependencies
   composer install
   
   # Frontend dependencies  
   npm install
   ```

5. **Run the Application**:
   
   **Start the Backend Server**:
   ```bash
   php artisan serve
   ```
   The Laravel backend will be available at `http://localhost:8000`

   **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   The Vue.js frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## ðŸ› ï¸ Technologies Used

### Backend:
- **Framework**: Laravel (PHP)
- **Database**: MongoDB Atlas (Cloud Database)
- **Real-time Communication**: Pusher (WebSocket service for real-time task updates)
- **Authentication**: Laravel Tymon JWT (JSON Web Token authentication)
- **API Architecture**: RESTful APIs

### Frontend:
- **Framework**: Vue.js
- **State Management**: Vuex
- **Real-time Updates**: Laravel Echo (WebSocket client)
- **HTTP Client**: Axios (for API communication)

### Development Tools:
- **Database Design**: ER Diagram for entity relationship planning
- **Version Control**: Git & GitHub

## ðŸ’¡ Assumptions and Development Decisions

### Database Design:
- **Entity Relationships**: Created an ER diagram to properly establish relationships between User, Task, and Category entities
- **Indexing Strategy**: Implemented indexing on task collection reference IDs (`user_id`, `category_id`) to optimize database query performance
- **Cloud Database**: Chose MongoDB Atlas for reliable cloud-based database hosting

### Architecture Decisions:
- **API-First Approach**: Built as a REST API to ensure scalability and potential mobile app integration
- **Real-time Features**: Integrated WebSocket technology for instant task updates across multiple clients
- **JWT Authentication**: Implemented stateless authentication for better scalability
- **Component-based Frontend**: Used Vue.js for reactive and maintainable user interface components

### Development Convenience:
- **Environment Configuration**: The `.env` file is intentionally exposed in the repository for easier setup and testing. After cloning, you can directly use the pre-configured MongoDB Atlas database to test the application immediately without additional database setup.

### Performance Considerations:
- **Database Indexing**: Strategic indexing of frequently queried fields for faster lookups
- **Real-time Optimization**: Efficient WebSocket implementation to minimize server load during real-time updates

## ðŸ”— Quick Start

Once you've completed the setup instructions above, you can immediately start using the application with the pre-configured database. The application includes:

- User registration and authentication
- Task creation, editing, and deletion
- Category management
- Real-time task updates
- Task organization and filtering

## ðŸ“ Note

The `.env` file has been intentionally committed to the repository for convenience during development and testing. In a production environment, ensure to properly secure your environment variables and database credentials.

---

**Happy Task Managing! ðŸŽ¯**