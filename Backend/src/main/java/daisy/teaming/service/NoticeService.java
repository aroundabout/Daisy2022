package daisy.teaming.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import daisy.teaming.bean.Notice;
import daisy.teaming.bean.User;
import daisy.teaming.mapper.NoticeMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.JWTUtils;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Autowired
    private UserMapper userMapper;
    public Result postNotice(Notice notice, HttpServletRequest request)
    {
        Result result=new Result();
        result.setDetail(null);
        result.setSuccess(false);
        result.setMsg(null);
        try{
            String token = request.getHeader("token");
            DecodedJWT verify = JWTUtils.decode(token);
            String account = verify.getClaim("account").asString();
            User user=userMapper.getUser(account);
            if(user.getAdmin()==0)
            {
                result.setSuccess(false);
                result.setMsg("你没有权利进行通知");
            }
            else
            {
                noticeMapper.postNotice(notice);
                result.setSuccess(true);
                result.setMsg("添加通知成功");
            }
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }

        return result;
    }
    public Result getNoticeList()
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(noticeMapper.getNoticeList());
        }catch(Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
    public Result getNotice(int noticeId)
    {
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(noticeMapper.getNotice(noticeId));
        }
        catch (Exception e)
        {
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
