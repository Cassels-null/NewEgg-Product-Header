var faker = require("faker");

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
  //console.log(db.product.count({}, (err, num)=>{console.log(num)}));
});

var productSchema = new mongoose.Schema({
    info: mongoose.Schema.Types.Mixed
});

var product = mongoose.model('product', productSchema);

var i = null;
product.count({}, (err, num)=>{
    i = num;
    fab();
});

function fab(){
    console.log(i);
    for(var n = 0; n < 10000; n++){
        i++;
        (new product({info: {
            id: i,
            name: faker.commerce.productName(),
            itemNumber: i,
            reviewRate: (Math.ceil(Math.random()*5)),
            reviewNum: (Math.floor(Math.random()*200)),
            questionNum: (Math.floor(Math.random()*20)),
            answersNum: (Math.floor(Math.random()*20)),
            stockAmount: (Math.floor(Math.random()*100)),
            sellLimit: (Math.ceil(Math.random()*8)),
            lowestPrice: faker.commerce.price(),
            logoOverlay: "thisisnotalogo",
            stockStatus: (Math.floor(Math.random()*2)),
            sellFrom: faker.company.companyName(),
            shipOrigin: faker.address.city(),
            img: faker.image.imageUrl(),
            description: (faker.commerce.productAdjective()+faker.commerce.productAdjective()+faker.commerce.productName),
            options: [
                {name: "RAM", choices: ["one", "two", "many", "lots"]},
                {name: "DAKKA", choices: ["some", "MOAR", "ENUFF", "TO MUCH"]}
            ]
        }}))
        .save(function (err) {
            if (err) return console.error(err);
            //console.log(i);
        });
    }
    setTimeout(()=>{
        if(i < (10000) * 1000){
            fab();
        }
    }, 40000);
}
