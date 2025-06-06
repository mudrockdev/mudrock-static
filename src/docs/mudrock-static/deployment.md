---
title: Cloudflare Pages Deployment Guide
description: Complete guide to deploy mudrock-static on Cloudflare Pages
author: mudrock-static
date: 2024-12-28
---

# Cloudflare Pages Deployment Guide

This guide will walk you through deploying your mudrock-static SvelteKit application to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier is sufficient)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Node.js and Bun installed locally for testing

## Deployment Configuration

### Build Settings

When setting up your Cloudflare Pages project, use these configuration settings:

| Setting | Value |
|---------|--------|
| **Framework preset** | SvelteKit |
| **Build command** | `bun run build` |
| **Build output directory** | `build` |
| **Root directory** | `/` (leave empty if deploying from root) |

### Environment Variables

Set the following environment variable in your Cloudflare Pages dashboard:

| Variable | Value | Description |
|----------|-------|-------------|
| `BUN_VERSION` | `1.2.15` | Specifies the Bun version to use for builds |

## Step-by-Step Deployment

### 1. Connect Your Repository

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the left sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your Git provider and authorize Cloudflare
6. Select your repository containing the mudrock-static project

### 2. Configure Build Settings

1. **Project name**: Choose a name for your deployment (e.g., `my-docs-site`)
2. **Production branch**: Usually `main` or `master`
3. **Framework preset**: Select **SvelteKit**
4. **Build command**: Enter `bun run build`
5. **Build output directory**: Enter `build`
6. **Root directory**: Leave empty (unless your project is in a subdirectory)

### 3. Set Environment Variables

1. In the build settings section, expand **Environment variables**
2. Add a new variable:
   - **Variable name**: `BUN_VERSION`
   - **Value**: `1.2.15`
3. Click **Add variable**

### 4. Deploy

1. Click **Save and Deploy**
2. Cloudflare will start building your project
3. The initial build typically takes 2-5 minutes
4. Once complete, you'll get a `*.pages.dev` URL for your site

## Post-Deployment Configuration

### Custom Domain (Optional)

To use your own domain:

1. Go to your Pages project dashboard
2. Click on the **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain name
5. Follow the DNS configuration instructions

### Build Optimization

For faster builds and better performance:

1. **Enable build caching**: This is automatically enabled for Bun projects
2. **Optimize dependencies**: Remove unused packages from `package.json`
3. **Configure preview deployments**: Set up branch previews for testing

## Troubleshooting

### Common Build Issues

#### Build Command Not Found
```bash
Error: Command "bun" not found
```
**Solution**: Ensure `BUN_VERSION` environment variable is set to `1.2.15`

#### Out of Memory Errors
```bash
Error: JavaScript heap out of memory
```
**Solution**: Cloudflare Pages provides 1GB RAM for builds. If you need more, consider optimizing your build process or contact Cloudflare support.

#### Static Adapter Issues
```bash
Error: Cannot find module '@sveltejs/adapter-static'
```
**Solution**: Ensure `@sveltejs/adapter-static` is listed in your `devDependencies` in `package.json`

#### Prerender Errors
```bash
Error: The following routes were marked as prerenderable, but were not prerendered
```
**Solution**: This occurs when there are no markdown files in `/src/docs`. Either add some documentation files or modify the route configuration.

### Performance Optimization

#### Enable Compression
Cloudflare automatically enables Gzip and Brotli compression for static assets.

#### Configure Caching
Static assets are automatically cached with optimal headers. For custom caching rules:

1. Go to your domain in Cloudflare Dashboard
2. Navigate to **Caching** → **Page Rules**
3. Add rules for specific file types or paths

#### Image Optimization
Consider using Cloudflare Images for better performance:

1. Enable **Image Resizing** in your Cloudflare dashboard
2. Use `https://example.com/cdn-cgi/image/width=800/image.jpg` format

## Monitoring and Analytics

### Pages Analytics
Cloudflare provides built-in analytics:

1. Visit your Pages project dashboard
2. Click on the **Analytics** tab
3. View page views, unique visitors, and performance metrics

### Error Tracking
Monitor build and runtime errors:

1. Check the **Functions** tab for any serverless function errors
2. Use browser developer tools to debug client-side issues
3. Set up external monitoring tools like Sentry if needed

## Automatic Deployments

Cloudflare Pages automatically deploys when you push to your connected branch:

1. **Production deployments**: Triggered by pushes to your main branch
2. **Preview deployments**: Created for pull requests and other branches
3. **Build notifications**: Configure webhooks for build status updates

## Advanced Configuration

### Custom Build Scripts

If you need custom build logic, create a `_headers` file in your `static` directory:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### Redirects and Rewrites

Create a `_redirects` file in your `static` directory:

```
# Redirect old URLs
/old-path /new-path 301

# SPA fallback for client-side routing
/* /index.html 200
```

## Security Considerations

1. **HTTPS**: Automatically enabled for all `*.pages.dev` domains
2. **Headers**: Configure security headers in `_headers` file
3. **Environment Variables**: Never commit sensitive data to your repository
4. **Access Control**: Use Cloudflare Access for private documentation sites

## Cost and Limits

Cloudflare Pages offers generous free tier limits:

- **Builds**: 500 builds per month
- **Bandwidth**: Unlimited
- **Sites**: Up to 100 projects
- **Build time**: 20 minutes per build
- **File size**: 25MB per file
- **Total files**: 20,000 files per deployment

## Next Steps

After successful deployment:

1. Test your site thoroughly on the provided URL
2. Set up monitoring and alerts
3. Configure custom domains if needed
4. Optimize build times and bundle sizes
5. Set up branch previews for development workflow

## Support

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [SvelteKit Deployment Guide](https://kit.svelte.dev/docs/adapters)
- [Cloudflare Community](https://community.cloudflare.com/c/developers/pages/)

Your mudrock-static documentation site should now be live and automatically deploy with every push to your repository!