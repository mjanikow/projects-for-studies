package projekt;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.io.File;
import java.io.IOException;

public class ReadDataFromFile {



    public static StuffList readFrom(String pathFile) throws IOException {
        XmlMapper mapper = new XmlMapper();
        return mapper.readValue(new File(pathFile),StuffList.class);

    }
}
