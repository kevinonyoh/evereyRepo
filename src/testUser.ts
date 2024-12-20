import User from './models/User';
import bcrypt from 'bcryptjs'; 

async function testUser() {
    try {
        // Check if test user exists
        const existingUser = await User.findByPk('00000000-0000-0000-0000-000000000001');
        
        if (!existingUser) {
            // Create a test user
            await User.create({
                id: '00000000-0000-0000-0000-000000000001',
                username: 'evereyapp',
                firstName: 'Abiodun',
                lastName: 'Adekunle',
                email: 'evereyapp@gmail.com',
                password: await bcrypt.hash('testpassword', 10), 
                
            });
            console.log('Test user created successfully');
        }
    } catch (error) {
        console.error('Error creating test user:', error);
    }
}

testUser();