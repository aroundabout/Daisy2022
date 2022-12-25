package daisy.teaming.bean;

/**
 * @ClassName CompletionQuestion
 * @Description //TODO
 * @Author poros
 * @Date 2021/5/16 11:13
 **/
public class CompletionQuestion {
    private int completionId;
    private String question;
    private String answer;
    private String level;
    private int score;

    public int getCompletionId() {
        return completionId;
    }

    public void setCompletionId(int completionId) {
        this.completionId = completionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
