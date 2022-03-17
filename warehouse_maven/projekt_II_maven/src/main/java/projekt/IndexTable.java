package projekt;

import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;
import javax.swing.JOptionPane;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import static java.lang.Integer.parseInt;

public class IndexTable {
    public TableView<Stuff> tableView;
    public TextField nameField;
    public TextField categoryField;
    public TextField newValueField;
    public TextField localizationField;
    public TextField searchField;
    public ChoiceBox newOrChange;
    public ChoiceBox newOrAdd;
    public ChoiceBox chooseCategory;
    public ChoiceBox selectCategory;
    public CheckBox autoClear;
    List<String> categories = new ArrayList<String>();
    private ObservableList<Stuff> masterData = FXCollections.observableArrayList();
    private ObservableList<Stuff> filteredData = FXCollections.observableArrayList();
    List<Stuff> list = new ArrayList<>();


    public IndexTable(){
    }

    public void initialize() throws IOException {
        initializeChoiceBoxes();
        initializeColumns();
        loadData();
        tableView.setItems(filteredData);
        searchField.textProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observable,
                                String oldValue, String newValue) {
                updateFilteredData();
            }
        });
        chooseCategory.valueProperty().addListener(new ChangeListener<String>() {
            @Override
            public void changed(ObservableValue<? extends String> observable,
                                String oldValue, String newValue) {
                updateCategoryData();
            }
        });
    }

    private void updateFilteredData() {
        filteredData.clear();
        for (Stuff p : masterData) {
            if (matchesFilter(p)) {
                filteredData.add(p);
            }
        }
        reapplyTableSortOrder();
    }

    private void updateCategoryData() {
        filteredData.clear();
        for (Stuff p : masterData) {
            if (matchesCategory(p)) {
                filteredData.add(p);
            }
        }
        reapplyTableSortOrder();
    }

    private boolean matchesCategory(Stuff stuff) {
        String category = chooseCategory.getValue().toString();
        if (category.equals("All") || category.isEmpty()) {
            return true;
        }
        String lowerCaseFilterString = category.toLowerCase();
        if (stuff.getCategory().toLowerCase().indexOf(lowerCaseFilterString) != -1)
            return true;
        return false;
    }

    private boolean matchesFilter(Stuff stuff) {
        String filterString = searchField.getText();
        if (filterString == null || filterString.isEmpty()) {
            return true;
        }

        String lowerCaseFilterString = filterString.toLowerCase();

        if(selectCategory.getValue().equals("whatever")){
            if (stuff.getName().toLowerCase().indexOf(lowerCaseFilterString) != -1) {
                return true;
            } else if (stuff.getCategory().toLowerCase().indexOf(lowerCaseFilterString) != -1) {
                return true;
            }else if (String.valueOf(stuff.getAmount()).toLowerCase().indexOf(lowerCaseFilterString) != -1) {
                return true;
            }else if (stuff.getLocalization().toLowerCase().indexOf(lowerCaseFilterString) != -1) {
                return true;
            }
            return false;
        }
        if(selectCategory.getValue().equals("name")){
            if (stuff.getName().toLowerCase().indexOf(lowerCaseFilterString) != -1)
                return true;
            else
                return false;
        }
        if(selectCategory.getValue().equals("category")){
            if (stuff.getCategory().toLowerCase().indexOf(lowerCaseFilterString) != -1)
                return true;
            else
                return false;
        }
        if(selectCategory.getValue().equals("localization")){
            if (stuff.getLocalization().toLowerCase().indexOf(lowerCaseFilterString) != -1)
                return true;
            else
                return false;
        }
        if(selectCategory.getValue().equals("amount")){
            if (String.valueOf(stuff.getAmount()).toLowerCase().indexOf(lowerCaseFilterString) != -1)
                return true;
            else
                return false;
        }
        return false;
    }

    private void reapplyTableSortOrder() {
            ArrayList<TableColumn<Stuff, ?>> sortOrder = new ArrayList<>(tableView.getSortOrder());
            tableView.getSortOrder().clear();
            tableView.getSortOrder().addAll(sortOrder);
        }

    public void loadData() throws IOException {
            StuffList library = ReadDataFromFile.readFrom("data.xml");
            try{
                for (Stuff s: library.getStuffList()) {
                    tableView.getItems().add(s);
                    filteredData.add(s);
                    list.add(s);
                    if(isNewCategory(s.getCategory()))
                    {
                        chooseCategory.getItems().add(s.getCategory());
                        categories.add(s.getCategory());
                    }
                }
                masterData.addAll(filteredData);
            }catch (NullPointerException e){
                JOptionPane.showMessageDialog(null, "Data.xml file is empty", "InfoBox: " + "Warning", JOptionPane.INFORMATION_MESSAGE);
            }
//        tableView.getItems().add(new Stuff("tv","electric","here",5));
//        tableView.getItems().add(new Stuff("chleb","peiczywo","tam",55));
//        tableView.getItems().add(new Stuff("pc","electric","gdzies",52));
//        filteredData.add(new Stuff("tv","electric","here",5));
//        filteredData.add(new Stuff("chleb","peiczywo","tam",55));
//        filteredData.add(new Stuff("pc","electric","gdzies",52));
//        masterData.addAll(filteredData);
    }

    public void initializeChoiceBoxes(){
        newOrChange.getItems().add("Add new");
        newOrChange.getItems().add("Modify selected");
        newOrChange.setValue("Add new");

        newOrAdd.getItems().add("Reset");
        newOrAdd.getItems().add("Add");
        newOrAdd.setValue("Add");

        chooseCategory.getItems().add("All");
        chooseCategory.setValue("All");

        selectCategory.getItems().addAll("name");
        selectCategory.getItems().addAll("category");
        selectCategory.getItems().addAll("localization");
        selectCategory.getItems().addAll("amount");
        selectCategory.getItems().addAll("whatever");

        selectCategory.setValue("name");
    }

    public void initializeColumns(){
        TableColumn<Stuff, String> col1 = new TableColumn<>("name");
        col1.setCellValueFactory(new PropertyValueFactory<>("name"));
        tableView.getColumns().add(col1);

        TableColumn<Stuff, String> col2 = new TableColumn<>("category");
        col2.setCellValueFactory(new PropertyValueFactory<>("category"));
        tableView.getColumns().add(col2);

        TableColumn<Stuff, String> col3 = new TableColumn<>("localization");
        col3.setCellValueFactory(new PropertyValueFactory<>("localization"));
        tableView.getColumns().add(col3);

        TableColumn<Stuff, String> col4 = new TableColumn<>("amount");
        col4.setCellValueFactory(new PropertyValueFactory<>("amount"));
        tableView.getColumns().add(col4);
    }

    public boolean isNewCategory(String s){
        for (int i = 0; i < categories.size() ; i++){
            if (s.equals(categories.get(i)))
                return false;
        }
        return true;
    }

    public void saveFile() throws IOException {
        StuffList stuffList = new StuffList(list);
        SaveDataToFile.stuffToFile(stuffList,"data.xml");
    }

    public void updateDataConteners(){
        list.clear();
        masterData.clear();
        for (Stuff s : tableView.getItems()){
            list.add(s);
            masterData.add(s);
        }
    }

    public void apply () throws IOException {
        if (newOrChange.getValue().equals("Add new"))
        {
            if (isNoneEmpty())
                {
                    Stuff stuff = new Stuff(nameField.getText(),categoryField.getText(),localizationField.getText(),parseInt(newValueField.getText()));
                    masterData.add(stuff);
                    filteredData.add(stuff);
                    list.add(stuff);
                    if(isNewCategory(categoryField.getText()))
                    {
                        chooseCategory.getItems().add(categoryField.getText());
                        categories.add(categoryField.getText());
                    }
                    saveFile();
                    if (autoClear.isSelected())
                        clearFields();
                }
            else
                JOptionPane.showMessageDialog(null, "Please complete all fields ", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);
        }
        else if (newOrChange.getValue().equals("Modify selected") && !isAllEmpty())
            {
                Stuff selectedItem = tableView.getSelectionModel().getSelectedItem();

                if (selectedItem!=null){
                    int index = tableView.getSelectionModel().getFocusedIndex();
                    if (!nameField.getText().equals(""))
                    {
                        selectedItem.setName(nameField.getText());
                    }
                    if (!categoryField.getText().equals(""))
                    {
                        selectedItem.setCategory(categoryField.getText());
                        if(isNewCategory(categoryField.getText()))
                            {
                                chooseCategory.getItems().add(categoryField.getText());
                                categories.add(categoryField.getText());
                            }
                    }
                    if (!localizationField.getText().equals(""))
                    {
                        selectedItem.setLocalization(localizationField.getText());
                    }

                    if(newOrAdd.getValue().equals("Reset")){
                        if (!newValueField.getText().equals(""))
                        {
                            try{
                                selectedItem.setAmount(parseInt(newValueField.getText()));
                            }
                            catch(NumberFormatException e){
                                JOptionPane.showMessageDialog(null, "Amount must be a number", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);

                            }
                        }
                    }
                    else if(newOrAdd.getValue().equals("Add")){
                        if (!newValueField.getText().equals(""))
                        {
                            try{
                                selectedItem.setAmount(selectedItem.getAmount() + parseInt(newValueField.getText()));
                            }catch(NumberFormatException e){
                                JOptionPane.showMessageDialog(null, "Amount must be a number", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);
                            }
                        }
                    }


                    tableView.getItems().set(index,selectedItem);
                    updateDataConteners();
                    saveFile();
                    if (autoClear.isSelected())
                        clearFields();
                }
                else
                    JOptionPane.showMessageDialog(null, "Please select an object from the table and complete at least one field", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);
            }
        else
            JOptionPane.showMessageDialog(null, "Please select an object from the table and complete at least one field", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);



    }

    public void delete() throws IOException {
        Stuff selectedItem = tableView.getSelectionModel().getSelectedItem();
        if(selectedItem==null){
            JOptionPane.showMessageDialog(null, "Please select an object to delete", "InfoBox: " + "Error", JOptionPane.INFORMATION_MESSAGE);
        }
        else{
            int n = JOptionPane.showConfirmDialog(null,
                    "Are you sure you want to delete selected item?",
                    "Warning",
                    JOptionPane.YES_NO_OPTION);
            if(n == JOptionPane.YES_OPTION )
            {
                tableView.getItems().remove(selectedItem);
                masterData.remove(selectedItem);
                list.remove(selectedItem);
                StuffList stuffList = new StuffList(list);
                SaveDataToFile.stuffToFile(stuffList,"data.xml");
            }
        }
    }

    public void onEnter(javafx.event.ActionEvent actionEvent) throws IOException {
        apply();
    }

    public void onClick(javafx.event.ActionEvent actionEvent) {
        if (newOrChange.getValue().equals("Modify selected")){
            newOrAdd.setVisible(true);
        }
        else if (newOrChange.getValue().equals("Add new")){
            newOrAdd.setVisible(false);
        }
    }

    boolean isNoneEmpty(){
        if(nameField.getText().equals(""))
                return false;
        if(categoryField.getText().equals(""))
                return false;
        if(newValueField.getText().equals(""))
                return false;
        if(localizationField.getText().equals(""))
                return false;
        return true;
    }

    boolean isAllEmpty(){
        if(!nameField.getText().equals(""))
            return false;
        if(!categoryField.getText().equals(""))
            return false;
        if(!newValueField.getText().equals(""))
            return false;
        if(!localizationField.getText().equals(""))
            return false;
        return true;
    }

    public void clearFields(){
        if(!nameField.getText().equals(""))
            nameField.clear();
        if(!categoryField.getText().equals(""))
            categoryField.clear();
        if(!newValueField.getText().equals(""))
            newValueField.clear();
        if(!localizationField.getText().equals(""))
            localizationField.clear();
    }

}
