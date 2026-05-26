# Project Groupomania - Restoration and Configuration Log

This file summarizes the actions taken on May 26, 2026, to restore and connect the Groupomania project.

## 🛠 Backend Fixes & Configuration
- **Missing `package.json`**: Recreated the backend `package.json` with all necessary dependencies (Express, Sequelize, Bcrypt, JWT, etc.).
- **Database Connection**: Configured `backend/config/config.json` for local development using XAMPP (Host: `127.0.0.1`, User: `root`, Password: ``).
- **Environment Variables**: Created `.env` with variables for `PORT`, `SECRET_KEY`, `BASE_URL`, and Admin credentials.
- **Image Serving**: Verified that `backend/image/default.png` exists for default profile pictures.

## 💻 Frontend Fixes & Configuration
- **API Connection**: Updated `frontend/.env` to point to the local backend (`http://localhost:8800/`) instead of Render.
- **Redirect Loop Fix**: Removed the `"homepage"` property from `frontend/package.json` which was causing `ERR_TOO_MANY_REDIRECTS` in local development.

## 🗄 Database Setup (XAMPP)
- **Manual Creation**: The database `groupomania` must be created manually in phpMyAdmin with `utf8mb4_general_ci` collation.
- **Auto-Sync**: Sequelize is configured to automatically create tables (Users, Posts, Comments, Likes) upon first backend start.

## 📁 Git & Maintenance
- **Ignore Rules**: Updated `.gitignore` to exclude `backend/image/` (except `default.png`) and `.env` files.
- **Clean Repo**: Removed previously tracked images from the git index to keep the repository light.
- **Cleanup Advice**: Recommended deleting the unused `nomapp/` folder and root `node_modules/`.

## 🚀 How to Run Locally
1. **Database**: Start XAMPP (Apache & MySQL) and ensure `groupomania` DB exists.
2. **Backend**: `cd backend && npm install && npm start` (Port 8800).
3. **Frontend**: `cd frontend && npm install && npm start` (Port 3000).

---
*End of documentation. Happy coding!*
