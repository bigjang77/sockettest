let receiver = $(".checkUser").val();
let stomp = "";

window.onload = function () {
    if (receiver != null) {
        let socket = new SockJS('/websocket');
        stomp = Stomp.over(socket);
        stomp.connect({}, function () {
            console.log('연결됨');
            stomp.subscribe('/sub/alarm/' + receiver, function (result) {
                let parsingResult = JSON.parse(result.body);
                console.log(parsingResult);
                $("#boxAlarm").empty();
                $("#boxAlarm").append(viewMessage(parsingResult));
                $("#notificationDropdown").dropdown('show');
            });
        });
    }
}

function viewMessage(message) {
    let sender = message.sender;
    let alarmType = message.alarmType;


    let resultMessage = `<div class="preview-item-content">` + sender + ` 님이 ` + alarmType + `하였습니다</div>`;
    return resultMessage
}
// header---------------------------------------------------------------------


function sendData() {
    let writer = $("#writer").val();
    let data = {
        'receiver': writer,
        'alarmType': '구독함',
        'sender': receiver,
    };

    stomp.send("/pub/alarm", {}, JSON.stringify(data));
}
// intro detail-----------------------------------------------------------------