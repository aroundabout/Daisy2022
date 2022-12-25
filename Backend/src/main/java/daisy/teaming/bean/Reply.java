package daisy.teaming.bean;

public class Reply {
    private int replyId;
    private String account;
    private String content;
    private String time;

    public void setReplyId(int replyId) {
        this.replyId = replyId;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getTime() {
        return time;
    }

    public int getReplyId() {
        return replyId;
    }

    public String getContent() {
        return content;
    }

    public String getAccount() {
        return account;
    }
}
