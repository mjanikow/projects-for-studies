import java.io.IOException;
import java.io.OutputStream;
import java.net.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

public class UDPClient {

    private static int port = (int) (Math.random() * (49151 - 1024 + 1) + 1024);;
    private static String addres;

    public static class TCPClient {
        TCPClient(int port) throws IOException {
            Socket socket = new Socket(addres, port);
            OutputStream outputStream = socket.getOutputStream();
            byte[] buffer = ("Client "+socket.getLocalAddress()+" knocked on TCP port "+port).getBytes();
            outputStream.write(buffer);
            socket.close();
        }
    }

    public static void main(String[] argv) throws IOException {
        addres=argv[0];
        AtomicBoolean isTimedOut = new AtomicBoolean(false);

        DatagramSocket socket = new DatagramSocket(port);
        socket.setSoTimeout(1000);

        String message = "";
        DatagramPacket outgoingPacket ;

        List<DatagramPacket> packets = new ArrayList<>();

        for (int i = 1 ; i < argv.length ; i ++){
            InetSocketAddress address = new InetSocketAddress(addres, Integer.parseInt(argv[i]));
            outgoingPacket = new DatagramPacket(message.getBytes(), message.getBytes().length, address);
            packets.add(outgoingPacket);
        }

        Thread thread = new Thread(() -> {
            for (DatagramPacket data : packets){
                try {
                    socket.send(data);
                    Thread.sleep(40);
                } catch (InterruptedException | IOException exception) {
                    exception.printStackTrace();
                }
            }
            DatagramPacket incomingPacket = new DatagramPacket(new byte[256],256);
            try {
                socket.receive(incomingPacket);
            } catch (SocketTimeoutException  e) {
                System.out.println(e.getMessage());
            } catch (IOException e) {
                e.printStackTrace();
                isTimedOut.set(true);
            }
            String reply = new String(incomingPacket.getData()).substring(0,incomingPacket.getLength());
            try {
                    TCPClient client = new TCPClient(Integer.parseInt(reply));
                } catch (IOException | NumberFormatException ignored) {
            }
        });
        thread.start();
    }
}