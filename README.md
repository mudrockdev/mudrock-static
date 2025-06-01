# Mudrock Static

A modern, fast, and beautiful static documentation site generator built with **SvelteKit 2** and **TailwindCSS 4**. Create elegant documentation from your markdown files with zero configuration.

![Dark Theme](https://img.shields.io/badge/theme-dark-000000)
![Svelte 5](https://img.shields.io/badge/svelte-5-ff3e00)
![TailwindCSS 4](https://img.shields.io/badge/tailwind-4-38bdf8)
![TypeScript](https://img.shields.io/badge/typescript-5-3178c6)

## ✨ Features

- 🌙 **Beautiful Dark Theme** - Modern, professional dark UI
- 📱 **Responsive Design** - Works perfectly on all devices
- 🗂️ **File Tree Navigation** - Interactive sidebar with folder/file structure
- 📝 **Markdown Support** - Full markdown rendering with mdsvex
- 🔗 **Anchor Links** - Automatic heading IDs and smooth scrolling
- ⚡ **Static Generation** - Fast, SEO-friendly static site
- 🎯 **Zero Config** - Just add markdown files and go
- ♿ **Accessible** - Keyboard navigation and screen reader friendly
- 🚀 **Modern Stack** - Built with latest Svelte 5 and TailwindCSS 4

## 🚀 Quick Start

### Prerequisites

- **Bun** 1.2+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mudrock-static
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start development server**
   ```bash
   # With npm
   npm run dev

   # With bun
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📚 Adding Your Documentation

### File Structure

Place your markdown files in the `src/docs/` directory:

```
src/
└── docs/
    ├── getting-started.md
    ├── api/
    │   ├── authentication.md
    │   └── endpoints.md
    └── guides/
        ├── installation.md
        └── configuration.md
```

### Markdown Files

Your markdown files will automatically appear in the sidebar navigation. The file structure becomes the navigation structure.

**Example markdown file:**

```markdown
# Getting Started

Welcome to the documentation!

## Quick Start

Here's how to get started...

### Installation

1. Install the package
2. Configure your settings
3. Start using it!

## Next Steps

- [API Reference](./api/authentication)
- [Configuration Guide](./guides/configuration)
```

### Markdown Features

The project supports standard markdown syntax including:

- **Headers** (H1-H6) with automatic anchor IDs
- **Lists** (ordered and unordered)
- **Code blocks** (fenced and indented)
- **Links** and **emphasis** (bold/italic)
- **Blockquotes** and horizontal rules
- **Tables** and inline code


## 🎨 Customization

### Styling

The site uses **TailwindCSS 4** with a custom dark theme. Key colors:

- **Background**: `slate-900`
- **Sidebar**: `slate-800`
- **Text**: `slate-100` / `slate-300`
- **Accent**: `blue-400` / `blue-600`

### Navigation

The sidebar automatically generates from your file structure:

- **Folders** → Collapsible sections with folder icons
- **Files** → Clickable items with document icons
- **Nesting** → Unlimited depth support

### Components

#### DocsTree
Main navigation component that renders the file tree.

#### DocsTreeNode
Individual tree node (file or folder) with hover effects and icons.

## 📖 Navigation Features

### File Tree
- **Smart Icons** - Folders and files have distinct icons
- **Hover Effects** - Smooth animations and visual feedback
- **Collapsible** - Folders can be expanded/collapsed
- **Clean Names** - `.md` extensions are automatically hidden

### Anchor Links
- **Auto-generated IDs** - Headings get automatic anchor IDs
- **Smooth Scrolling** - Animated scroll to sections
- **Table of Contents** - Works with markdown TOC links

## 🚀 Deployment

### Build for Production

```bash
bun run build
```

This generates a static site in the `build/` directory.

### Deploy to Static Hosts

The site works with any static hosting service:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

## 🎯 Roadmap

- [ ] Light theme toggle
- [ ] Search functionality
- [ ] Table of contents component
- [ ] Custom syntax highlighting themes
- [ ] Plugin system for custom components
- [ ] Multi-language support
