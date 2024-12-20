import { Router } from 'express';
import { createInstitution, createResearcherUser, createUserByInstitution, geInstitution, getUsers, loginInstitution, loginUser, resendOtp, updateInstitutionProfile, updateProfile, verifyLoginPinInstitution, verifyLoginPinUser } from '../controllers/UserController';
import { auth } from '../middleware/auth';
import { CreateInstitutionDto, CreateResearcherDto, CreateUserByInstitutionDto, LoginDto, ResendOtpDto, UpdateUserDto, VerifyLoginDto, updateInstitutionDto } from '../dto/dto';
import { validationMiddleware } from '../middleware/expressDto';



const router = Router();

//  router.use(authMiddleware);

router.post('/user/researcher', validationMiddleware(CreateResearcherDto), createResearcherUser);
router.post("/institution", validationMiddleware(CreateInstitutionDto), createInstitution);
router.post("/institution/user", auth, validationMiddleware(CreateUserByInstitutionDto), createUserByInstitution);
router.post("/resend-otp", validationMiddleware(ResendOtpDto), resendOtp);
router.get('/user', auth, getUsers); 
router.get("/institution", auth, geInstitution);
router.post('/login/user', validationMiddleware(LoginDto), loginUser);
router.post("/verify-login/user", validationMiddleware(VerifyLoginDto), verifyLoginPinUser);
router.post('/login/institution', validationMiddleware(LoginDto), loginInstitution);
router.post("/verify-login/institution", validationMiddleware(VerifyLoginDto), verifyLoginPinInstitution);


router.put("/user", auth, validationMiddleware(UpdateUserDto), updateProfile);
router.put("/institution", auth, validationMiddleware(updateInstitutionDto), updateInstitutionProfile);


export default router;
