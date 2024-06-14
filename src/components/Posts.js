import React, { useState, useEffect } from 'react';
import { getPosts, deletePost } from '../services/postService';
import PostForm from './PostForm';

export default function Posts() {
	const [posts, setPosts] = useState([]);
	const [editingPost, setEditingPost] = useState(null);

	useEffect(() => {
		getPosts()
			.then((result) => {
				setPosts(result.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const handleDelete = (id) => {
		deletePost(id)
			.then(() => {
				setPosts(posts.filter((post) => post.id !== id));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const startEditing = (post) => {
		setEditingPost(post);
	};

	return (
		<div>
			<h1>Post</h1>
			<PostForm posts={posts} setPosts={setPosts} editingPost={editingPost} setEditingPost={setEditingPost} />
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<h2>{post.title}</h2>
						<p>{post.body}</p>
						<button onClick={() => startEditing(post)}>Edit</button>
						<button onClick={() => handleDelete(post.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}
