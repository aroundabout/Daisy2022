package daisy.teaming.bean;

public class MomentWithAvatar {
    private int momentId;
    private String account;
    private String title;
    private String content;
    private int likecount;
    private String time;
    private String avatar;
    public void setTitle(String title) {
        this.title = title;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setLikecount(int likecount) {
        this.likecount = likecount;
    }

    public void setMomentId(int momentId) {
        this.momentId = momentId;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public int getLikecount() {
        return likecount;
    }

    public int getMomentId() {
        return momentId;
    }

    public String getAccount() {
        return account;
    }

    public String getContent() {
        return content;
    }

    public String getTime() {
        return time;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getAvatar() {
        return avatar;
    }

}
