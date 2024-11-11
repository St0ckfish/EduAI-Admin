let token = 'eyJhbGciOiJIUzUxMiJ9.eyJyZWdpc3RyYXRpb24iOiIyMDI0LTEwLTI5VDE2OjQ3OjQ1Ljk2ODUxMyIsInJvbGUiOiJQQVJFTlQiLCJlbWFpbCI6IlVuaXF1ZVBhcmVudFVzZXJuYW1lZ21haWwuY29tIiwic3ViIjoiVW5pcXVlUGFyZW50VXNlcm5hbWUiLCJpc3MiOiJFZHVBSSIsImlhdCI6MTczMDg4MjE5MSwiZXhwIjoxNzMxNDg2OTkxfQ.gX1WlfLfAWUTTSTkM7cFbbe-GZzlxUrrZNQDVJYZSx6h94HKl7M3OxM8W6pqjmGY_XFN3vzw_03KwY88OUZzAw';
const stompClient = new StompJs.Client({
    brokerURL: `ws://localhost:8080/ws?token=${token}`,
    debug: function(str) {
        console.log(str);
    },
    
    reconnectDelay: null,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

let chatId = 2;

stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    try{
        console.log("hi before sub");        
        stompClient.subscribe(`/chat/${chatId}`, 
            (greeting) => {
            showGreeting(JSON.parse(greeting.body).content);
        });
        console.log("hi after sub");        
    }catch (error) {
        console.error("error")
    }
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    let bodyOfName = JSON.stringify({
        'chatId': chatId,
        'content': $("#content").val()
    });
    console.log(bodyOfName);    
    try {
        stompClient.publish({
            destination: "/app/sendMessage",
            body: bodyOfName
        });
        console.log('Message published successfully'); // This should execute if no errors
    } catch (error) {
        console.error('Error during publish:', error);
    }
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});
