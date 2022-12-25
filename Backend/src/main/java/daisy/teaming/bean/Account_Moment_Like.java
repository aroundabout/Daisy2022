package daisy.teaming.bean;

public class Account_Moment_Like {
    private String account;
    private int momentId;
    private int isClick;

    public void setAccount(String account) {
        this.account = account;
    }

    public void setMomentId(int momentId) {
        this.momentId = momentId;
    }

    public void setIsClick(int isClick) {
        this.isClick = isClick;
    }

    public String getAccount() {
        return account;
    }

    public int getMomentId() {
        return momentId;
    }

    public int getIsClick() {
        return isClick;
    }
}
