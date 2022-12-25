package daisy.teaming.bean;

/**
 * @ClassName ChoiceQuestion
 * @Description //TODO
 * @Author poros
 * @Date 2021/5/16 11:13
 **/
public class ChoiceQuestion {
    private int questionId;
    private String question;
    private String answerA;
    private String answerB;
    private String answerC;
    private String answerD;
    private String level;
    private String answerRight;
    private int score;

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswerA() {
        return answerA;
    }

    public void setAnswerA(String answerA) {
        this.answerA = answerA;
    }

    public String getAnswerB() {
        return answerB;
    }

    public void setAnswerB(String answerB) {
        this.answerB = answerB;
    }

    public String getAnswerC() {
        return answerC;
    }

    public void setAnswerC(String answerC) {
        this.answerC = answerC;
    }

    public String getAnswerD() {
        return answerD;
    }

    public void setAnswerD(String answerD) {
        this.answerD = answerD;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getAnswerRight() {
        return answerRight;
    }

    public void setAnswerRight(String answerRight) {
        this.answerRight = answerRight;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }


}
