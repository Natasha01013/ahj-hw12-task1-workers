// Service Worker – для кэширования ресурсов и работы в фоне, даже если вкладка закрыта

importScripts( // Импортируем скрипт
  'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js' // Загружаем библиотеку Workbox с серверов Google
);

self.workbox.routing.registerRoute( //Регистрируем правило (маршрут) для обработки сетевых запросов
  //Проверяем, что запрашивается HTML-страница (document), а не скрипты, стили, картинки и т. д.
  // Т.е.когда браузер делает запрос, Workbox получает request и проверяет его destination (тип ресурса)
  //Если request.destination === 'document', значит, запрашивается веб-страница
  ({ request }) => request.destination === 'document', 

  //Определяем стратегию загрузки данных
  //Сначала пробуем загрузить данные из сети (Network First), если интернета нет — используем кэш
  new self.workbox.strategies.NetworkFirst()
);