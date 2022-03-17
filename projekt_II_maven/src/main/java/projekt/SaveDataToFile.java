package projekt;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class SaveDataToFile {
    public static void stuffToFile(StuffList stuffList, String pathToFile) throws IOException {
        XmlMapper mapper = new XmlMapper();
        String data = mapper.writeValueAsString(stuffList);
        BufferedWriter writer = new BufferedWriter(new FileWriter(pathToFile));
        writer.write(data);
        writer.close();
    }
}
