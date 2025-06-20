#  📋 Task Manager

A full-stack task management application built with Laravel and Vue.js that provides real-time task updates and comprehensive task organization capabilities.

## 📘‹ Project Description

Task Manager is a comprehensive task management application that allows users to create, update, organize, and manage tasks with real-time updates. The application is built around three core entities: **User**, **Task**, and **Category**.

### Key Features:
- **Entity Relationships**: An ER diagram was designed to identify and establish proper references between the three main entities (User, Task, Category)
- **Task Management**: Users can perform full CRUD operations on tasks
- **Category Management**: Users can perform CRUD operations on categories and move tasks between different categories
- **Performance Optimization**: Task collection references (`user_id` and `category_id`) are indexed for faster database lookups
- **Real-time Updates**: The application features real-time task updates using WebSockets for instant synchronization across multiple clients
- **Authentication**: Secure JWT-based authentication system
- **RESTful API**: Clean and well-structured REST API endpoints

## ⚙️ Setup Instructions

### Prerequisites

Before setting up the application, ensure you have the following installed on your system:

#### Required Software:
1. **PHP** (v8.1 or higher) - [Download PHP](https://www.php.net/downloads)
2. **Node.js** (v18+ recommended) - [Download Node.js](https://nodejs.org/en/)
3. **Composer** - [Download Composer](https://getcomposer.org/)
4. **Git** - [Download Git](https://git-scm.com/)

#### 1.MongoDB Setup:
Since this application uses MongoDB with Laravel, you need to install the MongoDB PHP driver:

1. **Download PECL MongoDB Extension**:
   - Visit [MongoDB PHP Driver](https://pecl.php.net/package/mongodb)
   - Download the appropriate PECL DLL file(Thread Safe) that matches your PHP version
   - Extract the `php_mongodb.dll` file

2. **Configure PHP**:
   - Copy the `php_mongodb.dll` to your PHP `ext` folder
   - Open your `php.ini` file
   - Add the following line: `extension=mongodb`
   - Restart your web server

#### 2.Fixing Common Missing Extensions (Windows Users) while running composer install:
   If you encounter errors like:
   - `lcobucci/jwt requires ext-sodium`
   - `league/flysystem-local` or `league/mime-type-detection` require `ext-fileinfo`

   Follow these steps:

   - Open your `php.ini` file (e.g., `C:\php-8.x.x\php.ini`)
   - Find and uncomment (or add) the following lines:
     ```
     extension=sodium
     extension=fileinfo
     ```
   - If the lines are commented (start with `;`), remove the semicolon:
     ```ini
     ;extension=sodium   →   extension=sodium
     ;extension=fileinfo →   extension=fileinfo
     ```
   - Save the file
   - Close and reopen your terminal (or restart your web server)
   - Run `php -m` to confirm the extensions are now enabled

#### 3.Fixing SSL Certificate Error (500 Server Error):
If you encounter a 500 server error while adding tasks or categories with the error message on laravel log:
`cURL error 60: SSL certificate problem: unable to get local issuer certificate`

Follow these steps to resolve it:

1. **Download CA Certificate Bundle**:
   - Download the `cacert.pem` file from [curl.se/ca/cacert.pem](https://curl.se/ca/cacert.pem)
   - Save it to `C:\php\extras\ssl\cacert.pem` (create the folders if they don't exist)

2. **Configure PHP**:
   - Open your `php.ini` file
   - Scroll to the bottom of the file
   - Look for these lines (they might be commented with `;`):
     ```ini
     ;curl.cainfo=
     ;openssl.cafile=
     ```
   - Uncomment them by removing the semicolon and set the path:
     ```ini
     curl.cainfo="C:\php\extras\ssl\cacert.pem"
     openssl.cafile="C:\php\extras\ssl\cacert.pem"
     ```
   - If you don't see these lines, simply add them at the bottom of your `php.ini` file
   - Save the file
   - Restart your web server

---

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
   # Navigate to frontend directory and install dependencies
   npm install
   ```

4. **Run the Application**:
   
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

## 🤖 Technologies Used

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

## 💭 Assumptions and Development Decisions

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

## ⏩ Quick Start

Once you've completed the setup instructions above, you can immediately start using the application with the pre-configured database. The application includes:

- User registration and authentication
- Task creation, editing, and deletion
- Category management
- Real-time task updates
- Task organization and filtering

## 📝 Note

1. The `.env` file has been intentionally committed to the repository for convenience during development and testing. In a production environment, ensure to properly secure your environment variables and database credentials.
2. App performance may depend on your network connection.

---

**Happy Task Managing! 🧑‍💻**