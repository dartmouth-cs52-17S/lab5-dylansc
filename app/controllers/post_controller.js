import PostModel from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map((post) => {
    return { id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url };
  });
};

export const createPost = (req, res) => {
  // res.send('post should be created here');
  const post = new PostModel();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.cover_url = req.body.cover_url;
  post.save()
    .then((result) => {
      res.json({ message: 'Post created!' });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getPosts = (req, res) => {
  // res.send('posts should be returned\n');
  PostModel.find({})
  .then((returnedPosts) => {
    console.log(returnedPosts);
    res.json(cleanPosts(returnedPosts));
  })
  .catch((err) => {
    res.json({ err });
  });
};

export const getPost = (req, res) => {
  // res.send('single post looked up\n');
  PostModel.findById(req.params.id)
  .then((returnedPost) => {
    res.json({ id: returnedPost._id, title: returnedPost.title, tags: returnedPost.tags, content: returnedPost.content, cover_url: returnedPost.cover_url });
  })
  .catch((err) => {
    res.json({ err });
  });
};

export const deletePost = (req, res) => {
  PostModel.findOneAndRemove({ _id: req.params.id })
    .then(() => {
      res.json('Post Deleted Successfully');
    })
    .catch((err) => {
      res.json({ err });
    });
};

export const updatePost = (req, res) => {
  PostModel.findOneAndUpdate({ _id: req.params.id }, { title: req.body.title, tags: req.body.tags, content: req.body.content, cover_url: req.body.cover_url })
    .then(() => {
      res.json('Post Updated Succesfully');
    })
    .catch((err) => {
      res.json({ err });
    });
};
