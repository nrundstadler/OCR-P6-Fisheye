export async function getData() {
  const requestURL = "data/photographers.json";
  try {
    const response = await fetch(requestURL);
    const resultatAPI = await response.json();
    return resultatAPI;
  } catch (error) {
    console.log("Erreur getData : " + error);
    return {};
  }
}
