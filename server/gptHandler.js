import { config } from "dotenv";

config(); // .env 파일 로드

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ✅ GPT API 호출 함수
export async function fetchGPTResponse(jsonData) {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const prompt = `
다음 JSON 데이터를 기반으로 새롭게 수정하여 반환해줘.
JSON 형식을 유지하면서 필요한 정보를 보강해줘.

${JSON.stringify(jsonData, null, 2)}

반환값도 JSON 형식으로 제공해줘.
`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${REACT_APP_CLIENT_ID}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
        })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content); // JSON 응답 반환
}

