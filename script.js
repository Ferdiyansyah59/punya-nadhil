import {
  getAllNotes,
  getArchivedNotes,
  getNoteById,
  insertNotes,
  deleteNotes,
  archiveNotes,
  unarchiveNotes,
} from "./data-api.js";

const modal = document.getElementById("noteDetailModal");
const modalTitle = document.getElementById("modalNoteTitle");
const modalDate = document.getElementById("modalNoteDate");
const modalBody = document.getElementById("modalNoteBody");
const closeButton = document.querySelector(".close-button");

async function showNoteDetail(noteId) {
  modal.style.display = "block";
  modalTitle.textContent = "Memuat catatan...";
  modalDate.textContent = "";
  modalBody.textContent = "";
  const data = await getNoteById(noteId);
  console.log(data.data);

  modalTitle.textContent = data.data.title;
  modalDate.textContent = `Dibuat pada: ${formatDate(data.data.createdAt)}`;
  modalBody.textContent = data.data.body;
}

closeButton.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function refreshNotes() {
  try {
    const [activeNotesResult, archivedNotesResult] = await Promise.all([
      getAllNotes(),
      getArchivedNotes(),
    ]);

    if (!activeNotesResult.error) {
      renderActiveNotes(activeNotesResult.data);
    }
    if (!archivedNotesResult.error) {
      renderArchivedNotes(archivedNotesResult.data);
    }
  } catch (error) {
    console.error("Gagal me-refresh catatan:", error);
    alert("Gagal memuat data terbaru. Periksa koneksi Anda.");
  }
}

function generateId() {
  return "notes-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("id-ID");
}

class AppBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1> MY NOTES CORNER </h1>`;
  }
}
customElements.define("app-bar", AppBar);

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteFormElement" class="form-container">
          <input type="text" id="titleInput" placeholder="Masukkan judul catatan" required>
          <textarea id="bodyInput" placeholder="Tuliskan catatan ide atau to do list kamu disini" required></textarea>
          <div id="validationError" class="error"></div>
          <button type="submit">Tambah Catatan</button>
      </form>
    `;

    const form = this.querySelector("#noteFormElement");
    const titleInput = this.querySelector("#titleInput");
    const bodyInput = this.querySelector("#bodyInput");
    const errorDiv = this.querySelector("#validationError");

    function validateForm() {
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();
      let errorMsg = "";

      if (!title) {
        errorMsg = "Judul tidak boleh kosong";
      } else if (title.length < 3) {
        errorMsg = "Judul minimal 3 karakter.";
      } else if (body.length < 5) {
        errorMsg = "Isi catatan minimal 5 karakter.";
      }

      if (errorMsg) {
        errorDiv.textContent = errorMsg;
        errorDiv.style.display = "block";
        form.querySelector("button").disabled = true;
        return false;
      } else {
        errorDiv.style.display = "none";
        form.querySelector("button").disabled = false;
        return true;
      }
    }

    titleInput.addEventListener("input", validateForm);
    bodyInput.addEventListener("input", validateForm);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (validateForm()) {
        const noteToSend = {
          title: titleInput.value.trim(),
          body: bodyInput.value.trim(),
        };

        const result = await insertNotes(noteToSend);
        if (!result.error) {
          await refreshNotes();

          titleInput.value = "";
          bodyInput.value = "";
          validateForm();
        } else {
          console.log("Gagal menambahkan catatan dari API.");
        }
      }
    });

    validateForm();
  }
}
customElements.define("note-form", NoteForm);

class NoteItem extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute("title") || "";
    const body = this.getAttribute("body") || "";
    const date = this.getAttribute("date") || "";
    const id = this.getAttribute("id") || "";
    const archived = this.getAttribute("archived") || "";
    const isArchived = this.getAttribute("archived") === "true";

    const archiveButtonText = isArchived ? "Unarsip" : "Arsip";
    const itemClass = isArchived ? "archived-note" : "active-note";

    this.innerHTML = `
              <div class="${itemClass}">
                  <h3>${title}</h3>
                  <p>${body}</p>
                  <small>${date}</small>
                  <div class="actions">
                     <button class="detail-btn">Detail</button>
                      <button class="archive-btn">${archiveButtonText}</button>
                      <button class="delete-btn">Hapus</button>
                  </div>
              </div>
          `;

    const archiveBtn = this.querySelector(".archive-btn");
    const deleteBtn = this.querySelector(".delete-btn");

    const detailBtn = this.querySelector(".detail-btn");
    detailBtn.addEventListener("click", () => {
      showNoteDetail(id);
    });

    archiveBtn.addEventListener("click", () => {
      if (archived === "false") {
        toggleArchive(id);
      } else {
        toggleUnarchive(id);
      }
    });

    deleteBtn.addEventListener("click", () => {
      deleteNote(id);
    });
  }
}
customElements.define("note-item", NoteItem);

function renderActiveNotes(notes) {
  const activeGrid = document.getElementById("activeGrid");
  activeGrid.innerHTML = "";

  if (notes.length === 0) {
    activeGrid.innerHTML = `<p style="text-align:center;color:#999;">Belum ada notes aktif. Tambah sekarang!</p>`;
    return;
  }

  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    noteElement.setAttribute("date", formatDate(note.createdAt));
    noteElement.setAttribute("id", note.id);
    noteElement.setAttribute("archived", "false");
    activeGrid.appendChild(noteElement);
  });
}

function renderArchivedNotes(notes) {
  const archivedGrid = document.getElementById("archivedGrid");
  archivedGrid.innerHTML = "";

  if (notes.length === 0) {
    archivedGrid.innerHTML = `<p style="text-align:center;color:#999;">Belum ada catatan diarsipkan.</p>`;
    return;
  }

  notes.forEach((note) => {
    const noteElement = document.createElement("note-item");
    noteElement.setAttribute("title", note.title);
    noteElement.setAttribute("body", note.body);
    noteElement.setAttribute("date", formatDate(note.createdAt));
    noteElement.setAttribute("id", note.id);
    noteElement.setAttribute("archived", "true");
    archivedGrid.appendChild(noteElement);
  });
}

async function toggleArchive(id) {
  await archiveNotes(id);
  refreshNotes();
}

async function toggleUnarchive(id) {
  await unarchiveNotes(id);
  refreshNotes();
}

async function deleteNote(id) {
  if (confirm("Yakin hapus catatan ini? Aksi ini tidak bisa dibatalkan.")) {
    const { error } = await deleteNotes(id);
    if (!error) {
      refreshNotes();
    } else {
      alert("Gagal menghapus catatan!");
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  refreshNotes();
});
