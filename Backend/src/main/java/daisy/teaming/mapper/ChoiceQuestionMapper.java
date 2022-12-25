package daisy.teaming.mapper;

import daisy.teaming.bean.ChoiceQuestion;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChoiceQuestionMapper {

    @Insert("insert into choiceQuestion values(null,#{question},#{answerA},#{answerB},#{answerC},#{answerD},#{level}," +
            "#{answerRight},#{score})")
    void addChoiceQuestion(ChoiceQuestion choiceQuestion);

    @Insert("insert into choiceQuestionProject values(#{questionId},#{projectId})")
    void addChoiceQuestionProject(int questionId, int projectId);

    @Select("select * from choiceQuestion where questionId=#{choiceQuestionId}")
    ChoiceQuestion getChoiceQuestion(int choiceQuestionId);

    @Delete("delete from choiceQuestion where questionId=#{choiceQuestionId}")
    void deleteChoiceQuestion(int choiceQuestionId);

    @Select("select * from `choiceQuestion` where questionId in" +
            "(select questionId from choiceQuestionProject where projectId=#{projectId})")
    List<ChoiceQuestion> getChoiceQuestionList(int projectId);

    @Select("select max(questionId) from `choiceQuestion`")
    int getQuestionId();

}
