import TransitionDemo from "@/components/UI/TransitionDemo";

export default function TransitionsPage() {
	return (
		<div className="container mx-auto py-16">
			<h1 className="text-4xl font-bold mb-8">Page Transition Demos</h1>
			<p className="text-lg mb-8">
				Explore different page transition effects that you can use throughout
				your site. Select a transition type below to preview how it looks.
			</p>

			<TransitionDemo />
		</div>
	);
}
