import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center h-full space-y-8">
			<div className="flex flex-col justify-center">
				<h1 className="font-bold text-5xl text-rose-900">evol.</h1>
				<p className="font-light">see your relationships evolve.</p>
			</div>
			<Link
				href="/auth"
				className="bg-rose-900 text-center text-white px-4 py-2
				rounded-md w-48 shadow-md hover:bg-rose-900/80 transition-all"
			>
				rewind
			</Link>
		</div>
	);
}
