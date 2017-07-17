package demo;

import lombok.Data;
import lombok.ToString;

/**
 * Created by bfsong on 7/16/17.
 */
@Data
@ToString
public class Message {
    private String type;
    private String content;
}
