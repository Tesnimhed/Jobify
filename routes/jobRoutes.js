import {Router} from 'express';
import {getJobs, createJob, getJob, deleteJob, updateJob} from '../controllers/jobController.js';



const router = Router();


// router.get('/', getJobs)
// router.post('/', createJob)
// router.get('/:id', getJob)
// router.delete('/:id', deleteJob)
// router.patch('/:id', updateJob)


router.route('/').get(getJobs).post(createJob);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);



export default router;