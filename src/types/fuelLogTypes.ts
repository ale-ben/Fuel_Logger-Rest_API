import {z} from "zod";

export interface FuelLog {
    timestamp: string;
    odometer: number;
    amount: number;
    price: number;
}

export const zFuelLog = z.object(
    {
        timestamp: z.string().datetime(),
        odometer: z.number(),
        amount: z.number(),
        price: z.number()
    }
);

export function isFuelLog(obj: any): obj is FuelLog {
    return zFuelLog.safeParse(obj).success;
}