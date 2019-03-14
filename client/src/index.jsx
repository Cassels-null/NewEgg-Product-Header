import React from "react";
import ReactDOM from "react-dom";
import ProductImage from "./components/productImage";
import ProductHeaderInformation from "./components/productHeaderInformation";
import ProductOptions from "./components/productOptions";
import ProductFooterInformation from "./components/productFooterInformation";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { aws } from "../config.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // product id to pass down to child components
      productId: "",

      info: {
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
      }
    };
    this.getIdByUrl = this.getIdByUrl.bind(this);
    this.getProductInformation = this.getProductInformation.bind(this);
  }
  componentDidMount() {
    // request product id from URL when componentDidMount()
    this.getIdByUrl();
    // GET request for productImages, productOptions, productHeaderInformation, productFooterInformation
    // productImages; mouseOverZoom(), image tiles w/ mouseOver()
    // productHeaderInformation; title, share button (w/ social media icons), star rating reviews, Q&A #
    // productOptions; product varying options
    // productFooterInformation; descriptions
    this.getProductInformation();
  }

  // getItemByUrl, run on componentDidMount
  // use window.location TO product ID
  getIdByUrl() {
    let item = window.location.href.split("/")[3] || 60;
    this.setState({ productId: item });
  }

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
          info: {
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
        }});
      })
      .catch(err => console.error(err)); //"ERROR at getProductInformation: "+err));
  }

  render() {
    return (
      <div className="row">
        <div className="col-4">
          <ProductImage id={this.state.productId} />
        </div>

        <div className="col-5">
          <ProductHeaderInformation info={this.state.info}/>
          <ProductOptions/>
          <ProductFooterInformation/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("productDetails"));
