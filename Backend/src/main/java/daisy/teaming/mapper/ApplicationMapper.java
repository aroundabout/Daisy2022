package daisy.teaming.mapper;

import daisy.teaming.bean.Application;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ApplicationMapper {

    @Select("select * from application where account=#{account}")
    List<Application> getApplications(String account);

    @Select("select * from application where groupId in (select groupId from `group` where leaderAccount=#{account})")
    List<Application> getApplicationsReceive(String account);
}
