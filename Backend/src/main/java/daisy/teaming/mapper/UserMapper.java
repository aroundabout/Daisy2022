package daisy.teaming.mapper;

import daisy.teaming.bean.Group;
import daisy.teaming.bean.Project;
import daisy.teaming.bean.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper //标记mapper文件位置，否则在Application.class启动类上配置mapper包扫描
@Repository
public interface UserMapper {
    @Insert("insert into user values(#{account},#{password},#{name},#{nickname},#{emailAddress},#{phoneNum},#{sex},#{school},#{college},#{grade},#{studentNumber},#{intro},0,'/avatar/1.png')")
    void register(User user);

    @Select("select * from user where account=#{account} and password=#{password}")
    User login(User user);

    @Select("select * from user where account=#{account}")
    User getUser(String account);

    @Update("update user set name=#{name},nickname=#{nickname},phoneNum=#{phoneNum},emailAddress=#{emailAddress},sex=#{sex},school=#{school},college=#{college},grade=#{grade},studentNumber=#{studentNumber},intro=#{intro},avatar=#{avatar} where account=#{account}")
    void updateUser(User user);

    @Select("select * from project where projectId in (select projectId from groupProject where groupId in (select groupId from userGroup where account =#{account}))")
    List<Project> getProjects(String account);

    @Select("select * from `group` where groupId in (select groupId from userGroup where account=#{account})")
    List<Group> getGroups(String account);
}
