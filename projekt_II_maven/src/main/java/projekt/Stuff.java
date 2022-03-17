package projekt;

public class Stuff {
    private String name;
    private String category;
    private String localization;
    private Integer amount;

    public Stuff(){}

    public Stuff(String name, String category, String localization, Integer amount) {
        this.name = name;
        this.category = category;
        this.localization=localization;
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
    public String getLocalization() {
        return localization;
    }

    public void setLocalization(String localization) {
        this.localization = localization;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Stuff{" +
                "name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", localization='" + localization + '\'' +
                ", amount='" + amount + '\'' +
                '}';
    }
}
