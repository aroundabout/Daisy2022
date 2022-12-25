package daisy.teaming.bean;

public class Application {
    private int applicationId;
    private int groupId;
    private String account;
    private int result;

    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int projectId) {
        this.applicationId = projectId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }
}
