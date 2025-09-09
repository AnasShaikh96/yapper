import express from 'express'
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from '../controllers/notesController';


const router = express.Router();

router.get('/notes', getAllNotes)
router.post('/notes', createNote)
router.get('/notes/:id', getNoteById)
router.patch('/notes/:id', updateNoteById)
router.delete('/notes/:id', deleteNoteById)

export default router;