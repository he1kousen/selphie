import Header from './Header';

const templateCards = [
  { id: 'simple-strip',  name: 'Simple Strip',   slotsLayout: [{ span: 'full' }, { span: 'full' }, { span: 'full' }], active: true  },
];

function SlotPreview({ layout, isDashed }) {
  const borderClass = isDashed ? 'border-dashed border-line' : 'border-line';
  const bgClass = isDashed ? 'bg-surface-container-low' : 'bg-surface-container-low';

  // Render slots based on layout
  const hasHalf = layout.some(s => s.span === 'half');

  if (hasHalf) {
    // 2x2 grid
    return (
      <div className="grid grid-cols-2 gap-2">
        {layout.map((_, i) => (
          <div key={i} className={`aspect-[3/4] ${bgClass} border ${borderClass}`} />
        ))}
      </div>
    );
  }

  // Vertical stack
  return (
    <div className="flex flex-col gap-2">
      {layout.map((_, i) => (
        <div key={i} className={`w-full aspect-[3/4] ${bgClass} border ${borderClass}`} />
      ))}
    </div>
  );
}

function TemplateCard({ template, isSelected }) {
  if (template.active) {
    return (
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`relative bg-surface p-4 md:p-6 transition-all duration-500 ease-smooth w-[110px] md:w-[160px] ${
            isSelected
              ? 'border-2 border-accent shadow-[0_8px_30px_-8px_rgba(182,114,78,0.12)]'
              : 'border border-line hover:border-accent/40'
          }`}
        >
          {/* Check badge */}
          {isSelected && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10 shadow-md">
              <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                check
              </span>
            </div>
          )}

          <SlotPreview layout={template.slotsLayout} isDashed={false} />
        </div>

        {/* Label */}
        <p className={`mt-6 font-body text-label-caps uppercase tracking-eyebrow transition-colors text-accent`}>
          {template.name}
        </p>
        {isSelected && (
          <p className="font-body text-[11px] text-muted uppercase tracking-eyebrow mt-1">
            {template.slotsLayout.length} Photos
          </p>
        )}
      </div>
    );
  }

  // Inactive / Coming Soon
  return (
    <div className="flex flex-col items-center opacity-40 shrink-0">
      <div className="relative bg-surface border border-dashed border-line p-4 md:p-6 w-[160px] md:w-[220px]">
        {/* Coming Soon badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="font-body text-[9px] md:text-[10px] uppercase tracking-eyebrow text-surface bg-muted/90 px-2.5 py-1 whitespace-nowrap rounded-sm">
            Coming Soon
          </span>
        </div>

        <SlotPreview layout={template.slotsLayout} isDashed={true} />
      </div>

      <p className="mt-6 font-body text-label-caps uppercase tracking-eyebrow text-muted">
        {template.name}
      </p>
    </div>
  );
}

export default function TemplatePickerView({ onNext, onBack }) {
  return (
    <div className="bg-bg text-ink min-h-screen flex flex-col font-body overflow-x-hidden">
      {/* Header — with step indicator */}
      <Header onBack={onBack} stepText="Langkah 1 dari 3" />

      <main className="flex-grow flex flex-col items-center justify-start px-margin-mobile md:px-margin-desktop pt-8 md:pt-10">
        {/* Heading Section */}
        <div className="text-center mb-12 md:mb-16 w-full">
          <h1 className="font-display text-headline-md md:text-headline-lg text-ink mb-3 leading-tight">
            Pilih Template
          </h1>
          <p className="font-body text-body-md text-muted mb-4">
            Editorial layout untuk sesi foto Anda.
          </p>
        </div>

        {/* Template Gallery */}
        <div className="flex gap-8 items-end justify-center pb-12 max-w-4xl w-full flex-1">
          {templateCards.map(t => (
            <TemplateCard key={t.id} template={t} isSelected={t.active} />
          ))}
        </div>

        {/* Action Button — below selected card */}
        <div className="pb-12">
          <button
            onClick={onNext}
            className="bg-accent text-white px-14 py-4 rounded font-body text-label-caps uppercase tracking-eyebrow btn-hover-smooth hover:opacity-90 active:scale-95 inline-flex items-center gap-2"
          >
            <span>Lanjutkan</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </main>
    </div>
  );
}
