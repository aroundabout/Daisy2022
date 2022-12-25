package daisy.teaming.mapper;

import daisy.teaming.bean.Account_Moment_Like;
import daisy.teaming.bean.Moment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface MomentMapper {
    @Insert("insert into moment values(null,#{account},#{title},#{content},#{likecount},#{time})")
    void addMoment(Moment moment);

    @Select("select * from moment")
    List<Moment> getMomentList();

    @Select("select * from moment where momentId=#{momentId}")
    Moment getMoment(int momentId);

    @Select("select count(*) from moment_reply where momentId=#{momentId}")
    int momentCount(int momentId);

    @Update("update moment set likecount=likecount+1 where momentId=#{momentId}")
    void updateLikeCount(int momentId);

    @Select("select count(*) from account_moment_like where account=#{account} and momentId=#{momentId}")
    int isExistLikeClick(String account,int momentId);

    @Insert("insert into account_moment_like values(#{account},#{momentId},#{isClick})")
    void recodeLikeClick(String account,int momentId,int isClick);
}
