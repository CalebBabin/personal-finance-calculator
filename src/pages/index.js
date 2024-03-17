import Composer from "@/components/composer";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between py-24 px-8 lg:px-24 pb-48 ${inter.className}`}
		>
			<Head>
				<title>Personal Finance Calculator</title>
			</Head>
			<div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-8 lg:mb-24">
				<div>
					made by&nbsp;
					<a
						className="lg:pointer-events-auto text-blue-500 hover:underline"
						href="https://calebbabin.com/"
						target="_blank"
						rel="noopener noreferrer"
					>
						caleb
					</a>
				</div>
				<div>
					view the&nbsp;
					<a
						className="lg:pointer-events-auto text-blue-500 hover:underline"
						href="https://github.com/CalebBabin/personal-finance-calculator"
						target="_blank"
						rel="noopener noreferrer"
					>
						source code
					</a>
				</div>
			</div>
			<div className="z-10 w-full font-mono text-sm">
				<Composer />
			</div>
		</main>
	);
}
