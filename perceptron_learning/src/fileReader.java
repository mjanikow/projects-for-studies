import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class fileReader {


    public static List<Record> readFile(String fname){
        List<List<String>> records = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new FileReader(fname))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(";");
                records.add(Arrays.asList(values));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        List<Record> values = new ArrayList<>();

        for (int i = 1 ; i < records.size(); i ++){
            values.add(new Record(records.get(i)));
        }

        return values;
    }

    private static int  getRandomInt(int max) {
        return (int) Math.floor(Math.random() * Math.floor(max));
    }
}
