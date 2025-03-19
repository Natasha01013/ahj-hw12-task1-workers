import './style.css';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js');
  });
}

const content = document.getElementById('content');
const refreshButton = document.getElementById('refresh');

async function loadData() {
  try {
    const response = await fetch('https://ahj-hw12-task1-workers-backend.onrender.com/api/data');
    const data = await response.json();
    content.innerHTML = data.map(item => `<p>${item.text}</p>`).join('');
  } catch (error) {
    content.innerHTML = '<p>Не удалось загрузить данные. Проверьте подключение и обновите данные.</p>';
  }
}

loadData();

refreshButton.addEventListener('click', loadData);