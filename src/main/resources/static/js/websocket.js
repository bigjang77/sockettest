//header
let receiver = $(".checkprinciple").val();
let stomp = "";

window.onload = function () {
    if (receiver != null) {
        let socket = new SockJS("/websocket");
        stomp = Stomp.over(socket);
        stomp.connect({}, function () {
            stomp.subscribe("/sub/alarm/" + receiver, function (result) {
                let alarmResult = JSON.parse(result.body);
                console.log(alarmResult);
            });
        });
    }
}

// function findMessage(message) {
//     let sender = message.sender;
//     let alarmMessage = message.alarmMessage;


//     let resultMessage = sender + "님이" + alarmMessage + "하였습니다";
//     console.log(resultMessage);
//     return resultMessage
// }


//intro detail
function subscribe() {
    let receiver = $("#receiver").val();
    let sender = $("#sender").val();
    let data = {
        "receiver": receiver,
        "alarmMessage": "구독",
        "sender": sender,
    };

    let subdata = sender + "님이 " + receiver + "을 구독 했습니다";
    console.log(subdata);

    stomp.send("/pub/alarm", {}, JSON.stringify(data));
}
