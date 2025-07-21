// @/shared/components/organisms/NotesWidget.tsx
import { useState, useEffect, useRef } from "react";
import { Icon } from "@/shared/components/atoms/Icon";

export const NotesWidget = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const notesEndRef = useRef<HTMLDivElement>(null);

  // Carrega notas do localStorage ao iniciar
  useEffect(() => {
    const savedNotes = localStorage.getItem("codehabits-notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Salva notas no localStorage quando elas mudam
  useEffect(() => {
    localStorage.setItem("codehabits-notes", JSON.stringify(notes));
  }, [notes]);

  const scrollToBottom = () => {
    notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [notes]);

  const handleAddNote = () => {
    if (currentNote.trim()) {
      if (isEditing !== null) {
        // Editar nota existente
        const updatedNotes = [...notes];
        updatedNotes[isEditing] = currentNote;
        setNotes(updatedNotes);
        setIsEditing(null);
      } else {
        // Adicionar nova nota
        setNotes([...notes, currentNote]);
      }
      setCurrentNote("");
    }
  };

  const handleEditNote = (index: number) => {
    setCurrentNote(notes[index]);
    setIsEditing(index);
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (isEditing === index) {
      setIsEditing(null);
      setCurrentNote("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  return (
    <div className="bg-gray-900 mx-auto rounded-xl border border-blue-400/30 shadow-lg shadow-blue-500/20 w-full max-w-xs h-full flex flex-col">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between bg-gray-800/50 px-4 py-3 rounded-t-xl border-b border-blue-400/20">
        <div className="flex items-center gap-2">
          <Icon name="Notebook" className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Minhas Anotações
          </span>
        </div>
        <span className="text-xs text-gray-400">{notes.length} item(s)</span>
      </div>

      {/* Lista de Anotações */}
      <div className="flex-1 p-3 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Icon name="FileText" className="w-8 h-8 mb-2" />
            <p className="text-center">Nenhuma anotação ainda</p>
            <p className="text-xs text-center mt-1">
              Adicione suas ideias e lembretes
            </p>
          </div>
        ) : (
          notes.map((note, index) => (
            <div
              key={index}
              className="group relative mb-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-400/30 transition-colors"
            >
              <p className="text-gray-200 text-sm whitespace-pre-wrap">
                {note}
              </p>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => handleEditNote(index)}
                  className="p-1 text-blue-400 hover:text-blue-300"
                  title="Editar"
                >
                  <Icon name="Edit" className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteNote(index)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Excluir"
                >
                  <Icon name="Trash" className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
        <div ref={notesEndRef} />
      </div>

      {/* Área de entrada */}
      <div className="px-3 pb-3 pt-1 border-t border-gray-800">
        <div className="relative">
          <textarea
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isEditing !== null ? "Editar anotação..." : "Nova anotação..."
            }
            className="w-full bg-gray-800 border border-gray-700 focus:border-blue-500 rounded-lg px-3 py-2 text-gray-200 text-sm focus:outline-none resize-none"
            rows={3}
          />
          <button
            onClick={handleAddNote}
            disabled={!currentNote.trim()}
            className={`absolute bottom-3 right-3 p-1 rounded ${currentNote.trim() ? "text-blue-400 hover:text-blue-300" : "text-gray-500"}`}
            title={isEditing !== null ? "Atualizar" : "Adicionar"}
          >
            <Icon
              name={isEditing !== null ? "Save" : "Plus"}
              className="w-4 h-4"
            />
          </button>
        </div>
        {isEditing !== null && (
          <button
            onClick={() => {
              setIsEditing(null);
              setCurrentNote("");
            }}
            className="mt-1 text-xs text-gray-400 hover:text-gray-300"
          >
            Cancelar edição
          </button>
        )}
      </div>
    </div>
  );
};
