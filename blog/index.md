---
layout: default
title: Blog
---

# Blog

<ul class="post-list">
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p class="date">{{ post.date | date: "%B %d, %Y" }}</p>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
    </li>
  {% endfor %}
</ul>
