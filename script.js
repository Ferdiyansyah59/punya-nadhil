import { getAllNotes } from "./data-api.js";
let notesData = [];
async function main() {
  try {
    const { data: notes } = await getAllNotes(); // Panggil fungsi fetch
    notesData = notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }

  // Sekarang notesData sudah siap, kamu bisa log atau gunakan
  console.log("Notes data saat ini:", notesData); // Log setelah try-catch
}

console.log(notesData);

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

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm()) {
        const newNote = {
          id: generateId(),
          title: titleInput.value.trim(),
          body: bodyInput.value.trim(),
          createdAt: new Date().toISOString(),
          archived: false,
        };
        notesData.push(newNote);
        titleInput.value = "";
        bodyInput.value = "";
        validateForm();
        renderNotes();
        console.log("Note ditambahkan:", newNote);
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
    const isArchived = this.getAttribute("archived") === "true"; // Cek status archived

    const archiveButtonText = isArchived ? "Unarsip" : "Arsip";
    const itemClass = isArchived ? "archived-note" : "active-note"; // Opsional: untuk CSS styling

    this.innerHTML = `
            <div class="${itemClass}">
                <h3>${title}</h3>
                <p>${body}</p>
                <small>${date}</small>
                <div class="actions">
                    <button class="archive-btn">${archiveButtonText}</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            </div>
        `;

    const archiveBtn = this.querySelector(".archive-btn");
    const deleteBtn = this.querySelector(".delete-btn");

    archiveBtn.addEventListener("click", () => {
      toggleArchive(id);
    });

    deleteBtn.addEventListener("click", () => {
      deleteNote(id);
    });
  }
}
customElements.define("note-item", NoteItem);

function renderNotes() {
  main();
  const content = document.getElementById("notesContent");
  const activeNotes = notesData.filter((note) => !note.archived);
  const archivedNotes = notesData.filter((note) => note.archived);
  const archivedSection = document.getElementById("archivedSection");

  content.innerHTML = `
    <div class="notes-section">
      <h2>Kumpulan Note</h2>
      <div class="notes-grid" id="activeGrid"></div>
    </div>
    <hr>
    <div class="notes-section">
      <h2>Catatan yang sudah diarsipkan</h2>
      <div class="notes-grid" id="archivedGrid"></div>
    </div>
  `;

  const activeGrid = content.querySelector("#activeGrid");
  const archivedGrid = content.querySelector("#archivedGrid");

  if (activeNotes.length === 0) {
    activeGrid.innerHTML = `<p style="text-align:center;color:#999;">Belum ada notes aktif. Tambah sekarang!</p>`;
  } else {
    activeNotes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("date", formatDate(note.createdAt));
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("archived", "false");
      activeGrid.appendChild(noteElement);
    });
  }

  if (archivedNotes.length === 0) {
    archivedGrid.innerHTML = `<p style="text-align:center;color:#999;">Belum ada catatan diarsipkan.</p>`;
  } else {
    archivedNotes.forEach((note) => {
      const noteElement = document.createElement("note-item");
      noteElement.setAttribute("title", note.title);
      noteElement.setAttribute("body", note.body);
      noteElement.setAttribute("date", formatDate(note.createdAt));
      noteElement.setAttribute("id", note.id);
      noteElement.setAttribute("archived", "true");
      archivedGrid.appendChild(noteElement);
    });
  }

  console.log(
    "Rendered notes - Active:",
    activeNotes.length,
    "Archived:",
    archivedNotes.length,
  );
}

function toggleArchive(id) {
  const note = notesData.find((n) => n.id === id);
  if (note) {
    note.archived = !note.archived;
    renderNotes();
    console.log("Archive toggled for ID:", id, "New status:", note.archived);
  }
}

function deleteNote(id) {
  if (confirm("Yakin hapus catatan ini? Aksi ini tidak bisa dibatalkan.")) {
    const index = notesData.findIndex((n) => n.id === id);
    if (index > -1) {
      notesData.splice(index, 1);
      renderNotes();
      console.log("Note deleted for ID:", id);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotes();
  console.log("App loaded! Total notes in array:", notesData.length);
});
