# Waglogy Admin Panel

A modern, black and white themed admin panel for managing contacts, queries, clients, and payments.

## Features

### 🔐 Authentication
- Simple login system with demo credentials
- Protected routes with authentication check
- Session persistence using localStorage

### 📊 Dashboard
- Overview statistics for contacts, queries, clients, and payments
- Recent activity feed
- Visual stats cards with trending information

### 📧 Contacts Management
- View all contact form submissions
- Filter by status (New, In Progress, Replied)
- Detailed contact view modal
- Delete functionality

### 💬 Queries Management
- Track service inquiries and quotes
- Filter by priority (High, Medium, Low)
- Budget and timeline tracking
- Detailed query view modal

### 👥 Clients Management
- Add new clients with complete details
- Edit existing client information
- Track client status (Active, On Hold, Completed)
- Service type and revenue tracking
- Delete clients

### 💰 Payments Management
- Add payment records
- Track payment status (Paid, Pending, Overdue)
- Payment method tracking
- Invoice number management
- Real-time statistics (Total Paid, Pending, Overdue)
- Download invoice functionality (UI ready)

## Access Information

### Login Credentials
- **Email:** admin@waglogy.com
- **Password:** admin123

### Routes
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`
- Contacts: `/admin/contacts`
- Queries: `/admin/queries`
- Clients: `/admin/clients`
- Payments: `/admin/payments`

## Design

- **Theme:** Modern black and white
- **UI Framework:** Tailwind CSS
- **Icons:** React Icons (Feather Icons)
- **Responsive:** Fully responsive design
- **Sidebar:** Collapsible navigation

## Current State

All data is currently stored in component state (dummy data). This is ready for API integration.

### Next Steps for Production:
1. Replace localStorage authentication with proper JWT/session management
2. Connect to backend APIs for all CRUD operations
3. Add proper form validation
4. Implement actual file download for invoices
5. Add pagination for large datasets
6. Implement search functionality
7. Add export features (CSV, PDF)
8. Set up role-based access control if needed

## Tech Stack
- React 19
- React Router DOM
- Tailwind CSS
- React Icons
- Vite

