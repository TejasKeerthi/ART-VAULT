# ArtVault - Digital Art Showcase

A modern digital art gallery platform built with HTML, CSS, and JavaScript, featuring Firebase authentication and real-time artwork display.

## Features

- 🔐 Firebase Authentication (Email/Password & Google Sign-In)
- 🎨 Real-time artwork gallery
- 💼 Wallet connection support
- 📱 Responsive design
- 🎭 3D model viewer support

## Project Structure

```
art-vault/
├── index.html      # Main gallery page
├── login.html      # Authentication page
└── login.js        # Login functionality
```

## GitHub Pages Setup

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

### Automatic Deployment

1. Push your code to the `main` branch
2. Go to your repository settings on GitHub
3. Navigate to **Settings** → **Pages**
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site on every push to `main`

### Manual Setup (Alternative)

If you prefer to use the default GitHub Pages deployment:

1. Go to **Settings** → **Pages** in your repository
2. Under **Source**, select **Deploy from a branch**
3. Choose `main` branch and `/ (root)` folder
4. Click **Save**

Your site will be available at: `https://tejaskeerthi.github.io/ART-VAULT/`

## Local Development

Simply open `index.html` in your web browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Technologies Used

- HTML5
- Tailwind CSS (CDN)
- JavaScript
- Firebase (Authentication, Firestore, Storage)
- Google Model Viewer (for 3D models)

## Team

- KEERTHI TEJAS
- MANDADAPU LOKESH
- SHLOK JELLA

## License

© 2025 ArtVault. All rights reserved.

