#!/usr/bin/env python3
"""
generate_books_json.py

Scans a directory of Markdown files with YAML frontmatter and generates
a books.json file for the Next.js bookshelf.

Usage:
    python generate_books_json.py

Directory structure:
    _book_reviews/          # Your markdown files
        book1.md
        book2.md
    public/
        books.json          # Generated output
"""

import os
import json
import re
import yaml
from pathlib import Path

# Configuration
MARKDOWN_SOURCE_DIR = '_book_reviews'  # Where your .md files live
OUTPUT_JSON_PATH = 'public/books.json'  # Where to save the JSON

def parse_markdown_book(filepath):
    """
    Parse a Markdown file with YAML frontmatter into a book dictionary.
    
    Expected format:
    ---
    title: Book Title
    author: Author Name
    cover: /assets/covers/book.jpg
    rating: 5
    ---
    This is the review content.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading '{filepath}': {e}")
        return None

    # Extract YAML frontmatter and content
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)
    
    if not match:
        print(f"⚠️  No YAML frontmatter found in '{filepath}'. Skipping.")
        return None
    
    frontmatter_str = match.group(1)
    review_content = match.group(2).strip()
    
    try:
        metadata = yaml.safe_load(frontmatter_str)
    except yaml.YAMLError as e:
        print(f"❌ Invalid YAML in '{filepath}': {e}")
        return None
    
    # Validate required fields
    required_fields = ['title', 'author', 'cover']
    missing_fields = [field for field in required_fields if field not in metadata]
    
    if missing_fields:
        print(f"⚠️  Missing required fields {missing_fields} in '{filepath}'. Skipping.")
        return None
    
    # Build book data object
    book_data = {
        'title': metadata['title'],
        'author': metadata['author'],
        'cover': metadata['cover'],
        'review': review_content,
    }
    
    # Optional fields
    if 'rating' in metadata:
        book_data['rating'] = metadata['rating']
    if 'date_read' in metadata:
        book_data['date_read'] = str(metadata['date_read'])
    if 'tags' in metadata:
        book_data['tags'] = metadata['tags']
    
    return book_data

def generate_books_json():
    """
    Scan markdown directory and generate books.json file.
    """
    # Ensure directories exist
    markdown_dir = Path(MARKDOWN_SOURCE_DIR)
    if not markdown_dir.exists():
        print(f"❌ Directory '{MARKDOWN_SOURCE_DIR}' not found!")
        print(f"💡 Create it and add your book review markdown files.")
        return
    
    output_path = Path(OUTPUT_JSON_PATH)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Collect all books
    books = []
    print(f"\n📚 Scanning '{MARKDOWN_SOURCE_DIR}' for book reviews...\n")
    
    markdown_files = sorted(markdown_dir.glob('*.md'))
    
    if not markdown_files:
        print(f"⚠️  No .md files found in '{MARKDOWN_SOURCE_DIR}'")
        return
    
    for filepath in markdown_files:
        print(f"   Processing: {filepath.name}")
        book = parse_markdown_book(filepath)
        if book:
            books.append(book)
            print(f"   ✅ Added: {book['title']}")
        print()
    
    # Sort books alphabetically by title
    books.sort(key=lambda x: x['title'].lower())
    
    # Write JSON file
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(books, f, ensure_ascii=False, indent=2)
        
        print(f"\n✨ Success! Generated {len(books)} books")
        print(f"📄 Saved to: {OUTPUT_JSON_PATH}\n")
        
        # Show sample
        if books:
            print("📖 First book:")
            print(f"   Title: {books[0]['title']}")
            print(f"   Author: {books[0]['author']}")
            print(f"   Review: {books[0]['review'][:100]}...\n")
            
    except Exception as e:
        print(f"❌ Error writing JSON file: {e}")

def create_sample_review():
    """
    Create a sample book review file for reference.
    """
    sample_path = Path(MARKDOWN_SOURCE_DIR) / 'sample-book.md'
    
    if sample_path.exists():
        return
    
    sample_content = """---
title: "The Midnight Library"
author: "Matt Haig"
cover: "/assets/covers/midnight-library.jpg"
rating: 5
date_read: 2024-01-15
tags: ["fiction", "philosophy", "favorites"]
---

A profound exploration of regret, choice, and the infinite possibilities of life. 

The premise is captivating: Nora Seed finds herself in a library between life and death, where each book represents a different life she could have lived. The story beautifully examines how our choices shape who we become, and whether the "perfect" life actually exists.

What struck me most was the philosophical depth disguised as accessible fiction. Haig tackles existential questions about meaning, purpose, and happiness without becoming preachy. The writing is elegant and the pacing keeps you engaged throughout.

Highly recommended for anyone questioning their life choices or seeking perspective on what truly matters.
"""
    
    try:
        Path(MARKDOWN_SOURCE_DIR).mkdir(parents=True, exist_ok=True)
        with open(sample_path, 'w', encoding='utf-8') as f:
            f.write(sample_content)
        print(f"💡 Created sample file: {sample_path}")
    except Exception as e:
        print(f"Could not create sample file: {e}")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("  📚 Book Review Generator for Next.js Bookshelf")
    print("="*60 + "\n")
    
    # Create sample if directory doesn't exist
    if not Path(MARKDOWN_SOURCE_DIR).exists():
        print(f"Creating '{MARKDOWN_SOURCE_DIR}' directory with sample file...\n")
        create_sample_review()
    
    generate_books_json()
    
    print("="*60)
    print("  ✨ Done! Add more .md files and run again to update.")
    print("="*60 + "\n")