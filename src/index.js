import 'dotenv/config'
import express from 'express'
import { readFile } from 'node:fs/promises'

const app = express()
const PORT = process.env.PORT || 3000

/**
 * Маршрут для чтения содержимого файла и отправки его в ответе.
 * Если чтение файла завершится неудачно, отправляется ответ с ошибкой 500.
 *
 * @name GET/read-content
 * @function
 * @memberof module:app
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * @returns {void}
 * @throws {500} Внутренняя ошибка сервера - если возникнет проблема с чтением файла.
 */
app.get('/read-content', async (_req, res) => {
	try {
		/**
		 * Асинхронно читает содержимое файла `content.txt`
		 * @type {string}
		 */
		const data = await readFile('content.txt', 'utf8')
		res.status(200).send(data)
	} catch (error) {
		console.error('Ошибка при чтении файла:', error)
		res.status(500).send('Внутренняя ошибка сервера')
	}
})

/**
 * Запускает сервер и начинает прослушивать указанный порт.
 *
 * @function
 * @memberof module:app
 * @param {number} PORT - Номер порта, на котором сервер слушает запросы.
 * @returns {void}
 */
app.listen(PORT, () => {
	console.log(`Приложение (PID: ${process.pid}) слушает порт ${PORT}`)
})
