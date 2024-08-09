import fs from "fs";

async function uploadElem(elem) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify(elem);

    const requestOptions = {
        headers: myHeaders,
        method: "POST",
        body: body,
        redirect: "follow"
    };

    const res = await fetch("http://localhost:3000/logs/testCar/new", requestOptions);
    if (res.status === 200) {
        console.log("Successfully uploaded " + elem.timestamp);
    } else {
        console.error("Error uploading " + elem.timestamp + ". " + res.status + " Err: "+ res.statusText + "; " + res.statusMessage);
    }
}

const logs = await JSON.parse(fs.readFileSync("/Users/aleben/LocalDocuments/Git/Fuel_Logger/restApi/tools/outCsv.json", "utf8"));
logs.forEach(async elem => {
    elem.odometer = parseFloat(elem.odometer);
    elem.amount = parseFloat(elem.amount);
    elem.price = parseFloat(elem.price);
    await uploadElem(elem);
});