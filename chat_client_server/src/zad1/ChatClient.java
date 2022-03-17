/**
 *
 *  @author Janikow Mateusz S21200
 *
 */

package zad1;


import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.SocketChannel;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class ChatClient {
    private final String host;
    private final int port;
    private final String id;
    public static int count = 0;
    private SocketChannel channel;
    private final StringBuffer result;




    public ChatClient(String host, int port, String id) {
        this.host = host;
        this.port = port;
        this.id = id;
        result = new StringBuffer();
        result.append("=== ").append(id).append(" chat view\n");
    }

    public void login(){
        count++;
        try {
            channel = SocketChannel.open();
            channel.configureBlocking(false);

            if (!channel.isOpen())
                channel = SocketChannel.open();

            channel.connect(new InetSocketAddress(host, port));
            while (!channel.finishConnect()) { }

        } catch (Exception e) {
            e.printStackTrace();
        }


        send(id + " login");
    }
    public void logout(){
        try{
            Thread.sleep(20);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        send("logout");

    }


    public void send(String req) {


        Charset charset = StandardCharsets.UTF_8;
        CharBuffer charBuffer = CharBuffer.wrap(req);
        ByteBuffer inBuffer = ByteBuffer.allocateDirect(1024);
        byte[] bytes = req.getBytes(StandardCharsets.UTF_8);
        ByteBuffer buf = ByteBuffer.wrap(bytes);

        try {
            channel.write(buf);
            while (true) {
                inBuffer.clear();
                try{
                    int readBytes = channel.read(inBuffer);
                    if (readBytes > 0)
                    {
                        inBuffer.flip();
                        charBuffer = charset.decode(inBuffer);
                        result.append(charBuffer);
                        break;
                    }

                }catch(Exception e){}
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getChatView() {
        String str = String.valueOf(result);
        if (!str.contains(id + "logged out"))
            result.append(id+" logged out\n");

        return result.toString();
    }
}
