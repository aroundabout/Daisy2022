package daisy.teaming.bean;

public class ReplyWithAvatar {
    private int replyId;
    private String account;
    private String content;
    private String time;
    private String avatar;

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

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }
}
