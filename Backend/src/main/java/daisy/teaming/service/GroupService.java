package daisy.teaming.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.Application;
import daisy.teaming.bean.Group;
import daisy.teaming.bean.Project;
import daisy.teaming.bean.User;
import daisy.teaming.mapper.GroupMapper;
import daisy.teaming.mapper.ProjectMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class GroupService {
    @Autowired
    private GroupMapper groupMapper;
    @Autowired
    private UserMapper userMapper;

    //查看小队列表
    public Result getGroupList(int projectId)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(groupMapper.getGroupList(projectId));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }


    //添加小队
    public Result addGroup(Group group, int projectId, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();

            group.setLeaderAccount(account);
            groupMapper.addGroup(group);    //建立小队

            groupMapper.addGroupProject(groupMapper.getGroupId(), projectId);     //建立小队-比赛表
            groupMapper.addUserGroup(account, groupMapper.getGroupId());
            result.setSuccess(true);
            result.setMsg("发布成功");

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //查看小队
    public Result getGroup(int groupId)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(groupMapper.getGroup(groupId));
        }
        catch (Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //修改小队
    public Result updateGroup(int groupId, Group group,HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            User user=userMapper.getUser(account);
            if(account.equals(group.getLeaderAccount())) {
                groupMapper.updateGroup(group);
                result.setSuccess(true);
                result.setMsg("修改小队成功");
            }
            else {
                result.setSuccess(false);
                result.setMsg("你没有权利修改小队");
            }
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //删除小队
    public Result deleteGroup(int groupId,HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            User user=userMapper.getUser(account);
            Group group = groupMapper.getGroup(groupId);
            if(account.equals(group.getLeaderAccount()))
            {
                groupMapper.deleteGroup(groupId);
                result.setSuccess(true);
                result.setMsg("删除小队成功");
            }
            else
            {
                result.setSuccess(false);
                result.setMsg("你没有权利删除小队");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //申请加入小队
    public Result addApplication(int groupId, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            groupMapper.addApplication(account, groupId);
            result.setSuccess(true);
            result.setMsg("申请成功");
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //获取队伍申请列表
    public Result getApplicationList(int groupId, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtils.decode(token);
        String account = verify.getClaim("account").asString();
        try{
            result.setSuccess(true);
            result.setDetail(groupMapper.getApplicationList(groupId,account));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //获取队伍申请
    public Result getApplication(int applicationId, int groupId, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        String token = request.getHeader("token");
        DecodedJWT verify = JWTUtils.decode(token);
        String account = verify.getClaim("account").asString();
        try{
            result.setSuccess(true);
            result.setDetail(groupMapper.getApplication(applicationId, groupId, account));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //组长审核申请
    public Result updateApplication(int groupId, int applicationId, int res, String acc, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            Group group = groupMapper.getGroup(groupId);
            int applyResult = 0;
            if(res==0){
                applyResult=1;
            }else {
                applyResult=2;
            }

            if(account.equals(group.getLeaderAccount())) {
                groupMapper.updateApplication(applyResult,applicationId);
                groupMapper.addUserGroup(acc, groupId);
                result.setSuccess(true);
                result.setMsg("审核申请成功");
            }
            else {
                result.setSuccess(false);
                result.setMsg("你没有权利审核申请");
            }
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //查看小队内成员
    public Result getGroupMember(int groupId, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(groupMapper.getGroupMemberList(groupId));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    //组长踢出成员
    public Result deleteMember(int groupId, String deleteAccount, HttpServletRequest request)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            Group group = groupMapper.getGroup(groupId);
            if(account.equals(group.getLeaderAccount()))
            {
                groupMapper.deleteGroupMember(groupId, deleteAccount);
                result.setSuccess(true);
                result.setMsg("删除小队成员成功");
            }
            else
            {
                result.setSuccess(false);
                result.setMsg("你没有权利删除小队成员");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }



}
