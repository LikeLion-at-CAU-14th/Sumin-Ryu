const API_URL = "http://52.79.97.27:8000";

const EMOJIS = ["🐚", "🌊", "🐬", "🦀", "🐠", "⛵", "🌺", "🏄", "🐙", "🦭"];

// =============================================
// 유틸
// =============================================

function formatTime(isoString) {
  const d = new Date(isoString);
  const mm  = String(d.getMonth() + 1).padStart(2, "0");
  const dd  = String(d.getDate()).padStart(2, "0");
  const hh  = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${mm}.${dd} ${hh}:${min}`;
}

function escapeHtml(str) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return str.replace(/[&<>"']/g, c => map[c]);
}

// =============================================
// 카드 렌더링
// =============================================

function renderCards(posts) {
  const gallery = document.getElementById("post-gallery");

  if (posts.length === 0) {
    gallery.innerHTML = `<p style="text-align:center; color:#a8d8ee; padding:40px 0;">아직 방명록이 없어요. 첫 번째 글을 남겨보세요! 🐚</p>`;
    return;
  }

  gallery.innerHTML = posts.map((post, idx) => {
    const emoji = EMOJIS[idx % EMOJIS.length];
    return `
      <div class="post-card">
        <div class="card-emoji">${emoji}</div>
        <div class="card-title">${escapeHtml(post.title)}</div>
        <div class="card-content">${escapeHtml(post.content)}</div>
        <div class="card-footer">
          <div>
            <span class="card-author">${escapeHtml(post.writer)}</span>
          </div>
          <button class="card-delete-btn" onclick="openModal(${post.id})">삭제</button>
        </div>
      </div>
    `;
  }).join("");
}

// =============================================
// 게시글 목록 불러오기 (GET)
// =============================================

function loadPosts() {
  fetch(`${API_URL}/post/`)
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        renderCards(data.data);
      } else {
        alert("목록을 불러오지 못했어요.");
      }
    })
    .catch(() => alert("서버와 연결할 수 없어요."));
}

// =============================================
// 게시글 등록 (POST)
// =============================================

document.querySelector(".submit-btn").addEventListener("click", () => {
  const writer   = document.getElementById("writer").value.trim();
  const password = document.getElementById("password").value.trim();
  const title    = document.getElementById("title").value.trim();
  const content  = document.getElementById("content").value.trim();

  if (!writer || !password || !title || !content) {
    alert("모든 항목을 입력해 주세요!");
    return;
  }

  fetch(`${API_URL}/post/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ writer, password, title, content })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        document.getElementById("writer").value   = "";
        document.getElementById("password").value = "";
        document.getElementById("title").value    = "";
        document.getElementById("content").value  = "";
        loadPosts();
      } else {
        alert("등록에 실패했어요.");
      }
    })
    .catch(() => alert("서버와 연결할 수 없어요."));
});

// =============================================
// 삭제 모달
// =============================================

let deleteTargetId = null;

function openModal(id) {
  deleteTargetId = id;
  const input  = document.getElementById("modal-password");
  const errEl  = document.getElementById("modal-error");
  input.value  = "";
  if (errEl) errEl.textContent = "";
  input.style.borderColor = "";
  document.getElementById("modal-overlay").classList.add("active");
  setTimeout(() => input.focus(), 100);
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
  deleteTargetId = null;
}

// 취소 버튼
document.querySelector(".cancel-btn").addEventListener("click", closeModal);

// 배경 클릭 시 닫기
document.getElementById("modal-overlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// ESC 키로 닫기
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// 삭제 확인 (DELETE)
document.querySelector(".delete-btn").addEventListener("click", () => {
  const password = document.getElementById("modal-password").value.trim();
  const input    = document.getElementById("modal-password");

  if (!password) {
    input.style.borderColor = "#f87171";
    return;
  }

  fetch(`${API_URL}/post/${deleteTargetId}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        closeModal();
        loadPosts();
      } else {
        input.style.borderColor = "#f87171";
        // 에러 메시지 표시
        let errEl = document.getElementById("modal-error");
        if (!errEl) {
          errEl = document.createElement("span");
          errEl.id = "modal-error";
          errEl.style.cssText = "font-size:11px; color:#f87171; margin-top:4px; display:block;";
          input.insertAdjacentElement("afterend", errEl);
        }
        errEl.textContent = "비밀번호가 틀렸어요 🔒";
      }
    })
    .catch(() => alert("서버와 연결할 수 없어요."));
});

// 모달 비밀번호 입력창에서 Enter
document.getElementById("modal-password").addEventListener("keydown", e => {
  if (e.key === "Enter") document.querySelector(".delete-btn").click();
});

// =============================================
// 초기화
// =============================================

loadPosts();