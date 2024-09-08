import cluster from 'node:cluster'
import { availableParallelism } from 'node:os'
import process from 'node:process'

const cpuCount = availableParallelism()

console.log(`Cpu count=${cpuCount}`)

console.log(`Primary pid=${process.pid}`)

/**
 * Настраивает главный процесс (primary) для кластеризации.
 * Указывает файл, который будет исполняться воркерами (worker).
 * В данном случае это 'index.js'.
 */
cluster.setupPrimary({
	exec: 'index.js',
})

/**
 * Создаёт количество воркеров, равное числу доступных ядер процессора.
 * Каждый воркер является новым экземпляром процесса, выполняющего файл 'index.js'.
 */
for (let i = 0; i < cpuCount; i++) {
	cluster.fork()
}

/**
 * Событие, которое вызывается при завершении работы воркера.
 * Логирует завершение работы воркера и запускает новый воркер для его замены.
 *
 * @event cluster#exit
 * @param {Object} worker - Объект воркера, который завершил работу
 * @param {number} _code - Код завершения процесса (игнорируется)
 * @param {string} _signal - Сигнал, который привёл к завершению (игнорируется)
 */
cluster.on('exit', (worker, _code, _signal) => {
	console.log(`Worker ${worker.process.pid} завершил работу.`)
	console.log('Запускается новый воркер для замены.')
	cluster.fork()
})
