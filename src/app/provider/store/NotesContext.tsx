import React, { createContext, useContext, useState } from 'react';

export interface Note {
    id: number;
    title: string;
    body: string;
}

interface NotesContextType {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    activeNote: Note | null;
    setActiveNoteId: (id: number | null) => void;
    createNote: () => void;
    updateNote: (id: number, updatedFields: Partial<Note>) => void;
    deleteNote: (id: number) => void
    showDeleteAlert: boolean
    setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>
    toDeleteItemId: number
    setToDeleteItemId: React.Dispatch<React.SetStateAction<number>>
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
    const [toDeleteItemId, setToDeleteItemId] = useState<number>(0)

    const activeNote = activeNoteId
        ? notes.find((note) => note.id === activeNoteId) || null
        : null;

    const createNote = () => {
        const newNote: Note = {
            id: notes.length ? notes[notes.length - 1].id + 1 : 1,
            title: '',
            body: '',
        };
        setNotes((prev) => [...prev, newNote]);
        setActiveNoteId(newNote.id);
    };

    const updateNote = (id: number, updatedFields: Partial<Note>) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === id ? { ...note, ...updatedFields } : note
            )
        );
    };


    const deleteNote = (id:number) => {
        return setNotes(notes.filter(note => note.id !== id ))
    }

    return (
        <NotesContext.Provider
            value={{
                notes,
                setNotes,
                activeNote,
                setActiveNoteId,
                createNote,
                updateNote,
                deleteNote,
                showDeleteAlert,
                setShowDeleteAlert,
                toDeleteItemId,
                setToDeleteItemId
            }}
        >
            {children}
        </NotesContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotesContext = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error('useNotesContext must be used within a NotesProvider');
    }
    return context;
};
