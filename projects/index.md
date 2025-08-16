---
layout: default
title: Projects
---

# Projects

<div class="project-list">
  {% for project in site.pages %}
    {% if project.path contains 'projects/' and project.title %}
      <div class="project">
        <h2><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h2>
        {% if project.description %}
          <p>{{ project.description }}</p>
        {% endif %}
      </div>
    {% endif %}
  {% endfor %}
</div>
