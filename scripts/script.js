var t1
var t2

function time_now(){
    var d = new Date()
    var segundos = ('0' + d.getSeconds()).slice(-2)
    var minutos = ('0' +  d.getMinutes()).slice(-2)
    var horas = ('0' + d.getHours()).slice(-2)
    var hora = `Now: ${horas}:${minutos}:${segundos}`

    document.getElementById('div_tempo').innerHTML = hora

    t1 = setTimeout("time_now()", 1000)  // executa a cada 1 segundo
}

function date_now(){
    var week_days = ["Sunday", "Monday", "Tuesday",
                     "Wednesday", "Thursday",
                     "Friday", "Saturday"]
    var d = new Date()
    var d_semana = week_days[d.getDay()]
    var dia = ('0' + d.getDate()).slice(-2)
    var mes = ('0' + (d.getMonth() + 1)).slice(-2)

    var div_data = document.getElementById('div_data')
    div_data.innerHTML = `Today: ${d_semana} ${dia}/${mes}/${d.getFullYear()}`
}


function get_time(){
    var id_cron = document.getElementById('id_cron')
    var botao_parar = document.getElementById('botao_parar')

    if(document.getElementById('div_data').value == undefined){ // inicia valores
        document.getElementById('div_data').value = [0, 0, 0, 0]
        document.getElementById('botao_parar').value = false
    }

    result = document.getElementById('div_data').value
    resultstr = []

    if(botao_parar.value == false){
        var t = new Date
        var t_now = Number(t.getMilliseconds())
        var t_old = document.getElementById('div_data').value[0]
        var result = time_update(t_now, t_old)
    }

    resultstr[0] = ('00' + result[0]).slice(-3)
    resultstr[1] = ('0' + result[1]).slice(-2)
    resultstr[2] = ('0' + result[2]).slice(-2)
    id_cron.innerHTML = `${result[3]}:${resultstr[2]}:${resultstr[1]}:${resultstr[0]}`

    t2 = setTimeout("get_time()", 1) // executa a funcao a cada milissegunda
}

function time_update(t_now, t_old){
    var result = document.getElementById('div_data').value

    if(t_now < t_old){ // segundos
        result[1] += 1
    }
    if(result[1] == 60){ // minutos
        result[1] = 0
        result[2] += 1
    }
    if(result[2] == 60){ // hora
        result[2] = 0
        result[3] += 1
    }
    result[0] = t_now

    document.getElementById('div_data').value = result
    return result
}


function start(){
    document.getElementById('id_cron').innerHTML = `0:00:00:000`
    document.getElementById('div_data').value = [0, 0, 0, 0]
    document.getElementById('botao_parar').value = false
    get_time()
}

function reset(){
    document.getElementById('id_cron').innerHTML = `0:00:00:000`
    document.getElementById('div_data').value = [0, 0, 0, 0]
    document.getElementById('botao_parar').value = false
    stop()
}

function stop(){
    document.getElementById('botao_parar').value = true
    clearTimeout(t2)
}

function restart(){
    document.getElementById('botao_parar').value = false
    get_time()
}

