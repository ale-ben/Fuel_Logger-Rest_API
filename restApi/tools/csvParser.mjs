import fs from "fs";

const inPath = "/Users/aleben/LocalDocuments/Git/Fuel_Logger/restApi/tools/in.csv"
const outPath = "/Users/aleben/LocalDocuments/Git/Fuel_Logger/restApi/tools/outCsv.json"
const errPath = "/Users/aleben/LocalDocuments/Git/Fuel_Logger/restApi/tools/errCsv.txt"

function parse(strArr) {
    const res = {};

    strArr.forEach(item => {
        if (item.includes("€/l")) res.relPrice = item.replaceAll("€/l", ""); else if (item.includes("km/l")) {
        } else if (item.includes("km")) res.odometer = item.replaceAll("km", ""); else if (item.includes("€")) res.price = item.replaceAll("€", ""); else if (item.includes("l")) res.amount = item.replaceAll("l", ""); else if (item.includes("/")) {
            const dateParts = item.split("/")

            if (dateParts.length === 3) {

                if (dateParts[2].length === 2) dateParts[2] = "20" + dateParts[2];
                if (dateParts[1].length === 1) dateParts[1] = "0" + dateParts[1];
                if (dateParts[0].length === 1) dateParts[0] = "0" + dateParts[0];

                res.timestamp = new Date(dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0] + "T00:00:00.000Z");
            }
        }
    })

    if ("odometer" in res && "relPrice" in res && "price" in res && "amount" in res && "timestamp" in res) {
        const calcRelPrice = parseFloat(res.price) / parseFloat(res.amount);
        if (calcRelPrice.toFixed(3) === parseFloat(res.relPrice).toFixed(3)) return res; else {
            console.log(res.timestamp + " wrong relPrice. Should be " + calcRelPrice.toFixed(3));
            console.error(calcRelPrice)
        }

    }

    // Something went wrong, add the file to the error file
    const outStr = strArr.join("\n") + "\n\n";
    fs.writeFileSync(errPath, outStr, {
        flag: "a"
    })
    return null;

}

try {
    let data = fs.readFileSync(inPath, 'utf8');
    data = data
        .replaceAll(" ", "")
        .replaceAll(",", ".")
        .toLowerCase()
        .replaceAll("lt", "l");
    const dataSplit = data
        .split("\n")
        .map(el => el.split(";"))
        .filter(el => el !== null && el.length > 0)
        .map(el => el.filter(inEl => inEl !== null && inEl !== ""));
    const dataObj = dataSplit.map(parse);
    fs.writeFileSync(outPath, JSON.stringify(dataObj), {flag: "w"});
    console.log(dataObj);
} catch (err) {
    console.error(err);
}