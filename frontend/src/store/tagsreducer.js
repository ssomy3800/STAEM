import { csrfFetch } from "./csrf";

// Action type
const GET_TAGS = "tags/getTags";

// Async action creator
export const getTags = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/tags"); // replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    dispatch({ type: GET_TAGS, payload: data });
  } catch (error) {
    console.error("Failed to fetch tags", error);
  }
};

// Function to fetch tags and log them to console
export const fetchTags = () => async () => {
  try {
    const response = await csrfFetch("/api/tags"); // replace with your actual API endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed to fetch tags", error);
  }
};

// Reducer
const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TAGS:
      return action.payload;
    default:
      return state;
  }
};

export default tagsReducer;
