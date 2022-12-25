package daisy.teaming.service;

import daisy.teaming.bean.Reply;
import daisy.teaming.bean.ReplyWithAvatar;
import daisy.teaming.mapper.ReplyMapper;
import daisy.teaming.mapper.UserMapper;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = RuntimeException.class)
public class ReplyService {
    @Autowired
    private ReplyMapper replyMapper;
    @Autowired
    private UserMapper userMapper;

    public Result addReplytoMoment(Reply reply,int momentId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            replyMapper.addReply(reply);
            int replyId=replyMapper.getReplyId();
            replyMapper.addMoment_Reply(momentId,replyId);
            result.setSuccess(true);
            result.setMsg("发布成功");
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result addReplytoReply(Reply reply,int commentId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            replyMapper.addReply(reply);
            int replyId=replyMapper.getReplyId();
            replyMapper.addReply_Reply(commentId,replyId);
            result.setSuccess(true);
            result.setMsg("发布成功");
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getCommentList(int momentId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            List<Reply> replyList=replyMapper.getCommmentList(momentId);
            List<ReplyWithAvatar> replyWithAvatarList=new ArrayList<>();
            for(Reply reply:replyList){
                ReplyWithAvatar replyWithAvatar=new ReplyWithAvatar();
                String acc=reply.getAccount();
                replyWithAvatar.setAvatar(userMapper.getUser(acc).getAvatar());
                replyWithAvatar.setReplyId(reply.getReplyId());
                replyWithAvatar.setAccount(reply.getAccount());
                replyWithAvatar.setContent(reply.getContent());
                replyWithAvatar.setTime(reply.getTime());
                replyWithAvatarList.add(replyWithAvatar);
            }
            result.setDetail(replyWithAvatarList);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getReplyList(int commentId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try {
            result.setSuccess(true);
            List<Reply> replyList=replyMapper.getReplyList(commentId);
            List<ReplyWithAvatar> replyWithAvatarList=new ArrayList<>();
            for(Reply reply:replyList){
                ReplyWithAvatar replyWithAvatar=new ReplyWithAvatar();
                String acc=reply.getAccount();
                replyWithAvatar.setAvatar(userMapper.getUser(acc).getAvatar());
                replyWithAvatar.setReplyId(reply.getReplyId());
                replyWithAvatar.setAccount(reply.getAccount());
                replyWithAvatar.setContent(reply.getContent());
                replyWithAvatar.setTime(reply.getTime());
                replyWithAvatarList.add(replyWithAvatar);
            }
            result.setDetail(replyWithAvatarList);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result getProjectReplyList(int projectId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            List<Reply> replyList=replyMapper.getProjectReplyList(projectId);
            List<ReplyWithAvatar> replyWithAvatarList=new ArrayList<>();
            for(Reply reply:replyList){
                ReplyWithAvatar replyWithAvatar=new ReplyWithAvatar();
                String acc=reply.getAccount();
                replyWithAvatar.setAvatar(userMapper.getUser(acc).getAvatar());
                replyWithAvatar.setReplyId(reply.getReplyId());
                replyWithAvatar.setAccount(reply.getAccount());
                replyWithAvatar.setContent(reply.getContent());
                replyWithAvatar.setTime(reply.getTime());
                replyWithAvatarList.add(replyWithAvatar);
            }
            result.setDetail(replyWithAvatarList);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    public Result addProjectReply(Reply reply,int projectId){
        Result result=new Result();
        result.setSuccess(false);
        result.setMsg(null);
        result.setDetail(null);
        try{
            result.setSuccess(true);
            replyMapper.addReply(reply);
            int replyId=replyMapper.getReplyId();
            System.out.println(projectId);
            System.out.println(replyId);
            replyMapper.addProject_Reply(projectId,replyId);
        }catch (Exception e){
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

}
