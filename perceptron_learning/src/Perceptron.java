import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

public class Perceptron {

    public List<Double> weights = new ArrayList<>(); //ostatni element = teta
    private String category ;

    public Perceptron(int size, String category){
        this.category = category;
        for( int i = 0; i < size + 1 ; i ++ ){
            weights.add(1.0);
        }
    }

    public void setWeights(List<Double> weights) {
        this.weights = weights;
    }
    public List<Double> getWeights() {
        return weights;
    }
    public int getSize() {
        return weights.size();
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String pClass) {
        category = pClass;
    }

    public void showPerc(){
        StringBuilder retVal = new StringBuilder();
        DecimalFormat df = new DecimalFormat("#,##0.00");


        for (int i = 0 ; i < weights.size() - 1 ; i ++)
            retVal.append(df.format(weights.get(i)) + "\t");

        System.out.println("Kategoria: " + category);
        System.out.println("Wagi : ");
        System.out.println(retVal);
        System.out.println("Próg: " + df.format(weights.get(weights.size()-1)));
        System.out.println();

    }


}

