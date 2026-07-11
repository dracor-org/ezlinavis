interface Props {
  data?: string | null;
}

export default function CsvComponent({data = ''}: Props) {
  const uri = data
    ? 'data:text/csv;base64,' + btoa(unescape(encodeURIComponent(data)))
    : null;

  return (
    <div className="csv-component">
      {uri && (
        <a href={uri} download="ezlinavis.csv">
          download CSV
        </a>
      )}
      <div>
        <pre>{data}</pre>
      </div>
    </div>
  );
}
