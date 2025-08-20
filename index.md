---
layout: default
title: Home
---

<div class="landing-container">
  <div class="landing-left">
    <img src="/assets/images/fig.png" alt="Fig illustration" class="fig-img">
    <p class="fig-caption">Fig 3</p>
  </div>

  <div class="landing-right">
    <h1>Hi there – would you like a <a href="https://www.whatshouldireadnext.com/quotes/sylvia-plath-i-saw-my-life-branching">fig</a>?</h1>
    <p class="intro-text">
      Here’s a rooting place for where my mind wanders, where thoughts take shape
      and where I’ll share my curious exploration across various domains.
    </p>

    <h2>📜 Gnothi seauton</h2>
    <p>
      Biochemist by training with over 4 years spanning R&D in academia, government and vaccine biotech. <br>
      Interests: CompBio, repro-devo bio, mindful consumption, and most currently the AI × bio interface* <br>
      
    </p>
      There is a high likelihood of finding me:
    <ul class="intro-list">
      <li>🌊 Drifting into existentialistic pondering (bordering on nihilism)</li>
      <li>📖 Reading <a href="https://aireheart.github.io/bookshelf/"></li>
      <li>🧪 Flirting with disciplines of which I do not have the necessary prerequisites</li>
    </ul>

    <p class="footnote">
      * mechanistic interpretability, grasping with dev-interp metrics,
    </p>

    <!-- Latest Musings -->
  <div class="posts-section">
    <h2>✍🏽 Latest Musings</h2>
    {% for post in site.posts limit:3 %}
      <div class="post-preview">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 100 }}</p>
      </div>
    {% endfor %}
  </div>
  

    <h2>☁️ Mindful Consumptions</h2>
    <p>
      In an active effort to enforce routing more intentional thinking,
      here’s my reading list of stellar sources.
    </p>
  </div>
</div>

