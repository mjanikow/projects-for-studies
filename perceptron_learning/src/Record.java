import java.util.ArrayList;
import java.util.List;

public class Record {


    public List<Double> weights = new ArrayList<>();

    public String category;

    public Record(List<String> list){
        category = list.get(list.size()-1); // na ostatnim miejscu jest kategoria

        for (int i  = 0 ; i < list.size() - 1 ; i ++){
            weights.add(Double.valueOf(list.get(i)));
        }

    }
    public Record(List<Double> list, String category){
        this.category = category;
        weights.addAll(list);

    }

    @Override
    public String toString(){
        StringBuilder retVal = new StringBuilder();
        retVal.append("[");

        for (int i = 0 ; i < weights.size() ; i ++)
            retVal.append(weights.get(i) + " ");
        retVal.append(category + "]");

        return String.valueOf(retVal);
    }

    public void setWeights(List<Double> weights) {
        this.weights = weights;
    }

    public List<Double> getWeights() {
        return weights;
    }
    public void setCategory(String cat){
        category=cat;
    }


}
