export interface FuelLog {
	id: number;
	date: Date;
	odometer: number;
	liters: number;
	price: number;
}

export function parseFuelNote(note: string): {"logs": FuelLog[], "errors": string[]} {
	const logs = note.split('\n\n')
	let parseError: string[] = []
	let fuelLogs: FuelLog[] = []
	logs.forEach((log) => {
		let logRows = log
			.trim()
			.replace(" ", "")
			.toLowerCase()
			.split('\n')
		let date: Date | undefined = undefined
		let odometer: number = -1.0
		let liters: number = -1.0
		let price: number = -1.0
		logRows.forEach((row) => {
			if(row.endsWith("km")){
				odometer = parseFloat(row.replace("km", ""))
			} else if (row.endsWith("l")) {
				liters = parseFloat(row.replace("l", ""))
			} else if (row.endsWith("€")) {
				price = parseFloat(row.replace("€", ""))
			} else {
				try {
					let dateElems = row.split('/')
					if (dateElems.length != 3) {
						throw new Error("Invalid date format")
					}
					date = new Date(parseInt(dateElems[2]), parseInt(dateElems[1]), parseInt(dateElems[0]))
				} catch (error) {
					console.warn("Error parsing date for log", row, log)
				}
			}
		})	

		if (date && odometer > 0 && liters > 0 && price > 0) {
			fuelLogs.push({
				id: (date as Date).getTime(),
				date: date,
				odometer: odometer,
				liters: liters,
				price: price
			})
		} else {
			parseError.push(log)
			console.warn("Error parsing log", log, date, odometer, liters, price)
		}
	})

	return {
		"logs": fuelLogs,
		"errors": parseError
	}
}