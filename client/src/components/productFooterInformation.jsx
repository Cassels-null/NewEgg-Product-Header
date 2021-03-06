import React from "react";
import axios from "axios";
import {aws} from "../../config.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProductFooterInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 47,
      description: [],
      stockQuantity: "",
      lowestPrice: ""
    };
    this.getDescription = this.getDescription.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
  }

  componentDidMount() {
    this.getDescription();
    this.getProductInfo();
  }

  getDescription() {
    const idtag = (window.location.href.split('/')[3]).slice(4) || 60; 
    axios.get(`http://${aws}/api/description/${idtag}`)
    // axios.get(`http://localhost:3010/api/description/${idtag}`)
    // axios.get(`http://localhost:3010/api/description/${this.state.productId}`)
      .then(({ data }) => {
        this.setState({ description: [data] });
      })
      .catch(err => console.error(err));
  }

  getProductInfo() {
    const idtag = (window.location.href.split('/')[3]).slice(4) || 60; 
    axios.get(`http://${aws}/api/items/${idtag}`)
    // axios.get(`http://localhost:3010/api/items/${this.state.productId}`)
    .then(({ data }) => {
      this.setState({
        stockQuantity: data[0].info.stockAmount,
        lowestPrice: data[0].info.lowestPrice
      })
    })
    .catch(err => console.error(err))
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <ul>
              {this.state.description.map(bullet => (
                <li className="font-14px">{bullet}</li>
              ))}
            </ul>
          </Col>
        </Row>
        <Row>
          <div className="col font-14px">
            <a href="#">{this.state.stockQuantity} New</a> from <b>${this.state.lowestPrice}</b>
          </div>
        </Row>
        <Row>
          <Col>
            <hr/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ProductFooterInformation;
