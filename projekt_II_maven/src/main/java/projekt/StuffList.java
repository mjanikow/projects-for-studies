package projekt;


import java.util.List;

public class StuffList {
    private List<Stuff> stuffList;

    public StuffList() {}

    public StuffList(List<Stuff> stuffList) { this.stuffList = stuffList; }

    public List<Stuff> getStuffList() { return stuffList; }

    public void setstuffList(List<Stuff> stuffList) { this.stuffList = stuffList;
    }
}
