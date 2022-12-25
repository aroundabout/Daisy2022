package daisy.teaming.mapper;

import daisy.teaming.bean.Reply;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ReplyMapper {
    @Insert("insert into reply values(null,#{account},#{content},#{time})")
    void addReply(Reply reply);

    @Select("select max(replyId) from reply")
    int getReplyId();

    @Insert("insert into moment_reply values(#{momentId},#{replyId})")
    void addMoment_Reply(int momentId,int replyId);

    @Insert("insert into reply_reply values(#{replyedId},#{replyId})")
    void addReply_Reply(int replyedId,int replyId);

    @Insert("insert into project_reply values(#{projectId},#{replyId})")
    void addProject_Reply(int projectId,int replyId);

    @Select("select * from reply where replyId in(select replyId from moment_reply where momentId=#{momentId})")
    List<Reply> getCommmentList(int momentId);

    @Select("select * from reply where replyId in (select replyId from reply_reply where replyedId=#{commentId})")
    List<Reply> getReplyList(int commentId);

    @Select("select * from reply where replyId in (select replyId from project_reply where projectId=#{projectId})")
    List<Reply> getProjectReplyList(int projectId);


}
