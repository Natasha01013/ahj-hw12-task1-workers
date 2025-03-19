//Web Worker – для выполнения фоновых вычислений в отдельном потоке, не блокируя основной поток JavaScript,
//Для избегания зависаний

self.addEventListener('message', (event) => {//Слушаем событие message. self - глобальный объект внутри Web Worker (как window)
  const data = event.data; // event.data содержит переданные данные 
  const result = data.map(item => item * 2); //
  self.postMessage(result); //Отправляем обработанные данные обратно в основной поток
});