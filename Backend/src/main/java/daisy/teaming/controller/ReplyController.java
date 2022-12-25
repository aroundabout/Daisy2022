package daisy.teaming.controller;

import daisy.teaming.bean.Reply;
import daisy.teaming.service.ReplyService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/reply")
public class ReplyController {
    @Autowired
    private ReplyService replyService;
    @RequestMapping(value = "/momentId/{momentId}",method = RequestMethod.POST)
    public Result addReplytoMoment(@PathVariable int momentId, @RequestBody Reply reply){
        return replyService.addReplytoMoment(reply,momentId);
    }

    @RequestMapping(value = "/momentId/{momentId}",method = RequestMethod.GET)
    public Result getCommentList(@PathVariable int momentId, HttpServletRequest request){
        return replyService.getCommentList(momentId);
    }

    @RequestMapping(value = "/replyId/{replyId}",method = RequestMethod.POST)
    public Result addReplytoReply(@PathVariable int replyId,@RequestBody Reply reply){
        return replyService.addReplytoReply(reply,replyId);
    }

    @RequestMapping(value = "/commentId/{commentId}",method = RequestMethod.GET)
    public Result getReplyListFromComment(@PathVariable int commentId,HttpServletRequest request){
        return replyService.getReplyList(commentId);
    }

    @RequestMapping(value = "/projectId/{projectId}",method = RequestMethod.GET)
    public Result getReplyyListFromProject(@PathVariable int projectId){
        return replyService.getProjectReplyList(projectId);
    }

    @RequestMapping(value = "/projectId/{projectId}",method = RequestMethod.POST)
    public Result addProjectReply(@PathVariable int projectId,@RequestBody Reply reply){
        return replyService.addProjectReply(reply,projectId);
    }

}
