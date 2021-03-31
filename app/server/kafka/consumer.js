const {KAFKA_HOST, KAFKA_TOPIC} = require('../env')
const {Kafka} = require('kafkajs')

// create kafka producer
let kafka
if (KAFKA_HOST && KAFKA_TOPIC) {
  console.log('Initializing Kafka client')
  kafka = new Kafka({
    clientId: 'iot-center_' + require('os').hostname(),
    brokers: KAFKA_HOST.split(','),
  })
  const consumer = kafka.consumer({groupId: 'my-group'})

  ;(async function () {
    console.log('Consumer connecting')
    await consumer.connect()
    console.log('Create subscription to: ', KAFKA_TOPIC)
    await consumer.subscribe({topic: KAFKA_TOPIC})
    console.log('Consuming messages')
    await consumer.run({
      eachMessage: async ({message}) => {
        console.log({
          value: message.value.toString(),
          headers: message.headers,
        })
      },
    })
  })().catch(console.error())
} else {
  console.log('Please specify both KAFKA_HOST and KAFKA_TOPIC')
}
