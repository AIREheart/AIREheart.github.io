--- 
layout: default 
title: Home
---
# Aaisha says 👋🏽🌎
<div class="intro-section my-8 text-center">
<p class="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
Hello there! This is where my mind wanders, where thoughts take shape, and where I share my journey of curious exploration across various domains.
</p>
<p class="text-md text-gray-600 mt-4">
Follow my insights on technology, biology, policy, and personal growth.
</p>
</div>

<hr class="border-t-2 border-D9E2D2 my-8 w-1/3 mx-auto rounded-full">

🏛️ Gnothi seauthon (know thyself)
<p class="text-gray-600 text-sm italic mb-4">My theory of change/impact: low probability but high impact (that could sneak attack); so as to avoid black swans.</p>

💭 Mindful Consumptions - routing more intentional thinking
<hr class="border-t-2 border-D9E2D2 my-8 w-1/3 mx-auto rounded-full">

<h2 class="text-3xl font-bold text-center mb-8 text-2A5C50">Latest Musings ✍️</h2>
<ul class="post-list max-w-xl mx-auto">
{% for post in site.posts limit:3 %}
<li>
<h3 class="text-xl font-semibold mb-1">
<a href="{{ post.url | relative_url }}">{{ post.title }}</a>
</h3>
<p class="text-sm text-gray-600 mb-2">{{ post.date | date: "%B %d, %Y" }}</p>
<p class="text-gray-700">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
<a href="{{ post.url | relative_url }}" class="text-sm font-medium mt-2 inline-block">Read More &rarr;</a>
</li>
{% endfor %}
</ul>

<hr class="border-t-2 border-D9E2D2 my-8 w-1/3 mx-auto rounded-full">

🌋 Adventures
Whimsy 🫧
