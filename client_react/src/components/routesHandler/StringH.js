import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

class StringH extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length: "",
      counter: 0,
      deleteId: "",
      updateId: "",
      getId: "",
    };

    //Posts
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.onSubmitDelete = this.onSubmitDelete.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
    this.onSubmitGet = this.onSubmitGet.bind(this);
  }
  onSubmitPost(e) {
    axios
      .post(`http://localhost:5000/str/add/${this.state.length}`)
      .then((res) => console.log(res.data));

    e.preventDefault();
    this.setState({
      counter: this.state.counter + 1,
    });
  }
  onSubmitUpdate(e) {
    e.preventDefault();

    axios
      .put(
        `http://localhost:5000/str/update/${this.state.updateId}/${this.state.length}`
      )
      .then((res) => console.log(res.data));
  }
  onSubmitDelete(e) {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/posts/${this.state.deleteId}`)
      .then((res) => console.log(res.data));
  }
  onSubmitGet(e) {
    e.preventDefault();

    axios
      .get(`http://localhost:5000/posts/get/${this.state.getId}`)
      .then((res) => {
        console.log(res.data);
      });
  }
  render() {
    return (
      <div className="stringh">
        <Container fluid="xl">
          <Row>
            <Col>
              <hr />
              <h3>Utwórz post</h3>
              <hr />
              <form onSubmit={this.onSubmitPost}>
                <label>
                  <p>Długości znaków: </p>
                  <input
                    type="text"
                    value={this.state.length}
                    onChange={(e) => this.setState({ length: e.target.value })}
                  />
                </label>
                {"  "}
                <Button type="submit" variant="primary">
                  Utwórz
                </Button>
              </form>
              <p>Utworzono {this.state.counter} postów </p>
            </Col>
            <Col>
              <hr />
              <h3>Usuń post</h3>
              <hr />
              <form onSubmit={this.onSubmitDelete}>
                <label>
                  <p>Identyfikator: </p>
                  <input
                    type="text"
                    value={this.state.deleteId}
                    onChange={(e) =>
                      this.setState({ deleteId: e.target.value })
                    }
                  />
                </label>
                {"  "}
                <Button type="submit" variant="primary">
                  Usuń
                </Button>
              </form>
              <p>Usunięto post o ID: {this.state.deleteId}</p>
            </Col>
            <Col>
              <hr />
              <h3>Zaktualizuj post</h3>
              <hr />
              <form onSubmit={this.onSubmitUpdate}>
                <label>
                  <p>Identyfikator: </p>
                  <input
                    type="text"
                    value={this.state.updateId}
                    onChange={(e) =>
                      this.setState({ updateId: e.target.value })
                    }
                  />
                  <p>Długości znaków: </p>
                  <input
                    type="text"
                    value={this.state.length}
                    onChange={(e) => this.setState({ length: e.target.value })}
                  />
                </label>
                {"  "}
                <Button type="submit" variant="primary">
                  Aktualizuj
                </Button>
              </form>
              <p>Zaktualizowano post o ID: {this.state.updateId}</p>
            </Col>
            <Col>
            <hr />
              <h3>Pobierz post</h3>
              <hr />
              <form onSubmit={this.onSubmitGet}>
                <label>
                  <p>Identyfikator: </p>
                  <input
                    type="text"
                    value={this.state.getId}
                    onChange={(e) => this.setState({ getId: e.target.value })}
                  />
                </label>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={this.state.loading}
                >
                  Pobierz
                </Button>
              </form>
              <p>Pobrano post o ID: {this.state.getId}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default StringH;
