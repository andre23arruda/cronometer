var t1, t2
const cronometerElement = document.getElementById('id-cronometer')
const dayInfoElement = document.getElementById('div-day-info')
const buttonStopElement = document.getElementById('button-stop')
const buttonStartElement = document.getElementById('button-start')
const timeStart = `00:00:00`
var arrayTime = [0, 0, 0, 0]
const week_days = [
    "Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday",
    "Friday", "Saturday"
]

function timeNow(){
    var date = new Date()
    var seconds = ('0' + date.getSeconds()).slice(-2)
    var minutes = ('0' +  date.getMinutes()).slice(-2)
    var hours = ('0' + date.getHours()).slice(-2)
    var now = `Now: ${ hours }:${ minutes }:${ seconds }`

    document.getElementById('div-time-info').innerHTML = now
    t1 = setTimeout("timeNow()", 1000)  // repeat each 1 segundo
}

function dateNow(){
    var d = new Date()
    var d_semana = week_days[d.getDay()]
    var dia = ('0' + d.getDate()).slice(-2)
    var mes = ('0' + (d.getMonth() + 1)).slice(-2)

    var divDayInfo = document.getElementById('div-day-info')
    divDayInfo.innerHTML = `Today: ${ d_semana } ${ dia }/${ mes }/${ d.getFullYear() }`
}


function getTime(){
    arrayTime = timeUpdate()

    var arrayTimestr = [
        ('00' + parseInt(arrayTime[0])).slice(-3),
        ('0' + arrayTime[1]).slice(-2),
        ('0' + arrayTime[2]).slice(-2),
        ('0' + arrayTime[3]).slice(-2),
    ]
    cronometerElement.innerHTML = `${ arrayTimestr[3] }:${ arrayTimestr[2] }:${ arrayTimestr[1] }`

    t2 = setTimeout("getTime()", 500) // repeat each milisecond
}


function timeUpdate(){
    arrayTime[0] += 500
    if (arrayTime[0] >= 1000) {
        arrayTime[0] = 0
        arrayTime[1] += 1
    }
    if (arrayTime[1] >= 60) {
        arrayTime[1] = 0
        arrayTime[2] += 1
    }
    if (arrayTime[2] >= 60) {
        arrayTime[2] = 0
        arrayTime[3] += 1
    }
    return arrayTime
}


function start(){
    getTime()
    buttonStartElement.classList.add('disabled')
    buttonStartElement.disabled = true
}

function reset(){
    cronometerElement.innerHTML = timeStart
    arrayTime = [0, 0, 0, 0]
    stop()
}

function stop(){
    clearTimeout(t2)
    buttonStartElement.classList.remove('disabled')
    buttonStartElement.disabled = false
}

timeNow()
dateNow()
cronometerElement.innerHTML = timeStart
