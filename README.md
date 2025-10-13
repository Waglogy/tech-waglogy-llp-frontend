# 🚀 Waglogy Frontend Application

Modern, responsive React application for Waglogy's digital services platform with integrated AI chat system.

## ✨ Features

- 🎨 Modern, responsive UI design
- 💬 **AI Chat Widget** - Intelligent sales assistant
- 📝 Blog system with rich text editor
- 👥 Client management
- 💰 Payment tracking
- 📊 Admin dashboard
- 🔐 Authentication system
- 📱 Mobile-friendly design
- 🌙 Dark mode support
- ⚡ Fast performance with Vite

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Styling:** CSS3 with custom components
- **Rich Text:** TipTap Editor
- **HTTP Client:** Fetch API
- **State Management:** React Hooks

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd tech-waglogy-llp-frontend

# Install dependencies
npm install

# Set up environment variables
cp env.template .env
# Edit .env and update the values

# Start development server
npm run dev
```

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Chat API URL
VITE_CHAT_API_URL=http://localhost:3000
```

See `env.template` for more details.

## 🚀 Quick Start

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 💬 AI Chat System

The application includes a fully integrated AI chat widget powered by Waglogy's chat microservice.

### Setup

1. **Start the chat backend API:**
   ```bash
   # Backend should run on http://localhost:3000
   ```

2. **Configure environment:**
   ```env
   VITE_CHAT_API_URL=http://localhost:3000
   ```

3. **Access the chat:**
   - Look for the floating chat button in the bottom-right corner
   - Click to open and start chatting

### Documentation

- 📘 [Chat System Guide](./CHAT_SYSTEM_GUIDE.md) - Complete documentation
- 🚀 [Chat Setup Guide](./CHAT_SETUP.md) - Quick setup and troubleshooting

### Features

- ✅ Floating chat button on all pages
- ✅ Session persistence
- ✅ Conversation history
- ✅ User information collection
- ✅ Typing indicators
- ✅ Error handling
- ✅ Responsive design
- ✅ Auto-scroll messages

## 📁 Project Structure

```
src/
├── admin/              # Admin panel components
│   ├── components/     # Admin-specific components
│   └── pages/         # Admin pages
├── components/        # Shared components
│   ├── ChatWidget.jsx # AI chat widget ⭐
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ...
├── pages/            # Public pages
│   ├── Landing.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   └── ...
├── services/         # API services
│   ├── chatService.js # Chat API service ⭐
│   ├── blogService.js
│   └── ...
├── styles/           # CSS styles
│   ├── ChatWidget.css # Chat widget styles ⭐
│   └── ...
├── config/          # Configuration files
├── utils/           # Utility functions
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## 🎯 Available Routes

### Public Routes
- `/` - Landing page
- `/about` - About page
- `/services` - Services page
- `/blog` - Blog listing
- `/blog/:slug` - Blog detail
- `/projects` - Projects showcase
- `/pricing` - Pricing plans
- `/contact` - Contact form
- `/privacy-policy` - Privacy policy
- `/terms-conditions` - Terms and conditions

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Dashboard
- `/admin/contacts` - Contact management
- `/admin/queries` - Query management
- `/admin/clients` - Client management
- `/admin/payments` - Payment tracking
- `/admin/blogs` - Blog management

## 🧪 Testing the Chat

1. Open the application in your browser
2. Look for the purple chat button in the bottom-right
3. Click to open the chat window
4. Type a message and provide your name/email when prompted
5. Chat with the AI assistant!

### Troubleshooting

If chat doesn't work:

1. **Check backend is running:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Verify environment variable:**
   ```bash
   echo $VITE_CHAT_API_URL
   ```

3. **Check browser console** for errors

See [CHAT_SETUP.md](./CHAT_SETUP.md) for detailed troubleshooting.

## 📚 Additional Documentation

- [Blog System Guide](./BLOG_SYSTEM_GUIDE.md)
- [SEO Guide](./SEO_GUIDE.md)
- [SEO Quick Start](./SEO_QUICK_START.md)

## 🔧 Development

This project uses Vite with React and HMR (Hot Module Replacement).

### Official Vite Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) - Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) - Uses SWC for Fast Refresh

### React Compiler

The React Compiler is not enabled by default. To add it, see [React Compiler documentation](https://react.dev/learn/react-compiler/installation).

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Environment Variables for Production

Update `.env` or set environment variables in your deployment platform:

```env
VITE_CHAT_API_URL=https://your-production-api.com
```

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `VITE_CHAT_API_URL`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Email: support@waglogy.in
- Website: https://waglogy.in

## 📄 License

Copyright © 2025 Waglogy. All rights reserved.

---

**Built with ❤️ by the Waglogy Team**
