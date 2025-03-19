const path = require('node:path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin'); //интегрирует Workbox (библиотеку для работы с Service Worker) в процесс сборки
const CopyPlugin = require('copy-webpack-plugin'); //чтобы копировать файлы и папки из исходного кода (src/) в папку сборки (dist/)

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
            MiniCSSExtractPlugin.loader, 
            'css-loader'
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [ //массив объектов, которые указывают, какие файлы копировать и куда
        { from: 'src/sw.js', to: 'sw.js' }, // src/sw.js копируется в dist/sw.js, т.к. не импортируется в коде как модуль. Необходимо для работы Service Worker
      ],
    }),
    new WorkboxPlugin.GenerateSW({ // Плагин WorkboxPlugin генерирует Service Worker (sw.js) автоматически. GenerateSW - для простых сценариев
      clientsClaim: true, //Когда обновляется Service Worker, он сразу начинает управлять страницами, даже если они были загружены старой версией
      skipWaiting: true, //Позволяет обновлённому Service Worker сразу заменить старый
      runtimeCaching: [ //Правила кэширования для сетевых запросов
        {
          urlPattern: /^https:\/\/ahj-hw12-task1-workers-backend\.onrender\.com\/api\//, //Перехватываем запросы к API (https://ahj-hw12-task1-workers-backend.onrender.com/api/).
          handler: 'NetworkFirst', //Используем стратегию NetworkFirst - сначала пробуем загрузить данные из сети, если сети нет - берем из кэша
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/, //Кэшируем изображения (png, jpg, jpeg, svg).
          handler: 'CacheFirst', //Используем стратегию CacheFirst - сначала пробуем загрузить из кэша, если нет - скачиваем из сети
          options: {
            cacheName: 'images',
            expiration: {
              maxEntries: 10, //Храним не больше 10 изображений
            },
          },
        },
      ],
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCSSExtractPlugin()
  ],
};
