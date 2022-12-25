package daisy.teaming.mapper;

import daisy.teaming.bean.ChoiceQuestion;
import daisy.teaming.bean.CompletionQuestion;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CompletionQuestionMapper {

    @Insert("insert into completionQuestion values(null,#{question},#{answer},#{level},#{score})")
    void addCompletionQuestion(CompletionQuestion completionQuestion);

    @Insert("insert into completionQuestionProject values(#{completionId},#{projectId})")
    void addChoiceQuestionProject(int completionId, int projectId);

    @Select("select * from completionQuestion where completionId=#{completionQuestionId}")
    CompletionQuestion getCompletionQuestion(int completionQuestionId);

    @Delete("delete from completionQuestion where completionId=#{completionQuestionId}")
    void deleteCompletionQuestion(int completionQuestionId);

    @Select("select * from `completionQuestion` where completionId in" +
            "(select completionId from completionQuestionProject where projectId=#{projectId})")
    List<CompletionQuestion> getCompletionQuestionList(int projectId);

    @Select("select max(completionId) from `completionQuestion`")
    int getQuestionId();

}
