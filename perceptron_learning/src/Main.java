

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class Main {
    public static boolean contains(final double[] arr, final double key) {
        return Arrays.stream(arr).anyMatch(i -> i == key);
    }

    public static void main(String[] args) throws IOException {


        List<Record> pTest = fileReader.readFile("test.csv");
        List<Record> pTrain = fileReader.readFile("train.csv");


        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        System.out.println("alpha:  ");
        double alpha = 0;
        try {
            alpha =  Double.parseDouble(reader.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("t:  ");
        int t = 0;
        try {
            t = (int) Double.parseDouble(reader.readLine());
        } catch (IOException e) {
            e.printStackTrace();
        }

        perceptronLearning.startLearning(pTrain,t, alpha);
        List<Record> classifiedRecords = perceptronLearning.getClassifiedRecords(pTest);
        perceptronLearning.showAcc(pTest,classifiedRecords);
        perceptronLearning.showMatrix();
        perceptronLearning.showFinalWeights();


        String str;
        while(true){
            System.out.println("Podaj tekst do kwalifikacji");
            str = reader.readLine();
            if(str.equals("break")){
                break;
            }
            perceptronLearning.classText(str);

        }


    }


}
