import axios from "axios";

const API_KEY = "AIzaSyDtI7rDxY-GMyLfUd7a0e3MmVPIlXwQeis";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

// Function to call Gemini API using axios
async function callGeminiWithAxios(input) {
	try {
		const response = await axios.post(
			GEMINI_API_URL,
			{
				contents: [
					{
						parts: [
							{
								text: input,
							},
						],
					},
				],
				generationConfig: {
					temperature: 0.9,
					topK: 1,
					topP: 1,
					maxOutputTokens: 2048,
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-goog-api-key": API_KEY,
				},
			},
		);

		// Extract the response text
		const responseText = response.data.candidates[0].content.parts[0].text;
		return responseText;
	} catch (error) {
		console.error(
			"Error calling Gemini API:",
			error.response?.data || error.message,
		);
		throw error;
	}
}

// Alternative function for streaming responses (if needed)
async function callGeminiWithAxiosStream(input) {
	try {
		const response = await axios.post(
			GEMINI_API_URL,
			{
				contents: [
					{
						parts: [
							{
								text: input,
							},
						],
					},
				],
				generationConfig: {
					temperature: 0.9,
					topK: 1,
					topP: 1,
					maxOutputTokens: 2048,
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-goog-api-key": API_KEY,
				},
				responseType: "stream",
			},
		);

		return response.data;
	} catch (error) {
		console.error(
			"Error calling Gemini API:",
			error.response?.data || error.message,
		);
		throw error;
	}
}

export default callGeminiWithAxios;
export { callGeminiWithAxiosStream };
