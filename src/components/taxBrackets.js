export const taxBrackets = {
	2024: [
		{ min: 0, max: 11600, rate: 0.10 },
		{ min: 11600, max: 47150, rate: 0.12 },
		{ min: 47150, max: 100525, rate: 0.22 },
		{ min: 100525, max: 191950, rate: 0.24 },
		{ min: 191950, max: 243725, rate: 0.32 },
		{ min: 243725, max: 609350, rate: 0.35 },
		{ min: 609350, max: Infinity, rate: 0.37 }
	],
}

for (const year in taxBrackets) {
	if (Object.hasOwnProperty.call(taxBrackets, year)) {
		const element = taxBrackets[year];
		for (let i = 0; i < element.length; i++) {
			const bracket = element[i];
			bracket.diff = bracket.max - bracket.min;
		}
	}
}

export const calculateTax = (income = 100000, year = 2024) => {
	const brackets = taxBrackets[year];
	let tax = 0;
	for (let i = 0; i < brackets.length; i++) {
		const bracket = brackets[i];
		if (income > bracket.max) {
			tax += bracket.diff * bracket.rate;
		} else {
			tax += (income - bracket.min) * bracket.rate;
			break;
		}
	}
	return tax;
}