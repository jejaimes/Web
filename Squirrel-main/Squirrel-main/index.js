/* eslint-disable no-undef */
let tr
let td1
let td2
let td3
let totNeg = 0
let totPos = 0
const arrayEvents = []
const url = 'https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json'

function mcc (tp, tn, fp, fn) {
  return (tp * tn - fp * fn) / (Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn)))
}

function populate (num, event, result, parent) {
  tr = document.createElement('tr')
  td1 = document.createElement('td')
  td1.textContent = num
  td2 = document.createElement('td')
  td2.textContent = event
  td3 = document.createElement('td')
  td3.textContent = result
  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  parent.appendChild(tr)
}

const promise = new Promise(function (resolve, reject) {
  fetch(url).then(function (response) {
    response.text().then((text) => {
      resolve(text)
    })
  }).catch((err) => {
    reject(err)
  })
})

promise.then((text) => {
  const squirrel = document.getElementById('squirrel')
  const parsed = JSON.parse(text)
  for (let i = 0; i < parsed.length; i++) {
    populate(i + 1, parsed[i].events, parsed[i].squirrel, squirrel)
    parsed[i].squirrel ? totPos++ : totNeg++
    parsed[i].events.forEach(element => {
      let found = arrayEvents.find(({ name }) => name === element)
      if (found === undefined) {
        found = { name: element, fn: 0, tp: 0 }
        arrayEvents.push(found)
      }
      parsed[i].squirrel ? found.tp++ : found.fn++
    })
  }
}).finally(() => {
  const correlation = document.getElementById('correlation')
  for (let i = 0; i < arrayEvents.length; i++) {
    populate(i + 1, arrayEvents[i].name, mcc(arrayEvents[i].tp, totNeg - arrayEvents[i].fn, totPos - arrayEvents[i].tp, arrayEvents[i].fn), correlation)
  }
})
