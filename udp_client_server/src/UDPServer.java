import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

public class UDPServer {
    private static int[] ports;

    public class TCPServer implements Runnable  {
        private Thread worker;
        private AtomicBoolean running = new AtomicBoolean(false);
        private AtomicBoolean stopped = new AtomicBoolean(false);
        private int port = 0;
        public TCPServer(int port) throws IOException {
            this.port=port;
        }
        public void start() {
            worker = new Thread(this);
            worker.start();
        }
        public void interrupt() {
            running.set(false);
            worker.interrupt();
        }
        public void run() {
            running.set(true);
            stopped.set(false);
            while (running.get()) {
                try {
                    ServerSocket serverSocket = new ServerSocket(port);
                    while (true) {
                        Socket clientSocket = serverSocket.accept();
                        InputStream inputStream = clientSocket.getInputStream();
                        OutputStream outputStream = clientSocket.getOutputStream();

                        int count;
                        byte[] buffer = new byte[256];
                        while ((count = inputStream.read(buffer)) > 0) {
                            String message = new String(buffer).substring(0, count);
                            String reply = message.toUpperCase();
                            System.out.println(reply);
                            interrupt();
                            outputStream.write(reply.getBytes());
                        }
                        clientSocket.close();
                    }
                } catch (IOException e){
                    Thread.currentThread().interrupt();
                }
            }
            stopped.set(true);
        }
    }

    public class portThread implements Runnable {
        private Thread worker;
        private AtomicBoolean running = new AtomicBoolean(false);
        private AtomicBoolean stopped = new AtomicBoolean(false);
        public void start() {
            worker = new Thread(this);
            worker.start();
        }
        public void run() {
            running.set(true);
            stopped.set(false);
            while (running.get()) {
                try {
                    service();
                    Thread.sleep(40);
                } catch (InterruptedException | IOException e){
                    Thread.currentThread().interrupt();
                    System.out.println("Thread was interrupted, Failed to complete operation");
                }
            }
            stopped.set(true);
        }
    }

    private static List<String> packetsList = new ArrayList<>();
    private DatagramSocket socket;
    public static class ServerThread extends Thread {
        private final DatagramPacket packet;
        private final DatagramSocket socket;
        public ServerThread(DatagramPacket packet, DatagramSocket socket) {
            super();
            this.packet = packet;
            this.socket = socket;
        }
    }

    private void service() throws IOException {
        byte[] buff = new byte[65535];
        final DatagramPacket datagram = new DatagramPacket(buff, buff.length);
        socket.receive(datagram);

        String dane = socket.getLocalPort() + " " + datagram.getAddress() + ":" + datagram.getPort();
        packetsList.add(dane);

        int portsSize = ports.length;

        Set<String> iDlist = new LinkedHashSet<>();
        for (String s : packetsList){
            iDlist.add(s.split("\\s+")[1]);
        }

        for (String id : iDlist){
            int i = 0;
            for (String packet : packetsList){
                if (packet.split("\\s+")[1].equals(id)){
                    if (packet.split("\\s+")[0].equals(String.valueOf(ports[i]))){
                        i++;
                    }
                }
            }
            if (i==portsSize){

                int randomTCPport = (int) (Math.random() * (49151 - 1024 + 1) + 1024);

                TCPServer server = new TCPServer(randomTCPport);
                server.start();

                byte[] respBuff = String.valueOf(randomTCPport).getBytes();
                DatagramPacket resp = new DatagramPacket(respBuff, respBuff.length, datagram.getAddress(), datagram.getPort());
                socket.send(resp);

                for (int x = 0 ; x < packetsList.size() ; x ++){
                    if (packetsList.get(x).split("\\s+")[1].equals(id))
                    {
                        packetsList.remove(x);
                        x--;
                    }
                }
                iDlist.remove(id);
            }
        }
        (new ServerThread(datagram, socket)).start();
    }

    public void listen(int port) throws IOException {

        socket = new DatagramSocket(port,InetAddress.getByName("localhost"));
        System.out.println("Server listens on port: " + socket.getLocalPort());

        portThread thread = new portThread();
        thread.start();
    }

    public static void main(String[] args) throws IOException {

        List<Integer> list = new ArrayList<>();
        for (String i : args)
            list.add(Integer.valueOf(i));
        List<Integer> activeList = list.stream().distinct().collect(Collectors.toList());
        int[] ports2 = new int[activeList.size()];
        for (int i = 0 ; i < activeList.size() ; i ++){
            ports2[i]=activeList.get(i);
        }
        ports = ports2;
        for (int i : ports){
                UDPServer server = new UDPServer();
                server.listen(i);
        }
        System.out.println();
    }
}