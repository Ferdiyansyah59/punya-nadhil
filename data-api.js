const BASE_URL = "https://notes-api.dicoding.dev/v2/notes";

async function getAllNotes() {
  const response = await fetch(`${BASE_URL}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export { getAllNotes };
