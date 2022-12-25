package daisy.teaming.mapper;

import daisy.teaming.bean.Application;
import daisy.teaming.bean.Project;
import daisy.teaming.bean.Group;
import daisy.teaming.bean.User;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.javassist.tools.rmi.AppletServer;
import org.apache.ibatis.jdbc.SQL;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface GroupMapper {

    @Insert("insert into `group` values(null,#{introduction},#{maxNum},#{leaderAccount},#{name})")
    void addGroup(Group group);

    @Insert("insert into groupProject values(#{groupId},#{projectId})")
    void addGroupProject(int groupId, int projectId);

    @Select("select * from `group` where groupId=#{groupId}")
    Group getGroup(int groupId);

    @Update("update `group` set name=#{name},leaderAccount=#{leaderAccount},introduction=#{introduction},maxNum=#{maxNum} where groupId=#{groupId} ")
    void updateGroup(Group group);

    @Select("select max(groupId) from `group`")
    int getGroupId();

    @Delete("delete from `group` where groupId=#{groupId}")
    void deleteGroup(int groupId);

//  @SelectProvider(type = GroupSqlBuilder.class, method = "buildGetGroupList")
    @Select("select * from `group` where groupId in(select groupId from groupProject where projectId=#{projectId})")
    List<Group> getGroupList(int projectId);

    @Insert("insert into application values(null,#{groupId},#{account},0)")
    void addApplication(String account, int groupId);

    @Select("select * from application where account=#{account} and groupId=#{groupId}")
    List<Application> getApplicationList(int groupId, String account);

    @Select("select * from application where applicationId=#{applicationId}")
    Application getApplication(int applicationId, int groupId, String account);

    @Update("update application set result=#{result} where applicationId=#{applicationId}")
    void updateApplication(int result, int applicationId );

    @Insert("insert into userGroup values(#{account},#{groupId})")
    void addUserGroup(String account, int groupId);

    @Select("select account from user where account in (select account from userGroup where groupId=#{groupId})")
    List<String> getGroupMemberList(int groupId);

    @Select("select * from user where account in (select account from userGroup where groupId=#{groupId})")
    List<User> getGroupMember(int groupId);

    @Delete("delete from userGroup where groupId=#{groupId} and account=#{account}")
    void deleteGroupMember(int groupId, String account);



}

//class GroupSqlBuilder {
//    public static String buildGetGroupList(final String projectId) {
//        return new SQL(){{
//            SELECT("*");
//            FROM("group g");
//            JOIN("groupProject gp on g.groupId = gp.groupId");
//            if (projectId != null) {
//                WHERE("projectId = gp.projectId");
//            }
//        }}.toString();
//    }
//}