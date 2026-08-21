import {DownloadButton} from '@dracor/react';

interface Props {
  data?: string | null;
}

export default function CsvComponent({data = ''}: Props) {
  const uri = data
    ? 'data:text/csv;base64,' + btoa(unescape(encodeURIComponent(data)))
    : null;

  return (
    <div className="flex min-w-0 flex-1 flex-col border-l border-gray-500 p-2.5">
      {uri && (
        <div className="mb-2 [&_svg]:w-8" title="Download CSV">
          <DownloadButton href={uri} name="ezlinavis.csv" type="csv" />
        </div>
      )}
      <pre className="m-0 min-h-0 flex-1 overflow-auto text-xs">{data}</pre>
    </div>
  );
}
