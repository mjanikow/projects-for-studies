/**
 *
 *  @author Janikow Mateusz S21200
 *
 */

package zad1;


import java.io.IOException;

public class Main {
  public static void main(String[] args) throws IOException {
    Service s = new Service("Poland");
    String weatherJson = s.getWeather("Warsaw");
    Double rate1 = s.getRateFor("USD");
    Double rate2 = s.getNBPRate();
    // ...
    // część uruchamiająca GUI
  }
}
