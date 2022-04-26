const fs = require("fs");
const barcode_ = require("aspose.barcode");
const aspose_barcode = barcode_.AsposeBarcode
let BarcodeGenerator = aspose_barcode.BarcodeGenerator;
let EncodeTypes = aspose_barcode.EncodeTypes;
let BarCodeReader = aspose_barcode.BarCodeReader;

function generateAndRead()
{
    let generator = new BarcodeGenerator(EncodeTypes.CODE_128, "12367891011");
    let file_path = "resources/generating/setBarcodeType.png";
    generator.save(file_path, "PNG");
    let image_data_base64 = fs.readFileSync(file_path).toString('base64');
    let reader = new BarCodeReader(image_data_base64, null, DecodeType.ALL_SUPPORTED_TYPES);
    reader.readBarCodes().forEach(function(result, i, results)
    {
       console.log("Recognized barcode code text: " + result.getCodeText(false) + "\n");
        console.log("Recognized barcode code type: " + result.getCodeTypeName() + "\n");
    });
}

// specify barcode image's path
let file_name = "../refri.png";

// create a barcode reader
let reader = new BarCodeReader(file_name, null, null);

// read barcodes
reader.readBarCodes().forEach(function (result, i, results)
{
    console.log(result.getCodeText());
    console.log("\n");
    console.log(result.getCodeTypeName());
});