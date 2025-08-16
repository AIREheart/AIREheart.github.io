# Aaisha’s Website

This is my personal site, built with Jekyll and deployed on GitHub Pages.

## Structure
- `_posts/` → Blog entries (Markdown)
- `projects/` → Project showcase pages
- `bookshelf/` → Book reviews, auto-rendered into a bookshelf layout
- `_layouts/` → Page templates
- `_includes/` → Navbar, footer, etc.

## How to Add Content
1. **Blog post**: add a file to `_posts/` named `YYYY-MM-DD-title.md`.
2. **Project**: add a `.md` file in `projects/`.
3. **Book Review**: add a `.md` file in `bookshelf/` with frontmatter for cover, author, review.

## Local Development
```bash
bundle exec jekyll serve
 
