/* eslint no-console: 0 */
const handleImagePut = db => (req, res) => {
  console.log('Processing /image request');
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      console.log('Successfully analysed image, new entries:', entries[0]);
      res.json(entries[0]);
    })
    .catch((err) => {
      console.log('Error: unable to get entries.', err.message);
      return res.status(400).json('unable to get entries');
    });
};

module.exports = {
  handleImagePut,
};
