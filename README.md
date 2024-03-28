# MERN Organization CRUD with User Authentication

This is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to perform CRUD (Create, Read, Update, Delete) operations on organizations, with user authentication functionality.

## Features

- **User Authentication:** Users can sign up, log in, and log out securely.
- **Organization Management:** Users can create, view, update, and delete organizations.
- **Role-Based Access Control:** Administrators have additional permissions to manage users and organizations.
- **Responsive Design:** The application is optimized for various screen sizes and devices.

## Technologies Used

- **Frontend:** React.js, React Router, Axios, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcrypt.js
- **State Management:** React Context API
- **Deployment:** Heroku (Backend), Netlify (Frontend)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-organization-crud.git
   cd mern-organization-crud
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Define the following environment variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```

4. Run the application:
   ```bash
   # Start the backend server
   cd ../backend
   npm start

   # Start the frontend development server
   cd ../frontend
   npm start
   ```

5. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Register a new account or log in with existing credentials.
- Navigate to the Organizations page to view, create, update, or delete organizations.
- Administrators have additional options to manage users and organizations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was inspired by [MERN Stack Front To Back](https://www.udemy.com/course/mern-stack-front-to-back/) course on Udemy.
- Special thanks to the creators and contributors of the MERN stack and related technologies.

---

Feel free to customize this README.md template according to your project's specific requirements, features, and acknowledgments. Additionally, provide any necessary instructions for configuring the environment, deploying the application, or using specific functionalities.
