# testing-cluster

## пример работы кластера

1. запуск приложения
   `npm start`
   `npm pm2_start`

2. проверка роута
   `curl http://localhost:3000/read-content`
3. проверка нагрузки на роут через "autocannon"
   `npx autocannon -d 11 --renderStatusCodes http://localhost:3001/read-content`

(npm start - 17k requests in 11.02s)
(npm pm2_start - 176k requests in 11.02s)
