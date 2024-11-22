# comp231-005 (Team 3, W24) - Power Canada Energy Metrics Application

This is a full-stack web application designed to monitor and manage energy metrics for users. The application includes features for user registration, login, dashboards for individual users, and an admin panel for managing users.

---

## **Features**

- User authentication (Sign up and Login).
- Admin panel to manage users (CRUD operations).
- User-specific dashboard to display energy metrics via charts.
- Homepage with solar energy visuals and information.

---

## **Technologies Used**

### **Backend**
- Node.js
- Express.js
- MongoDB

### **Frontend**
- React.js
- Chart.js
- React Router DOM
- Axios

---

## **Setup and Installation**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/)
- npm (bundled with Node.js)

---

### **1. Clone the Repository**

```bash
git clone https://github.com/kentayamada-centennial/comp231-005-Team3-W24.git
cd comp231-005-Team3-W24
```

---

### **2. Set Up the Backend**

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the following:
   ```env
   MONGODB_URI=<your-mongo-uri>
   ```

4. Start the backend server:
   ```bash
   npm run start
   ```
   The backend should now be running on `http://localhost:5000`.

---

### **3. Set Up the Frontend**

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run start
   ```
   The frontend should now be running on `http://localhost:3000`.

---

## **Usage**

### **1. Running the Application Locally**

1. Ensure the backend is running on `http://localhost:5000`.
2. Start the frontend and access it via `http://localhost:3000`.
3. Use the application to:
   - Register as a new user.
   - Login as a user or admin.
   - View energy metrics via the dashboard.
   - Manage users (admin functionality).

---

### **2. Testing the Application**

- Use tools like Postman to test backend APIs:
  - `POST /api/register`: Register a user.
  - `POST /api/login`: Log in.
  - `GET /api/users`: Fetch all users.
  - `GET /api/users/:name`: Fetch user by name.
  - `PUT /api/users/:id`: Update user details.
  - `DELETE /api/users/:id`: Delete a user.