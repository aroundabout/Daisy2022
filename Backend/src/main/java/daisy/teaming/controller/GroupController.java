package daisy.teaming.controller;

import daisy.teaming.bean.Application;
import daisy.teaming.bean.Group;
import daisy.teaming.bean.Project;
import daisy.teaming.service.GroupService;
import daisy.teaming.service.ProjectService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    private ProjectService projectService;

    @RequestMapping(value = "/{groupId}", method = RequestMethod.GET)
    public Result getGroup(@PathVariable int groupId) {
        return groupService.getGroup(groupId);
    }

    //查看小队列表
    @RequestMapping(method = RequestMethod.GET)
    public Result getGroupList(@RequestParam int projectId, HttpServletRequest request) {
        return groupService.getGroupList(projectId);
    }

    //发布小队
    @RequestMapping(method = RequestMethod.POST)
    public Result addGroup(@RequestBody Group group, @RequestParam int projectId, HttpServletRequest request) {
        return groupService.addGroup(group, projectId, request);
    }

    //修改小队信息
    @RequestMapping(value = "/{groupId}", method = RequestMethod.PATCH)
    public Result updateGroup(@PathVariable int groupId, @RequestBody Group group, HttpServletRequest request) {
        return groupService.updateGroup(groupId, group, request);
    }

    //删除小队
    @RequestMapping(value = "/{groupId}", method = RequestMethod.DELETE)
    public Result deleteGroup(@PathVariable int groupId, HttpServletRequest request) {
        return groupService.deleteGroup(groupId, request);
    }

    //申请加入小队
    @RequestMapping(value = "/{groupId}/applications", method = RequestMethod.POST)
    public Result addApplication(@PathVariable int groupId, HttpServletRequest request) {
        return groupService.addApplication(groupId, request);
    }

    //获取队伍申请列表
    @RequestMapping(value = "/{groupId}/applications", method = RequestMethod.GET)
    public Result getApplicationList(@PathVariable int groupId, HttpServletRequest request) {
        return groupService.getApplicationList(groupId, request);
    }

    //获取队伍申请
    @RequestMapping(value = "/{groupId}/applications/{applicationId}", method = RequestMethod.GET)
    public Result getApplication(@PathVariable int groupId, @PathVariable int applicationId, HttpServletRequest request) {
        return groupService.getApplication(applicationId, groupId, request);
    }

    //审核队伍申请
    @RequestMapping(value = "/{groupId}/applications/{applicationId}/result/{result}/account/{account}", method = RequestMethod.PATCH)
    public Result updateApplication(@PathVariable int groupId, @PathVariable int applicationId, @PathVariable int result, @PathVariable String account, HttpServletRequest request) {
        return groupService.updateApplication(groupId, applicationId, result, account, request);
    }

    //查看小队内成员
    @RequestMapping(value = "/{groupId}/members", method = RequestMethod.GET)
    public Result getGroupMember(@PathVariable int groupId, HttpServletRequest request) {
        return groupService.getGroupMember(groupId, request);
    }

    //踢出成员
    @RequestMapping(value = "/{groupId}/members/{account}", method = RequestMethod.DELETE)
    public Result deleteMember(@PathVariable int groupId, @PathVariable String account, HttpServletRequest request) {
        return groupService.deleteMember(groupId, account, request);
    }


}
