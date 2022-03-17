
import java.lang.reflect.Array;
import java.text.DecimalFormat;
import java.util.*;

import static java.lang.StrictMath.sqrt;


public class perceptronLearning {

    private static List<Perceptron> perceptrons = new ArrayList<>();
    private static Map<String, Map<String,Double>> matrixMap = new HashMap<>();


    public static List<Record> getClassifiedRecords(List<Record> list){
        for (Perceptron p : perceptrons){
            Map<String,Double> fastMap = new HashMap<>();
            for (Perceptron o : perceptrons){
                fastMap.put(o.getCategory(),0.0);
            }
            matrixMap.put(p.getCategory(),fastMap);
        }


        List<Record> classifiedRecords = new ArrayList<>();

        for (int i = 0 ; i < list.size() ; i ++){
            Record rec = new Record(list.get(i).weights,list.get(i).category);

            String firstCat = list.get(i).category;
            String category = "";
            double yMax = -2;

            for (int j = 0 ; j < perceptrons.size() ; j ++ ){
                List<Double> l1 = list.get(i).weights;
                List<Double> l2 = perceptrons.get(j).weights;
                double net = getScalar(l1,l2.subList(0,l2.size() - 1)) - l2.get(l2.size()-1);
                double y = getNetSgn(net);

                if(y > yMax){
                    category = perceptrons.get(j).getCategory();
                    yMax = y;
                }
            }

            matrixMap.get(firstCat).put(category,1+matrixMap.get(firstCat).get(category));

            rec.setCategory(category);
            classifiedRecords.add(rec);
        }

        return classifiedRecords;
    }
    public static void showAcc(List<Record> firstList, List<Record> newList){
        double count = firstList.size();
        double acc = 0.0;
        for (int i = 0 ; i < firstList.size() ; i ++){
            if (firstList.get(i).category.equals(newList.get(i).category))
                acc++;
        }
        Double finalAcc = acc / count;


        DecimalFormat df = new DecimalFormat("#.00");
        String valFormatted = df.format(finalAcc);
        System.out.println("Dokladnosc : 0" + valFormatted);
    }

    public static void showFinalWeights(){
        System.out.println();
        for (Perceptron p : perceptrons){
            p.showPerc();
        }
    }


    public static void startLearning(List<Record> list, int t, double alpha){

        String category = "";
        for (int i = 0 ; i < t ; i ++){

            for (int a = 0 ; a < list.size() ; a ++){
                category = list.get(a).category;
                addCategoryIfNotOnTheList(list.get(a));

                for (int j = 0 ; j < perceptrons.size() ; j ++) {

                    if (perceptrons.get(j).getCategory().equals(category)) {
                        List<Double> l1 = list.get(a).weights;
                        List<Double> l2 = perceptrons.get(j).weights;
                        double net = getScalar(l1,l2.subList(0,l2.size() - 1)) - l2.get(l2.size()-1);
                        double y = getNetSgn(net);
                        double d = 1;

                        List<Double> newWeights = new ArrayList<>();

                        if (y != d){
                            for (int x = 0 ; x < l1.size() ; x ++){
                                newWeights.add (l2.get(x) + (d - y) * alpha * l1.get(x));
                            }
                            newWeights.add(alpha * (d-y) *(-1) + l2.get(l2.size()-1));  // zmiana progu
                            perceptrons.get(j).setWeights(newWeights);
                        }

                    }
                    else{
                        List<Double> l1 = list.get(a).weights;
                        List<Double> l2 = perceptrons.get(j).weights;
                        double net = getScalar(l1,l2.subList(0,l2.size() - 1)) - l2.get(l2.size()-1);
                        double y = getNetSgn(net);
                        double d = -1;

                        List<Double> newWeights = new ArrayList<>();

                        if (y != d){
                            for (int x = 0 ; x < l1.size() ; x ++){
                                newWeights.add (l2.get(x) + (d - y) * alpha * l1.get(x));
                            }
                            newWeights.add(alpha * (d-y) *(-1) + l2.get(l2.size()-1));  // zmiana progu
                            perceptrons.get(j).setWeights(newWeights);
                        }
                    }
                }
            }

        }

    }
    public static void showMatrix(){
        System.out.print("as:\t\t");
        for (Perceptron p : perceptrons){
            System.out.print(p.getCategory()+"\t");
        }
        System.out.println();

        for (Perceptron p : perceptrons){
            System.out.print(p.getCategory() + " :\t");

            for (Perceptron o : perceptrons){
                int countVal = (int) Math.round(matrixMap.get(p.getCategory()).get(o.getCategory()));
                System.out.print(countVal+"\t");
            }
            System.out.println();

        }
    }

    public static List<Double> normalization(List<Double> vector) {
        double size = vector.size();
        for (int i = 0; i < vector.size() - 1; i++)
            vector.set(i, vector.get(i) / size);

        return vector;
    }

    private static double getNetSgn(double net){
        if (net > 1) return 1;
        else if (net < -1 ) return -1;
        else return net;
    }
    private static double getScalar(List<Double> v1, List<Double> v2) {
        double scalar = 0.0;
        for (int i = 0; i < v1.size(); i++) {
            scalar += v1.get(i) * v2.get(i);
        }
        return scalar;
    }

    static void addCategoryIfNotOnTheList(Record record){
        boolean isOnTheList = false;
        for (int i = 0 ; i < perceptrons.size() ; i ++){
            if (perceptrons.get(i).getCategory().equals(record.category))
                isOnTheList=true;
        }
        if (!isOnTheList){
            perceptrons.add(new Perceptron(record.weights.size(), record.category));
        }

    }


    static void classText(String txt){
        double[] weights = new double[26];

        for (int i = 0 ; i < weights.length ; i ++)
            weights[i] = 0;

        char startChar = 'A';

        for (int i = 0 ; i < txt.length() ; i ++){

            startChar = 'A';
            for (int a = 0 ; a < 26 ; a ++){
                char c = txt.charAt(i);


                if (c == startChar){
                    weights[c-65]++;
                }
                else if (c == startChar + 32){
                    weights[c-97]++;
                }
                startChar++;
            }

        }

        for (int i = 0 ; i < weights.length ; i ++){
            weights[i] = weights[i]/txt.length();

        }



        List<Double> l1 = new ArrayList<>();

        for (int i = 0 ; i < weights.length ; i ++){
            l1.add(weights[i]);
        }


        String category = "";
        double yMax = -2;
        for (int j = 0 ; j < perceptrons.size() ; j ++ ){
            List<Double> l2 = perceptrons.get(j).weights;
            double net = getScalar(l1,l2.subList(0,l2.size() - 1)) - l2.get(l2.size()-1);
            double y = getNetSgn(net);
            if(y > yMax){
                category = perceptrons.get(j).getCategory();
                yMax = y;
            }
        }
        System.out.println("Zarejestrowano jako: " + category);




    }

}
