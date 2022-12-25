package daisy.teaming.controller;

import daisy.teaming.bean.ChoiceQuestion;
import daisy.teaming.bean.CompletionQuestion;
import daisy.teaming.service.ChoiceQuestionService;
import daisy.teaming.service.CompletionQuestionService;
import daisy.teaming.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName QuestionController
 * @Description //TODO
 * @Author poros
 * @Date 2021/5/16 11:17
 **/
@RestController
public class QuestionController {
    @Autowired
    private ChoiceQuestionService choiceQuestionService;

    @Autowired
    private CompletionQuestionService completionQuestionService;

    @RequestMapping(value = "/choiceQuestion", method = RequestMethod.POST)
    public Result addChoiceQuestion(@RequestBody ChoiceQuestion choiceQuestion, @RequestParam int projectId, HttpServletRequest request) {
        return choiceQuestionService.addChoiceQuestion(choiceQuestion, projectId, request);
    }

    @RequestMapping(value = "/completionQuestion", method = RequestMethod.POST)
    public Result addCompletionQuestion(@RequestBody CompletionQuestion completionQuestion, @RequestParam int projectId, HttpServletRequest request) {
        return completionQuestionService.addCompletionQuestion(completionQuestion, projectId, request);
    }

    @RequestMapping(value = "/choiceQuestion/{choiceQuestionId}", method = RequestMethod.GET)
    public Result getChoiceQuestion(@PathVariable int choiceQuestionId) {
        return choiceQuestionService.getChoiceQuestion(choiceQuestionId);
    }

    @RequestMapping(value = "/completionQuestion/{completionQuestionId}", method = RequestMethod.GET)
    public Result getCompletionQuestion(@PathVariable int completionQuestionId) {
        return completionQuestionService.getCompletionQuestion(completionQuestionId);
    }

    @RequestMapping(value = "/choiceQuestion/{choiceQuestionId}", method = RequestMethod.DELETE)
    public Result deleteChoiceQuestion(HttpServletRequest request, @PathVariable int choiceQuestionId) {
        return choiceQuestionService.deleteChoiceQuestion(choiceQuestionId, request);
    }

    @RequestMapping(value = "/completionQuestion/{completionQuestionId}", method = RequestMethod.DELETE)
    public Result deleteCompletionQuestion(HttpServletRequest request, @PathVariable int completionQuestionId) {
        return completionQuestionService.deleteCompletionQuestion(completionQuestionId, request);
    }

    @RequestMapping(value = "/choiceQuestionList/{projectId}", method = RequestMethod.GET)
    public Result getChoiceQuestionList(@PathVariable int projectId) {
        return choiceQuestionService.getChoiceQuestionList(projectId);
    }

    @RequestMapping(value = "/completionQuestionList/{projectId}", method = RequestMethod.GET)
    public Result getCompletionQuestionList(@PathVariable int projectId) {
        return completionQuestionService.getCompletionQuestionList(projectId);
    }
}
