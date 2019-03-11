import React from "react";
import axios from "axios";
import { aws } from "../../config.js";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactImageMagnify from "react-image-magnify";

class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // productId: 47,
      logoImg: "",
      images: [],
      primaryImage: ""
    };
    this.getImages = this.getImages.bind(this);
    this.getLogo = this.getLogo.bind(this);
  }

  componentDidMount() {
    // request images from database
    this.getImages();
    //this.getLogo();
  }

  getLogo() {
    const idtag = window.location.href.split("/")[3] || 60;
    axios
      .get(`http://${aws}/api/items/${idtag}`)
      .then(({ data }) => {
        this.setState({ logoImg: data.logoOverlay });
      })
      .catch(err => console.error(err));
  }
  getImages() {
    const idtag = (window.location.href.split("/")[3]).slice(4) || 60;
    axios
      .get(`http://${aws}/api/images/${idtag}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({ images: data, primaryImage: data[0] }); //configure data to be specifying what in data is images data.img
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="col">
        <div className="row">
          <div className="col">
            <ReactImageMagnify
              className="primeImage"
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  width: 470,
                  height: 350,
                  src: this.state.primaryImage
                },
                largeImage: {
                  src: this.state.primaryImage,
                  width: 1024,
                  height: 768,
                  enlargedImagePortalId: ".target-zoom"
                }
              }}
            />
          </div>
        </div>
        <div className="row imageTiles">
          {/* require css formatting to cluster tiles in center justified */}
          {this.state.images.map(image => (
            <div>
              <Image src={image} thumbnail height="75px" width="60px" className="imageBox"/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductImage;
