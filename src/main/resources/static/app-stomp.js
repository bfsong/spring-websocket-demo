var client = null;
var sub1 = null
var sub2 = null

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $('#sub1').prop('disabled', !connected)
    $('#sub2').prop('disabled', !connected)


    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var ws = new SockJS('/websocket-demo')
    client = Stomp.over(ws)
    client.connect({}, function(frame) {
        console.info('connected')
        setConnected(true)
        subscribe1()
        subscribe2()
    })
}

function onmessage(message){
    showGreeting(JSON.parse(message.body))
}

function subscribe1(){
        sub1 = client.subscribe("/message/topic1", onmessage)
}

function subscribe2(){
        sub2 = client.subscribe("/message/topic2", onmessage)
}

function unsubscribe1(){
    if (sub1){
        sub1.unsubscribe()
        sub1 = null
    }
}

function unsubscribe2(){
    if (sub2){
        sub2.unsubscribe()
        sub2 = null
    }
}

function disconnect() {
    if (null != client){
        unsubscribe1()
        unsubscribe2()
        client.disconnect()
    }
    setConnected(false)
    console.log('disconnected')
}

function sendName() {
    client.send('/app/hello', {}, JSON.stringify({'type':'topic1', 'content' : $('#name').val()}))
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message.type + ':' + message.content + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $('#sub1').click(function(){
        if (sub1){
            unsubscribe1()
            $(this).text('订阅1')
        } else {
            subscribe1()
            $(this).text('退订1')
        }
    })
    $('#sub2').click(function(){
        if (sub2){
            unsubscribe2()
            $(this).text('订阅2')
        } else {
            subscribe2()
            $(this).text('退订2')
        }
    })
    $( "#send" ).click(function() { sendName(); });
});

