package daisy.teaming.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.ChoiceQuestion;
import daisy.teaming.bean.CompletionQuestion;
import daisy.teaming.bean.User;
import daisy.teaming.mapper.ChoiceQuestionMapper;
import daisy.teaming.mapper.CompletionQuestionMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName QuestionService
 * @Description //TODO
 * @Author poros
 * @Date 2021/5/16 11:19
 **/
@Service
@Transactional(rollbackFor = RuntimeException.class)
public class ChoiceQuestionService {
    @Autowired
    private ChoiceQuestionMapper choiceQuestionMapper;
    @Autowired
    private CompletionQuestionMapper completionQuestionMapper;
    @Autowired
    private UserMapper userMapper;

    public Result addChoiceQuestion(ChoiceQuestion choiceQuestion, int projectId, HttpServletRequest request) {
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
                result.setMsg("你没有权利添加选择题");
            }
            else
            {
                choiceQuestionMapper.addChoiceQuestion(choiceQuestion);
                choiceQuestionMapper.addChoiceQuestionProject(choiceQuestionMapper.getQuestionId(), projectId);
                result.setSuccess(true);
                result.setMsg("添加选择题成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getChoiceQuestion(int choiceQuestionId) {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(choiceQuestionMapper.getChoiceQuestion(choiceQuestionId));
        }
        catch (Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result deleteChoiceQuestion(int choiceQuestionId, HttpServletRequest request) {
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
                result.setMsg("你没有权利删除选择题");
            }
            else
            {
                choiceQuestionMapper.deleteChoiceQuestion(choiceQuestionId);
                result.setSuccess(true);
                result.setMsg("删除选择题成功");
            }

        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getChoiceQuestionList(int projectId) {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(choiceQuestionMapper.getChoiceQuestionList(projectId));
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
