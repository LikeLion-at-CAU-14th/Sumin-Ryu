const API_URL = "http://52.79.97.27:8000";
const EMOJIS = ["🐠", "🐚", "🌊", "🐬", "🦀", "🐠", "⛵", "🏄", "🐳", "🐋", "🦭", "🦐", "🦈", "🧜", "🏄", "🐙", "🦭"];

// 카드 렌더링
function renderCards(cards) {
  const gallery = document.getElementById("post-gallery");

  if (cards.length === 0) {
    gallery.innerHTML = `<p style="text-align:center; color:#1a3a4a; padding:40px;">아직 방명록이 없어요. 첫 번째 글을 남겨보세요!</p>`;
    return;
  }

  gallery.innerHTML = cards.map((card) => {
    const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    return `
      <div class="post-card">
        <div class="card-emoji">${emoji}</div>
        <div class="card-title">${card.title}</div>
        <div class="card-content">${card.content}</div>
        <div class="card-footer">
          <span class="card-author">${card.writer}</span>
          <span class="card-time">${card.created_at}</span>
          <button class="card-delete-btn" onclick="openModal(${card.id})">삭제</button>
        </div>
      </div>
    `;
  }).join("");
}

// 방명록 목록 불러오기
async function loadPosts() {
  try {
    const res  = await fetch(`${API_URL}/post/`);
    const data = await res.json();
    renderCards(data.data);
  } catch {
    alert("서버 연결 오류!!");
  }
}

loadPosts();

// 방명록 등록
document.querySelector(".submit-btn").addEventListener("click", async () => {
  const writer = document.getElementById("writer").value;
  const password = document.getElementById("password").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
 
  if (!writer || !password || !title || !content) {
    alert("모든 항목을 입력해 주세요!");
    return;
  }
 
  try {
    const res = await fetch(`${API_URL}/post/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ writer, password, title, content })
    });
    const data = await res.json();
    document.getElementById("writer").value ="";
    document.getElementById("password").value ="";
    document.getElementById("title").value ="";
    document.getElementById("content").value="";
    loadPosts();
  } catch {
    alert("서버 연결 오류!!");
  }
});

// 방명록 삭제
let deleteTargetId = null;
 
function openModal(id) {
  deleteTargetId = id;
  const input = document.getElementById("modal-password");
  input.value = "";
  document.getElementById("modal-overlay").classList.add("active");
}
 
function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  deleteTargetId = null;
}

// 삭제 취소
document.querySelector(".cancel-btn").addEventListener("click", closeModal);

// 삭제하기
document.querySelector(".delete-btn").addEventListener("click", async () => {
  const password = document.getElementById("modal-password").value;
 
  try {
    const res = await fetch(`${API_URL}/post/${deleteTargetId}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.status === 200) {
      closeModal();
      loadPosts();
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  } catch {
    alert("서버 연결 오류!!");
  }
});