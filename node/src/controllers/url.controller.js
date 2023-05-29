const Url = require('../models/url.model');

// Create a new shortened URL
exports.create = (req, res) => {
  const newUrl = {
    userId: req.user.id,
    originalUrl: req.body.originalUrl,
    shortenedUrl: req.body.shortenedUrl,
    creationDate: new Date().toISOString()
  };
  if(!newUrl.originalUrl || !newUrl.shortenedUrl) return res.status(400).send({ message: "URLs can not be empty" });

  Url.create(newUrl, (err, result) => {
    console.log(err);
    if (err) {
      return res.status(500).send({
        message: "Error creating the URL"
      });
    }
    console.log("Ha funcionado bien xD");
    res.status(200).send({
      message: "URL created successfully",
      original: newUrl.originalUrl,
      shortened: newUrl.shortenedUrl
    });
  });
};

// Retrieve a single URL with id
exports.get = (req, res) => {
  Url.get(req.params.id, (err, url) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).send({
          message: "URL not found with id " + req.params.id
        });
      }
      console.log(err);
      return res.status(500).send({
        message: "Error retrieving URL with id " + req.params.id
      });
    }
    //const urlRedirect = JSON.parse(url);

    //delete url.userId;
    // redirect to original URL
    //res.send(url);
    res.redirect(url.originalUrl);
  });
};

// Retrieve all URLs of a user
exports.findAllByUser = (req, res) => {
  Url.getUrlsByUserId(req.params.userId, (err, urls) => {
    if (err) {
      return res.status(500).send({
        message: "Error retrieving URLs for user with id " + req.params.userId
      });
    }
    res.send(urls);
  });
};

// Update a URL with id
exports.update = (req, res) => {
  Url.update(req.params.id, req.body, (err, result) => {
    if (err) {
      return res.status(500).send({
        message: "Error updating URL with id " + req.params.id
      });
    }
    if (!result) {
      return res.status(404).send({
        message: "URL not found with id " + req.params.id
      });
    }
    res.send({msg: "URL updated successfully."});
  });
};

// Delete a URL with id
exports.delete = (req, res) => {
  const id = req.params.id;

  Url.delete(id, (err, result) => {
      if (err) return res.status(500).send(err);

      if (!result) return res.status(404).send({ message: "URL not found." });

      return res.status(200).send({ message: "URL deleted successfully." });
  });
};

  

// Función para generar una nueva clave única para la URL recortada
function generateShortKey() {
  // Aquí puedes implementar la lógica que desees para generar una clave única para la URL recortada.
  // Por ejemplo, puedes generar una clave aleatoria de 6 caracteres.
  // En este caso, devuelvo una clave de ejemplo para simplificar el código.
  return 'abc123';
}