import { Router } from 'express';
import { createInstitution, createResearcherUser, getInstitution, getUsers, loginInstitution, loginUser, resendOtp, updateInstitutionProfile, updateProfile, verifyEmail, verifyLoginPinInstitution, verifyLoginPinUser } from '../controllers/UserController';
import { auth } from '../middleware/auth';
import { CreateInstitutionDto, CreateResearcherDto, CreateUserByInstitutionDto, LoginDto, ResendOtpDto, UpdateUserDto, VerifyTokenDto, updateInstitutionDto } from '../dto/dto';
import { validationMiddleware } from '../middleware/expressDto';
import { hasRole } from '../middleware/authorize';



const router = Router();

//  router.use(authMiddleware);



//users routes

router.post('/researcher',  validationMiddleware(CreateResearcherDto), createResearcherUser);

router.post("/verify-email", validationMiddleware(VerifyTokenDto), verifyEmail);

router.get('/', auth, hasRole("User"), getUsers); 

router.post('/login/user', validationMiddleware(LoginDto), loginUser);

router.post("/verify-login/user", validationMiddleware(VerifyTokenDto), verifyLoginPinUser);

router.put("/", auth, hasRole("User"), validationMiddleware(UpdateUserDto), updateProfile);



// institutions routes

router.post("/institution", validationMiddleware(CreateInstitutionDto), createInstitution);

router.post("/resend-otp", validationMiddleware(ResendOtpDto), resendOtp);
 
router.get("/institution", auth, hasRole("Institution"),  getInstitution);

router.post('/login/institution', validationMiddleware(LoginDto), loginInstitution);

router.post("/verify-login/institution", validationMiddleware(VerifyTokenDto), verifyLoginPinInstitution);

router.put("/institution", auth, hasRole("Institution"), validationMiddleware(updateInstitutionDto), updateInstitutionProfile);


export default router;
