# CS Student Portfolio - Customization & Deployment Guide

This is a premium, cyber-dark style single-page portfolio website designed specifically for Computer Science students. It features responsive layouts, a floating canvas particle background, customized typing loops, and a custom mouse trail cursor.

---

## 🛠️ How to Customize Your Portfolio

### 1. Edit Text and Information
Open `index.html` in your editor. We have marked sections with `<!-- EDIT HERE -->` and `<!-- EDITABLE SECTION -->` comments.
- **SEO Title & Metadata**: Update lines 7–11 with your name and description.
- **Logo**: Update line 28 with your initials.
- **Hero & About Bio**: Update lines 48–60 (Hero Intro) and lines 86–105 (About Me profile summary).
- **Contact Details**: Update lines 231–254 with your email address, city, and social media profile handles.

### 2. Customize the Typing Words (Hero Section)
Open `script.js` in your editor.
- Locate line **137**:
  ```javascript
  const textArray = ["First-Year CS Student", "Creative Developer", "Problem Solver", "Tech Enthusiast"];
  ```
- Change these strings to whatever roles or skills you'd like to display!

### 3. Replace Images
Open the `assets/` directory.
- **Profile Avatar**: Replace `assets/avatar.png` with a picture of yourself. (Make sure to save it as `avatar.png` or update the `<img src="assets/avatar.png">` path in `index.html`).
- **Project Previews**: Replace `assets/project1.png` and `assets/project2.png` with screenshots of your own projects.

---

## 🚀 How to Host Your Real Website (Free Production Hosting)

To share your website with recruiters, friends, and peers, you can host it on the internet for free using any of the following standard approaches:

### Method A: GitHub Pages (Recommended for CS Students)
This is the best method because it links directly to your code repository and updates automatically whenever you commit changes.

1. **Initialize Git & Commit locally**:
   Open a terminal in the `cs-student-portfolio` folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: portfolio template"
   ```
2. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com) and sign in.
   - Create a new repository named `portfolio` (public).
   - Copy the repository remote commands and run them in your terminal:
     ```bash
     git remote add origin https://github.com/<your-username>/portfolio.git
     git branch -M main
     git push -u origin main
     ```
3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub.
   - In the sidebar, select **Pages**.
   - Under **Build and deployment -> Source**, select **Deploy from a branch**.
   - Choose the `main` branch and `/ (root)` folder, then click **Save**.
   - Your site will be live at `https://<your-username>.github.io/portfolio/` in a few minutes!

---

### Method B: Netlify Drag & Drop (Zero Commands, Easiest)
If you don't want to use command line tools, you can upload the folder directly.

1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Simply **drag and drop** your entire `cs-student-portfolio` folder into the upload box on the web page.
3. Netlify will compile it and give you a live production URL (e.g. `https://your-site.netlify.app`) in 5 seconds!
4. You can change the subdomain or connect a custom domain in your Netlify settings.

---

### Method C: Vercel CLI (Super Fast)
You can deploy directly using Vercel from your command line:

1. Open your terminal in the `cs-student-portfolio` directory and run:
   ```bash
   npx vercel
   ```
2. Follow the prompts (log in/sign up if you haven't, link a new project, select default settings).
3. In a few seconds, it will give you a live URL (`https://your-project.vercel.app`).
4. To deploy updates in the future, run:
   ```bash
   npx vercel --prod
   ```
