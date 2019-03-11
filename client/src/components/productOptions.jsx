import React from "react";
import axios from "axios";
import {aws} from "../../config.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

class ProductOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 2,
      categoryId: [],
      category: [],
      options: []
    };
    this.getCategoryNames = this.getCategoryNames.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  componentDidMount() {
    this.getCategoryNames();
    setTimeout(() => this.getOptions(), 0);
  }

  getCategoryNames() {
    const idtag = (window.location.href.split('/')[3]).slice(4) || 65; 
    axios.get(`http://${aws}/api/category/${idtag}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          category: data.map(name => name.categoryName),
          categoryId: data.map(catID => catID.id)
        });
      })
      .catch(err => console.error(err));
  }

  // first option set is overwritten when second option set is available
  // implement something to prevent overwriting of the state when mapping through id's
  getOptions() {
    console.log("running getOptions");
    this.state.categoryId.map(id =>
      axios.get(`http://${aws}/api/option_categories/${id.slice(4)}`)
        .then(({ data }) => {
          console.log(data);
          this.setState({
            options: data.map(item => item.options)
          });
        })
        .catch(err => console.error(err))
    );
  }

  render() {
    return (
      <Container>
        {this.state.category.map(name => (
          <Row className="font-12px-bold" key={name}>
            <Col>{`${name}: `}</Col>
          </Row>
        ))}
        <Row>
          <Col>
            <ButtonToolbar>
              {this.state.options.map(item => (
                <Button variant="secondary">{item}</Button>
              ))}
            </ButtonToolbar>
            {/* issue here */}
            {/* just have a <p> tag to see the items instead of button */}
          </Col>
        </Row>
        <Row>
          <Col>
            <hr />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProductOptions;
