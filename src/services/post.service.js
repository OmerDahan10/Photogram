import { storageService } from "./async-storage.service.js";


// const posts = require('../data/post.json');


// function getPosts() {
//     storageService.saveToStorage('posts',posts);
//     return posts
// }

export const postService ={
    loadPosts,
    updatePost,
    deletePost
}

export function loadPosts(user) {
   return storageService.query('posts',user).then(res=> res);

}

export function updatePost(post) {
    return storageService.put('posts',post);
}

export function deletePost(postId){
    return storageService.remove('posts',postId);
}