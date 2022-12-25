package daisy.teaming.service;

import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.*;
import daisy.teaming.mapper.ApplicationMapper;
import daisy.teaming.mapper.GroupMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private ApplicationMapper applicationMapper;

    @Autowired
    private GroupMapper groupMapper;

    public Result register(User user)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try {
                userMapper.register(user);

                result.setMsg("注册成功");
                result.setSuccess(true);
                result.setDetail(user);

        } catch (Exception e) {
            result.setMsg(e.getMessage());
            result.setSuccess(false);
        }
        return result;
    }

    public Result login(User user)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try {
            User userIn=userMapper.login(user);
            if(userIn!=null){
                String token= JWTUtils.getToke(user.getAccount());
                result.setMsg("登陆成功");
                result.setSuccess(true);
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("token",token);
                jsonObject.put("admin",userIn.getAdmin());
                result.setDetail(jsonObject);
            }
            else
            {
                result.setMsg("登陆失败，请重新登陆");
            }

        } catch (Exception e) {
            result.setMsg(e.getMessage());
            result.setSuccess(false);
        }
        return result;
    }

    public Result getUser(HttpServletRequest request)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            User user=userMapper.getUser(account);
            result.setSuccess(true);
            result.setDetail(user);
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getUser(String account)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            User user=userMapper.getUser(account);
            result.setSuccess(true);
            result.setDetail(user);
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result updateUser(User user,HttpServletRequest request)
    {
        ;
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            user.setAccount(account);

            userMapper.updateUser(user);
            System.out.println(user.getEmailAddress());
            result.setSuccess(true);
            result.setMsg("更新成功");
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getProjects(HttpServletRequest request)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            List<Project> projects=userMapper.getProjects(account);
            result.setDetail(projects);
            result.setSuccess(true);

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getGroups(HttpServletRequest request)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            List<Group> projects=userMapper.getGroups(account);
            List<GroupWithMembers> list=new ArrayList<>();
            for(Group group:projects){
                GroupWithMembers groupWithMembers=new GroupWithMembers();
                groupWithMembers.setGroup(group);
                List<String> userList=groupMapper.getGroupMemberList(group.getGroupId());
                groupWithMembers.setUserList(userList);
                list.add(groupWithMembers);
            }
            result.setDetail(list);
            result.setSuccess(true);

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getApplications(HttpServletRequest request){
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            List<Application> projects=applicationMapper.getApplications(account);

            result.setDetail(projects);
            result.setSuccess(true);

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getApplicationsReceived(HttpServletRequest request)
    {
        Result result = new Result();
        result.setSuccess(false);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            List<Application> projects=applicationMapper.getApplicationsReceive(account);
            System.out.println(projects.get(0).getApplicationId());
            result.setDetail(projects);
            result.setSuccess(true);

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
