/* Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео).
При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно. */

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  btn.classList.toggle('btn_show-second');
});