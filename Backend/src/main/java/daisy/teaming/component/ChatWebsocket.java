package daisy.teaming.component;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import daisy.teaming.bean.User;
import daisy.teaming.mapper.GroupMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@ServerEndpoint(value ="/chat/{token}")
public class ChatWebsocket {

    private static final Map<String, Session> clients = new ConcurrentHashMap<String, Session>();

    private static GroupMapper groupMapper;

    @Autowired
    public void setGroupMapper(GroupMapper groupMapper){
        ChatWebsocket.groupMapper=groupMapper;
    }

    private Session session;

    private String username;

    @OnOpen
    public void onOpen(Session session,@PathParam("token") String token)
    {
        System.out.println("connect");
        try{
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            //String account=token;
            this.username=account;
            this.session=session;
            clients.put(account,session);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(){
        clients.remove(username);
    }

    @OnMessage
    public void getMessage(String content) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(content);
        Message message;
        try {
            message = objectMapper.readValue(content, Message.class);
            if(message.getType() == 0){
               personalMessage(message);
            }else{
                groupMessage(message);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void personalMessage(Message message){
        try{
            if(message.getType()==1) {
                return;
            }
            message.setSender(username);//防止篡改发送者
            Session getSession = clients.get(message.getReceiver());
            if(getSession != null){
                getSession.getAsyncRemote().sendText(JSON.toJSONString(message));
            }
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    private void groupMessage(Message message){
        try {
            if (message.getType() == 0) {
                return;
            }
            message.setSender(username);//防止篡改发送者
            int groupId = Integer.parseInt(message.getReceiver());
            List<User> members = groupMapper.getGroupMember(groupId);
            for (User member : members) {
                Session getSession = clients.get(member.getAccount());
                if (getSession != null) {
                    getSession.getAsyncRemote().sendText(JSON.toJSONString(message));
                }
            }
        } catch (Exception e){
            e.printStackTrace();
        }
    }
}
