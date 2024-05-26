import {z} from "zod";

export interface TimePeriod {
    start: string;
    end: string;
}

export const zTimePeriod = z.object({
   start: z.string().datetime(),
   end: z.string().datetime(),
});