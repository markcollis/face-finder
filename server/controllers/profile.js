/* eslint no-console: 0 */
const handleProfileGet = db => (req, res) => {
  console.log('Processing /profile/:id request');
  const { id } = req.params;
  db.select('*').from('users').where({ id })
    .then((user) => {
      if (user.length) {
        console.log('Successfully sent profile:', user[0]);
        res.json(user[0]);
      } else {
        console.log('Error: no such user.');
        res.status(404).json('no such user');
      }
    })
    .catch((err) => {
      console.log('Error: unable to get profile.', err.message);
      res.status(400).json('unable to get profile');
    });
};

module.exports = {
  handleProfileGet,
};
