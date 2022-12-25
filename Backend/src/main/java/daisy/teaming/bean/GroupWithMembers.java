package daisy.teaming.bean;

import java.util.List;

public class GroupWithMembers {
    private Group group;
    private List<String> userList;

    public void setGroup(Group group) {
        this.group = group;
    }



    public Group getGroup() {
        return group;
    }

    public void setUserList(List<String> userList) {
        this.userList = userList;
    }

    public List<String> getUserList() {
        return userList;
    }
}
