import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGame } from "../../store/gamesreducer";
import { addGameToCart } from "../../store/carteditemreducer";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./gamePage.css";
import SearchBar from "../searchBar";
import { fetchUserCart, fetchUserStorage } from "../../store/carteditemreducer";
import thumbup from "../../assets/images/thumbup.png";
import thumbdown from "../../assets/images/thumbdown.png";
import avatar from "../../assets/images/pic.png";

import {
  fetchComments,
  createComment,
  removeComment,
  setActiveComment,
  editComment,
  setActiveCommentId,
} from "../../store/commentsreducer";

function GamePage() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games.current);

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const cartedItems = useSelector((state) => state.cart);
  const [activeItem, setActiveItem] = useState(0);
  const handleThumbClick = (index) => setActiveItem(index);
  const [purchased, setPurchased] = useState(null);
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.comments.comments);
  const activeComment = useSelector((state) => state.comments.active);

  const [newComment, setNewComment] = useState("");
  const [newCommentLike, setNewCommentLike] = useState(false); // Like/dislike state

  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    if (game) {
      dispatch(fetchComments(game.id)).then((result) => {
        // If fetchComments returned true, set loading to false. Otherwise, handle the error (set loading to false as well in this case).
        setLoading(!result);
      });
    }
  }, [dispatch, game]);

  const handleAddComment = () => {
    if (currentUser) {
      dispatch(
        createComment({
          content: newComment,
          likes: newCommentLike,
          game_id: game.id,
          user_id: currentUser.id,
          username: currentUser.username,
        })
      );
      setNewComment("");
      setNewCommentLike(false); // Reset the like/dislike state
    } else {
      history.push("/login");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(removeComment(game.id, commentId));
  };

  const handleEditComment = (commentId) => {
    dispatch(setActiveCommentId(commentId));
    setEditingCommentId(commentId); // set the comment currently being edited
  };

  const handleUpdateComment = () => {
    dispatch(editComment(activeComment));
    dispatch(setActiveComment(null));
    setEditingCommentId(null); // reset the comment currently being edited
  };

  let overallLikes, recentAverageLikes;

  // Only calculate likes percentages if comments are not empty
  if (!loading) {
    const totalComments = comments.length;
    const totalLikes = comments.filter(
      (comment) => comment.likes === true
    ).length;

    overallLikes = (totalLikes / totalComments) * 100;

    // Calculate recent likes
    let recentComments = comments.slice(-5);
    const recentLikes = recentComments.filter(
      (comment) => comment.likes === true
    ).length;
    recentAverageLikes = (recentLikes / recentComments.length) * 100;
  }
  useEffect(() => {
    if (game) {
      let found = false;
      let currentPurchased;
      for (let key in cartedItems) {
        // Iterate over each individual item in the current property
        for (let itemKey in cartedItems[key]) {
          for (let itemitemKey in cartedItems[key][itemKey]) {
            let cartedItem = cartedItems[key][itemKey][itemitemKey];

            if (cartedItem.gameId === game.id) {
              currentPurchased = cartedItem.purchased;
              found = true;
              break;
            }
          }
          if (found) break;
        }
      }

      if (found) {
        setPurchased(currentPurchased);
      } else {
        setPurchased(undefined);
      }
    }
  }, [game]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserCart(currentUser.id));
      dispatch(fetchUserStorage(currentUser.id));
    }
    dispatch(fetchGame(id));
  }, [dispatch, id]);

  const addToCart = () => {
    if (currentUser) {
      if (purchased) {
        history.push("/storage");
      } else if (purchased === false) {
        history.push("/cart");
      } else {
        dispatch(addGameToCart(game, currentUser.id));
        setPurchased(false); // set purchased state manually
      }
    } else {
      history.push("/login");
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Loading...</div>;
  }

  let imageEntries = Object.entries(game.images);
  const lastImageEntry = imageEntries.pop();
  const gameImages = imageEntries.map(([filename, imageUrl], index) => (
    <div key={index} className="carousel-image-container">
      <img className="carousel-image" src={imageUrl} alt={filename} />
    </div>
  ));
  const firstImageUrl = game.images[Object.keys(game.images)[0]];
  const lastImageUrl = game.images[Object.keys(game.images)[6]];

  const newLocal = "$ " + game.price;
  return (
    <div>
      <SearchBar />
      <div
        className="game-body"
        style={{
          backgroundImage: `url(${lastImageEntry[1]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="game-header">
          <Link to="/">All Games</Link> &gt;
          <Link to={`/tags/${game.tags[0]}`}>{game.tags[0]}</Link> &gt;{" "}
          {game.title}
        </div>
        <div className="game-title">{game.title}</div>
        <div className="game-page">
          <div className="game-carousel">
            <ResponsiveCarousel
              showThumbs={true}
              autoPlay
              infiniteLoop
              useKeyboardArrows
              showIndicators={false}
              selectedItem={activeItem}
              renderThumbs={() => [
                // include an image that represents the video first
                <img
                  onClick={() => handleThumbClick(0)}
                  src={lastImageUrl}
                  key="firstImage"
                  alt="videopreview"
                />,
                // then map the rest of your images
                ...Object.values(game.images).map((imageUrl, index) => (
                  <img
                    onClick={() => handleThumbClick(index + 1)}
                    src={imageUrl}
                    key={`image-${index + 1}`}
                    alt="game"
                  />
                )),
              ]}
            >
              {game.video && (
                <div>
                  <video
                    poster={game.videoPreview}
                    className="carousel-image"
                    src={game.video}
                    controls
                    style={{ position: "relative", zIndex: 10, padding: "3%" }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              {gameImages}
            </ResponsiveCarousel>
          </div>
          <div className="rightside">
            <img src={firstImageUrl} alt="Game Cover" className="game-cover" />
            <div className="game-info">
              <p className="short-description">{game.shortDescription}</p>
              <div className="game-info-section">
                <div className="game-info-title">Publisher:</div>
                <div className="game-info-content">{game.publisher}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Developer:</div>
                <div className="game-info-content">{game.developer}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Publish Date:</div>
                <div className="date">{game.publishDate}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Overall Views:</div>
                <div className="game-info-content">
                  {overallLikes >= 70 && (
                    <div className="positive">Very positive</div>
                  )}
                  {overallLikes < 70 && overallLikes >= 30 && (
                    <div className="average">Average</div>
                  )}
                  {overallLikes < 30 && (
                    <div className="negative">Negative</div>
                  )}
                  <div className="percentage">({overallLikes.toFixed(2)}%)</div>
                </div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Most Recent Views:</div>
                <div className="game-info-content">
                  {recentAverageLikes >= 70 && (
                    <div className="positive">Very positive</div>
                  )}
                  {recentAverageLikes < 70 && recentAverageLikes >= 30 && (
                    <div className="average">Average</div>
                  )}
                  {recentAverageLikes < 30 && (
                    <div className="negative">Negative</div>
                  )}
                  <div className="percentage">
                    ({recentAverageLikes.toFixed(2)}%)
                  </div>
                </div>
              </div>
              <div className="game-info-tag-container">
                <div className="game-info-title">Most Popular Tags:</div>
                <div className="game-info-content">
                  {game.tags.slice(0, 5).map((tag, index) => (
                    <span key={index} className="game-info-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mid">
          <div className="about">
            <div className="long-description-header">
              <div>About this game:</div>
            </div>
            <p className="long-description-body">{game.longDescription}</p>
          </div>
          <div className="mid-right">
            <div className="game-info">
              <div className="game-info-section">
                <div className="game-info-title">Title:</div>
                <div className="game-info-content">{game.title}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Publisher:</div>
                <div className="game-info-content">{game.publisher}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Developer:</div>
                <div className="game-info-content">{game.developer}</div>
              </div>
              <div className="game-info-section">
                <div className="game-info-title">Release Date:</div>
                <div className="game-info-content">{game.publishDate}</div>
              </div>
              <div className="tags">
                <p className="game-info-title">Genre:</p>
                {game.tags.map((tag, index) => (
                  <Link key={index} to={`/tags/${tag}`} className="tag">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="purchase">
          <div className="purchase-section">Purchase: {game.title}</div>
          <div className="price-layer">
            <p>{game.price === 0 ? "Free" : newLocal}</p>
            <button onClick={addToCart}>
              {purchased === true
                ? "Play!"
                : purchased === false
                ? "Go to Cart!"
                : "Add to Cart"}
            </button>
          </div>
        </div>
        <div className="cutline"></div>
        <div className="comments">
          <p className="comment-part-header">Customer Reviews:</p>
          <div className="comment-statistics">
            <div className="overall-likes">
              <div className="likes-header">Overall Reviews:</div>
              <div className="stat-body">
                {overallLikes >= 70 && (
                  <div className="positive">Very positive</div>
                )}
                {overallLikes < 70 && overallLikes >= 30 && (
                  <div className="average">Average</div>
                )}
                {overallLikes < 30 && <div className="negative">Negative</div>}
                <div className="percentage">({overallLikes.toFixed(2)}%)</div>
              </div>
            </div>
            <div className="recent-likes">
              <div className="likes-header">Recent Reviews:</div>
              <div className="stat-body">
                {recentAverageLikes >= 70 && (
                  <div className="positive">Very positive</div>
                )}
                {recentAverageLikes < 70 && recentAverageLikes >= 30 && (
                  <div className="average">Average</div>
                )}
                {recentAverageLikes < 30 && (
                  <div className="negative">Negative</div>
                )}
                <div className="percentage">
                  ({recentAverageLikes.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
          <div className="comment-section">
            <div className="existing-comments">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  {editingCommentId === comment.id ? (
                    <div className="create-comment-button">
                      <input
                        type="text"
                        value={activeComment.content}
                        onChange={(e) =>
                          dispatch(
                            setActiveComment({
                              ...activeComment,
                              content: e.target.value,
                            })
                          )
                        }
                      />
                      <button
                        className={activeComment.likes ? "button-selected" : ""}
                        onClick={() =>
                          dispatch(
                            setActiveComment({ ...activeComment, likes: true })
                          )
                        }
                      >
                        Like
                      </button>
                      <button
                        className={
                          !activeComment.likes ? "button-selected" : ""
                        }
                        onClick={() =>
                          dispatch(
                            setActiveComment({ ...activeComment, likes: false })
                          )
                        }
                      >
                        Dislike
                      </button>
                      <button onClick={handleUpdateComment}>
                        Update Comment
                      </button>
                      <button onClick={() => setEditingCommentId(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="overall-comment">
                        <div className="comment-username">
                          <img src={avatar} alt="Upvote" />
                          <strong>{comment.username}</strong>
                        </div>

                        <div className="comment-content">
                          <div className="comment-header">
                            {comment.likes ? (
                              <>
                                <img src={thumbup} alt="Upvote" />
                                <p>Recommended</p>
                                <i className="fa-brands fa-steam"></i>
                              </>
                            ) : (
                              <>
                                <img src={thumbdown} alt="Downvote" />
                                <p className="not-recommended">
                                  Not Recommended
                                </p>
                                <i className="fa-brands fa-steam"></i>
                              </>
                            )}
                          </div>
                          <div className="comment-updated-at">
                            updated at:
                            {new Date(comment.updated_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                          <div className="comment-content-body">
                            {comment.content}
                          </div>
                          <div className="vote">
                            Was this comment helpful?
                            <div className="buttons">
                              <button>
                                <i className="fa-solid fa-thumbs-up"></i>
                              </button>
                              <button>
                                <i className="fa-solid fa-thumbs-down"></i>
                              </button>
                              <button>😄</button>
                              <button>😊</button>
                              <button>👍</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {currentUser && currentUser.id === comment.user_id && (
                        <div className="exist-comment-button">
                          <button onClick={() => handleEditComment(comment.id)}>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="recent-comment">
              {comments
                .slice(-5)
                .reverse()
                .map((comment) => (
                  <div key={comment.id} className="comment">
                    {
                      <>
                        <div className="comment-content">
                          <div className="comment-header">
                            {comment.likes ? (
                              <>
                                <img src={thumbup} alt="Upvote" />
                                <div className="comment-username">
                                  <strong>{comment.username}</strong>
                                </div>
                                <i className="fa-brands fa-steam"></i>
                              </>
                            ) : (
                              <>
                                <img src={thumbdown} alt="Downvote" />
                                <div className="comment-username">
                                  <strong>{comment.username}</strong>
                                </div>
                                <i className="fa-brands fa-steam"></i>
                              </>
                            )}
                          </div>
                          <div className="comment-updated-at">
                            updated at:
                            {new Date(comment.updated_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </div>
                          <div className="comment-content-body">
                            {comment.content}
                          </div>
                          <div className="vote">
                            Was this comment helpful?
                            <div className="buttons">
                              <button>
                                <i className="fa-solid fa-thumbs-up"></i>
                              </button>
                              <button>
                                <i className="fa-solid fa-thumbs-down"></i>
                              </button>
                              <button>😄</button>
                              <button>😊</button>
                              <button>👍</button>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  </div>
                ))}
            </div>
          </div>
          <div className="new-comment-form">
            <div className="leave-comment">Share Your Thoughts:</div>
            <textarea
              placeholder="Enter your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              maxLength={100}
            />
            <div className="like-dislike-buttons">
              <button
                className={
                  newCommentLike ? "button-selected" : "like-dislike-button"
                }
                onClick={() => setNewCommentLike(true)}
              >
                <img src={thumbup} alt="Upvote" /> Upvote
              </button>
              <button
                className={
                  !newCommentLike ? "button-selected" : "like-dislike-button"
                }
                onClick={() => setNewCommentLike(false)}
              >
                <img src={thumbdown} alt="Downvote" /> Downvote
              </button>
            </div>
            <button className="add-comment-button" onClick={handleAddComment}>
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
