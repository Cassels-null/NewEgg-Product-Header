import React from "react";
import axios from "axios";
import { aws } from "../../config.js";
// import {rateImg} from "../../assets"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class ProductHeaderInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // productId: 47,
      name: "",
      starRatings: "",
      reviewsQuantity: "",
      questionsQuantity: "",
      answersQuantity: "",
      stockQuantity: "",
      sellLimit: "",
      lowestPrice: "",
      stockStatus: "",
      sellFrom: "",
      shippingOrigin: ""
    };
    this.getProductInformation = this.getProductInformation.bind(this);
  }

  componentDidMount() {
    this.getProductInformation();
  }

  // pass states, product id into here soon to be `http://${aws}/api/items/${this.props.productID}`
  getProductInformation() {
    const idtag = (window.location.href.split("/")[3]).slice(4) || 5;
    console.log("aws is: "+aws);
    console.log("idtag is: "+idtag);
    // axios.get(`http://localhost:3010/api/items/${this.state.productId}`)
    // axios.get(`http://localhost:3010/api/items/${idtag}`)
    // axios.get(`http://18.223.158.147/api/items/${idtag}`)
    axios
      .get(`http://${aws}/api/items/${idtag}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          name: data[0].info.name,
          starRatings: data[0].info.reviewRate,
          reviewsQuantity: data[0].info.reviewNum,
          questionsQuantity: data[0].info.questionNum,
          answersQuantity: data[0].info.answersNum,
          stockQuantity: data[0].info.stockAmount,
          sellLimit: data[0].info.sellLimit,
          lowestPrice: data[0].info.lowestPrice,
          stockStatus: data[0].info.stockStatus,
          sellFrom: data[0].info.sellFrom,
          shippingOrigin: data[0].info.shipOrigin
        });
      })
      .catch(err => console.error(err)); //"ERROR at getProductInformation: "+err));
  }

  render() {
    return (
      <Container>
        <div className="row">
          <div className="col">
            <h1>{this.state.name}</h1>
          </div>
        </div>
        <div className="row font-11px subTitle">
          <div
            className="col rating"
            style={{
              background: `url(//${aws}/assets/spr_${
                this.state.starRatings || 1
              }.png) no-repeat`
            }}
          />
          <div className="col reviewQty">({this.state.reviewsQuantity})</div>
          <div className="col writeReview">Write a Review</div>
          <div className="col">
            See ({this.state.questionsQuantity}) Questions | (
            {this.state.answersQuantity}) Answers
          </div>
          {/* require share button a popover */}
        </div>
        <Row>
          <Col className="target-spot">
            <hr />
          </Col>
        </Row>
        <Row>
          <Col className="font-13px">
            {this.state.stockStatus === 1 ? "In Stock. " : "Out of Stock. "}
            Limit {this.state.sellLimit} per customer. ships from{" "}
            {this.state.sellFrom}
          </Col>
        </Row>
        <Row>
          <Col className="font-13px">
            Sold and Shipped By {this.state.shippingOrigin}
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

export default ProductHeaderInformation;
