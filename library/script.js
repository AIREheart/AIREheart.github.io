fetch('books.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('bookshelf');
    data.books.forEach(book => {
      const div = document.createElement('div');
      div.className = 'book';
      div.innerHTML = `
        <img src="images/${book.cover}" alt="${book.title}" />
        <div class="review">${book.review}</div>
      `;
      container.appendChild(div);
    });
  });
