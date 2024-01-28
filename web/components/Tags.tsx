import { Dispatch, SetStateAction } from "react";

type Props = {
  tagsList: string[];
  setTagsList: Dispatch<SetStateAction<string[]>>;
}

export default function Tags({ tagsList, setTagsList }: Props) {
  function handleAddTag() {
    setTagsList(prevItems => [...prevItems, `Tag ${prevItems.length + 1}`]);
  }

  function handleRemoveTag(index: number) {
    setTagsList(prevItems => prevItems.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col text-start text-white mt-4">
      {tagsList.map((_item, index) => (
        <div key={index} className="flex flex-col">
          <label className="mb-1 font-bold">Tag {index + 1}</label>
          <input
            required
            className="bg-black-700 rounded w-72 h-9 p-2" 
            type="text"
            name={`tagItem${index}`}
            onChange={(e) => {
              const updatedTagList = [...tagsList];
              updatedTagList[index] = e.target.value;
              setTagsList(updatedTagList);
            }}
          />
          <button
            type="button"
            onClick={() => handleRemoveTag(index)} 
            className="text-red-500 mt-2"
          >
            remover tag {index + 1}
          </button>
        </div>
      ))}
      <button onClick={handleAddTag} className="text-green mt-4">Adicionar mais</button>
    </div>
  )
}
