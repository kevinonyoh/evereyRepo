import 'reflect-metadata';
import express from 'express';
import  sequelize  from './db';
import { json } from 'body-parser';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes';
import commentRoutes from './routes/commentRoutes'; 
import fileRoutes from './routes/fileRoutes';
import downloadRoutes from './routes/downloadRoutes';
import stepRoutes from './routes/stepFlowRoutes';
import userRoutes from './routes/UsersRoutes';

require('dotenv').config()

const app = express();
app.use(json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use('/api', userRoutes);

// Article routes
app.use('/api', articleRoutes);

// Comment routes
app.use('/api', commentRoutes);

// step flow Route
app.use('/api', stepRoutes);

// File routes
app.use('/api/files', fileRoutes)

// article downloads
app.use('/api/articles', downloadRoutes); 


app.get('/', (req, res) => {
    res.send('Server setup correctly!');
});

 sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');

    // Start the server after the database is synced
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
   console.error('Unable to sync database:', err);
});

