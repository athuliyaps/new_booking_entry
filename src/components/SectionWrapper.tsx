interface SectionWrapperProps {
  title: string;
  children: any;
}

export function SectionWrapper({ title, children }: SectionWrapperProps) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-4 mb-3">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-1">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
