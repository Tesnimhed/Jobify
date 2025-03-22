import {Router} from 'express';
import {getJobs, createJob, getJob, deleteJob, updateJob} from '../controllers/jobController.js';
import { validateJobInput,validateIdParam } from '../middleware/validationMiddleware.js';



const router = Router();


// router.get('/', getJobs)
// router.post('/', createJob)
// router.get('/:id', getJob)
// router.delete('/:id', deleteJob)
// router.patch('/:id', updateJob)


router.route('/').get(getJobs).post(validateJobInput ,createJob);
router.route('/:id').get(validateIdParam,getJob).delete(validateIdParam,deleteJob).patch(validateIdParam,validateJobInput , updateJob);



export default router;