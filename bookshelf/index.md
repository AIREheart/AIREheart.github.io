---
layout: default
title: Bookshelf
---

# Bookshelf

<div class="bookshelf-grid">
  {% for book in site.pages %}
    {% if book.path contains 'bookshelf/' and book.title %}
      <div class="book">
        {% if book.cover %}
          <img src="{{ book.cover | relative_url }}" alt="Cover of {{ book.title }}">
        {% endif %}
        <h2><a href="{{ book.url | relative_url }}">{{ book.title }}</a></h2>
        <p><em>{{ book.author }}</em></p>
      </div>
    {% endif %}
  {% endfor %}
</div>
