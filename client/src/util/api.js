import toast from "svelte-french-toast";

export async function fetchGet(url) {
  try {
    const response = await fetch(url, { credentials: "include" });

    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    return null;
  }
}

export async function fetchPost(url, body) {
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function fetchPut(url, body) {
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

export async function fetchDelete(url, body) {
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    return null;
  }
}
