import {InfluxDB, Point} from "@influxdata/influxdb-client";
import {FuelLog} from "../types/fuelLogTypes";

let org = process.env.INFLUXDB_ORG;
let bucket = process.env.INFLUXDB_BUCKET;
let client: InfluxDB | undefined = undefined;

export function initInfluxdbClient() {
    const token = process.env.INFLUXDB_TOKEN;
    const url = process.env.INFLUXDB_URL;
    org = process.env.INFLUXDB_ORG;
    bucket = process.env.INFLUXDB_BUCKET;

    if (url === undefined || url === '') {
        throw new Error("Invalid INFLUXDB_URL");
    }

    if (token === undefined || token === '') {
        throw new Error("Invalid INFLUXDB_TOKEN");
    }

    client = new InfluxDB({url, token})
}

export async function saveLog(log: FuelLog) {
    if (client === undefined) {
        throw new Error("Unable to initialize influxdbClient");
    }

    if (bucket === undefined || bucket === '') {
        throw new Error("Invalid INFLUXDB_BUCKET");
    }

    if (org === undefined || org === '') {
        throw new Error("Invalid INFLUXDB_ORG");
    }

    let writeClient = client.getWriteApi(org, bucket, 'ns')

    let point = new Point('car2')
        .timestamp(new Date(log.timestamp))
        .floatField("amount", log.amount)
        .floatField("price", log.price)
        .floatField("odometer", log.odometer)

    writeClient.writePoint(point);
    await writeClient.flush()
}

export function getLogs() {
    if (client === undefined) {
        throw new Error("Unable to initialize influxdbClient");
    }

    if (bucket === undefined || bucket === '') {
        throw new Error("Invalid INFLUXDB_BUCKET");
    }

    if (org === undefined || org === '') {
        throw new Error("Invalid INFLUXDB_ORG");
    }

    let queryClient = client.getQueryApi(org)
    let fluxQuery = `from(bucket: "FuelLog")
 |> range(start: -70m)
 |> filter(fn: (r) => r._measurement == "car1")`

    queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
            const tableObject = tableMeta.toObject(row)
            console.log(tableObject)
        },
        error: (error) => {
            console.error('\nError', error)
        },
        complete: () => {
            console.log('\nSuccess')
        },
    })
}
