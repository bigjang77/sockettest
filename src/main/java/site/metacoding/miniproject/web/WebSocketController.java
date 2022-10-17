package site.metacoding.miniproject.web;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import site.metacoding.miniproject.web.dto.response.MessageDto;

@RequiredArgsConstructor
@Controller
public class WebSocketController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("/alarm")
    public void test(MessageDto messageDto) throws Exception {
        System.out.println(messageDto.getAlarmMessage());

        messageSendingOperations.convertAndSend("/sub/alarm/" + messageDto.getReceiver(), messageDto);
    }

    public boolean findByLoginUser(String subscriber, String loginUser) {
        if (subscriber.equals(loginUser)) {
            return true;
        }
        return false;
    }
}
