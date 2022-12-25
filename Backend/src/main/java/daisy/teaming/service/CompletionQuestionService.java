package daisy.teaming.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.CompletionQuestion;
import daisy.teaming.bean.User;
import daisy.teaming.mapper.CompletionQuestionMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName CompletionQuestionService
 * @Description //TODO
 * @Author poros
 * @Date 2021/5/16 11:34
 **/
@Service
@Transactional(rollbackFor = RuntimeException.class)
public class CompletionQuestionService {
    @Autowired
    private CompletionQuestionMapper completionQuestionMapper;
    @Autowired
    private UserMapper userMapper;

    public Result addCompletionQuestion(CompletionQuestion completionQuestion, int projectId, HttpServletRequest request) {
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
                result.setMsg("你没有权利添加填空题");
            }
            else
            {
                completionQuestionMapper.addCompletionQuestion(completionQuestion);
                completionQuestionMapper.addChoiceQuestionProject(completionQuestionMapper.getQuestionId(), projectId);
                result.setSuccess(true);
                result.setMsg("添加填空题成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getCompletionQuestion(int completionQuestionId) {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(completionQuestionMapper.getCompletionQuestion(completionQuestionId));
        }
        catch (Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result deleteCompletionQuestion(int completionQuestionId, HttpServletRequest request) {
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
                result.setMsg("你没有权利删除填空题");
            }
            else
            {
                completionQuestionMapper.deleteCompletionQuestion(completionQuestionId);
                result.setSuccess(true);
                result.setMsg("删除填空题成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getCompletionQuestionList(int projectId) {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(completionQuestionMapper.getCompletionQuestionList(projectId));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
