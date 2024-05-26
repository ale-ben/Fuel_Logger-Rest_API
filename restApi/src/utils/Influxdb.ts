import {InfluxDB, Point} from "@influxdata/influxdb-client";
import {FuelLog, zFuelLog} from "../types/fuelLogTypes";
import {TimePeriod} from "../types/EndpointTypes";
import {DeleteAPI} from '@influxdata/influxdb-client-apis'

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

    const now = new Date();
    const endStr = now.getFullYear() + "-" + ((now.getMonth() + 1) < 10 ? "0" : "") + (now.getMonth() + 1) + "-" + (now.getDate()) + "T23:59:59.000Z";

    let fluxQuery = `
    import "influxdata/influxdb/schema"
    from(bucket: "FuelLog")
     |> range(start: 1970-01-01T00:00:01.000Z, stop: ` + endStr + `)
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

export async function deleteLogs(measurement: string, period: TimePeriod) {
    console.log('*** DELETE DATA ***')

    if (client === undefined) {
        throw new Error("Unable to initialize influxdbClient");
    }

    if (bucket === undefined || bucket === '') {
        throw new Error("Invalid INFLUXDB_BUCKET");
    }

    if (org === undefined || org === '') {
        throw new Error("Invalid INFLUXDB_ORG");
    }

    const deleteAPI = new DeleteAPI(client);
    // define time interval for delete operation
    const stop = new Date(period.end);
    const start = new Date(period.start);

    await deleteAPI.postDelete({
        org,
        bucket,
        // you can better specify orgID, bucketID in place or org, bucket if you already know them
        body: {
            start: start.toISOString(),
            stop: stop.toISOString(),
            // see https://docs.influxdata.com/influxdb/latest/reference/syntax/delete-predicate/
            predicate: '_measurement="' + measurement + '"',
        },
    })
}