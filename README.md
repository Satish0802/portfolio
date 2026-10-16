## Local development

Install dependencies with `npm install`, then start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deploy to GitHub Pages

The `main` branch deploys automatically through `.github/workflows/deploy.yml`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The site is published at [satish0802.github.io/portfolio](https://satish0802.github.io/portfolio).

GitHub Pages serves static files only, so the contact form opens a prefilled email in the visitor's email app. The Next.js contact API route is not hosted by Pages; use a server host such as Vercel if server-side email delivery is required.
