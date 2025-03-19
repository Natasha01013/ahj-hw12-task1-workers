import './style.css';

if ('serviceWorker' in navigator) {//Если браузер поддерживает Service Workers 
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js'); //Регистрируем sw.js, чтобы управлять кэшированием и оффлайн-режимом
  });
}

const content = document.getElementById('content');
const refreshButton = document.getElementById('refresh');

async function loadData() {
  try {
    const response = await fetch('https://ahj-hw12-task1-workers-backend.onrender.com/api/data'); //бэкенд лежит на render.com
    const data = await response.json();
    content.innerHTML = data.map(item => `<p>${item.text}</p>`).join('');
  } catch (error) {
    content.innerHTML = '<p>Не удалось загрузить данные. Проверьте подключение и обновите данные.</p>';
  }
}

loadData();

refreshButton.addEventListener('click', loadData);