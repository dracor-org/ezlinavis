import DebounceInput from 'react-debounce-input';

interface Props {
  text?: string;
  isValid?: boolean;
  onListChange: (text: string) => void;
}

export default function ListInputComponent({
  text = '',
  isValid = false,
  onListChange,
}: Props) {
  const className = text === '' ? '' : isValid ? 'valid' : 'invalid';

  return (
    <div className="listinput-component">
      <div className={className}>
        <DebounceInput
          element="textarea"
          placeholder="Enter list of characters or choose one from examples"
          debounceTimeout={500}
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onListChange(e.target.value)
          }
        />
      </div>
    </div>
  );
}
