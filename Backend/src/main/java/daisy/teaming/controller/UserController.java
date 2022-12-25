package daisy.teaming.controller;

import daisy.teaming.bean.User;
import daisy.teaming.service.UserService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController
{
    @Autowired
    private UserService userService;

    @RequestMapping(value="/register",method = RequestMethod.POST)
    public Result register(@RequestBody User user)
    {
        return userService.register(user);
    }

    @RequestMapping(value="/login",method=RequestMethod.POST)
    public Result login(@RequestBody User user)
    {
        return userService.login(user);
    }

    @RequestMapping(value ="/profile",method = RequestMethod.GET)
    public Result getUser(HttpServletRequest request)
    {
        return userService.getUser(request);
    }

    @RequestMapping(value="/profile/{userId}",method= RequestMethod.GET)
    public Result getUser(@PathVariable String userId)
    {
        return userService.getUser(userId);
    }

    @RequestMapping(value="/profile",method = RequestMethod.PATCH)
    public Result updateUser(@RequestBody User user,HttpServletRequest request)
    {
        return userService.updateUser(user,request);
    }

    @RequestMapping(value="/projects",method=RequestMethod.GET)
    public Result getProjects(HttpServletRequest request)
    {
        return userService.getProjects(request);
    }

    @RequestMapping(value="/groups",method = RequestMethod.GET)
    public Result getGroups(HttpServletRequest request)
    {
        return userService.getGroups(request);
    }

    @RequestMapping(value="/applications",method = RequestMethod.GET)
    public Result getApplications(HttpServletRequest request)
    {
        return userService.getApplications(request);
    }
    @RequestMapping(value = "/applicationsReceived",method = RequestMethod.GET)
    public Result getApplicationReceived(HttpServletRequest request)
    {
        return userService.getApplicationsReceived(request);
    }
}


