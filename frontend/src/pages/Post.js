// Importer les dépendances nécessaires

import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import { Formik, Form, Field } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { AuthContext } from '../helpers/authContext';
function Post() {
  // Déclaration des hooks useParams, useNavigate, useState et useContext

  let { id } = useParams();
  let navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [post, setPost] = useState('');
  const [postForm, setPostForm] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewcomment] = useState('');

  // Déclaration des valeurs initiales du formulaire

  const initialValues = {
    content: `${content}`,
  };

  // Exécute cette fonction immédiatement à l'ouverture de la page

  useEffect(() => {
    // Fait une requête GET pour obtenir le message par son identifiant

    if (!sessionStorage.getItem('JWToken')) {
      window.location.replace(`/`);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setPost(res.data);
          setContent(res.data.content);
          setImage(res.data.image);
        });
      axios
        .get(`${process.env.REACT_APP_API_URL}api/comments/${id}`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setComments(res.data);
        });
    }
  }, []);

  // demande PUT commentaire

  const updateContent = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then((res) => {
        setContent(res.data.content);
        window.location.replace(`/home/${id}`);
      });
  };

  // demande PUT image

  const updateImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('image', image);
    axios
      .put(`${process.env.REACT_APP_API_URL}api/posts/update/${id}`, data, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.replace(`/home/${id}`);
      });
  };

  // Effectue une requête DELETE pour supprimer le message
  // Vérifie si l'utilisateur à un token valide
  // Redirige vers la page d'accueil après la suppression d'un message

  const deletePost = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/posts/delete/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        navigate('/home');
      });
  };

  // Fait une requête POST pour ajouter un nouveau commentaire à ce post
  // Vérifie si l'utilisateur à un token valide
  // Renvoie la réponse sous la forme d'un nouveau commentaire

  const createComment = (event) => {
    event.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/comments`,
        {
          comment: newComment,
          PostId: id,
        },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
        } else {
          const CommentToAdd = {
            comment: res.data.comment,
            username: res.data.username,
            id: res.data.id,
          };
          setComments([...comments, CommentToAdd]);
          setNewcomment('');
          window.location.replace(`/home/${id}`);
        }
      });
  };

  // demande DELETE

  const deleteComment = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}api/comments/delete/${id}`, {
        headers: {
          JWToken: sessionStorage.getItem('JWToken'),
        },
      })
      .then(() => {
        window.location.replace(`/home/${post.id}`);
      });
  };

  // DOM virtuel

  return (
    <div className="page_container">
      <Navbar />
      <div className="post_container">
        <div className="post">
          {(authState.username === post.username && (
            <>
              <EditIcon
                onClick={() => setPostForm(!postForm)}
                className="post_button_edit"
              />
            </>
          )) ||
            (authState.isAdmin === true && (
              <>
                <EditIcon
                  onClick={() => setPostForm(!postForm)}
                  className="post_button_edit"
                />
              </>
            ))}
          {postForm === false && (
            <>
              <div className="post_content">{post.content}</div>
              <div className="post_image">
                {post.image && (
                  <>
                    <img src={post.image} alt="illustration du post" />
                  </>
                )}
              </div>
            </>
          )}
          {postForm && (
            <>
              <Formik initialValues={initialValues} onSubmit={updateContent}>
                <Form className="create_form">
                  <Field
                    as="textarea"
                    aria-label="modifiez votre publication"
                    name="content"
                    placeholder={post.content}
                    autoComplete="off"
                  />
                  <button
                    className="create_button"
                    type="submit"
                    aria-label="valider"
                  >
                    Modifiez votre publication
                  </button>
                </Form>
              </Formik>
              <form className="create_form" onSubmit={updateImage}>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept=".jpeg, .jpg, .png, .gif, .webp"
                  onChange={(event) => setImage(event.target.files[0])}
                  aria-label="ajouter une image"
                />
                <br />
                <button
                  className="create_button"
                  type="submit"
                  aria-label="valider"
                >
                  Modifiez votre image
                </button>
              </form>
            </>
          )}
          <div className="post_footer">
            <div
              className="post_username"
              onClick={() => {
                navigate(`/user/${post.UserId}`);
              }}
            >
              <p>{post.username}</p>
            </div>
            {(authState.username === post.username && (
              <>
                <div className="post_button">
                  <DeleteIcon
                    className="post_button_delete"
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  />
                </div>
              </>
            )) ||
              (authState.isAdmin === true && (
                <>
                  <div className="post_button">
                    <DeleteIcon
                      className="post_button_delete"
                      onClick={() => {
                        deletePost(post.id);
                      }}
                    />
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="commment_container">
          <form className="comment_form">
            <textarea
              name="comment"
              id="comment"
              aria-label="votre commentaire"
              placeholder="Votre commentaire"
              autoComplete="off"
              value={newComment}
              onChange={(event) => {
                setNewcomment(event.target.value);
              }}
            />
            <button aria-label="valider" onClick={createComment}>
              <DoneIcon aria-label="valider" />
            </button>
          </form>
        </div>
        <div className="comment_list">
          {comments.map((comment, key) => {
            return (
              <div className="comment_container" key={key}>
                <div className="comment_content">{comment.comment}</div>
                <div className="comment_username_button">
                  <p>{comment.username}</p>
                  {(authState.username === comment.username && (
                    <>
                      <button
                        className="comment_delete_button"
                        aria-label="supprimer le commentaire"
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )) ||
                    (authState.isAdmin === true && (
                      <>
                        <button
                          className="comment_delete_button"
                          aria-label="supprimer le commentaire"
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Exportation du componsant Post

export default Post;
