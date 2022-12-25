package daisy.teaming.controller;

import daisy.teaming.bean.User;
import daisy.teaming.util.Result;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alive")
public class Alive {
    @RequestMapping(value="/",method = RequestMethod.GET)
    public String register()
    {
        return "alive";
    }
}
