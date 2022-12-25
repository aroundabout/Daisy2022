package daisy.teaming.controller;

import daisy.teaming.bean.Project;
import daisy.teaming.service.ProjectService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @RequestMapping(value="/projects",method = RequestMethod.POST)
    public Result addProject(@RequestBody Project project , HttpServletRequest request)
    {
        return projectService.addProject(project,request);
    }

    @RequestMapping(value="/projects/{projectId}",method = RequestMethod.GET)
    public Result getProject(@PathVariable int projectId)
    {
        return projectService.getProject(projectId);
    }

    @RequestMapping(value="/projects/{projectId}",method = RequestMethod.DELETE)
    public Result deleteProject(HttpServletRequest request, @PathVariable int projectId)
    {
        return projectService.deleteProject(projectId,request);
    }

    @RequestMapping(value="/projects",method = RequestMethod.GET)
    public Result getProjectList()
    {
        return projectService.getProjectList();
    }

    @RequestMapping(value="/projects/{projectId}",method=RequestMethod.PATCH)
   public Result updateProject(@PathVariable int projectId,@RequestBody Project project,HttpServletRequest request)
    {
        return projectService.updateProject(project,projectId,request);
    }
}
