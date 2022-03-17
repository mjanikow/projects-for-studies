import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class Edition {

     public void add(JTable x){
        JFrame main = new JFrame();
        main.setBounds(0, 0, 620, 400);
        main.getContentPane().setLayout(null);
        main.setResizable(false);
        main.setVisible(true);

        JLabel contractorLabel = new JLabel("wykonawca");
        contractorLabel.setBounds(20,20,150,20);
        main.add(contractorLabel);
        JTextField ContractorObject = new JTextField();
        ContractorObject.setBounds(250,20,150, 20);
        main.add(ContractorObject);



        JLabel premiere = new JLabel("data premiery");
        premiere.setBounds(20,60,150,20);
        main.add(premiere);
        SpinnerNumberModel value = new SpinnerNumberModel(0,0,31,1);
        SpinnerNumberModel value1 = new SpinnerNumberModel(1,1,12,1);
        SpinnerNumberModel value2 = new SpinnerNumberModel(2000,1950,2020,1);
        JSpinner day = new JSpinner(value);
        JSpinner month = new JSpinner(value1);
        JSpinner year = new JSpinner(value2);
        day.setBounds(250,60,50, 20);
        month.setBounds(300,60,50, 20);
        year.setBounds(350,60,50, 20);
        JComponent editor=day.getEditor();
        ((JSpinner.DefaultEditor)editor).getTextField().setEditable(false);
        JComponent editor1=month.getEditor();
        ((JSpinner.DefaultEditor)editor1).getTextField().setEditable(false);
        JComponent editor2=year.getEditor();
        ((JSpinner.DefaultEditor)editor2).getTextField().setEditable(false);
        main.add(day);
        main.add(month);
        main.add(year);


        JLabel time = new JLabel("czas trwania");
        time.setBounds(20,100,150,20);
        main.add(time);
        SpinnerNumberModel value3 = new SpinnerNumberModel(1,1,60,1);
        SpinnerNumberModel value4 = new SpinnerNumberModel(1,1,60,1);
        JSpinner minutes = new JSpinner(value3);
        JSpinner secounds = new JSpinner(value4);
        JComponent editor3=minutes.getEditor();
        ((JSpinner.DefaultEditor)editor3).getTextField().setEditable(false);
        JComponent editor4=secounds.getEditor();
        ((JSpinner.DefaultEditor)editor4).getTextField().setEditable(false);
        minutes.setBounds(250,100,50, 20);
        secounds.setBounds(300,100,100, 20);
        main.add(minutes);
        main.add(secounds);


        JLabel nameLabel = new JLabel("nazwa");
        nameLabel.setBounds(20,140,150,20);
        main.add(nameLabel);
        JTextField nameObject = new JTextField();
        nameObject.setBounds(250,140,150, 20);
        main.add(nameObject);


        JLabel typeLabel = new JLabel("gatunek");
        typeLabel.setBounds(20,180,150,20);
        main.add(typeLabel);
        String[] option1 = { "POP","ROCK","ELECTRONIC","HIP-HOP","RAP","Trap","Singer","CLASSIC","R&B","BLUES","METAL","COUNTRY" };
        JComboBox typeObject = new JComboBox(option1);
        typeObject.setBounds(250,180,150,20);
        main.add(typeObject);

        JButton add = new JButton("Dodaj");
        add.setBounds(280,300,100,20);
        main.add(add);


        TableAction Table = new TableAction();
        add.addActionListener(e -> Table.Dodaj(x, day.getValue(), month.getValue(), year.getValue(), ContractorObject.getText(), minutes.getValue(), secounds.getValue(), typeObject.getSelectedItem(), nameObject.getText() ));
         add.addActionListener(e -> main.setVisible(false));

    }


    public void edition(JTable x, Object number){
        DefaultTableModel tmp = (DefaultTableModel) x.getModel();
        int tmpNumber = (int)number - 1;
        Object name = tmp.getValueAt(tmpNumber, 0);
        Object time = tmp.getValueAt(tmpNumber, 1);
        String tmp0 = time.toString();
        String holder0 [] = tmp0.split("\\.");
        String minutesInteger = holder0[0];
        String secoundsInteger = holder0[1];
        Object creator = tmp.getValueAt(tmpNumber, 2);
        Object premiere = tmp.getValueAt(tmpNumber, 3);
        String tmp1 = premiere.toString();
        String holder1 [] = tmp1.split("\\.");
        String dayInteger = holder1[0];
        String monthInteger = holder1[1];
        String yearInteger = holder1[2];
        Object type = tmp.getValueAt(tmpNumber, 4);


        JFrame main = new JFrame();
            main.setBounds(0, 0, 620, 400);
        main.getContentPane().setLayout(null);
        main.setResizable(false);
        main.setVisible(true);


        JLabel contractorLabel = new JLabel("wykonawca");
            contractorLabel.setBounds(20,20,150,20);
        main.add(contractorLabel);
        JTextField contractorObject = new JTextField();
            contractorObject.setBounds(250,20,150, 20);
        contractorObject.setText(String.valueOf(creator));
        main.add(contractorObject);


        JLabel premiereLabel = new JLabel("data premiery");
            premiereLabel.setBounds(20,60,150,20);
        main.add(premiereLabel);
            SpinnerNumberModel value = new SpinnerNumberModel(1,0,31,1);
            SpinnerNumberModel value1 = new SpinnerNumberModel(1,1,12,1);
            SpinnerNumberModel value2 = new SpinnerNumberModel(2000,1950,2020,1);
        JSpinner year = new JSpinner(value2);
            year.setValue(Integer.valueOf(dayInteger));
        JSpinner month = new JSpinner(value1);
            month.setValue(Integer.valueOf(monthInteger));
        JSpinner day = new JSpinner(value);
                day.setValue(Integer.valueOf(yearInteger));
        JComponent editor=day.getEditor();
        ((JSpinner.DefaultEditor)editor).getTextField().setEditable(false);
        JComponent editor1=month.getEditor();
        ((JSpinner.DefaultEditor)editor1).getTextField().setEditable(false);
        JComponent editor2=year.getEditor();
        ((JSpinner.DefaultEditor)editor2).getTextField().setEditable(false);
            day.setBounds(250,60,50, 20);
            month.setBounds(300,60,50, 20);
            year.setBounds(350,60,50, 20);
        main.add(day);
        main.add(month);
        main.add(year);


        JLabel timeLabel = new JLabel("czas trwania");
            timeLabel.setBounds(20,100,150,20);
        main.add(timeLabel);
        SpinnerNumberModel value3 = new SpinnerNumberModel(1,1,60,1);
        SpinnerNumberModel value4 = new SpinnerNumberModel(1,1,60,1);
        JSpinner minutes = new JSpinner(value3);
            minutes.setValue(Integer.valueOf(minutesInteger));
        JSpinner secounds = new JSpinner(value4);
            secounds.setValue(Integer.valueOf(secoundsInteger));
        JComponent editor3=minutes.getEditor();
        ((JSpinner.DefaultEditor)editor3).getTextField().setEditable(false);
        JComponent editor4=secounds.getEditor();
        ((JSpinner.DefaultEditor)editor4).getTextField().setEditable(false);
            minutes.setBounds(250,100,50, 20);
            secounds.setBounds(300,100,100, 20);
        main.add(minutes);
        main.add(secounds);


        JLabel nameLabel = new JLabel("nazwa");
            nameLabel.setBounds(20,140,150,20);
        main.add(nameLabel);
        JTextField nameObject = new JTextField();
            nameObject.setBounds(250,140,150, 20);
        nameObject.setText(String.valueOf(name));
        main.add(nameObject);


        JLabel typeLabel = new JLabel("gatunek");
            typeLabel.setBounds(20,180,150,20);
        main.add(typeLabel);
        String[] option1 = { "POP","ROCK","ELECTRONIC","HIP-HOP","RAP","TRAP","SINGER","CLASSIC","R&B","BLUES","METAL","COUNTRY" };
        JComboBox typeObject = new JComboBox(option1);
        typeObject.setSelectedItem(type);
            typeObject.setBounds(250,180,150,20);
        main.add(typeObject);


        JButton add = new JButton("Zmien");
            add.setBounds(280,300,100,20);
        main.add(add);


        TableAction Table = new TableAction();
        add.addActionListener(e -> Table.Zamien(x, day.getValue(), month.getValue(), year.getValue(), contractorObject.getText(), minutes.getValue(), secounds.getValue(), typeObject.getSelectedItem(), nameObject.getText(), tmpNumber ));
        add.addActionListener(e -> main.setVisible(false));

    }







}
