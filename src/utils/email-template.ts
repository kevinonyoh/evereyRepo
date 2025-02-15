import { emailTransporter } from "./notification";



export const emailNotification = async (email: string, message: string, subject: string ) => {

    const mailOptions = {
        from: `${process.env.MAIL_FROM}`,
        to: email,
        subject,
        text:  message,
      };

     await emailTransporter(mailOptions);
}


export const REGISTRATION = {
    type: "REGISTRATION",
    
    subject: "Welcome to Everey AAP – Empowering Research Excellence!",

    body: (firstName: String, token: string) => {
        return `Dear ${firstName},
       Welcome to Everey AAP, where we’re dedicated to amplifying the voices of African researchers! 🚀
       
       
       By joining Everey AAP, you gain access to a powerful network of scholars, cutting-edge research tools, and an inclusive academic community dedicated to driving research excellence across Africa.
       
       Start your journey towards impactful research by completing your registration.
       
       🔹 Next Step: Verify your email to access your account. verify using the token below:
       👉 ${token}
       
       If you have any questions, feel free to reach out to us at support@useeverey.com
       
       Together, let's shape the future of academic research in Africa!
       
       Warm regards,
        The Everey AAP Team
        Empowering Research Excellence`
    }
}


export const EMAIL_VERIFICATION = {
    type: "EMAIL_VERIFICATION",
    
    subject: "Verify Your Email to Join Our Research Community!",

    body: (firstName: String) => {
        return `Dear ${firstName},
        Confirm your email to unlock access to Everey AAP's powerful tools and resources designed to advance African research.
        You’re just one step away from accessing Everey AAP’s powerful academic tools and community!
        Click below to confirm your email and start your research journey:
        👉 [Verify My Email]
        
        By verifying your email, you will:
        ✅ Gain access to a vast database of African research
        ✅ Submit and publish your theses and articles effortlessly
        ✅ Connect with scholars and researchers across institutions
        ✅ Explore funding opportunities for your academic work
        Your contribution can transform academic research in Africa. Join us!
        
        Best,
         The Everey AAP Team
         Empowering Research Excellence
        `
    }
}

export const LOGIN_VERIFICATION = {
    type: "LOGIN_VERIFICATION",
    
    subject: "Your Everey AAP Login Code – Access Research Excellence",

    body: (firstName: String, otp:String) => {
        return `Dear ${firstName},
        Your Everey AAP login code is:
        🔢 ${otp}
        This code is valid for 10 minutes. If you didn’t request this, please ignore this email.
        Need assistance? 
        Reach us at support@useeverey.com

        Best,
         The Everey AAP Team
         Empowering Research Excellence
        
        `
    }
}

export const LOGIN_CONFIRMATION = {
  
  type: "LOGIN_CONFIRMATION",

  subject: "Welcome Back to Everey AAP – Let’s Drive Innovation!",

  body: (firstName: String) => {
    return `Dear ${firstName},
   
    You’ve successfully logged into Everey AAP. 🌍
    Here’s what you can do now:
    
    🔹 Explore Cutting-Edge Research: Browse thousands of theses and articles from top African scholars.
    🔹 Submit Your Work: Publish your research and gain academic recognition.
    🔹 Connect & Collaborate: Network with like-minded researchers and expand your academic reach.
    Click below to explore your dashboard:
    Begin your journey: [Go to Dashboard]

    Warm regards,
     The Everey AAP Team
     Empowering Research Excellence
    `
}  

}

export const WELCOME_GUIDE = {
    type: "WELCOME_GUIDE",

    subject: "Welcome to Everey AAP – Transform Your Research Today!",


    body: (firstName: String) => {
        return `Dear ${firstName},
       
            Welcome to the Everey AAP community! 
            We're excited to have you join Everey AAP! Here’s how to get started:
            Complete Your Profile: Enhance your research visibility
            Submit Your First Article: Share your knowledge with the world
            Connect with Researchers: Collaborate and innovate

            Let's get started! [Complete My Profile]

            We’re here to support you every step of the way!

            Warm regards,
            The Everey AAP Team
            Empowering Research Excellence
        `
    }  

}


export const PROFILE_COMPLETION_REMINDER = {
   
    type: "PROFILE_COMPLETION_REMINDER",

    subject: "Complete Your Profile to Unlock Full Benefits!",


    body: (firstName: String) => {
        return `Dear ${firstName},
       
        Ready to supercharge your research journey?

        By completing your Everey AAP profile, you'll unlock:
        Personalized Research Recommendations: Discover groundbreaking studies tailored to your interests.
        Powerful Connections: Network with fellow scholars and build meaningful collaborations.
        Enhanced Visibility: Showcase your work and gain recognition within the academic community.
        Take a few minutes to complete your profile now: [Complete My Profile]
        
        Warm regards,
         The Everey AAP Team
         Empowering Research Excellence
        
        `
    }  

}


export const THESIS_SUBMISSION_PROMPT = {
    
    type: "THESIS_SUBMISSION_PROMPT",

    subject: "Ready to Publish? Share Your Research with Africa!",


    body: (firstName: String) => {
        return `Dear ${firstName},

        Your work deserves recognition. Submit your first article on Everey AAP and contribute to Africa’s academic growth.
        👉 [Submit My First Research]
        Every submission brings us closer to revolutionizing research in Africa!
       
        Best,
         The Everey AAP Team
         Empowering Research Excellence
        
        `
    }  

}


export const SUBMISSION_CONFIRMATION = {
   
    type: "SUBMISSION_CONFIRMATION",

    subject: "Your Research Submission is Under Review",

    body: (firstName: String, id: string) => {
        return `Dear ${firstName},

        Thank you for submitting your research! Our reviewers are evaluating your work to ensure it meets the highest academic standards.
        📅 Review Time: Approximately 7 days
         📌 Submission ID: ${id}
        Track your submission here: [View My Submission]
      
        Warm regards,
         The Everey AAP Team
         Empowering Research Excellence
        
        
        `
    }  

}



export const PUBLICATION_NOTIFICATION = {
    
    type: "PUBLICATION_NOTIFICATION",

    subject: "Your Research is Now Published!",

    body: (firstName: String) => {
        return `Dear ${firstName},

        Congratulations! Your research is now live on Everey AAP. 🌟
        🔗 Read & Share: [Link to Article]
        Together, let’s amplify African research globally!

        Warm regards,
         The Everey AAP Team
         Empowering Research Excellence
        
        `
    }  



}