import { Dispatch, SetStateAction } from "react";

type Props = {
  checklistItems: string[];
  setChecklistItems: Dispatch<SetStateAction<string[]>>;
}

export default function Todos({ checklistItems, setChecklistItems }: Props) {
  function handleAddChecklist() {
    setChecklistItems(prevItems => [...prevItems, `Checklist ${prevItems.length + 1}`]);
  }

  function handleRemoveChecklist(index: number) {
    setChecklistItems(prevItems => prevItems.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col text-start text-white mt-4">
      {checklistItems.map((_item, index) => (
        <div key={index} className="flex flex-col">
          <label className="mb-1 font-bold">Checklist {index + 1}</label>
          <input
            required
            className="bg-black-700 rounded w-72 h-9 p-2" 
            type="text"
            name={`checklistItem${index}`}
            onChange={(e) => {
              const updatedChecklist = [...checklistItems];
              updatedChecklist[index] = e.target.value;
              setChecklistItems(updatedChecklist);
            }}
          />
          <button
            type="button"
            onClick={() => handleRemoveChecklist(index)} 
            className="text-red-500 mt-2"
          >
            remover checklist {index + 1}
          </button>
        </div>
      ))}
      <button onClick={handleAddChecklist} className="text-green mt-4">Adicionar mais</button>
    </div>
  )
}
