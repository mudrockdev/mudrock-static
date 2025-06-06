---
title: Cloudflare Pages Deployment Guide
description: Complete guide to deploy mudrock-static on Cloudflare Pages
author: mudrockdev
date: 2025-06-06
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
| **Framework preset** | Svelte |
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
3. **Framework preset**: Select **Svelte**
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

Your mudrock-static documentation site should now be live and automatically deploy with every push to your repository!
