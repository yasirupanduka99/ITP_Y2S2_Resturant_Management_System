const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

const fs = require("fs");
const PDFDocument = require("../reports_tables/discount-Report-table");

router.post("/DiscountReport", async function (req, res, next) {
    //load cuurent time
    var currentDate = new Date();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var datestamp =
    "DATE:- " +
        year +
        "-" +
        (month + 1) +
        "-" +
        date;
        // "-" +
        // hours +
        // "-" +
        // minutes +
        // "-" +
        // seconds;

    var timestamp =
    "TIME:- " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;


    const DiscountReportRequest = req.body.discounts;
    console.log(DiscountReportRequest)



    // Create The PDF document


    //var myDoc = new PDFDocument();
    var myDoc = new PDFDocument({ bufferPages: true });
    //myDoc.pipe(fs.createWriteStream(`${__dirname}example.pdf`));

    let buffers = [];
    myDoc.on("data", buffers.push.bind(buffers));
    myDoc.on("end", () => {
        let pdfData = Buffer.concat(buffers);

        res.writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
            "Content-disposition": `attachment;filename=Discount_Report_${datestamp}.pdf`,
        })
            .end(pdfData);
        // console.log(pdfData)
        //console.log(res)


    });


    //myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
    //Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/

    // myDoc.image('logo.png',{
    //     fit:[150,150],
    //     align:'right',
    //     valign:'center'
    // })


    myDoc
        .fillColor("#444444")
        .fontSize(20)
        .text("Discounts", 110, 57)
        .fontSize(10)
        .text("DELIGHT8", 200, 50, { align: "right" })
        .text("Kurunegala", 200, 65, { align: "right" })
        .text("Sri Lanka", 200, 80, { align: "right" })
        .text(datestamp,200,95,{align: "right"})
        .text(timestamp,200,110,{align: "right"})
        .moveDown();

    // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
    const table = {
        headers: ["Discount Name", "Minimum Amount","Percentage", "Maximum Amount"],
        rows: [],
    };

    for (const discountItem of DiscountReportRequest) {
        table.rows.push([
            discountItem.discountName,
            "Rs."+discountItem.minAmount,
            discountItem.percentage,
            "Rs."+discountItem.maxLimit
        ]);
    }
    

    // Draw the table
    myDoc.moveDown().table(table, 15, 155, { width: 590 });


    

    // myDoc
    //     .fillColor("#444444")
    //     .fontSize(20)
    //     .text("Thank you for your support", 150, 600)


    myDoc.end();

    //res.json("Generated Success");
});

module.exports = router;