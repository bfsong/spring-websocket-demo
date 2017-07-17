package demo;

import lombok.extern.apachecommons.CommonsLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.Date;

/**
 *
 */
@CommonsLog
@Controller
public class MessageController {
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/hello")
    @SendTo("/message/topic1")
    public Message hello(Message message){
        log.info(message);
        Message msg = new Message();
        message.setType("test");
        message.setContent("Hello, " + message.getContent());

        return message;
    }


    @Scheduled(fixedRate = 5000)
    public void pushMessage() throws Exception{
        Message msg = new Message();
        msg.setType("time");
        msg.setContent(new Date().toString());
        this.template.convertAndSend("/message/topic2", msg);
    }

}
