import React from "react";
import InputField from "./components/InputField";
import OutputBox from "./components/OutputBox";

function App() {
	return (
		<div className="bg-blue-200 flex flex-col h-screen max-h-screen overflow-hidden">
			<span className="text-5xl pt-4 justify-center flex">Fuel Logger</span>
			<div className="px-6 pb-3 flex flex-row h-[90%]">
				<InputField/>
				<OutputBox/>
			</div>
		</div>
	);
}

export default App;
