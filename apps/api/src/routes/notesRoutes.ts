import express from 'express'
import { createNote, deleteNoteById, getAllNotes, getNoteById, updateNoteById } from '../controllers/notesController';
import { validateBody, validateParams } from '../utils/validate';
import { newNotesSchema, userByIdSchema } from '../schema/user';

const router = express.Router();

router.get('/notes', getAllNotes)
router.post('/notes', validateBody(newNotesSchema), createNote)
router.get('/notes/:id', validateParams(userByIdSchema), getNoteById)
router.patch('/notes/:id', updateNoteById)
router.delete('/notes/:id', deleteNoteById)

export default router;