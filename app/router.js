import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// /your routes will go here
// example!
// on routes that end in /posts
// ----------------------------------------------------
router.route('/posts')
  .post(Posts.createPost)
  .get(Posts.getPosts);


router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);


export default router;
