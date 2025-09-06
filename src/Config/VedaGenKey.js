const api_key = "AIzaSyDtI7rDxY-GMyLfUd7a0e3MmVPIlXwQeis";

// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";
import mime from "mime";
function saveBinaryFile(fileName, content) {
	// Create a blob from the buffer
	const blob = new Blob([content]);
	const url = URL.createObjectURL(blob);

	// Create a temporary anchor element to trigger download
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	// Clean up the URL object
	URL.revokeObjectURL(url);
	console.log(`File ${fileName} downloaded.`);
}

async function main(input) {
	const ai = new GoogleGenAI({
		apiKey: "AIzaSyDtI7rDxY-GMyLfUd7a0e3MmVPIlXwQeis",
	});
	const config = {
		responseModalities: ["IMAGE", "TEXT"],
	};
	const model = "gemini-2.5-flash-image-preview";
	const contents = [
		{
			role: "user",
			parts: [
				{
					text: input,
				},
			],
		},
	];

	const response = await ai.models.generateContentStream({
		model,
		config,
		contents,
	});
	let fileIndex = 0;
	for await (const chunk of response) {
		if (
			!chunk.candidates ||
			!chunk.candidates[0].content ||
			!chunk.candidates[0].content.parts
		) {
			continue;
		}
		if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
			const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
			const inlineData = chunk.candidates[0].content.parts[0].inlineData;
			const fileExtension = mime.getExtension(inlineData.mimeType || "");
			// Convert base64 to Uint8Array for browser compatibility
			const binaryString = atob(inlineData.data || "");
			const bytes = new Uint8Array(binaryString.length);
			for (let i = 0; i < binaryString.length; i++) {
				bytes[i] = binaryString.charCodeAt(i);
			}
			saveBinaryFile(`${fileName}.${fileExtension}`, bytes);
		} else {
			console.log(chunk.text);
		}
	}
}

export default main;
