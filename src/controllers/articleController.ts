import { NextFunction, Request, Response } from 'express';
import Article from '../models/Article';

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    const userId = req.user?.id; // Test UUID
    
    try {
        const article = await Article.create({
            title,
            content,
            userId: userId
        });
        
        res.status(201).json(article);
    } catch (error) {
        console.error('Create Article Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : error 
        });
    }
};

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.user?.id;
    
    try {
        const articles = await Article.findAll({});
        res.status(200).json(articles);
    } catch (error) {
        console.error('Get Articles Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : error 
        });
    }
};

export const getArticle = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
     const userId = req.user?.id;
    
    try {
        const article = await Article.findOne({ 
            where: { 
                id: id
            } 
        });
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        
        res.status(200).json(article);
    } catch (error) {
        console.error('Get Article Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : error 
        });
    }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.user?.id;

    try {
        const article = await Article.findOne({ 
            where: { 
                id: id, 
                userId: userId 
            } 
        });
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        
        article.title = title || article.title;
        article.content = content || article.content;
        await article.save();
        
        res.status(200).json(article);
    } catch (error) {
        console.error('Update Article Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : error 
        });
    }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        const article = await Article.findOne({ 
            where: { 
                id: id, 
                userId: userId 
            } 
        });
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        
        await article.destroy();
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Delete Article Error:', error);
        res.status(500).json({ 
            error: 'Internal Server Error', 
            details: error instanceof Error ? error.message : error 
        });
    }
};