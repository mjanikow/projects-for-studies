package zad1;

public class User {

    private final String adress ;
    private String chatName ;

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }


    public User(String adress){

        this.adress = adress ;

    }

    public String getAdress() {
        return adress;
    }


}
