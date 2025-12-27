# User Management System

A simple and clean **User Management System** built using **Node.js, Express, MySQL, and EJS**.  
This project demonstrates full **CRUD operations** with a server-rendered UI and follows basic **REST principles**.

---

## 🚀 Features

- View all users in a tabular admin dashboard
- Add new users
- Edit username with password confirmation
- Delete users with password confirmation
- Display total user count on home page
- Clean and responsive UI using HTML & CSS
- Secure handling of database credentials using environment variables

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Templating Engine:** EJS
- **Styling:** HTML, CSS
- **Other Tools:** method-override, dotenv

---

## 📂 Project Structure

project-root/
│
├── index.js
├── package.json
├── .gitignore
├── .env (ignored)
│
├── views/
│ ├── home.ejs
│ ├── user.ejs
│ ├── edit.ejs
│ ├── remove.ejs
│ └── new.ejs
│
├── public/
│ └── css/
│ ├── users.css
│ ├── editUser.css
│ └── removeUser.css
│
└── node_modules/

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

git clone https://github.com/YOUR_USERNAME/REPO_NAME.git

2️⃣ Install dependencies
npm install

3️⃣ Create .env file in root directory
DB_PASSWORD=your_mysql_password

4️⃣ Start the server
nodemon index.js

Server will run at:
http://localhost:8080

🧭 Routes Overview
Method	Route	Description
GET	/	Home page (total users count)
GET	/user	Show all users
GET	/user/new	Add user form
POST	/user	Create new user
GET	/user/:id/edit	Edit user form
PATCH	/user/:id	Update username
GET	/user/:id/remove	Delete confirmation page
DELETE	/user/:id	Delete user

🔐 Security Notes
Database password is stored in .env

.env is ignored using .gitignore

Password confirmation required for edit and delete actions

🎯 Learning Outcomes
RESTful routing

Express middleware usage

MySQL integration with Node.js

EJS templating

Environment variable management

Clean UI separation (HTML & CSS)

📌 Author
Aditya Bhavsar

