package zad1;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class AppWebClients {


    public static String getTemp(String weather){
        Pattern p = Pattern.compile("\"temp\":[0-9]+\\.[0-9]+");
        Matcher m = p.matcher(weather);
        m.find();

        return m.group();
    }

    public void run(){
        JFrame frame = new JFrame("WebClient");
        Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(360, 350);
        frame.setLocation(dim.width/2-frame.getSize().width/2, dim.height/2-frame.getSize().height/2);
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(new BoxLayout(mainPanel, BoxLayout.Y_AXIS));


        JPanel panelFirst = new JPanel();
        JPanel panelResault = new JPanel();
        panelResault.setLayout(new BoxLayout(panelResault, BoxLayout.Y_AXIS));


        JLabel label = new JLabel("Enter city,country,currency: ");


        JPanel panelResaultW = new JPanel();
        JPanel panelResaultR = new JPanel();
        JPanel panelResaultN = new JPanel();


        JLabel labelWeather = new JLabel("Weather: ");
        JLabel labelRateFor = new JLabel("RateFor: ");
        JLabel labelNBPRate = new JLabel("NBPRate: ");

        JTextField tf = new JTextField(30);

        JButton send = new JButton("Send");

        send.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                try {
                    String text = tf.getText();
                    String city = text.split(",")[0];
                    String country = text.split(",")[1];
                    String currency = text.split(",")[2];

                    Service service = new Service(country);


                    String weather = service.getWeather(city);

                    Double rateFor = service.getRateFor(currency);



                    labelWeather.setText("Temperature: "+ getTemp(weather).split(":")[1] + "°F");

                    labelRateFor.setText("Rate for " + currency + " : " + rateFor);

                    labelNBPRate.setText("NBP rate to "+ country + " : " +service.getNBPRate());

                    OpenLink test = new OpenLink("https://en.wikipedia.org/wiki/" + country);
                    SwingUtilities.invokeLater(new Runnable() {
                        @Override
                        public void run() {
                            test.initAndShowGUI();
                        }
                    });


                }catch (IOException ioException) {
                    ioException.printStackTrace();
                }
            }
        });
//Paris,France,PLN


        panelFirst.add(label);
        panelFirst.add(tf);
        panelFirst.add(send);

        panelResaultW.add(labelWeather);
        panelResaultR.add(labelRateFor);
        panelResaultN.add(labelNBPRate);

        panelResault.add(panelResaultW);
        panelResault.add(panelResaultR);
        panelResault.add(panelResaultN);

        mainPanel.add(panelFirst);
        mainPanel.add(panelResault);

        frame.getContentPane().add(mainPanel);
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        AppWebClients appWebClients = new AppWebClients();
        appWebClients.run();
    }

}
