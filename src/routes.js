const multer = require('multer');
const UploadDataService = require('./services/uploadDataService');
const ClientService = require('./services/clientService');
 
var upload = multer({dest: 'uploads/'});

 module.exports = function (app) {
    /**
     * @swagger
     * /uploadData:
     *   post:
     *     summary: Upload data
     *     description: Upload an .csv file to include a new client collections
     *     tags:
     *       - uploadData
     *     parameters:
     *       - in: formData
     *         name: upfile
     *         type: file
     *         description: file to upload.
     *     responses:
     *       200:
     *         description: Array of collection data loaded
     *         schema:
     *           type: object
     *           properties:
     *             _id:
     *               type: string
     *             name:
     *               type: string
     *             date_sent:
     *               type: string
     *               format: date-time
     *             file_name:
     *               type: string
     *             status:
     *               type: string
     */
    app.post('/uploadData', upload.single('upfile'), async function(req, res) {
        try {
            let uploadDataService = new UploadDataService;
            res.json(await uploadDataService.uploadPayload(req));
        } catch (error) {
            console.log(error);
            // res.status(error.code).json({ error: error.message});
        }
    });

    /**
     * @swagger
     * /findClients:
     *   get:
     *     summary: Find Data
     *     description: Find an object data by id
     *     tags:
     *       - findClients
     *     parameters:
     *       - in: query
     *         name: _id
     *         type: string
     *         description: id collection
     *     responses:
     *       200:
     *         description: Array of collection data loaded
     *         schema:
     *           type: array
     *           items: 
     *              type: object
     *              properties:
     *                  _id:
     *                      type: number
     *                  name:
     *                      type: string
     *                  CEP:
     *                      type: number
     *                  CPF:
     *                      type: number
     *                  date_send:
     *                      type: string
     *                      format: date-time
     *                  address:
     *                      type: object
     *                      properties:
     *                          district:
     *                              type: string
     *                          street:
     *                              type: string
     *                          state:
     *                              type: string
     */
    app.get('/findClients', async function(req, res) {
        try {
            let clientService = new ClientService();
            res.json(await clientService.findClientsByUser(req.query._id));
        } catch (error) {
            res.status(error.code).json({ error: error.message});            
        }
    });
 };
 