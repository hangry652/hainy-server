const fs = require('fs');
const path = require('path');
const { sendError } = require("../../../helpers/errors.helper");

class PicturesController {
  async getPicture (req, res) {
    try {
      const { fileName } = req.query;
      const filePath = path.resolve(__dirname + '\\..\\..\\..\\..\\public\\storage\\pictures\\' + fileName)

      if (!fs.existsSync(filePath)) return sendError(res, 404,
        'File not found'  
      );

      res
        .status(200)
        .sendFile(filePath);

    } catch (error) {
      sendError(res, 500);
    }
  }
}

module.exports = new PicturesController();