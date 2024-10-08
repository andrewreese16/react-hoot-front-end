const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

async function index() {
  try {
    const response = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in index hootService");
  }
}

async function show(hootId) {
  try {
    const response = await fetch(`${BASE_URL}/${hootId}`, {
      // This is how we send the token to the server to indetify who we are
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err, "<-- err in show hootService");
  }
}

export { index, show };
