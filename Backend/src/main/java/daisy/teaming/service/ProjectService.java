package daisy.teaming.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.Project;
import daisy.teaming.bean.User;
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
public class ProjectService {
    @Autowired
    private ProjectMapper projectMapper;
    @Autowired
    private UserMapper userMapper;
    public Result addProject(Project project, HttpServletRequest request)
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
            if(user.getAdmin()==0)
            {
                result.setSuccess(false);
                result.setMsg("你没有权利创建比赛");
            }
            else
            {
                projectMapper.addProject(project);
                result.setSuccess(true);
                result.setMsg("添加比赛成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public  Result getProject(int projectId)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(projectMapper.getProject(projectId));
        }
        catch (Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result deleteProject(int projectId,HttpServletRequest request)
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
            if(user.getAdmin()==0)
            {
                result.setSuccess(false);
                result.setMsg("你没有权利删除比赛");
            }
            else
            {
                projectMapper.deleteProject(projectId);
                result.setSuccess(true);
                result.setMsg("删除比赛成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getProjectList()
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
                result.setSuccess(true);
                result.setDetail(projectMapper.getProjectList());
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result updateProject(Project project,int projectId,HttpServletRequest request)
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
            if(user.getAdmin()==0)
            {
                result.setSuccess(false);
                result.setMsg("你没有权利修改比赛");
            }
            else
            {
                project.setProjectId(projectId);
                projectMapper.updateProject(project);
                result.setSuccess(true);
                result.setMsg("修改比赛成功");
            }
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
