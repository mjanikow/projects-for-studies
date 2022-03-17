import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class Rownumberselected {
    UserInformation information = new UserInformation();

    public void rownumberselected(JTable x){

        DefaultTableModel tmp = (DefaultTableModel) x.getModel();

        if(tmp.getRowCount() > 0) {
            JFrame editFrame = new JFrame();
                editFrame.setBounds(100, 100, 400, 100);
            editFrame.getContentPane().setLayout(null);
            editFrame.setResizable(false);
            editFrame.setVisible(true);

            JLabel numberOfRow = new JLabel("Numer wiersza do edycji");
                numberOfRow.setBounds(20, 20, 150, 20);
            editFrame.add(numberOfRow);

            SpinnerNumberModel value6 = new SpinnerNumberModel(0, 0, tmp.getRowCount(), 1);
            JSpinner value = new JSpinner(value6);
                value.setBounds(170, 20, 100, 20);
            JComponent editor = value.getEditor();
            ((JSpinner.DefaultEditor) editor).getTextField().setEditable(false);
            editFrame.add(value);

            JButton accept = new JButton("Akceptuj");
                accept.setBounds(280, 20, 100, 20);
            editFrame.add(accept);

            Edition edition = new Edition();
            accept.addActionListener(e -> edition.edition(x, value.getValue()));
            accept.addActionListener(e -> editFrame.setVisible(false));
        }
        else{
            information.informationForUser("Tabela nie posiada danych do edycji");
        }
    }

    public void deletedRowNumber(JTable x){

        DefaultTableModel tmp = (DefaultTableModel) x.getModel();

        if(tmp.getRowCount() > 0) {
            JFrame editFrame = new JFrame();
                editFrame.setBounds(100, 100, 400, 100);
            editFrame.getContentPane().setLayout(null);
            editFrame.setResizable(false);
            editFrame.setVisible(true);

            JLabel numberOfRow = new JLabel("Numer wiersza do usuniecia");
                numberOfRow.setBounds(20, 20, 150, 20);
            editFrame.add(numberOfRow);

            SpinnerNumberModel value6 = new SpinnerNumberModel(0, 0, tmp.getRowCount(), 1);
            JSpinner value = new JSpinner(value6);
                value.setBounds(170, 20, 100, 20);
            JComponent editor = value.getEditor();
            ((JSpinner.DefaultEditor) editor).getTextField().setEditable(false);
            editFrame.add(value);

            JButton delete = new JButton("Usun");
                delete.setBounds(280, 20, 100, 20);
            editFrame.add(delete);

            TableAction thisDelete = new TableAction();
            delete.addActionListener(e -> thisDelete.Delete(x, (int)value.getValue()));
            delete.addActionListener(e -> editFrame.setVisible(false));
        }
        else{
            information.informationForUser("Tabela nie posiada danych do usuniecia");
        }
    }

    public void searchchoice(JTable x){

        DefaultTableModel tmp = (DefaultTableModel) x.getModel();

        if(tmp.getRowCount() > 0) {
            JFrame editFrame = new JFrame();
                editFrame.setBounds(100, 100, 400, 100);
            editFrame.getContentPane().setLayout(null);
            editFrame.setResizable(false);
            editFrame.setVisible(true);

            JLabel numberOfRow = new JLabel("Fraza do szukania");
            numberOfRow.setBounds(20, 20, 150, 20);
            editFrame.add(numberOfRow);

            JTextField value = new JTextField();
                value.setBounds(170, 20, 100, 20);
            editFrame.add(value);

            JButton search = new JButton("Szukaj");
                search.setBounds(280, 20, 100, 20);
            editFrame.add(search);

            TableAction thisSearch = new TableAction();
            search.addActionListener(e -> thisSearch.Search(x, value.getText()));
            search.addActionListener(e -> editFrame.setVisible(false));
        }
        else{
            information.informationForUser("Tabela nie posiada danych do edycji");
        }

    }

    public void advancedSearchChoice(JTable x){

        DefaultTableModel tmp = (DefaultTableModel) x.getModel();

        if(tmp.getRowCount() > 0) {
            JFrame editFrame = new JFrame();
            editFrame.setBounds(100, 100, 520, 200);
            editFrame.getContentPane().setLayout(null);
            editFrame.setResizable(false);
            editFrame.setVisible(true);

            JRadioButton timeChoice = new JRadioButton("Szukaj po czasie trwania");
            timeChoice.setBounds(10, 20, 200, 20);
            editFrame.add(timeChoice);
                SpinnerNumberModel value3 = new SpinnerNumberModel(1,1,60,1);
                SpinnerNumberModel value4 = new SpinnerNumberModel(1,1,60,1);
                JSpinner minutes = new JSpinner(value3);
                JSpinner secounds = new JSpinner(value4);
                JComponent editor3=minutes.getEditor();
                ((JSpinner.DefaultEditor)editor3).getTextField().setEditable(false);
                JComponent editor4=secounds.getEditor();
                ((JSpinner.DefaultEditor)editor4).getTextField().setEditable(false);
                    minutes.setBounds(220,20,50, 20);
                    secounds.setBounds(270,20,100, 20);
                minutes.setEnabled(false);
                editFrame.add(minutes);
                secounds.setEnabled(false);
                editFrame.add(secounds);
            JRadioButton up = new JRadioButton("up");
                up.setBounds(380, 20, 50, 20);
            up.setEnabled(false);
            editFrame.add(up);
            JRadioButton down = new JRadioButton("down");
                down.setBounds(440, 20, 60, 20);
            down.setEnabled(false);
            editFrame.add(down);

            JRadioButton premiereChoice = new JRadioButton("Szukaj po dacie wydania");
            premiereChoice.setBounds(10, 60, 200, 20);
            editFrame.add(premiereChoice);
                    SpinnerNumberModel value = new SpinnerNumberModel(0,0,31,1);
                    SpinnerNumberModel value1 = new SpinnerNumberModel(1,1,12,1);
                    SpinnerNumberModel value2 = new SpinnerNumberModel(2000,1950,2020,1);
                JSpinner day = new JSpinner(value);
                JSpinner month = new JSpinner(value1);
                JSpinner year = new JSpinner(value2);
                    day.setBounds(220,60,50, 20);
                    month.setBounds(270,60,50, 20);
                    year.setBounds(320,60,50, 20);
                JComponent editor=day.getEditor();
                ((JSpinner.DefaultEditor)editor).getTextField().setEditable(false);
                JComponent editor1=month.getEditor();
                ((JSpinner.DefaultEditor)editor1).getTextField().setEditable(false);
                JComponent editor2=year.getEditor();
                ((JSpinner.DefaultEditor)editor2).getTextField().setEditable(false);
                day.setEnabled(false);
                editFrame.add(day);
                month.setEnabled(false);
                editFrame.add(month);
                year.setEnabled(false);
                editFrame.add(year);
            JRadioButton up1 = new JRadioButton("up");
                up1.setBounds(380, 60, 50, 20);
            up1.setEnabled(false);
            editFrame.add(up1);
            JRadioButton down1 = new JRadioButton("down");
                down1.setBounds(440, 60, 60, 20);
            down1.setEnabled(false);
            editFrame.add(down1);

            JButton search = new JButton("Szukaj");
            search.setBounds(210, 120, 100, 20);
            editFrame.add(search);

            TableAction thisSearch = new TableAction();

            search.addActionListener(e -> thisSearch.advancedSearchChoice(timeChoice.isSelected(), premiereChoice.isSelected(),up.isSelected(), up1.isSelected(), x, day.getValue(), month.getValue(), year.getValue(), minutes.getValue(), secounds.getValue()));
            search.addActionListener(e -> editFrame.setVisible(false));

            premiereChoice.addActionListener(e ->  timeChoice.setSelected(false));
            premiereChoice.addActionListener(e ->  up.setEnabled(false));
            premiereChoice.addActionListener(e ->  down.setEnabled(false));
            premiereChoice.addActionListener(e ->  minutes.setEnabled(false));
            premiereChoice.addActionListener(e ->  secounds.setEnabled(false));
            premiereChoice.addActionListener(e ->  up1.setEnabled(true));
            premiereChoice.addActionListener(e ->  down1.setEnabled(true));
            premiereChoice.addActionListener(e ->  day.setEnabled(true));
            premiereChoice.addActionListener(e ->  month.setEnabled(true));
            premiereChoice.addActionListener(e ->  year.setEnabled(true));

            timeChoice.addActionListener(e ->  premiereChoice.setSelected(false));
            timeChoice.addActionListener(e ->  up1.setEnabled(false));
            timeChoice.addActionListener(e ->  down1.setEnabled(false));
            timeChoice.addActionListener(e ->  day.setEnabled(false));
            timeChoice.addActionListener(e ->  month.setEnabled(false));
            timeChoice.addActionListener(e ->  year.setEnabled(false));
            timeChoice.addActionListener(e ->  up.setEnabled(true));
            timeChoice.addActionListener(e ->  down.setEnabled(true));
            timeChoice.addActionListener(e ->  minutes.setEnabled(true));
            timeChoice.addActionListener(e ->  secounds.setEnabled(true));
        }
        else{
            information.informationForUser("Tabela nie posiada danych do edycji");

        }

    }

}
