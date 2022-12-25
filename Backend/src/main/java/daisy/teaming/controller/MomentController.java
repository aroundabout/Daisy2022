package daisy.teaming.controller;

import daisy.teaming.bean.Moment;
import daisy.teaming.service.MomentService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/Moment")
public class MomentController {
    @Autowired
    private MomentService momentService;

    @RequestMapping(method = RequestMethod.POST)
    public Result addMoment(@RequestBody Moment moment, HttpServletRequest request){
        return momentService.addMoment(moment);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Result getMomentList(HttpServletRequest request){
        return momentService.getMomentList();
    }

    @RequestMapping(value = "/{momentId}",method = RequestMethod.GET)
    public Result getMoment(@PathVariable int momentId,HttpServletRequest request){
        return momentService.getMoment(momentId,request);
    }

    @RequestMapping(value ="/count/{momentId}",method = RequestMethod.GET)
    public Result getCommentCount(@PathVariable int momentId,HttpServletRequest request){
        return momentService.getComentCount(momentId,request);
    }

    @RequestMapping(value = "/like/momentId/{momentId}/account/{account}",method = RequestMethod.POST)
    public Result likeMoment(@PathVariable int  momentId,@PathVariable String account){
        return momentService.likeMoment(momentId,account);
    }
}
