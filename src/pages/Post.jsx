import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { buscar } from "../api/api";
import "../assets/css/componentes/card.css";

const Post = ({ url }) => {
    const [post, setPosts] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        buscar(`/posts/${id}`, setPosts).catch(() => navigate("/not-fount"));
    }, [id]);
    return (
        <main className="container flex flex--center">
            <article className="card post">
                <h2 className="post-card__title">{post.title}</h2>
                <p className="text__card">{post.body}</p>
            </article>
        </main>
    );
};

export default Post;
