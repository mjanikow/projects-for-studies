import javax.swing.*;
import javax.swing.JMenuBar;
import javax.swing.table.DefaultTableModel;

public class GUI {



    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }


    public static void createAndShowGUI() {
        JMenu menuOption, menuSorting;


        JFrame main = new JFrame();
        main.setTitle("music player");
        main.setBounds(650, 100, 1024, 768);
        main.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        main.setResizable(true);
        main.setVisible(true);


        JMenuBar menuBar = new JMenuBar();

        menuOption = new JMenu("Menu");
        JMenuItem load = new JMenuItem("Wczytaj");
        JMenuItem save = new JMenuItem("Zapisz");
        JMenuItem add = new JMenuItem("Dodawanie");
        JMenuItem edit = new JMenuItem("Edycja");
        JMenuItem delete = new JMenuItem("Usun");

        menuOption.add(load);
        menuOption.addSeparator();
        menuOption.add(save);
        menuOption.addSeparator();
        menuOption.add(add);
        menuOption.addSeparator();
        menuOption.add(edit);
        menuOption.addSeparator();
        menuOption.add(delete);

        menuSorting = new JMenu("Sortowanie");

        JMenuItem searching = new JMenuItem("Szukaj");
        menuSorting.add(searching);
        JMenuItem advancedSearching = new JMenuItem("Szukanie zaawansowane");
        menuSorting.add(advancedSearching);


        main.setJMenuBar(menuBar);
        menuBar.add(menuOption);
        menuBar.add(menuSorting);

        String[] Column = {"Tytuł", "Czas trwania", "Twórca", "Data premiery", "gatunek"};
        JTable  jt = new JTable(new DefaultTableModel(Column , 0));
        JScrollPane sp = new JScrollPane(jt);
        jt.setAutoCreateRowSorter(true);
        jt.setEnabled(false);
        sp.setVisible(true);
        main.add(sp);

        TableAction Table = new TableAction();
        Rownumberselected edition = new Rownumberselected();
        Edition added = new Edition();
        load.addActionListener(e -> Table.Wczytaj(jt));
        add.addActionListener(e -> added.add(jt));
        edit.addActionListener(e -> edition.rownumberselected(jt));
        delete.addActionListener(e -> edition.deletedRowNumber(jt));
        save.addActionListener(e -> Table.Zapisz(jt));
        searching.addActionListener(e -> edition.searchchoice(jt));
        advancedSearching.addActionListener(e -> edition.advancedSearchChoice(jt));



    }

}