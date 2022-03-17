/**
 *
 *  @author Janikow Mateusz S21200
 *
 */

package zad1;


import java.util.List;
import java.util.concurrent.ExecutionException;

public class ChatClientTask extends Thread  {
    ChatClient c;
    List<String> msgs;
    int wait;

    public ChatClient getClient() {
        return  c;
    }


    public ChatClientTask(ChatClient c, List<String> msgs, int wait) {
        this.c = c ;
        this.msgs = msgs;
        this.wait = wait ;
    }

    public static ChatClientTask create(ChatClient c, List<String> msgs, int wait){

        return new ChatClientTask(c,msgs,wait);
    }

    public void run(){
        if(wait==0) wait=2;
        try {
            c.login();
            for (String msg : msgs) {
                Thread.sleep(wait);
                c.send(msg);
            }
            c.logout();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public void get() throws InterruptedException , ExecutionException {}

}
