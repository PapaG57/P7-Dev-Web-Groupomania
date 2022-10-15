// Importer les dépendances nécessaires

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Create from '../components/Post/Create';
function Home() {
  // Déclaration des hooks useNavigate et useState

  let navigate = useNavigate();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  // Exécute cette fonction immédiatement à l'ouverture de la page

  useEffect(() => {
    // Vérifie si l'utilisateur a un token valide avant d'afficher la page
    // Si l'utilisateur n'a pas de token valide, il est redirigé vers la page de connexion
    // Sinon il affiche la page

    if (!sessionStorage.getItem('JWToken')) {
      navigate('/');
    } else {
      // Effectue une requête GET pour récupérer toutes les données de la table des messages
      // Vérifie si l'utilisateur à un token valide
      // Puis renvoie les listes reçues de l'API

      axios
        .get(`${process.env.REACT_APP_API_URL}api/posts`, {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        })
        .then((res) => {
          setListOfPosts(res.data.listOfPosts);
          setLikedPosts(
            res.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  // Créer une fonction pour liker ou disliker une publication
  // Fait une requête POST qui bascule le bouton sur like ou pas
  // Vérifie si l'utilisateur a un token valide
  // Retourne ensuite la réponse
  // Saisit le message dans la liste des messages
  // Si l'id du post est égal au PostId
  // Si le message n'a pas de like, le renvoie avec seulement le like ajouté
  // Sinon, si le message a un like, le renvoie avec seulement le like supprimé

  const likeOrNot = (postId) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/likes`,
        { PostId: postId },
        {
          headers: {
            JWToken: sessionStorage.getItem('JWToken'),
          },
        }
      )
      .then((res) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  // DOM virtuel

  return (
    <div className="page_container">
      <Navbar />
      <div className="home">
        <Create />
        <div className="home_posts">
          {listOfPosts.map((value, key) => {
            return (
              <div className="home_post" key={key}>
                <div
                  className="home_post_content"
                  onClick={() => {
                    navigate(`/home/${value.id}`);
                  }}
                >
                  {value.content}
                </div>
                <div
                  className="home_post_image"
                  onClick={() => {
                    navigate(`/home/${value.id}`);
                  }}
                >
                  {value.image && (
                    <>
                      <img src={value.image} alt="illustration du post" />
                    </>
                  )}
                </div>
                <div className="home_post_footer">
                  <div className="home_post_username">
                    <p>{value.username}</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`/home/${value.id}`);
                    }}
                  >
                    <CommentIcon className="home_post_comment" />
                  </div>
                  <div className="home_post_buttons">
                    <ThumbUpIcon
                      className={
                        likedPosts.includes(value.id)
                          ? 'home_post_buttons_like'
                          : 'home_post_buttons_unlike'
                      }
                      onClick={() => {
                        likeOrNot(value.id);
                      }}
                    />
                    <p>{value.Likes.length}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Exportation du componsant Home

export default Home;
