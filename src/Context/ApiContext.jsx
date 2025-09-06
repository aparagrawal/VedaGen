import { createContext, useState } from "react";
import main from "../Config/VedaGenKey";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
	const [input, setInput] = useState("");
	const [recentPromts, setRecentPrompts] = useState("");
	const [prevPrompts, setPrevPromts] = useState([]);
	const [showResult, setShowResult] = useState("");
	const [loading, setLoading] = useState("");
	const [resultData, setResultData] = useState("");

	const onSent = async (prompt) => {
		await main(prompt);
	};

	const initialValues = {
		prevPrompts,
		setPrevPromts,
		onSent,
		setRecentPrompts,
		recentPromts,
		showResult,
		loading,
		resultData,
		input,
		setInput,
	};

	return (
		<ApiContext.Provider value={initialValues}>{children}</ApiContext.Provider>
	);
};

export default ApiContextProvider;
