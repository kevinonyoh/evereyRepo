import { NextFunction, Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import Article from '../models/Article';

// Helper to create a PDF document
const generatePDF = async (article: any, req: Request, res: Response, next: NextFunction) => {
    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${article.title}.pdf"`);

    pdfDoc.pipe(res);
    pdfDoc.fontSize(16).text(article.title, { underline: true, align: 'center' });
    pdfDoc.moveDown().fontSize(12).text(article.content, { align: 'left' });
    pdfDoc.end();
};

// Helper to create a Word document
const generateWord = async (article: any, req: Request, res: Response, next: NextFunction) => {
    const doc = new Document({
        sections: [{
            children: [
                new Paragraph({
                    children: [new TextRun({ text: article.title, bold: true, size: 32 })],
                }),
                new Paragraph({
                    children: [new TextRun({ text: article.content, size: 24 })],
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${article.title}.docx"`);
    res.send(buffer);
};

// Download Article as PDF or Word
export const downloadArticle = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const format = req.query.format as string; // 'pdf' or 'word'

    try {
        const article = await Article.findByPk(id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (format === 'pdf') {
            await generatePDF(article, req, res, next);
        } else if (format === 'word') {
            await generateWord(article, req, res, next);
        } else {
            res.status(400).json({ error: 'Invalid format specified. Choose either pdf or word.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
