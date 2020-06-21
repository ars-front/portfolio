
document.querySelector('.adv').remove();

document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
let Books = document.querySelectorAll('.books');
let books = document.querySelectorAll('.books> .book');
books[0].before(books[1]);
books[2].before(books[4]);
books[2].before(books[3]);
books[2].before(books[5]);
books[4].querySelector('h2>a').textContent="Книга 3. this и Прототипы Объектов";
let Paragraph = books[0].querySelectorAll('li');
let Paragraph2 = books[5].querySelectorAll('li');
Paragraph[4].before(Paragraph[6]);
Paragraph[4].before(Paragraph[8]);
Paragraph2[2].before(Paragraph2[9]);
Paragraph2[4].after(Paragraph2[2]);
Paragraph2[7].before(Paragraph2[5]);
Paragraph2[5].before(Paragraph2[7]);
let Paragraph6 = books[2].querySelectorAll('li');
let chapter8 = document.createElement('li');
chapter8.textContent = 'Глава 8: За пределами ES6';
Paragraph6[9].before(chapter8);

