const express = require('express')
const router = express.Router()
const Joi = require('joi')
const Message = require('../models/message')

// Get all messages
router.get('/', function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result)
  })
})

// Get message by ts
router.get('/:ts', function (req, res, next) {
  Message.findAll({
    where: {
      ts: req.params.ts
    }
  }).then((result) => {
    if (result.length === 0) {
      res.status(404).send('The message with the given ts was not found')
    } else {
      res.send(result)
    }
  })
})

// Post a new message
router.post('/', function (req, res, next) {
  const { error } = validateMessage(req.body)

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const { message, author, ts } = req.body

  Message.create({ message, author, ts }).then((result) => {
    res.send(result)
  })
})

// Put a message
router.put('/:ts', function (req, res, next) {
  const modMessage = {
    message: req.body.message,
    author: req.body.author,
    ts: req.params.ts
  }
  const { error } = validateMessage(modMessage)

  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  Message.update(modMessage, {
    where: {
      ts: modMessage.ts
    }
  }).then((result) => {
    if (result.length === 0) {
      res.status(404).send('The message with the given ts was not found')
    } else {
      res.send(modMessage)
    }
  })
})

// Delete a message
router.delete('/:ts', function (req, res, next) {
  Message.destroy({
    where: {
      ts: req.params.ts
    }
  }).then((result) => {
    if (result === 0) {
      res.status(404).send('The message with the given ts was not found')
    } else {
      res.status(204).send('Messages deleted: ' + result)
    }
  })
})

function validateMessage (message) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string().required().pattern(/^([a-zA-Z])+(\s[a-zA-Z]+)+$/),
    ts: Joi.number().required()
  })

  return schema.validate(message)
}

module.exports = router
