export async function fetchGet(url) {
  try {
    const response = await fetch(url, { credentials: "include" });

    if (!response.ok) {
      const result = await response.json();
      return { error: true, message: result.data || "Failed to retrieve data" };
    }

    const result = await response.json();
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: "Network error" };
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
      const result = await response.json();
      return { error: true, message: result.data || "Failed to insert data" };
    }
    const result = await response.json();
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: "Network error" };
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
      const result = await response.json();
      return { error: true, message: result.data || "Failed to update data" };
    }
    const result = await response.json();
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: "Network error" };
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
      const result = await response.json();
      return { error: true, message: result.data || "Failed to delete data" };
    }
    const result = await response.json();
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, message: "Network error" };
  }
}
