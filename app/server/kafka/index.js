const express = require('express')
const {KAFKA_HOST, KAFKA_TOPIC} = require('../env')
const {Kafka, CompressionTypes} = require('kafkajs')

// create kafka client
let kafka
if (KAFKA_HOST && KAFKA_TOPIC) {
  console.log('Initializing Kafka client')
  kafka = new Kafka({
    clientId: 'iot-center_' + require('os').hostname(),
    brokers: KAFKA_HOST.split(','),
  })
}

const router = express.Router()
// bigger bodies are expected
router.use(express.text({limit: '10mb'}))
// register an InfluxDB-compatible write endpoint forwards data to Kafka
router.post('/api/v2/write', async (req, res) => {
  if (!kafka) {
    res.status(500)
    res.end('Kafka is not configured!')
    return
  }
  const influxLineProtocolData = req.body
  try {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
      key: 'mykey',
      topic: KAFKA_TOPIC,
      messages: [{value: influxLineProtocolData}],
      compression: CompressionTypes.GZIP,
    })
  } catch (e) {
    res.status(500)
    res.end('Kafka producer error: ' + e)
    return
  }
  res.status(204)
  res.end()
})

module.exports = router
