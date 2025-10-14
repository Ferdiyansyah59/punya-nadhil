// const notesData = [
//   {
//     id: 'notes-jT-jjsyz61J8XKiI',
//     title: 'Welcome to Notes, Dimas!',
//     body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
//     createdAt: '2022-07-28T10:03:12.594Z',
//     archived: false,
//   },
//   {
//     id: 'notes-aB-cdefg12345',
//     title: 'Meeting Agenda',
//     body: 'Discuss project updates and assign tasks for the upcoming week.',
//     createdAt: '2022-08-05T15:30:00.000Z',
//     archived: false,
//   },
//   {
//     id: 'notes-XyZ-789012345',
//     title: 'Shopping List',
//     body: 'Milk, eggs, bread, fruits, and vegetables.',
//     createdAt: '2022-08-10T08:45:23.120Z',
//     archived: false,
//   },
//   {
//     id: 'notes-1a-2b3c4d5e6f',
//     title: 'Personal Goals',
//     body: 'Read two books per month, exercise three times a week, learn a new language.',
//     createdAt: '2022-08-15T18:12:55.789Z',
//     archived: false,
//   },
//   {
//     id: 'notes-LMN-456789',
//     title: 'Recipe: Spaghetti Bolognese',
//     body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
//     createdAt: '2022-08-20T12:30:40.200Z',
//     archived: false,
//   },
//   {
//     id: 'notes-QwErTyUiOp',
//     title: 'Workout Routine',
//     body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
//     createdAt: '2022-08-25T09:15:17.890Z',
//     archived: false,
//   },
//   {
//     id: 'notes-abcdef-987654',
//     title: 'Book Recommendations',
//     body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
//     createdAt: '2022-09-01T14:20:05.321Z',
//     archived: false,
//   },
//   {
//     id: 'notes-zyxwv-54321',
//     title: 'Daily Reflections',
//     body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
//     createdAt: '2022-09-07T20:40:30.150Z',
//     archived: false,
//   },
//   {
//     id: 'notes-poiuyt-987654',
//     title: 'Travel Bucket List',
//     body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
//     createdAt: '2022-09-15T11:55:44.678Z',
//     archived: false,
//   },
//   {
//     id: 'notes-asdfgh-123456',
//     title: 'Coding Projects',
//     body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
//     createdAt: '2022-09-20T17:10:12.987Z',
//     archived: false,
//   },
//   {
//     id: 'notes-5678-abcd-efgh',
//     title: 'Project Deadline',
//     body: 'Complete project tasks by the deadline on October 1st.',
//     createdAt: '2022-09-28T14:00:00.000Z',
//     archived: false,
//   },
//   {
//     id: 'notes-9876-wxyz-1234',
//     title: 'Health Checkup',
//     body: 'Schedule a routine health checkup with the doctor.',
//     createdAt: '2022-10-05T09:30:45.600Z',
//     archived: false,
//   },
//   {
//     id: 'notes-qwerty-8765-4321',
//     title: 'Financial Goals',
//     body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
//     createdAt: '2022-10-12T12:15:30.890Z',
//     archived: false,
//   },
//   {
//     id: 'notes-98765-54321-12345',
//     title: 'Holiday Plans',
//     body: 'Research and plan for the upcoming holiday destination.',
//     createdAt: '2022-10-20T16:45:00.000Z',
//     archived: false,
//   },
//   {
//     id: 'notes-1234-abcd-5678',
//     title: 'Language Learning',
//     body: 'Practice Spanish vocabulary for 30 minutes every day.',
//     createdAt: '2022-10-28T08:00:20.120Z',
//     archived: false,
//   },
// ];

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
    archivedNotes.length
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
