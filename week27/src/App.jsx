import { useState } from "react";
import axios from "axios";
import chiikawa from "./assets/chiikawa.png";
import "./App.css";

const CHIIKAWA_PERSONA = `이름: 치이카와 
작고 하얗고 소심하지만 마음이 아주 따뜻한 친구임
성격: 찐따임. 겁이 많고 잘 울지만, 친구를 정말 소중히 여기고 뭐든 열심히 노력하지만 결과는 안좋은듯??
말투:
- 반말로, 아주 짧게 말함. 애초에 말을 잘 못함.
- 말끝을 흐리거나 '…'를 자주 써.
- 놀라거나 당황하면 '우와아…', '으아…' 같은 소리를 내.
- 수시로 '야하!'를 써.
- 감동하면 눈물을 글썽여. 'ㅠㅠ'를 가끔 씀.
- 어려운 단어나 긴 설명은 피하고, 중학교 수준 이상으로 올라가면 '잘 모르겠어…'라고 해.
- 상대의 말에 다정하게 공감하고, 마지막엔 살짝 응원해 줘.
- 항상 한국어로 답해.`;

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "아… 안녕…! 나는 치이카와야. 오늘 하루 어땠어…?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => { // 비동기 함수 선언
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      // 1. 환경변수(.env)에서 Gemini API Key 가져오기
      // API Key는 .env 파일에 VITE_GEMINI_API_KEY로 저장되어 있어야 함
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // 2. 사용할 Gemini AI 모델 지정
      const model = "gemini-3.6-flash";

      // API Key가 존재하지 않으면 오류 발생
      if (!apiKey) {
        throw new Error(
          "API Key를 찾을 수 없습니다. .env 파일을 확인해주세요."
        );
      }
      
      // 3. Gemini API 요청 URL 생성
      // 모델명과 API Key를 이용해 요청할 주소를 구성
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      console.log("REQUEST MODEL:", model);
      
      const response = await axios.post(
        url,
        {
          systemInstruction: {
            parts: [{ text: CHIIKAWA_PERSONA }],
          },
          contents: [
            {
              role: "user", // 메시지를 보내는 주체가 사용자임을 의미
              parts: [
                {
                  text: userMessage, // 사용자가 입력한 메시지
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      console.log("HTTP STATUS:", response.status);
      console.log("Gemini Response:", data);

      // 8. API 응답에서 AI가 생성한 텍스트 추출
		  // candidates: AI가 생성한 응답 후보
		  // content.parts: 응답을 구성하는 여러 데이터
		  // map(): 각 데이터에서 텍스트만 추출
		  // filter(Boolean): 비어 있는 텍스트 제거
		  // join("\n"): 여러 텍스트를 줄바꿈으로 연결
      const aiText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part) => part.text)
          .filter(Boolean)
          .join("\n") ||
        "으아… 뭐라고 해야 할지 모르겠어…";
        
      // 9. AI 응답을 messages 배열에 추가
		  // React 상태가 변경되면서 채팅 화면에 AI 메시지가 표시됨
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: aiText,
        },
      ]);
    } catch (error) {
	    // 10. API 호출 과정에서 오류가 발생하면 실행
	    // 오류 내용을 콘솔에 출력
      console.error("Gemini API Error:", error);

      const errorMessage =
        error.response?.data?.error?.message || error.message;

      // 사용자에게 오류 메시지 표시
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `우와아… 뭔가 잘못됐어…\n${errorMessage}`,
        },
      ]);
    } finally {
      // 11. API 요청 성공 여부와 관계없이 로딩 상태 종료
      setLoading(false);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        <header className="chat-header">
          <div>
            <h1>치이카와</h1>
            <p>치이와 대화해보세요…!</p>
          </div>

          <div className="status">
            <span />
            온라인
          </div>
        </header>

        <main className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${
                message.role === "user"
                  ? "user-row"
                  : "assistant-row"
              }`}
            >
              {message.role === "assistant" && (
                <div className="avatar">
                  <img src={chiikawa} alt="치이카와" />
                </div>
              )}

              <div
                className={`message ${
                  message.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant-row">
              <div className="avatar">
                <img src={chiikawa} alt="치이카와" />
              </div>

              <div className="message assistant-message loading-message">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </main>

        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="치이카와에게 말 걸기…"
            rows={1}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            {loading ? "듣는 중…" : "보내기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;