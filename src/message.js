import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import process from 'node:process'

const numCPUs = availableParallelism()

// Проверяем, является ли текущий процесс главным (primary)
if (cluster.isPrimary) {
	console.log(`Главный процесс ${process.pid} запущен.`)

	// Создаём количество воркеров, равное числу доступных ядер процессора
	for (let i = 0; i < numCPUs; i++) {
		const worker = cluster.fork()

		// Получаем сообщения от воркеров и обрабатываем их в главном процессе
		worker.on('message', msg => {
			console.log(
				`Главный процесс ${process.pid} получил сообщение от воркера ${worker.process.pid}:`,
				msg
			)
		})
	}

	// Если это воркер (worker), выполняем соответствующие действия
} else if (cluster.isWorker) {
	console.log(`Воркер ${process.pid} активен.`)

	// Отправляем сообщение главному процессу
	process.send({
		msgFromWorker: `Сообщение отправлено от воркера ${process.pid}.`,
	})
}
