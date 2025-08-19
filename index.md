---
layout: default
title: Home
---

<div class="landing-container">

  <!-- Fig + Intro -->
  <div class="intro">
    <img src="/assets/images/fig.png" alt="Fig drawing" class="fig-illustration">
    <div class="intro-text">
      <h1>Hi there – would you like a <a href="https://www.whatshouldireadnext.com/quotes/sylvia-plath-i-saw-my-life-branching">fig</a>?</h1>
      <p>Here’s a rooting place for where my mind wanders, where thoughts take shape
      and where I’ll share my curious exploration across various domains.</p>
    </div>
  </div>

  <!-- About -->
  <div class="about-section">
    <h2>📜 Gnothi seauton</h2>
    <p>
      Biochemist by training with over 4 years spanning R&D in academia, government
      and vaccine biotech. Interests: CompBio, repro-devo bio, mindful consumption,
      and most currently the AI × bio interface.
    </p>
    
    </p>
    High likelihood of finding me:
    - Drifting into existentialistic pondering (bordering on nhilism) <br>
    - Overthinking <br>
    - Flirting with disciplines of which I do not have the necessary prerequisites (my undergrad transcript will tell you that) <br>
    Follow for insights on biotechnology, policy and digitized biology
    *mechanistic interpretability, grasping with dev-interp metrics
    </p>


  </div>

  <!-- Latest Musings -->
  <div class="posts-section">
    <h2>✍️ Latest Musings</h2>
    {% for post in site.posts limit:3 %}
      <div class="post-preview">
        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p>{{ post.excerpt | strip_html | truncate: 100 }}</p>
      </div>
    {% endfor %}
  </div>

  <!-- Mindful Consumptions -->
  <div class="consumptions-section">
    <h2>🌿 Mindful Consumptions</h2>
    <p>In an active effort to enforce more intentional thinking, here’s my reading
       list of stellar sources.</p>
  </div>

</div>
