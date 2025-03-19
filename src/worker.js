self.addEventListener('message', (event) => {
  const data = event.data;
  const result = data.map(item => item * 2);
  self.postMessage(result);
});