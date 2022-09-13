// gère les likes et les dislikes //

const { Likes } = require('../models');

exports.liker = async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;
  const exist = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!exist) {
    await Likes.create({ PostId: PostId, UserId: UserId })
      .then(() => {
        res.status(201).json({ liked: true });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur' + error });
      });
  } else {
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    })
      .then(() => {
        res.status(201).json({ liked: false });
      })
      .catch((error) => {
        res.status(400).json({ error: 'Erreur' + error });
      });
  }
};
