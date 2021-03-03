// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert.

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert(`Размеры вашего экрана: ${window.screen.width} x ${window.screen.height}`);
})
