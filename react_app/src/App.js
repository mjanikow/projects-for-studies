// Main application component
import React from "react";
import { getCurrentUser } from "./helpers/authHelper";
import { BrowserRouter as Router, Routes as Switch, Route, Navigate as Redirect } from "react-router-dom";
import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import LoginForm from "./components/fragments/LoginForm";
import Main from "./components/content/Main";
import PlayersList from "./components/content/players/PlayersList";
import Admin from "./components/routes/Admin";
import PlayerForm from "./components/content/players/PlayerForm";
import PlayerDetails from "./components/content/players/PlayerDetails";
import Owner from "./components/routes/Owner";
import DeletePlayer from "./components/content/players/DeletePlayer";
import ItemsList from "./components/content/items/ItemsList";
import ItemForm from "./components/content/items/ItemForm";
import ItemDetails from "./components/content/items/ItemDetails";
import DeleteItem from "./components/content/items/DeleteItem";
import SlotsList from "./components/content/slots/SlotsList";
import User from "./components/routes/User";
import SlotForm from "./components/content/slots/SlotForm";
import SlotDetails from "./components/content/slots/SlotDetails";
import DeleteSlot from "./components/content/slots/DeleteSlot";
import Footer from "./components/fragments/Footer";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            player: undefined
        };
    }

    handleLogin = (player) => {
        localStorage.setItem("user", player);

        this.setState({
            player: player
        });
    };

    handleLogout = () => {
        localStorage.removeItem("user");

        this.setState({
            player: undefined
        });
    };

    componentDidMount()
    {
        this.setState({
            player: getCurrentUser()
        });
    }

    render()
    {
        return (
            <Router>
                <div>
                    <Header />
                    <Navigation />
                    <LoginForm handleLogin={this.handleLogin} handleLogout={this.handleLogout} />
                    <Switch>
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/players" element={<PlayersList />} />
                        <Route exact path="/players/add" element={<Admin target={<PlayerForm />} error="/players" />} />
                        <Route exact path="/players/details/:playerId" element={<PlayerDetails />} />
                        <Route exact path="/players/edit/:playerId" element={<Owner target={<PlayerForm />} error="/players" />} />
                        <Route exact path="/players/delete/:playerId" element={<Admin target={<DeletePlayer />} error="/players" />} />
                        <Route exact path="/items" element={<ItemsList />} />
                        <Route exact path="/items/add" element={<Admin target={<ItemForm />} error="/items" />} />
                        <Route exact path="/items/details/:itemId" element={<ItemDetails />} />
                        <Route exact path="/items/edit/:itemId" element={<Admin target={<ItemForm />} error="/items" />} />
                        <Route exact path="/items/delete/:itemId" element={<Admin target={<DeleteItem />} error="/items" />} />
                        <Route exact path="/slots" element={<SlotsList />} />
                        <Route exact path="/slots/add" element={<User target={<SlotForm />} error="/slots" />} />
                        <Route exact path="/slots/details/:slotId" element={<SlotDetails />} />
                        <Route exact path="/slots/edit/:slotId" element={<User target={<SlotForm />} error="/slots" />} />
                        <Route exact path="/slots/delete/:slotId" element={<User target={<DeleteSlot />} error="/slots" />} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}