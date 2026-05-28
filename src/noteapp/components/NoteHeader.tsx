interface NoteHeaderProps {
  title: string;
  description: string;
}

export const NoteHeader = ({ title, description }: NoteHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="font-display text-5xl tracking-tight">{title}</h1>
      <p className="mt-1 text-muted-foreground">{description}</p>
    </div>
  );
};
