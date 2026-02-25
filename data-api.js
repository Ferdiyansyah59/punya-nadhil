const BASE_URL = "https://notes-api.dicoding.dev/v2/notes";

async function getAllNotes() {
  const response = await fetch(`${BASE_URL}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
  const response = await fetch(`${BASE_URL}/archived`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getNoteById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

async function insertNotes(data) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseJson = await response.json();

  if (responseJson.status == "success") {
    console.log("Catatan berhasil dibuat!", responseJson);
    return responseJson;
  } else {
    console.error("Gagal membuat catatan:", responseJson.message);
  }
}

async function deleteNotes(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function archiveNotes(id) {
  const response = await fetch(`${BASE_URL}/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status == "success") {
    console.log("Notes berhasil di arsipkan", responseJson);
    return responseJson;
  } else {
    console.error("Gagal mengarsipkan notes:", responseJson.message);
    throw new Error(responseJson.message);
  }
}

async function unarchiveNotes(id) {
  const response = await fetch(`${BASE_URL}/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status == "success") {
    console.log("Notes berhasil di aktifkan", responseJson);
    return responseJson;
  } else {
    console.error("Gagal mengaktifkan notes:", responseJson.message);
    throw new Error(responseJson.message);
  }
}
export {
  getAllNotes,
  archiveNotes,
  getNoteById,
  unarchiveNotes,
  getArchivedNotes,
  deleteNotes,
  insertNotes,
};
