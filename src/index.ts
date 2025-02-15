import express from 'express';
import  sequelize  from './db';
import bodyParser from 'body-parser';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes';
import commentRoutes from './routes/commentRoutes'; 
import UsersRoutes from './routes/UsersRoutes';
import adminRoutes from './routes/adminRoutes';
import './utils/emailProcessor';

require('dotenv').config();

const app = express();
// app.use(json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Use CORS middleware
 app.use(cors(corsOptions));

app.use('/v1/api/user', UsersRoutes);

// Article routes
app.use('/v1/api/article', articleRoutes);

// Comment routes
app.use('/v1/api/comment', commentRoutes);

app.use('/v1/api/admin', adminRoutes);


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

