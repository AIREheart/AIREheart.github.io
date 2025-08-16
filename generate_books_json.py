# filename: generate_books_json.py

import os
import json
import re
import yaml # You'll need to install this: pip install PyYAML

def parse_markdown_book(filepath):
    """
    Parses a single Markdown file with YAML front matter into a book dictionary.
    Assumes the format:
    ---
    title: Book Title
    author: Author Name
    cover: https://example.com/cover.jpg
    ---
    This is the review content.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find YAML front matter (between --- lines) and the rest as content
    match = re.match(r'---\n(.*?)\n---(.*)', content, re.DOTALL)

    if match:
        front_matter_str = match.group(1)
        review_content = match.group(2).strip()

        try:
            metadata = yaml.safe_load(front_matter_str)
        except yaml.YAMLError as e:
            print(f"Error: Could not parse YAML in '{filepath}': {e}")
            return None

        # Check for required metadata fields
        if not all(k in metadata for k in ['title', 'author', 'cover']):
            print(f"Warning: Missing required metadata (title, author, or cover) in '{filepath}'. Skipping.")
            return None

        book_data = {
            'title': metadata['title'],
            'author': metadata['author'],
            'cover': metadata['cover'],
            'review': review_content
        }
        return book_data
    else:
        print(f"Warning: No YAML front matter found in '{filepath}'. Skipping.")
        return None

def generate_books_json(markdown_dir, output_json_path):
    """
    Scans a directory for Markdown files, parses them, and generates a books.json file.
    """
    books = []
    if not os.path.exists(markdown_dir):
        print(f"Error: Markdown directory '{markdown_dir}' not found. Please create it or check the path.")
        return

    print(f"Scanning '{markdown_dir}' for Markdown files...")
    for filename in os.listdir(markdown_dir):
        if filename.endswith(".md"):
            filepath = os.path.join(markdown_dir, filename)
            book = parse_markdown_book(filepath)
            if book:
                books.append(book)

    # Sort books alphabetically by title for consistent order
    books.sort(key=lambda x: x['title'].lower())

    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)
    print(f"Successfully generated {len(books)} books and saved to '{output_json_path}'")

if __name__ == "__main__":
    # --- Configuration ---
    # This is the directory where you will put your individual book Markdown files.
    # It should be relative to where you run this script.
    MARKDOWN_SOURCE_DIRECTORY = '_book_md'

    # This is the name and path for the generated JSON file.
    # It will be placed in the same directory as this script.
    OUTPUT_JSON_FILENAME = 'books.json'
    # --- End Configuration ---

    generate_books_json(MARKDOWN_SOURCE_DIRECTORY, OUTPUT_JSON_FILENAME)

