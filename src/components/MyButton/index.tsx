export default function MyButton({ value }: { value: string }) {
  return (
    <button type="submit" className="btn">{value}</button>
  );
}
