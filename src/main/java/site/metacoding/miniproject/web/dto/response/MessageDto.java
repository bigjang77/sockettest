package site.metacoding.miniproject.web.dto.response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MessageDto {
    private String receiver;
    private String sender;
    private String alarmtype;
}
