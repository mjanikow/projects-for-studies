/**
 *
 *  @author Janikow Mateusz S21200
 *
 */

package zad1;


import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;


public class ChatServer extends Thread  {
    private final Selector selector;
    private final ServerSocketChannel ssc;
    private final StringBuffer serverLog;
    private final List<User> adressList = new ArrayList<>();
    private static final int bufSize = 1024;
    private final ByteBuffer byteBuffer = ByteBuffer.allocate(bufSize);


    public ChatServer(String host, int port) throws IOException {
        serverLog = new StringBuffer();
        ssc = ServerSocketChannel.open();
        ssc.configureBlocking(false);
        ssc.socket().bind(new InetSocketAddress(host, port));
        selector = Selector.open();
        ssc.register(selector, SelectionKey.OP_ACCEPT);
    }
    public void startServer() {
        System.out.println("Server started\n");
        start();
    }
    public void stopServer() {
        System.out.println("Server stopped");
        try {
            Thread.sleep(500);
            ssc.close();
            selector.close();
        } catch (InterruptedException | IOException e) {
            e.printStackTrace();
        }

    }
    @Override
    public void run(){

        try {
            SelectionKey key;
            while(this.ssc.isOpen()) {
                selector.select();
                if(!selector.isOpen()) {
                    break;
                }
                Iterator<SelectionKey> iter = this.selector.selectedKeys().iterator();
                while(iter.hasNext()) {
                    key = iter.next();
                    iter.remove();

                    if(key.isAcceptable())
                        serviceAccept(key);
                    if (key.isReadable())
                        serviceRequest(key);
                }
            }
        } catch(IOException e) {
            e.printStackTrace();
        }
    }

    private void serviceRequest(SelectionKey key) throws IOException {
        SocketChannel ch = (SocketChannel) key.channel();
        StringBuilder sb = new StringBuilder();
        String address = ch.socket().getInetAddress().toString() + ":" + ch.socket().getPort();
        int clientID = getClientID(adressList,address);
        byteBuffer.clear();
        try{
            while( ch.read(byteBuffer) > 0 ) {
                byteBuffer.flip();
                byte[] bytes = new byte[byteBuffer.limit()];
                byteBuffer.get(bytes);
                sb.append(new String(bytes));
                byteBuffer.clear();
            }

        } catch (Exception e) {
            key.cancel();
        }

        try {
            String msg = sb.toString();

            if(msg.equals("logout"))
            {
                String msgC = adressList.get(clientID).getChatName()+" logged out\n";
                msg = getCurrentTime() + adressList.get(clientID).getChatName()+" logged out\n";
                serverLog.append(msg);
                writeRespToAll(msgC);
                ch.close();
            }
            else
            if(sb.toString().contains("login"))
            {
                adressList.get(clientID).setChatName(msg.split(" ")[0]);
                String msgC = adressList.get(clientID).getChatName() + " logged in\n";
                msg = getCurrentTime()  + adressList.get(clientID).getChatName() + " logged in\n";
                serverLog.append(msg);
                writeRespToAll(msgC);
            }
            else
            {
                String msgC = adressList.get(clientID).getChatName()+": "+msg+"\n";
                msg = getCurrentTime() + adressList.get(clientID).getChatName()+": "+msg+"\n";
                serverLog.append(msg);
                writeRespToAll(msgC);
            }
        }catch(Exception e){

        }


    }

    private void serviceAccept(SelectionKey key) throws IOException {
        SocketChannel sc = ((ServerSocketChannel) key.channel()).accept();
        String address = sc.socket().getInetAddress().toString() + ":" + sc.socket().getPort();
        sc.configureBlocking(false);
        sc.register(selector, SelectionKey.OP_READ, address);
        adressList.add(new User(address));
    }

    private static String getCurrentTime(){
        return new SimpleDateFormat("HH:mm:ss.SSS").format(new Date()) + " ";
    }

    private static  int getClientID(List<User> clientList, String adress){
        int index = -1 ;
        for(int i=0 ;i<clientList.size();i++ ){
            if(clientList.get(i).getAdress().equals(adress))
                index = i ;
        }
        return index;
    }

    private void writeRespToAll(String msg) throws IOException {

        ByteBuffer msgBuf=ByteBuffer.wrap(msg.getBytes());
        for(SelectionKey key : selector.keys()) {
            if(key.isValid() && key.channel() instanceof SocketChannel) {
                SocketChannel sch=(SocketChannel) key.channel();
                sch.write(msgBuf);
                msgBuf.rewind();
            }
        }
    }

    public String getServerLog() {
        return serverLog.toString();
    }
}
