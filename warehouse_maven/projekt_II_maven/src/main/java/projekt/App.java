package projekt;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class App extends Application {
    public void start(Stage stage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("/index_table.fxml"));
        stage.setScene(new Scene(root));
        stage.setTitle("Warehouse");
        stage.show();
        stage.setMinHeight(650);
        stage.setMinWidth(920);

    }
}
