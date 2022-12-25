package daisy.teaming.mapper;

import daisy.teaming.bean.Project;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ProjectMapper {

    @Insert("insert into project values(null,#{name},#{startTime},#{endTime},#{introduction},#{maxNum})")
    void addProject(Project project);

    @Select("select * from project where projectId=#{projectId}")
    Project getProject(int projectId);

    @Delete("delete from project where projectId=#{projectId}")
    void deleteProject(int projectId);

    @Select("select * from project")
    List<Project> getProjectList();

    @Update("update project set name=#{name},startTime=#{startTime},endTime=#{endTime},introduction=#{introduction},maxNum=#{maxNum} where projectId=#{projectId} ")
    void updateProject(Project project);
}
