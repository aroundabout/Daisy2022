package daisy.teaming.controller;

import daisy.teaming.bean.Notice;
import daisy.teaming.service.NoticeService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class NoticeController {
    @Autowired
    private NoticeService noticeService;

    @RequestMapping(value="/notice",method = RequestMethod.POST)
    public Result postNotice(@RequestBody Notice notice, HttpServletRequest request)
    {
        return noticeService.postNotice(notice,request);
    }

    @RequestMapping(value="/notice",method=RequestMethod.GET)
    public Result getNoticeList()
    {
        return noticeService.getNoticeList();
    }

    @RequestMapping(value="/notice/{noticeId}",method=RequestMethod.GET)
    public Result getNotice(@PathVariable int noticeId)
    {
        return noticeService.getNotice(noticeId);
    }
}
