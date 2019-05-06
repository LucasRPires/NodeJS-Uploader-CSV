const multer = require('multer');
const UploadDataService = require('./services/uploadDataService');
const ClientService = require('./services/clientService');
const UserService = require('./services/userService');

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
            res.status(error.code).json({ error: error.message});
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

    /**
     * @swagger
     * /deleteClient/{_id}:
     *   delete:
     *     summary: Delete client
     *     description: Delete client by id
     *     tags:
     *       - deleteClient
     *     parameters:
     *       - in: path
     *         name: _id
     *         type: string
     *         description: id collection
     *     responses:
     *       200:
     *         description: Client Deleted
     *         schema:
     *           type: object
     *           properties:
     *             _id:
     *               type: string
     *             date_sent:
     *               type: string
     *               format: date-time
     *             name:
     *               type: string
     *             status:
     *               type: string
     */
    app.delete('/deleteClient/:_id', async function(req, res) {
        try {
            let clientService = new ClientService();
            res.json(await clientService.deleteClient(req.params._id));
        } catch (error) {
            res.status(error.code).json({ error: error.message});            
        }
    });

    /**
     * @swagger
     * /deleteUser/{_id}:
     *   delete:
     *     summary: Delete User
     *     description: Delete User by id
     *     tags:
     *       - deleteUser
     *     parameters:
     *       - in: path
     *         name: _id
     *         type: string
     *         description: id collection
     *     responses:
     *       200:
     *         description: User Deleted
     *         schema:
     *           type: object
     *           properties:
     *             _id:
     *               type: string
     *             date_sent:
     *               type: string
     *               format: date-time
     *             name:
     *               type: string
     *             status:
     *               type: string
     */
    app.delete('/deleteUser/:_id', async function(req, res) {
        try {
            let userService = new UserService();
            res.json(await userService.deleteUser(req.params._id));
        } catch (error) {
            res.status(error.code).json({ error: error.message});            
        }
    });

    /**
     * @swagger
     * /updateClient/{_id}:
     *   put:
     *     summary: Update Client
     *     description: Update Client by id
     *     tags:
     *       - updateClient
     *     parameters:
     *       - in: path
     *         name: _id
     *         type: string
     *         description: id collection
     *       - in: body
     *         name: updateClient
     *         type: object
     *         description: file to upload.
     *     responses:
     *       200:
     *         description: User Deleted
     *         schema:
     *           type: object
     *           properties:
     *             _id:
     *               type: string
     *             date_sent:
     *               type: string
     *               format: date-time
     *             name:
     *               type: string
     *             status:
     *               type: string
     */
    app.put('/updateClient/:_id', async function(req, res) {
        // {"name": "xuxa", "cep": "80420-190", "cpf": "06509861882"}
        try {
            let _id = req.params._id;
            let updateClient = req.body;
            let clientService = new ClientService();
            res.json(await clientService.updateClient(_id, updateClient));
        } catch (error) {
            res.status(error.code).json({ error: error.message});            
        }
    });
    
 };
 