# Campus Event Gallery - Complete Project Workflow Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Team Responsibilities](#team-responsibilities)
5. [Backend Architecture (Harsh Prajapati)](#backend-architecture)
6. [Cloudinary & Analytics (Aaditya Jobanputra)](#cloudinary--analytics)
7. [Frontend UI & Dashboard (Devansh Patel)](#frontend-ui--dashboard)
8. [Complete Workflow](#complete-workflow)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [Setup & Installation](#setup--installation)
12. [Testing with Postman](#testing-with-postman)

---

## Project Overview

**Campus Event Gallery** is a full-stack web application that allows users to upload, manage, and view campus event photos. The application features:

- **User Authentication** - Secure login/register with JWT tokens
- **Role-Based Access Control** - Admin and regular user roles
- **Image Upload & Storage** - Upload images to Cloudinary
- **AI-Powered Image Labeling** - Automatic image tagging using Clarifai
- **Image Management** - View, search, edit, and delete images
- **Analytics Dashboard** - View image statistics and metadata

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload middleware
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI library
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **React Hooks** - State management

### Cloud Services
- **Cloudinary** - Image storage and CDN
- **Clarifai** - AI-powered image recognition
- **Google Cloud Vision** - (Available for future enhancement)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                   React Frontend (Port 3001)                    │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS Requests
                            │ (Axios with JWT Token)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS BACKEND                           │
│                      (Port 3000)                                │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Routes     │  │ Middleware   │  │ Controllers  │         │
│  │              │  │              │  │              │         │
│  │ - auth       │  │ - auth       │  │ - auth       │         │
│  │ - image      │  │ - admin      │  │ - image      │         │
│  │ - admin      │  │ - upload     │  │              │         │
│  │ - home       │  │              │  │              │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────┬──────────────────────┬──────────────────┬─────────────┘
         │                      │                  │
         │                      │                  │
         ↓                      ↓                  ↓
┌────────────────┐   ┌─────────────────┐   ┌──────────────┐
│   MongoDB      │   │   Cloudinary    │   │  Clarifai    │
│   Database     │   │   Image CDN     │   │  AI Labels   │
│                │   │                 │   │              │
│ - Users        │   │ - Upload        │   │ - Detect     │
│ - Images       │   │ - Store         │   │   Labels     │
│                │   │ - Delete        │   │              │
└────────────────┘   └─────────────────┘   └──────────────┘
```

---

## Team Responsibilities

### 👨‍💻 Harsh Prajapati - Backend Development
**Focus Areas:**
1. Node.js and Express.js server setup
2. Database schema design and implementation
3. JWT authentication system
4. API route creation and management
5. Middleware implementation

**Files Owned:**
- `7.NODEJS-AUTH/server.js` - Main server file
- `7.NODEJS-AUTH/models/User.js` - User data model
- `7.NODEJS-AUTH/models/image.js` - Image data model
- `7.NODEJS-AUTH/controllers/auth-controller.js` - Authentication logic
- `7.NODEJS-AUTH/middleware/auth-middleware.js` - JWT verification
- `7.NODEJS-AUTH/middleware/admin-middleware.js` - Admin role check
- `7.NODEJS-AUTH/routes/auth-routes.js` - Auth endpoints
- `7.NODEJS-AUTH/routes/admin-routes.js` - Admin endpoints
- `7.NODEJS-AUTH/routes/home-routes.js` - Home endpoints
- `7.NODEJS-AUTH/database/db.js` - MongoDB connection

### 👨‍💻 Aaditya Jobanputra - Cloudinary & Analytics
**Focus Areas:**
1. Cloudinary integration for image storage
2. Image upload and deletion from cloud
3. AI-powered image labeling with Clarifai
4. Analytics visualization (metadata, labels)
5. API testing with Postman

**Files Owned:**
- `7.NODEJS-AUTH/config/cloudinary.js` - Cloudinary configuration
- `7.NODEJS-AUTH/helpers/cloudinaryHelper.js` - Upload/delete functions
- `7.NODEJS-AUTH/helpers/clarifaiHelper.js` - AI label detection
- `7.NODEJS-AUTH/helpers/visionHelper.js` - Google Vision integration
- `7.NODEJS-AUTH/controllers/image-controller.js` - Image CRUD operations
- `7.NODEJS-AUTH/routes/image-routes.js` - Image API routes
- `7.NODEJS-AUTH/middleware/upload-middleware.js` - Multer file upload

### 👨‍💻 Devansh Patel - Frontend Development
**Focus Areas:**
1. UI/UX design using Material-UI
2. Dashboard development
3. User authentication interface
4. Image gallery display
5. Admin features (edit, delete)

**Files Owned:**
- `campus-gallery-frontend/src/App.js` - Main application component
- `campus-gallery-frontend/src/components/LoginPage.js` - Login/Register UI
- `campus-gallery-frontend/src/components/ImageUpload.js` - Upload form
- `campus-gallery-frontend/src/components/MainGallery.js` - Gallery display
- `campus-gallery-frontend/src/components/ImageGallery.js` - Image grid

---

## Backend Architecture

### Server Setup (`server.js`)
```javascript
// Main Express server configuration
- Loads environment variables
- Connects to MongoDB
- Sets up CORS for frontend communication
- Registers middleware for JSON parsing
- Mounts route handlers
- Listens on port 3000
```

### Database Schema Design

#### User Model (`models/User.js`)
```javascript
{
  username: String (required, unique),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcrypt),
  role: String (enum: ['user', 'admin'], default: 'user'),
  timestamps: true (createdAt, updatedAt)
}
```

#### Image Model (`models/image.js`)
```javascript
{
  url: String (required) - Cloudinary URL,
  publicId: String (required) - Cloudinary public ID,
  uploadedBy: ObjectId (required) - Reference to User,
  eventType: String - Event category,
  batch: String - Student batch (H4, H5, H6),
  labels: [String] - AI-generated tags,
  photoName: String (required) - User-friendly name,
  timestamps: true (createdAt, updatedAt)
}
```

### JWT Authentication Flow

```
1. User Registration
   ├─ Client sends: username, email, password, role
   ├─ Server validates: Check if user exists
   ├─ Server hashes password with bcrypt (10 salt rounds)
   └─ Server creates user document in MongoDB

2. User Login
   ├─ Client sends: username, password
   ├─ Server finds user by username
   ├─ Server compares password with bcrypt
   ├─ Server generates JWT token (expires in 30 minutes)
   │  └─ Payload: { id, username, role }
   └─ Server returns: { success, message, accessToken }

3. Protected Routes
   ├─ Client includes: Authorization: Bearer <token>
   ├─ authMiddleware extracts and verifies token
   ├─ Decoded token attached to req.userInfo
   └─ Route handler accesses user info
```

### Middleware Stack

**1. Authentication Middleware (`auth-middleware.js`)**
- Extracts JWT token from Authorization header
- Verifies token signature using JWT_SECRET
- Attaches decoded user info to request
- Returns 401 if token is missing or invalid

**2. Admin Middleware (`admin-middleware.js`)**
- Checks if user role is 'admin'
- Returns 403 if user is not admin
- Used for delete operations

**3. Upload Middleware (`upload-middleware.js`)**
- Uses Multer for multipart/form-data
- Stores uploaded files temporarily in `uploads/` folder
- Configures file naming and storage location

---

## Cloudinary & Analytics

### Cloudinary Configuration (`config/cloudinary.js`)
```javascript
// Connects to Cloudinary using credentials
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
```

### Image Upload Workflow

```
1. User selects image file in frontend
   ↓
2. Frontend sends FormData with:
   - image file (multipart)
   - eventType
   - batch
   - photoName
   ↓
3. Backend receives request at /api/image/upload
   ├─ authMiddleware verifies user
   ├─ uploadMiddleware saves file temporarily
   └─ uploadImageController processes
   ↓
4. Upload to Cloudinary
   ├─ cloudinaryHelper.uploadToCloudinary()
   ├─ Returns: { url, publicId }
   └─ Stores image in Cloudinary CDN
   ↓
5. AI Label Detection
   ├─ clarifaiHelper.detectLabels(url)
   ├─ Clarifai analyzes image
   └─ Returns: ['person', 'group', 'event', ...]
   ↓
6. Save to Database
   ├─ Create Image document with all metadata
   ├─ Link to user via uploadedBy field
   └─ Store AI labels for analytics
   ↓
7. Return success response to frontend
```

### Cloudinary Helper Functions

**uploadToCloudinary(filePath)**
- Uploads local file to Cloudinary
- Returns secure URL and public ID
- Handles upload errors

**deleteFromCloudinary(publicId)**
- Deletes image from Cloudinary using public ID
- Called when admin deletes image

### Clarifai AI Integration

**detectLabels(imageUrl)**
- Sends image URL to Clarifai General Model
- Receives concepts/labels with confidence scores
- Extracts top label names
- Returns array of label strings
- Enables intelligent search and categorization

### Analytics Features

Images store rich metadata for analytics:
- **Upload timestamp** - When image was added
- **User attribution** - Who uploaded it
- **Event categorization** - Event type grouping
- **Batch tracking** - Student cohort
- **AI labels** - Automatic content tagging

This enables future analytics dashboards showing:
- Upload trends over time
- Most active users
- Popular event types
- Common image themes (via labels)

---

## Frontend UI & Dashboard

### Application Structure

```
App.js (Main Container)
├─ Login/Register State Management
├─ Role-based Rendering
├─ Token Storage in localStorage
│
├─ LoginPage.js (Unauthenticated View)
│  ├─ Login Form
│  └─ Register Form
│
└─ Authenticated View
   ├─ Header with Logout Button
   ├─ ImageUpload.js (Upload Form)
   │  ├─ Photo Name Input
   │  ├─ Event Type Input
   │  ├─ Batch Selector (H4, H5, H6)
   │  └─ File Upload Button
   │
   └─ MainGallery.js (Image Grid)
      ├─ Search Bar (by photo name)
      ├─ Image Cards
      │  ├─ Image Preview
      │  ├─ Metadata Display
      │  ├─ AI Labels
      │  ├─ Edit Name (Admin only)
      │  └─ Delete Button (Admin only)
      └─ Responsive Grid Layout
```

### User Authentication Flow (Frontend)

```
1. User opens app
   ├─ Check localStorage for token
   └─ Show LoginPage or Dashboard

2. Login Process
   ├─ User enters username + password
   ├─ POST to /api/auth/login
   ├─ Receive: { success, accessToken }
   ├─ Store token in localStorage
   ├─ Store role in localStorage
   └─ Update state to show dashboard

3. Authenticated Requests
   ├─ Include token in headers
   └─ Authorization: Bearer <token>

4. Logout Process
   ├─ Clear localStorage
   └─ Reset state to show LoginPage
```

### Material-UI Components Used

- **Box** - Layout container with sx props
- **Paper** - Elevated surface for forms
- **Typography** - Text with consistent styling
- **TextField** - Input fields
- **Button** - Action buttons with icons
- **Card/CardMedia/CardContent** - Image cards
- **Grid** - Responsive image grid
- **IconButton** - Edit/Delete/Save/Cancel buttons
- **MenuItem** - Dropdown options
- **Stack** - Flexbox layout helper

### Dashboard Features

**1. Image Upload Form**
- User-friendly form with validation
- Real-time file name display
- Batch selection dropdown
- Material-UI styled components
- Success/error feedback alerts

**2. Image Gallery**
- Responsive grid layout (4 columns on large screens)
- Search functionality (filters by photo name)
- Search results prioritized at top
- Displays all image metadata
- Shows AI-generated labels

**3. Admin Features**
- Edit photo names inline
- Delete images with confirmation
- Admin badge in header
- Conditional rendering based on role

**4. UI/UX Highlights**
- Clean, modern design with Material-UI
- Responsive layouts for mobile/tablet/desktop
- Consistent color scheme (blues and grays)
- Icon usage for better UX
- Loading states and error handling
- Confirmation dialogs for destructive actions

---

## Complete Workflow

### User Registration & Login

```
┌─────────────┐                  ┌──────────────┐                ┌──────────┐
│  Frontend   │                  │   Backend    │                │ MongoDB  │
└──────┬──────┘                  └──────┬───────┘                └────┬─────┘
       │                                │                             │
       │ 1. POST /api/auth/register     │                             │
       │ {username, email, password}    │                             │
       ├───────────────────────────────>│                             │
       │                                │ 2. Hash password (bcrypt)   │
       │                                │                             │
       │                                │ 3. Save user                │
       │                                ├────────────────────────────>│
       │                                │                             │
       │                                │ 4. User created             │
       │                                │<────────────────────────────┤
       │ 5. Success response            │                             │
       │<───────────────────────────────┤                             │
       │                                │                             │
       │ 6. POST /api/auth/login        │                             │
       │ {username, password}           │                             │
       ├───────────────────────────────>│                             │
       │                                │ 7. Find user                │
       │                                ├────────────────────────────>│
       │                                │                             │
       │                                │ 8. User data                │
       │                                │<────────────────────────────┤
       │                                │ 9. Compare passwords        │
       │                                │ 10. Generate JWT token      │
       │ 11. {accessToken}              │                             │
       │<───────────────────────────────┤                             │
       │ 12. Store token in localStorage│                             │
       │                                │                             │
```

### Image Upload Process

```
┌──────────┐         ┌─────────┐         ┌────────────┐         ┌──────────┐
│ Frontend │         │ Backend │         │ Cloudinary │         │ Clarifai │
└────┬─────┘         └────┬────┘         └─────┬──────┘         └────┬─────┘
     │                    │                    │                      │
     │ 1. User selects    │                    │                      │
     │    image file      │                    │                      │
     │                    │                    │                      │
     │ 2. POST /api/image/upload               │                      │
     │    FormData + JWT token                 │                      │
     ├───────────────────>│                    │                      │
     │                    │ 3. Verify JWT      │                      │
     │                    │ 4. Save temp file  │                      │
     │                    │ 5. Upload to cloud │                      │
     │                    ├───────────────────>│                      │
     │                    │                    │ 6. Store & return URL│
     │                    │<───────────────────┤                      │
     │                    │ 7. Send URL for AI │                      │
     │                    │    label detection │                      │
     │                    ├────────────────────┴─────────────────────>│
     │                    │                    │ 8. Analyze image     │
     │                    │                    │    Return labels     │
     │                    │<───────────────────┴──────────────────────┤
     │                    │ 9. Save to MongoDB │                      │
     │                    │    {url, publicId, │                      │
     │                    │     labels, etc.}  │                      │
     │ 10. Success        │                    │                      │
     │<───────────────────┤                    │                      │
     │ 11. Refresh gallery│                    │                      │
     │                    │                    │                      │
```

### Image Viewing & Search

```
┌──────────┐                  ┌──────────┐                  ┌──────────┐
│ Frontend │                  │ Backend  │                  │ MongoDB  │
└────┬─────┘                  └────┬─────┘                  └────┬─────┘
     │                             │                             │
     │ 1. GET /api/image/fetch     │                             │
     │    Authorization: Bearer token                            │
     ├────────────────────────────>│                             │
     │                             │ 2. Verify JWT               │
     │                             │ 3. Query all images         │
     │                             ├────────────────────────────>│
     │                             │                             │
     │                             │ 4. Return images array      │
     │                             │<────────────────────────────┤
     │ 5. Images data              │                             │
     │<────────────────────────────┤                             │
     │ 6. Display in grid          │                             │
     │ 7. User types search query  │                             │
     │ 8. Filter locally by name   │                             │
     │ 9. Reorder (matches first)  │                             │
     │                             │                             │
```

### Admin Operations

```
Edit Photo Name:
Frontend → PATCH /api/image/update-photo-name/:id
         → {photoName: "New Name"}
Backend  → Verify JWT + Find image + Update + Save
         → Return updated image

Delete Image:
Frontend → DELETE /api/image/delete/:id
Backend  → Verify JWT + Check admin role
         → Delete from Cloudinary (by publicId)
         → Delete from MongoDB
         → Return success
```

---

## API Documentation

### Base URL
```
Backend: http://localhost:3000
Frontend: http://localhost:3001
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "user"  // optional, defaults to "user"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securePassword123"
}

Response 200:
{
  "success": true,
  "message": "User logged in successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Change Password
```http
POST /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "securePassword123",
  "newPassword": "newSecurePassword456"
}

Response 200:
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Image Endpoints

#### 4. Upload Image
```http
POST /api/image/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- image: <file>
- photoName: "John Doe"
- eventType: "Tech Fest"
- batch: "H4"

Response 201:
{
  "success": true,
  "message": "Image uploaded successfully",
  "image": {
    "_id": "507f1f77bcf86cd799439011",
    "url": "https://res.cloudinary.com/...",
    "publicId": "abc123",
    "uploadedBy": "507f1f77bcf86cd799439012",
    "eventType": "Tech Fest",
    "batch": "H4",
    "photoName": "John Doe",
    "labels": ["person", "group", "event", "technology"],
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### 5. Fetch All Images
```http
GET /api/image/fetch
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "Images fetched successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "url": "https://res.cloudinary.com/...",
      "photoName": "John Doe",
      "eventType": "Tech Fest",
      "batch": "H4",
      "labels": ["person", "group"],
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 6. Update Photo Name
```http
PATCH /api/image/update-photo-name/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "photoName": "Jane Smith"
}

Response 200:
{
  "success": true,
  "message": "Photo name updated",
  "image": { ... }
}
```

#### 7. Delete Image (Admin Only)
```http
DELETE /api/image/delete/:id
Authorization: Bearer <token>

Response 200:
{
  "success": true,
  "message": "Image deleted"
}
```

### Admin Endpoints

#### 8. Admin Welcome
```http
GET /api/admin/welcome
Authorization: Bearer <token>

Response 200:
{
  "message": "Welcome to the home page!"
}
```

### Home Endpoints

#### 9. Home Route
```http
GET /api/home
Authorization: Bearer <token>

Response 200:
{
  "message": "Welcome to Home page!"
}
```

---

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john@example.com",
  password: "$2a$10$hashed_password_here",
  role: "user",  // or "admin"
  createdAt: ISODate("2024-01-15T10:00:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:00:00.000Z")
}
```

### Images Collection
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  publicId: "sample",
  uploadedBy: ObjectId("507f1f77bcf86cd799439011"),
  eventType: "Tech Fest",
  batch: "H4",
  photoName: "John Doe",
  labels: ["person", "group", "technology", "event"],
  createdAt: ISODate("2024-01-15T10:30:00.000Z"),
  updatedAt: ISODate("2024-01-15T10:30:00.000Z")
}
```

### Relationships
- `images.uploadedBy` references `users._id`
- One user can upload many images (One-to-Many)

---

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Clarifai API key

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd 7.NODEJS-AUTH
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/campus-gallery
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-gallery

JWT_SECRET=your_super_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

CLARIFAI_API_KEY=your_clarifai_api_key
```

4. **Start development server:**
```bash
npm run dev
```

Server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd campus-gallery-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start React development server:**
```bash
npm start
```

Frontend will run on `http://localhost:3001`

### Verification Steps

1. ✅ Backend server running on port 3000
2. ✅ MongoDB connected successfully
3. ✅ Frontend running on port 3001
4. ✅ CORS enabled for cross-origin requests
5. ✅ Can register a new user
6. ✅ Can login and receive JWT token
7. ✅ Can upload an image
8. ✅ Can view images in gallery

---

## Testing with Postman

### Setting Up Postman Collection

#### Create Environment Variables
```
backend_url = http://localhost:3000
token = (will be set after login)
```

### Test Sequence

#### 1. Register a User
```
POST {{backend_url}}/api/auth/register

Body (JSON):
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}

Expected: 201 Created
Save user credentials for next step
```

#### 2. Login
```
POST {{backend_url}}/api/auth/login

Body (JSON):
{
  "username": "testuser",
  "password": "password123"
}

Expected: 200 OK with accessToken
Action: Copy accessToken to environment variable
```

#### 3. Fetch Images
```
GET {{backend_url}}/api/image/fetch

Headers:
Authorization: Bearer {{token}}

Expected: 200 OK with images array
```

#### 4. Upload Image
```
POST {{backend_url}}/api/image/upload

Headers:
Authorization: Bearer {{token}}

Body (form-data):
- image: [select file]
- photoName: "Test User"
- eventType: "Tech Conference"
- batch: "H4"

Expected: 201 Created with image object
Verify: Image uploaded to Cloudinary
Verify: Labels generated by Clarifai
```

#### 5. Update Photo Name
```
PATCH {{backend_url}}/api/image/update-photo-name/:imageId

Headers:
Authorization: Bearer {{token}}
Content-Type: application/json

Body (JSON):
{
  "photoName": "Updated Name"
}

Expected: 200 OK
```

#### 6. Delete Image (Admin Only)
```
DELETE {{backend_url}}/api/image/delete/:imageId

Headers:
Authorization: Bearer {{token}}

Expected: 200 OK (if admin)
Expected: 403 Forbidden (if regular user)
```

#### 7. Change Password
```
POST {{backend_url}}/api/auth/change-password

Headers:
Authorization: Bearer {{token}}

Body (JSON):
{
  "oldPassword": "password123",
  "newPassword": "newPassword456"
}

Expected: 200 OK
```

### Testing Admin Features

#### Create Admin User
```
POST {{backend_url}}/api/auth/register

Body (JSON):
{
  "username": "admin",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

#### Test Admin Routes
```
GET {{backend_url}}/api/admin/welcome

Headers:
Authorization: Bearer {{admin_token}}

Expected: 200 OK (admin only)
Expected: 403 Forbidden (non-admin)
```

---

## Key Features Summary

### Security
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware
- ✅ Token expiration (30 minutes)

### Image Management
- ✅ Upload to Cloudinary CDN
- ✅ AI-powered auto-labeling (Clarifai)
- ✅ Metadata storage (event, batch, name)
- ✅ Search by photo name
- ✅ Edit photo names
- ✅ Delete images (admin only)

### User Experience
- ✅ Material-UI modern design
- ✅ Responsive layout
- ✅ Real-time search filtering
- ✅ Loading states and error handling
- ✅ Role-based UI elements
- ✅ Confirmation dialogs

### Analytics Potential
- ✅ Upload timestamps
- ✅ User attribution
- ✅ Event categorization
- ✅ Batch tracking
- ✅ AI-generated labels for insights

---

## Future Enhancements

1. **Advanced Analytics Dashboard**
   - Charts for upload trends
   - Most active users
   - Popular events
   - Label frequency analysis

2. **Enhanced Search**
   - Search by labels
   - Search by event type
   - Search by batch
   - Date range filtering

3. **Social Features**
   - Comments on images
   - Like/favorite images
   - Share images
   - Download images

4. **Performance**
   - Pagination for large galleries
   - Image lazy loading
   - Caching strategies
   - CDN optimization

5. **Additional AI Features**
   - Face detection
   - Text extraction (OCR)
   - Image similarity matching
   - Automatic event detection

---

## Conclusion

This Campus Event Gallery project demonstrates a complete full-stack application with:

- **Secure authentication** (JWT + bcrypt)
- **Cloud storage** (Cloudinary)
- **AI integration** (Clarifai)
- **Modern UI** (React + Material-UI)
- **RESTful API** (Express.js)
- **NoSQL database** (MongoDB)

Each team member has clear responsibilities that integrate seamlessly to create a functional, scalable application for managing campus event photos.

---

## Contact & Support

For questions or issues related to specific components:

- **Backend/Auth:** Harsh Prajapati
- **Cloudinary/Analytics:** Aaditya Jobanputra
- **Frontend/UI:** Devansh Patel

---

**Last Updated:** January 2025
**Version:** 1.0.0
