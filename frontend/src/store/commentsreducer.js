import { csrfFetch } from "./csrf";

// ACTION TYPES
const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const SET_ACTIVE_COMMENT = "comments/SET_ACTIVE_COMMENT";

// ACTION CREATORS
const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments,
});
export const setActiveComment = (comment) => ({
  type: SET_ACTIVE_COMMENT,
  payload: comment,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

// THUNK ACTIONS
export const fetchComments = (gameId) => async (dispatch) => {
  const response = await csrfFetch(`/api/games/${gameId}/comments`);

  const comments = await response.json();
  dispatch(setComments(comments));
};
export const setActiveCommentId = (commentId) => async (dispatch, getState) => {
  const comments = getState().comments.comments;
  const activeComment = comments.find((comment) => comment.id === commentId);
  dispatch(setActiveComment(activeComment));
};
export const createComment = (commentData) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/games/${commentData.game_id}/comments`,
    {
      method: "POST",
      body: JSON.stringify(commentData),
    }
  );
  const newComment = await response.json();
  dispatch(addComment(newComment));
};

export const editComment = (commentData) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/games/${commentData.game_id}/comments/${commentData.id}`,
    {
      method: "PUT",
      body: JSON.stringify(commentData),
    }
  );
  const updatedComment = await response.json();
  dispatch(updateComment(updatedComment));
};

export const removeComment = (gameId, commentId) => async (dispatch) => {
  await csrfFetch(`/api/games/${gameId}/comments/${commentId}`, {
    method: "DELETE",
  });
  dispatch(deleteComment(commentId));
};

const initialState = {
  comments: [],
  active: null,
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id === action.payload.id ? action.payload : comment
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    case SET_ACTIVE_COMMENT:
      return {
        ...state,
        active: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
