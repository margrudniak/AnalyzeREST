import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Array from "./routesHandler/Array";
import ArrObj from "./routesHandler/ArrObj";
import Object from "./routesHandler/Object";
import StringH from "./routesHandler/StringH";
class Home extends Component {
  constructor(props) {
    super(props);

    this.onSubmitCreateTimes = this.onSubmitCreateTimes.bind(this);
    this.onDropDatabase = this.onDropDatabase.bind(this);
  }
  onSubmitCreateTimes(e) {
    axios
      .post("http://localhost:5000/timesPosts/add")
      .then((res) => console.log(res.data));
  }
  onDropDatabase(e) {
    axios
      .get("http://localhost:5000/clear")
      .then((res) => console.log(res.data));
  }
  render() {
    return (
      <div className="home">
        <h1>
          Zanim rozpoczniesz upewnij się, że baza danych jest pusta.
          <form onSubmit={this.onDropDatabase}>
            <Button type="submit" variant="primary">
              Opróżnij bazę danych
            </Button>
          </form>
        </h1>
        <br />
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="str" title="String">
            <StringH />
          </Tab>
          <Tab eventKey="object" title="Object">
            <Object />
          </Tab>
          <Tab eventKey="array" title="Array">
            <Array />
          </Tab>
          <Tab eventKey="arrayObject" title="Array of Object">
            <ArrObj />
          </Tab>
        </Tabs>
        <h3>Utwórz czasy</h3>
        <form onSubmit={this.onSubmitCreateTimes}>
          <Button type="submit" variant="primary">
            Utwórz
          </Button>
        </form>
      </div>
    );
  }
}

export default Home;
