# shadospace

shadospace is a modern blogging platform for developers and teams. It combines a clean writing experience with authentication, rich text editing, and scalable content management so you can launch a solo blog and grow to a multi-author publication.

## ✨ Features

- Developer-focused blogging experience with a responsive UI.
- Rich text editing powered by Tiptap.
- Authentication and user accounts via Better Auth.
- PostgreSQL persistence with Drizzle ORM.
- Built on Next.js App Router with server actions.

## 🧰 Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** Tailwind CSS, shadcn/ui
- **Editor:** Tiptap
- **Auth:** Better Auth
- **Database:** PostgreSQL + Drizzle ORM

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- PostgreSQL database (local or hosted)

### Installation

```bash
npm install
bun install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
DATABASE_URL=your neon database connection string
BETTER_AUTH_SECRET=your better auth secret
BETTER_AUTH_URL=localhost for dev & prod url
GOOGLE_CLIENT_ID=google client id
GOOGLE_CLIENT_SECRET=google client secret
SHADOSPACE_READ_WRITE_TOKEN=vercel blob read write token
```

> **Note:** Google OAuth is optional; omit the credentials if you are not using Google login.

### Run the App

```bash
npm run dev
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🧪 Scripts

```bash
bun run dev      # start development server
bun run build    # build for production
```

## 🤝 Contributing

Contributions are welcome! If you'd like to help improve ShadoSpace:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push to your fork: `git push origin feature/your-feature`.
5. Open a Pull Request describing your changes.

Please keep PRs focused and include context, screenshots (if UI changes), and any relevant testing information.

## ⭐ Show Your Support

If you find shadospace useful, please consider giving the project a star on GitHub. It helps others discover the project and motivates continued development!

## 📄 License

This project is currently not licensed. If you'd like to use it in your own work, please open an issue to discuss licensing.
