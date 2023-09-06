import { userRepo } from '../../repos/user/index.js';

export default async function verifyMail(req, res, next) {

    const filter = {_id: req.user.userId};

    const user = await userRepo.findOneByFilter(filter);

    if (!user.verified) {
        return res.status(403).json({ error: 'email not verified' });
    }



    // req.user = user;
    next();
}