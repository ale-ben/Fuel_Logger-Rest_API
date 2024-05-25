import {InfluxDB, Point} from "@influxdata/influxdb-client";
import {FuelLog, zFuelLog} from "../types/fuelLogTypes";

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

export async function saveLog(measurement: string, log: FuelLog) {
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

    let point = new Point(measurement)
        .timestamp(new Date(log.timestamp))
        .floatField("amount", log.amount)
        .floatField("price", log.price)
        .floatField("odometer", log.odometer)

    writeClient.writePoint(point);
    await writeClient.flush()
}

export async function getLogs(measurement: string): Promise<FuelLog[]> {
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
    let fluxQuery = `
    import "influxdata/influxdb/schema"
    from(bucket: "FuelLog")
     |> range(start: -70m)
     |> filter(fn: (r) => r._measurement == "` + measurement + `")
     |> schema.fieldsAsCols()` //TODO: Add other filters

    const res: any[] = await queryClient.collectRows(fluxQuery);
    return res.map(elem => {
        if ("_time" in elem) {
            elem.timestamp = elem["_time"];

            const parsed = zFuelLog.safeParse(elem);
            return parsed.success ? parsed.data : null;
        } else return null;
    }).filter((elem: FuelLog | null): elem is FuelLog => elem !== null);
}
