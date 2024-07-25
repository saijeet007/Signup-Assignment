
# SignUp Page
 
Created a web application that allows users to sign up by filling out a form with fields like 
name, number, date of birth (DOB), email, and password. Implemented validation for each 
field, and enabled the submit button only when all fields have valid data.

Also added optional Features as well
1. Implemented a feature to edit or delete user profiles. 
2. Added additional fields to the user profile, such as a profile picture upload. 
3. Used a frontend library ReactJs for building the application.

## Project Structure

- `frontend/`: Contains the React.js application.
- `backend/`: Contains the Node.js application.

## Prerequisites

Before running the project, ensure you have the following installed:
- Node.js (v20 or later)
- npm (v10 or later) 
- MongoDB Atlas account

## Setting Up
1. Clone the repository to your local machine.
```bash
git clone https://github.com/saijeet007/Signup-Assignment.git
```

## Running the Project Locally

### Backend

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
   
    ```

3. **Create a `.env` file in the `backend/` directory with your MongoDB Atlas connection string:**

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/users?retryWrites=true&w=majority
    ```

    Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.

4. **Start the backend server:**

    ```bash
    node index.js
    ```

    The backend server should now be running on `https://signup-assignment.onrender.com`.

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the frontend development server:**

    ```bash
    npm run dev
    ```

    The frontend development server should now be running on `http://localhost:5173`.

