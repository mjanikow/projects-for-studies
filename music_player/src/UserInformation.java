import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class UserInformation {

    public void resultTable() {
        JFrame resultTable = new JFrame();
        resultTable.setTitle("scoreSearching");
        resultTable.setBounds(750, 200, 1024, 768);
        resultTable.setResizable(true);
        resultTable.setVisible(true);

        String[] Column = {"Tytuł", "Czas trwania", "Twórca", "Data premiery", "gatunek"};
        JTable jt = new JTable(new DefaultTableModel(Column, 0));
        JScrollPane sp = new JScrollPane(jt);
        jt.setAutoCreateRowSorter(true);
        jt.setEnabled(false);
        sp.setVisible(true);
        resultTable.add(sp);
    }

    public void informationForUser(String information){
        JFrame informationFrame = new JFrame();
        informationFrame.setBounds(100, 100, 300, 100);
        informationFrame.getContentPane().setLayout(null);
        informationFrame.setResizable(false);
        informationFrame.setVisible(true);

        JLabel messege = new JLabel(information.toString());
        messege.setBounds(20, 20, 230, 20);
        informationFrame.add(messege);
    }

    public void informationTable(JTable x, int value){

        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();

        JFrame main1 = new JFrame();
        main1.setTitle("scoreSearching");
        main1.setBounds(750, 200, 1024, 768);
        main1.setResizable(true);
        main1.setVisible(true);

        String[] Column = {"Tytuł", "Czas trwania", "Twórca", "Data premiery", "gatunek"};
        JTable  jt = new JTable(new DefaultTableModel(Column , 0));
        JScrollPane sp = new JScrollPane(jt);
        jt.setAutoCreateRowSorter(true);
        jt.setEnabled(false);
        sp.setVisible(true);
        main1.add(sp);

        DefaultTableModel Tmp1 = (DefaultTableModel) jt.getModel();

        Object nazwa = Tmp.getValueAt(value, 0);
        Object CzasTrwania = Tmp.getValueAt(value,1);
        Object wykonawca =Tmp.getValueAt(value,2);
        Object Premiera = Tmp.getValueAt(value,3);
        Object Rodzaj = Tmp.getValueAt(value,4);
        Object[] Row = {nazwa, CzasTrwania, wykonawca, Premiera, Rodzaj};
        Tmp1.addRow(Row);
    }
}
