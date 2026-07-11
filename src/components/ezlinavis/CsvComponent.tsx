import {DownloadButton} from '@dracor/react';

interface Props {
  data?: string | null;
}

export default function CsvComponent({data = ''}: Props) {
  const uri = data
    ? 'data:text/csv;base64,' + btoa(unescape(encodeURIComponent(data)))
    : null;

  return (
    <div className="relative flex flex-1 flex-col border-l border-gray-500 p-2.5">
      {uri && <DownloadButton href={uri} name="ezlinavis.csv" type="csv" />}
      <div className="absolute inset-x-0 top-[30px] bottom-0 p-2.5">
        <pre className="m-0 h-full w-full overflow-scroll text-xs">{data}</pre>
      </div>
    </div>
  );
}
