package daisy.teaming.service;

import daisy.teaming.bean.Moment;
import daisy.teaming.bean.MomentWithAvatar;
import daisy.teaming.mapper.MomentMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class MomentService {
    @Autowired
    private MomentMapper momentMapper;

    @Autowired
    private UserMapper userMapper;

    public Result addMoment(Moment moment){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try {
            momentMapper.addMoment(moment);
            result.setSuccess(true);
            result.setMsg("发布成功");
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getMomentList(){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try {
            result.setSuccess(true);
            List<Moment> list=momentMapper.getMomentList();
            List<MomentWithAvatar> momentWithAvatarList=new ArrayList<>();
            for(Moment moment:list){
                MomentWithAvatar momentWithAvatar=new MomentWithAvatar();
                String acc=moment.getAccount();
                momentWithAvatar.setAvatar(userMapper.getUser(acc).getAvatar());
                momentWithAvatar.setMomentId(moment.getMomentId());
                momentWithAvatar.setAccount(moment.getAccount());
                momentWithAvatar.setContent(moment.getContent());
                momentWithAvatar.setLikecount(moment.getLikecount());
                momentWithAvatar.setTitle(moment.getTitle());
                momentWithAvatar.setTime(moment.getTime());
                momentWithAvatarList.add(momentWithAvatar);
            }
            result.setDetail(momentWithAvatarList);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getMoment(int momentId, HttpServletRequest request){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            Moment moment=momentMapper.getMoment(momentId);
            MomentWithAvatar momentWithAvatar=new MomentWithAvatar();
            String acc=moment.getAccount();
            momentWithAvatar.setAvatar(userMapper.getUser(acc).getAvatar());
            momentWithAvatar.setMomentId(moment.getMomentId());
            momentWithAvatar.setAccount(moment.getAccount());
            momentWithAvatar.setContent(moment.getContent());
            momentWithAvatar.setLikecount(moment.getLikecount());
            momentWithAvatar.setTitle(moment.getTitle());
            momentWithAvatar.setTime(moment.getTime());
            result.setDetail(momentWithAvatar);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getComentCount(int momentId,HttpServletRequest request){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            result.setDetail(momentMapper.momentCount(momentId));
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public  Result likeMoment(int momentId,String account){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            int count=momentMapper.isExistLikeClick(account,momentId);
            if (count!=0){
                //说明点过赞了
                result.setDetail(1);
            }else {
                //没点过赞
                momentMapper.updateLikeCount(momentId);
                momentMapper.recodeLikeClick(account,momentId,0);
                result.setDetail(0);
            }
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
