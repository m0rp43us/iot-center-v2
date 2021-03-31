const express = require('express')
const {KAFKA_HOST, KAFKA_TOPIC} = require('../env')
const {KafkaClient, Producer} = require('kafka-node')

// create kafka producer
let kafkaClient
if (KAFKA_HOST && KAFKA_TOPIC) {
  console.log('Initializing Kafka producer')
  kafkaClient = new KafkaClient({
    kafkaHost: KAFKA_HOST,
    connectTimeout: 5000,
  })
}

const router = express.Router()
// bigger bodies are expected
router.use(express.text({limit: '10mb'}))
// write endpoint that writes data to Kafka
router.post('/api/v2/write', async (req, res) => {
  if (!kafkaClient) {
    res.status(500)
    res.end('Kafka is not configured!')
    return
  }
  const influxLineProtocolData = req.body
  const producer = new Producer(kafkaClient)
  try {
    await new Promise((resolve, reject) => {
      producer.on('ready', () => {
        producer.send(
          {
            topic: KAFKA_TOPIC,
            messages: influxLineProtocolData,
            attributes: 2 /* snappy compression */,
          },
          (err) => {
            if (err) {
              console.error('Kafka send fails:', err)
              reject(err)
            } else {
              resolve()
            }
          }
        )
      })
      producer.on('error', (e) => {
        reject(e)
      })
    })
  } catch (e) {
    res.status(500)
    res.end('Kafka producer error: ' + e)
  }
})

module.exports = router
