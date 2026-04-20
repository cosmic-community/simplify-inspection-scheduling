# Simplify Inspection Scheduling

![App Preview](https://imgix.cosmicjs.com/35f27d10-3cd9-11f1-b186-117430a97b22-autopilot-photo-1541888946425-d81bb19240f5-1776703903570.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A professional inspection scheduling platform for Baltimore Permits, Inc. Coordinate required inspections efficiently, avoid missed deadlines, and keep projects on track.

## Features

- 🏗️ Project management with permit tracking
- 👷 Inspector profiles with certifications and specialties
- 🔍 Inspection scheduling with status and priority tracking
- 📱 Fully responsive design
- ⚡ Built with Next.js 16 and React 19
- 🎨 Modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e6593c7945ab7cc4f11262&clone_repository=69e65a547945ab7cc4f1129f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Simplify Inspection scheduling by coordinating required inspections efficiently, avoiding missed deadlines and project delays, with organized permitting expertise and local insight available through baltimorepermits.com."

### Code Generation Prompt

> Build a Next.js application for a website called "Simplify Inspection scheduling". The content is managed in Cosmic CMS with the following object types: projects, inspectors, inspections. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Cosmic SDK](https://www.cosmicjs.com/docs) - Content management

## Getting Started

### Prerequisites

- Bun or Node.js 18+
- A Cosmic account with content set up

### Installation

1. Clone this repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables in `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all projects
const { objects } = await cosmic.objects
  .find({ type: 'projects' })
  .depth(1)

// Fetch a single inspection with related data
const { object } = await cosmic.objects
  .findOne({ type: 'inspections', slug: 'inspection-slug' })
  .depth(1)
```

## Cosmic CMS Integration

The app uses three content types:
- **Projects**: Construction projects with details and permits
- **Inspectors**: Certified inspectors with specialties
- **Inspections**: Scheduled inspections linking projects and inspectors

## Deployment Options

### Vercel
Deploy with one click on [Vercel](https://vercel.com/new).

### Netlify
Deploy on [Netlify](https://app.netlify.com/start).

Set environment variables in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->