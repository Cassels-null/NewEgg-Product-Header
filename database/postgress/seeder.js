const pgp = require('pg-promise')();

const db = pgp({
    user: "postgres",
    host: "localhost",
    password: "HeckOfASnail",
    port: 5432,
    database: "SDClocal"
   });

var i = null;

db.any("SELECT COUNT(*) from product")
.then((result)=>{
    console.log(result[0].count);
    i = (result[0].count);
    add10k();
});


function add10k() {
    for(var n = 0; n < 10000; n++){
        db.none('INSERT INTO product(id, name, itemNumber, reviewRate, reviewNum, questionNum, answersNum, stockAmount, sellLimit, lowestPrice, logoOverlay, stockStatus, sellFrom, shipOrigin, img, description, category1, category2, category3) VALUES(${id}, ${name}, ${itemNumber}, ${reviewRate}, ${reviewNum}, ${questionNum}, ${answersNum}, ${stockAmount}, ${sellLimit}, ${lowestPrice}, ${logoOverlay}, ${stockStatus}, ${sellFrom}, ${shipOrigin}, ${img}, ${description}, ${category1}, ${category2}, ${category3})', {
            id: i,
            name: "cat",
            itemNumber: i,
            reviewRate: i,
            reviewNum: i,
            questionNum: i,
            answersNum: i,
            stockAmount: i,
            sellLimit: i,
            lowestPrice: i,
            logoOverlay: "thisisnotalogo",
            stockStatus: i,
            sellFrom: "Melkor",
            shipOrigin: "Mordor",
            img: "thisisnotanimage",
            description: "cat that lruks in yur basement",
            category1: null,
            category2: null,
            category3: null
        })
        .catch((err)=>{console.log(err)});
        i++;
    }
    setTimeout(()=>{
        if(i < (10000) * 1000){
            add10k()
        }
    }, 10000);
}



// setTimeout(()=>{
//     if(i < 100000){
//         add10k()
//     }
// }, 1000);

// id: 2
// name: "cat"
// itemNumber: 2
// reviewRate: 2
// reviewNum: 2
// questionNum: 2
// answersNum: 2
// stockAmount: 2
// sellLimit: 2
// lowestPrice: 2
// logoOverlay:
// stockStatus: 2
// sellFrom: "Melkor"
// shipOrigin: "Mordor"
// img: "thisisnotanimage"
// description: "cat that lruks in yur basement"
// category1:
// category2:
// category3:

// db.any('')
// .catch((err)=>{console.log(err)});