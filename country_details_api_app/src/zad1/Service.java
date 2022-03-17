/**
 *
 *  @author Janikow Mateusz S21200
 *
 */

package zad1;

import javax.swing.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Service {

    String country ;

    public Service (String country ){

        this.country = country;

    }


    static public String getCountryCode (String country){

        Map<String, String> countries = new HashMap<>();

        for (String iso : Locale.getISOCountries()) {
            Locale l = new Locale("", iso);
            Locale outLocale = Locale.forLanguageTag("en_GB");
            Locale inLocale = Locale.forLanguageTag("pl-PL");
            for (Locale l1 : Locale.getAvailableLocales()) {
                if (l1.getDisplayCountry(inLocale).equals(l.getDisplayCountry())) {
                    countries.put(l1.getDisplayCountry(outLocale), iso);
                    break;
                }
            }
        }

        return countries.get(country);
    }

    static public String readFromURL(String url) throws IOException {
        URL url1  = new URL(url);
        URLConnection conn = url1.openConnection();

        BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line ;
        StringBuilder info = new StringBuilder();

        while((line = rd.readLine())!= null){
            info.append(line);
        }


        rd.close();
        return info.toString();
    }

    public String getWeather(String city) throws IOException {

        String cityStr = city + "," + getCountryCode(country);

        city = URLEncoder.encode(cityStr, StandardCharsets.UTF_8);

        String kind = "weather";
        String url = "http://api.openweathermap.org/data/2.5/"+ kind +"?q=" + city +"&APPID=f9de4177e13e3f3cbb4d763eb53e6649" ;

        return readFromURL(url);



    }
    public Double getRateFor(String countryToCheck) throws IOException {

        if(countryToCheck.equals(country)){
            return 1.00;
        }

        String curr_1 =  Currency.getInstance(new Locale(getCountryCode(country),getCountryCode(country))).getCurrencyCode();

        String urlStr = "https://api.exchangeratesapi.io/latest?base="+ curr_1;

        Pattern p = Pattern.compile("\"" + countryToCheck + "\":[0-9]+\\.[0-9]+");
        Matcher m = p.matcher(readFromURL(urlStr));
        m.find();
      //  String str =   m.group();

        return 1.0;

    }

    public Double getNBPRate() throws IOException {

        if(country.equals("Poland")){
            return 1.00;
        }

        String jsonData = readFromURL("http://api.nbp.pl/api/exchangerates/tables/A/") + readFromURL("http://api.nbp.pl/api/exchangerates/tables/B/");
        String code =  Currency.getInstance(new Locale(getCountryCode(country),getCountryCode(country))).getCurrencyCode();



        Pattern p = Pattern.compile(code + "\",\"mid\":[0-9]+\\.[0-9]+");
        Matcher m = p.matcher(jsonData);
        m.find();
        String str  = m.group();



        return Double.parseDouble(str.split(":")[1]);
    }



}
