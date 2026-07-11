interface Props {
  text: string;
  isValid?: boolean;
  onListChange: (text: string) => void;
}

export default function ListInputComponent({
  text,
  isValid,
  onListChange,
}: Props) {
  const borderColor =
    text === ''
      ? 'border-gray-300'
      : isValid
        ? 'border-green-400'
        : 'border-red-400';

  return (
    <div className="relative flex-1">
      <div className={`absolute inset-0 border-l-8 ${borderColor}`}>
        <textarea
          className="h-full w-full resize-none border-none p-2.5 outline-none"
          placeholder="Enter list of characters or choose one from examples"
          value={text}
          onChange={(e) => onListChange(e.target.value)}
        />
      </div>
    </div>
  );
}
