import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.AWTEventListener;
import java.io.*;
import java.util.NoSuchElementException;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TableAction {

    UserInformation resultTable = new UserInformation();
    UserInformation information = new UserInformation();

    public void Wczytaj(JTable x){
        {JFileChooser wczytaj = new JFileChooser();
            if (wczytaj.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
                File plik = wczytaj.getSelectedFile();
                try {
                    Scanner skaner = new Scanner(plik);
                    int i = 0;
                    FileReader fr = new FileReader(plik);
                    LineNumberReader lnr = new LineNumberReader(fr);
                    lnr.skip(Long.MAX_VALUE);
                    i = lnr.getLineNumber();
                    DefaultTableModel Tmp = (DefaultTableModel) x.getModel();
                    for (int c = 0; c < i; c++){
                        String s = skaner.nextLine();
                        String holder [] = s.split("-");
                        holder[4] = holder[4].replace(",",".");
                        String nazwa = holder[0];
                        String CzasTrwania = holder[1];
                        String wykonawca = holder[2];
                        String Premiera = holder[3];
                        String Rodzaj = holder[4];
                        Object[] Row = {nazwa, CzasTrwania, wykonawca, Premiera, Rodzaj};
                        Tmp.addRow(Row);
                    }
                    skaner.close();

                }
                catch (FileNotFoundException ex) {
                    information.informationForUser("Plik nie znaleziony");
                }
                catch (IOException e) {
                    information.informationForUser("Blad podczas odczytu");
                }
                catch (IndexOutOfBoundsException e) {
                    information.informationForUser("Podany plik jest niepoprawnie zapisany");
                }
                catch (NoSuchElementException e) {
                    information.informationForUser("Podany plik jest niepoprawnie zapisany");
                }
            }};
    }

    public void Zapisz(JTable x){
        {JFileChooser zapisz = new JFileChooser();
            DefaultTableModel Tmp = (DefaultTableModel) x.getModel();
            if (Tmp.getRowCount() > 0) {
                if (zapisz.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
                    File file = zapisz.getSelectedFile();
                    try {
                        FileWriter out = new FileWriter(file);
                        for (int c = 0; c < (int) Tmp.getRowCount(); c++) {
                            for (int a = 0; a < 5; a++) {
                                Object objectat = Tmp.getValueAt(c, a);
                                System.out.println("wiersz numer = " + (int) Tmp.getRowCount());
                                System.out.println("kolumna numer = " + a);
                                System.out.println("zawartosc = " + objectat.toString());
                                out.write(objectat.toString());
                                if (a < 4)
                                    out.write("-");
                            }
                            out.write("\r\n");
                        }
                        ;
                        out.close();
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            else{
                information.informationForUser("Plik jest pusty");
            }
        }
    }



    public void Dodaj(JTable x, Object day, Object month, Object year, String wykonawca, Object minut, Object sekund, Object rodzaj, String nazwa){
        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();
        String czasTrwania = minut.toString() + "." + sekund.toString();
        String premiera = year.toString() + "." + month.toString() + "." + day.toString();
        Object[] Row = {nazwa, czasTrwania, wykonawca, premiera, rodzaj};
        Tmp.addRow(Row);

    }

    public void Zamien(JTable x, Object day, Object month, Object year, String wykonawca, Object minut, Object sekund, Object rodzaj, String nazwa, int number){
        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();
        String czasTrwania = minut.toString() + "." + sekund.toString();
        String premiera = year.toString() + "." + month.toString() + "." + day.toString();
        Tmp.setValueAt(nazwa , number, 0);
        Tmp.setValueAt(czasTrwania , number, 1);
        Tmp.setValueAt(wykonawca , number, 2);
        Tmp.setValueAt(premiera , number, 3);
        Tmp.setValueAt(rodzaj , number, 4);

    }

    public void Delete(JTable x, int number){
        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();
        Tmp.removeRow(number - 1);

    }

    public void Search(JTable x, String y){

        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();

        for (int q = 0 ; q < Tmp.getRowCount(); q++){
            for (int w = 0 ; w < Tmp.getColumnCount(); w++){
                Pattern p = Pattern.compile(y);
                Matcher m = p.matcher(Tmp.getValueAt(q, w).toString());
                boolean b = m.matches();
                    if (b){
                        resultTable.informationTable(x, q);
                    }

            }

        }

    }


    public void advancedSearchChoice(Object choiceone1, Object choiceone2,Object choicetwo1, Object choicetwo2, JTable x, Object day, Object month, Object year, Object secound, Object minutes){
        DefaultTableModel Tmp = (DefaultTableModel) x.getModel();

        if(choiceone1.equals(true)){
            if(choicetwo1.equals(true)) {
                for (int tmp = 0; tmp < Tmp.getRowCount(); tmp++) {
                    Object premiere = Tmp.getValueAt(tmp, 3);
                    String tmp1 = premiere.toString();
                    String holder1[] = tmp1.split("\\.");
                    String day1 = holder1[0];
                    String month1 = holder1[1];
                    String year1 = holder1[2];
                    String premiereString = year1 + month1 + day1;
                    int foo = Integer.parseInt(premiereString);
                    String tmpInt = year.toString() + month.toString() + day.toString();
                    System.out.println(year.toString()+month.toString()+day.toString());
                    int foo1 = Integer.parseInt(tmpInt);
                    if (foo > foo1) {
                        resultTable.informationTable(x, tmp);
                    }
                }
            }
            else{
                for(int tmp = 0; tmp > Tmp.getRowCount(); tmp++){
                    Object premiere = Tmp.getValueAt(tmp, 3);
                    String tmp1 = premiere.toString();
                    String holder1 [] = tmp1.split("\\.");
                    String day1 = holder1[0];
                    String month1 = holder1[1];
                    String year1 = holder1[2];
                    String premiereString = year1 + month1 + day1;
                    int foo = Integer.parseInt(premiereString);
                    String tmpInt = year.toString()+month.toString()+day.toString();
                    System.out.println(year.toString()+month.toString()+day.toString());
                    int foo1 = Integer.parseInt(tmpInt);
                    if (foo > foo1){
                        resultTable.informationTable(x, tmp);;
                    }
                }
            }
        }
        if(choiceone2.equals(true)){
            if(choicetwo2.equals(true)) {
                for (int tmp = 0; tmp < Tmp.getRowCount(); tmp++) {
                    Object premiere = Tmp.getValueAt(tmp, 3);
                    String tmp1 = premiere.toString();
                    String holder1[] = tmp1.split("\\.");
                    String secound1 = holder1[0];
                    String minutes1 = holder1[1];
                    String premiereString = minutes1 + secound1;
                    int foo = Integer.parseInt(premiereString);
                    String tmpInt = minutes.toString() + secound.toString();
                    System.out.println(minutes.toString() + secound.toString());
                    int foo1 = Integer.parseInt(tmpInt);
                    if (foo > foo1) {
                        resultTable.informationTable(x, tmp);
                    }
                }
            }
            else{
                for(int tmp = 0; tmp > Tmp.getRowCount(); tmp++){
                    Object premiere = Tmp.getValueAt(tmp, 3);
                    String tmp1 = premiere.toString();
                    String holder1 [] = tmp1.split("\\.");
                    String secound1 = holder1[0];
                    String minutes1 = holder1[1];
                    String premiereString = minutes1+secound1;
                    int foo = Integer.parseInt(premiereString);
                    String tmpInt = minutes.toString() + secound.toString();
                    System.out.println(minutes.toString() + secound.toString());
                    int foo1 = Integer.parseInt(tmpInt);
                    if (foo > foo1){
                        resultTable.informationTable(x, tmp);
                    }
                }
            }
        }
    }

}
