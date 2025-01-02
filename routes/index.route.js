import express from 'express';
import { loginngo,registerngo ,getClubDetails} from '../controllers/ngouser.js';
import { loginCompany,registercompany } from '../controllers/companyuser.js';
import { createproject, getproject, getprojectbyid,addParticipant ,getParticipants,updateproject} from '../controllers/projects.js';
import { checkout } from '../controllers/payment.js';


const router = express.Router();

router.post('/ngoregister',registerngo);
router.post('/ngologin',loginngo);
router.get('/getclubdetails/:id',getClubDetails);
router.post('/companylogin',loginCompany);
router.post('/companyregister',registercompany);
router.post('/createproject',createproject);
router.get('/getprojects',getproject);
router.get('/getprojectbyid/:id',getprojectbyid);
router.post('/checkout', checkout);
router.put('/addParticipant/:id',addParticipant);
router.get('/getParticipants/:id', getParticipants);
router.put('/updateproject/:id',updateproject);
export default router;