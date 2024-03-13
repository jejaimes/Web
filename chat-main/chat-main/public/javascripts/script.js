const ws = new WebSocket('ws://localhost:3000')
let count = Math.floor(Math.random() * 10000)

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data))
}

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(' ')
  document.getElementById('messages').innerHTML = html
}

const createMessage = (message) => {
  const obj = {
    message: message,
    author: 'Web app',
    ts: count
  }
  fetch('http://localhost:3000/chat/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(count++)
    .catch(error => {
      console.console.error('Error:', error)
    })
}

const handleSubmit = (evt) => {
  evt.preventDefault()
  const message = document.getElementById('message')
  ws.send(message.value)
  createMessage(message.value)
  message.value = ''
}

const form = document.getElementById('form')
form.addEventListener('submit', handleSubmit)
