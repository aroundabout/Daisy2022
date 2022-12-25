package daisy.teaming.mapper;

import daisy.teaming.bean.Notice;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface NoticeMapper {

    @Insert("insert into notice values(null,#{title},#{content},#{noticeTime})")
    void postNotice(Notice notice);

    @Select("select * from notice")
    List<Notice>getNoticeList();

    @Select("select * from notice where noticeId=#{noticeId}")
    Notice getNotice(int noticeId);
}
