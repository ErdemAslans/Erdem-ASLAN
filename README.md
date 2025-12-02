# Erdem Aslan - Portfolio

A modern, professional portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Features

- Responsive design (mobile-first)
- Smooth scroll animations
- Project filtering by category
- Timeline-based experience section
- Glass-morphism UI components
- Dark theme with midnight blue palette
- Optimized performance

## Project Structure

```
portfolio-site/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── GradientText.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   ├── TechTag.jsx
│   │   │   └── index.js
│   │   ├── About.jsx
│   │   ├── Background.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   └── index.js
│   ├── data/
│   │   ├── contact.js
│   │   ├── experience.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── hooks/
│   │   ├── useActiveSection.js
│   │   ├── useScrollPosition.js
│   │   └── index.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── constants.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── jsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ErdemAslans/portfolio-site.git

# Navigate to project directory
cd portfolio-site

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect Vite and deploy

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## Django Backend Integration

This frontend is designed to work with a Django backend. To integrate:

### 1. API Configuration

Update `vite.config.js` proxy settings:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

### 2. Create API Service

Create `src/services/api.js`:

```javascript
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  async getProjects() {
    const response = await fetch(`${API_BASE}/projects/`);
    return response.json();
  },
  
  async getExperience() {
    const response = await fetch(`${API_BASE}/experience/`);
    return response.json();
  },
  
  async submitContact(data) {
    const response = await fetch(`${API_BASE}/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### 3. Django CORS Setup

Install django-cors-headers in your Django project:

```bash
pip install django-cors-headers
```

Add to Django settings:

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-production-domain.com",
]
```

## Environment Variables

Create `.env` file for production:

```env
VITE_API_URL=https://api.your-domain.com
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  midnight: { ... },
  navy: { ... },
  cyan: { ... },
}
```

### Content

Update data files in `src/data/`:
- `projects.js` - Your projects
- `experience.js` - Work experience
- `skills.js` - Technical skills
- `contact.js` - Contact information

## Performance

- Lazy loading with Intersection Observer
- Optimized animations with Framer Motion
- Code splitting with Vite
- Tailwind CSS purging unused styles

## License

MIT License - Feel free to use this template for your own portfolio.

## Author

**Erdem Aslan**
- GitHub: [@ErdemAslans](https://github.com/ErdemAslans)
- LinkedIn: [Erdem Aslan](https://linkedin.com/in/erdem-aslan-3ab33b284)
