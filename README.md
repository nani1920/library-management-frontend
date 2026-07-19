# Lumina Library — Frontend

A modern Library Management System frontend built with React and Vite. Users can browse books, borrow and return them, manage a wishlist, track their reading history, and view their profile.

---

## Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool and dev server
- **React Router DOM v7** — Client-side routing
- **Tailwind CSS v4** — Styling
- **React Icons** — Icon library

---

## Features

- User registration and login with JWT authentication
- Protected routes — unauthenticated users are redirected to login
- Browse all books with search and pagination
- Borrow and return books with confirmation modals
- Wishlist — add/remove books, persisted via backend API
- My Books — view full borrow history filtered by All / Borrowed / Returned
- Profile page — user info, reading stats, and logout
- Fully responsive — sidebar layout on desktop, bottom navbar on mobile

---

## Project Structure

```
lib-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BookDetails/
│   │   │   └── BookDetailsCard.jsx
│   │   ├── BrowseBooks/
│   │   │   └── BookCard.jsx
│   │   ├── common/
│   │   │   ├── ConfirmationModal.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Spinner.jsx
│   │   ├── currentlyReading/
│   │   │   ├── BookCard.jsx
│   │   │   ├── CurrentlyReading.jsx
│   │   │   ├── RecommendedBook.jsx
│   │   │   └── RecommendedBookCard.jsx
│   │   ├── Mybooks/
│   │   │   ├── BookCard.jsx
│   │   │   ├── MyBooksList.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   └── Tabs.jsx
│   │   ├── Wishlist/
│   │   │   └── WishlistBookCard.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatsCards.jsx
│   │   └── Tabs.jsx
│   ├── hooks/
│   │   ├── useBookDetails.jsx
│   │   ├── useBooks.jsx
│   │   ├── useBooksHistory.jsx
│   │   ├── useCurrentlyReading.jsx
│   │   ├── useProfile.jsx
│   │   ├── useRecommendedBooks.jsx
│   │   └── useWishlist.jsx
│   ├── pages/
│   │   ├── BookDetails.jsx
│   │   ├── Books.jsx
│   │   ├── home.jsx
│   │   ├── login.jsx
│   │   ├── MyBooks.jsx
│   │   ├── PageNotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── register.jsx
│   │   └── Wishlist.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── deleteWishlist.js
│   │   ├── getBookDetails.js
│   │   ├── getBooks.js
│   │   ├── getBooksHistory.js
│   │   ├── getCurrentlyReading.js
│   │   ├── getProfile.js
│   │   ├── getRecommendedBooks.js
│   │   ├── getWishlist.js
│   │   ├── postBorrowBook.js
│   │   ├── postLogin.js
│   │   ├── postRegister.js
│   │   ├── postReturnBook.js
│   │   └── postWishlist.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

---

## Routes

| Path | Page | Protected |
|---|---|---|
| `/register` | Register | ❌ |
| `/login` | Login | ❌ |
| `/` | Home | ✅ |
| `/books` | Browse Books | ✅ |
| `/books/:bookId` | Book Details | ✅ |
| `/books/me` | My Books | ✅ |
| `/books/saved` | Wishlist | ✅ |
| `/profile` | Profile | ✅ |
| `*` | 404 Not Found | ❌ |

---

## API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/books` | Get paginated list of books |
| GET | `/api/books/:bookId` | Get single book details |
| POST | `/api/books/:bookId/borrow` | Borrow a book |
| POST | `/api/books/:bookId/return` | Return a book |
| GET | `/api/members/me` | Get logged-in user profile |
| GET | `/api/members/me/books` | Get currently borrowed books |
| GET | `/api/members/me/history` | Get full borrow history |
| GET | `/api/wishlist` | Get user's wishlist |
| POST | `/api/wishlist/:bookId` | Add a book to wishlist |
| DELETE | `/api/wishlist/:bookId` | Remove a book from wishlist |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Backend server running (see backend repo)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project
cd LIB-frontend/lib-app

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the `lib-app/` directory:

```env
VITE_API_URL=http://localhost:8000/api
```

Replace the URL with your backend server's base URL.

### Running the App

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Authentication

- On login, the JWT token is stored in `localStorage` under the key `LibraryAuthToken`
- All protected API calls include the token in the `Authorization: Bearer <token>` header
- `ProtectedRoute` checks for the token on every protected route — if missing, redirects to `/login`
- Logout clears the token from `localStorage` and redirects to `/login`

---

## Key Components

- **ConfirmationModal** — Reusable modal with loading, success, and error states used across borrow, return, and wishlist actions
- **ProtectedRoute** — Wraps all authenticated routes
- **Spinner** — Centered loading indicator
- **NotFoundItems** — Empty state UI with customizable title and message
