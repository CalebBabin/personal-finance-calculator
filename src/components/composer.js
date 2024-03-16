import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

function formatCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(value);
}

function Item({ onRemove, onChange, value }) {
	const yearlyCost = value.frequency === "yearly" ? value.amount : value.amount * 12;
	const monthlyCost = value.frequency === "monthly" ? value.amount : value.amount / 12;
	const type = value.type;

	return <div className="border border-slate-300 rounded-md my-6 p-2 pt-4 relative w-full">
		<div className="-top-3 absolute flex justify-between w-[90%] left-[5%]">
			<div className="bg-white px-4">{type}</div>
			<div className="bg-white px-4 lg:block hidden">
				{formatCurrency(yearlyCost)} / year &nbsp; {formatCurrency(monthlyCost)} / month
			</div>
			<div className="bg-white px-4 lg:hidden block">
				{formatCurrency(yearlyCost)} / year
			</div>
		</div>
		<div className={"w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4"}>
			<div className="flex items-center">
				<Select value={value.frequency} onValueChange={(e) => {
					onChange(value.id, { ...value, frequency: e })
				}}>
					<SelectTrigger>
						<SelectValue placeholder="Freqency" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="yearly">yearly</SelectItem>
						<SelectItem value="monthly">monthly</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center">
				name:&nbsp;
				<Input value={value.name} onChange={(e) => {
					onChange(value.id, { ...value, name: e.target.value })
				}} />
			</div>
			<div className="flex items-center">
				amount:&nbsp;
				<Input value={value.amount} type="number" onChange={(e) => {
					onChange(value.id, { ...value, amount: e.target.value })
				}} />
			</div>
			<Button title="delete" onClick={onRemove}>x</Button>
		</div>
	</div>
}

function generateItemObject(type, values = {}) {
	return { type, frequency: "monthly", name: 'new ' + type, amount: 100, ...values };
}

export default function Composer({ children }) {
	const [items, setItems] = useState([]);
	const [nextId, setNextId] = useState(0);

	const addItem = (type = 'expense', values = {}) => {
		values.id = nextId;
		setItems([...items, generateItemObject(type, values)]);
		setNextId(nextId + 1);
	}

	const addItems = (newItems = []) => {
		let startId = nextId;
		for (let i = 0; i < newItems.length; i++) {
			newItems[i].id = startId + i;
			newItems[i] = generateItemObject(newItems[i].type, newItems[i]);
		}
		setItems([...items, ...newItems]);
		setNextId(startId + newItems.length);
	}

	const removeItem = (id) => {
		setItems(items.filter(item => item.id !== id));
	}

	const updateItem = (id, value) => {
		const newItems = new Array(items.length)
		for (let i = 0; i < items.length; i++) {
			if (items[i].id === id) {
				newItems[i] = { ...items[i], ...value };
			} else {
				newItems[i] = items[i];
			}
		}
		setItems(newItems);
	}

	useEffect(() => {
		if (items.length === 0) {
			addItems([
				{ type: 'income', name: 'job', amount: 50000, frequency: 'yearly' },
				{ type: 'expense', name: 'rent', amount: 1200, frequency: 'monthly' },
				{ type: 'expense', name: 'food', amount: 600, frequency: 'monthly' },
				{ type: 'expense', name: 'new phone', amount: 1000, frequency: 'yearly' },
			])
		}
	}, [])

	return <div className="flex flex-wrap justify-center items-start gap-8 w-full">
		<div className="w-full flex flex-col items-center justify-center max-w-xl">
			<h2 className="text-2xl font-bold">income</h2>
			{items.filter((value) => value.type === 'income').map(item => <Item
				key={item.id}
				onRemove={() => removeItem(item.id)}
				value={item}
				onChange={updateItem}
			/>)}
			<div className="my-4">
				<Button onClick={() => { addItem('income') }}>add income source</Button>
			</div>
		</div>

		<div className="w-full flex flex-col items-center justify-center max-w-xl">
			<h2 className="text-2xl font-bold">expense</h2>
			{items.filter((value) => value.type === 'expense').map(item => <Item
				key={item.id}
				onRemove={() => removeItem(item.id)}
				value={item}
				onChange={updateItem}
			/>)}
			<div className="my-4">
				<Button onClick={() => { addItem('expense') }}>add expense source</Button>
			</div>
		</div>
	</div>
}