export function Badge({ label }: { label: string }) {
  return (
    <div class="text-xs flex items-center bg-green-950 border border-green-400 text-green-400 py-0.5 px-2 rounded-full lowercase w-max">
      {label}
    </div>
  );
}
