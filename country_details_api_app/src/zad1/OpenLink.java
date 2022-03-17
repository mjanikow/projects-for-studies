package zad1;

import javafx.application.Platform;
import javafx.embed.swing.JFXPanel;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class OpenLink {

    String url ;

    public OpenLink(String url){
        this.url = url;
    }

    void initAndShowGUI() {
        JFrame frame = new JFrame("WikipediaFX");
        final JFXPanel fxPanel = new JFXPanel();

        frame.add(fxPanel);
        frame.setSize(1200, 800);
        frame.setVisible(true);

        Platform.runLater(new Runnable() {
            @Override
            public void run() {
                initFX(fxPanel);
            }
        });
    }

    private  void initFX(JFXPanel fxPanel) {
        Scene scene = createScene();
        fxPanel.setScene(scene);
    }

    private  Scene createScene() {
        Group  root  =  new  Group();
        Scene  scene  =  new  Scene(root, Color.ALICEBLUE);
        WebView webView = new WebView();

        WebEngine webEngine = webView.getEngine();

        webView.setPrefHeight(800);
        webView.setPrefWidth(1200);

        webEngine.load(url);


        root.getChildren().add(webView);
        return (scene);
    }

    public static void main(String[] args) {
        OpenLink test = new OpenLink("https://www.google.com/");
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                test.initAndShowGUI();
            }
        });
    }
}