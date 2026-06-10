import Header from './Header';

const templateCards = [
  { id: 'portrait',      name: 'Portrait',      slotsLayout: [{ span: 'full' }],                          active: false },
  { id: 'simple-strip',  name: 'Simple Strip',   slotsLayout: [{ span: 'full' }, { span: 'full' }, { span: 'full' }], active: true  },
  { id: 'classic-four',  name: 'Classic Four',   slotsLayout: [{ span: 'half' }, { span: 'half' }, { span: 'half' }, { span: 'half' }], active: false },
  { id: 'split-duo',     name: 'Split Duo',      slotsLayout: [{ span: 'full' }, { span: 'full' }],        active: false },
];

function SlotPreview({ layout, isDashed }) {
  const borderClass = isDashed ? 'border-dashed border-line' : 'border-line';
  const bgClass = isDashed ? 'bg-surface-container-low' : 'bg-surface-container-low';

  // Render slots based on layout
  const hasHalf = layout.some(s => s.span === 'half');

  if (hasHalf) {
    // 2x2 grid
    return (
      <div className="grid grid-cols-2 gap-1.5">
        {layout.map((_, i) => (
          <div key={i} className={`aspect-[3/4] ${bgClass} border ${borderClass}`} />
        ))}
      </div>
    );
  }

  // Vertical stack
  return (
    <div className="flex flex-col gap-1.5">
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
          className={`relative bg-surface p-3 md:p-4 transition-all duration-500 ease-smooth w-[140px] md:w-[170px] ${
            isSelected
              ? 'border-2 border-accent shadow-[0_8px_30px_-8px_rgba(182,114,78,0.12)] scale-[1.05] z-10'
              : 'border border-line hover:border-accent/40'
          }`}
        >
          {/* Check badge */}
          {isSelected && (
            <div className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-accent rounded-full flex items-center justify-center z-10 shadow-sm">
              <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                check
              </span>
            </div>
          )}

          <SlotPreview layout={template.slotsLayout} isDashed={false} />
        </div>

        {/* Label */}
        <p className={`mt-3 font-body text-label-caps uppercase tracking-eyebrow transition-colors ${isSelected ? 'text-accent' : 'text-muted'}`}>
          {template.name}
        </p>
        {isSelected && (
          <p className="font-body text-[10px] text-muted uppercase tracking-eyebrow mt-0.5">
            {template.slotsLayout.length} Photos
          </p>
        )}
      </div>
    );
  }

  // Inactive / Coming Soon
  return (
    <div className="flex flex-col items-center opacity-40 shrink-0">
      <div className="relative bg-surface border border-dashed border-line p-3 md:p-4 w-[140px] md:w-[170px]">
        {/* Coming Soon badge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <span className="font-body text-[9px] md:text-[10px] uppercase tracking-eyebrow text-surface bg-muted/90 px-2.5 py-1 whitespace-nowrap rounded-sm">
            Coming Soon
          </span>
        </div>

        <SlotPreview layout={template.slotsLayout} isDashed={true} />
      </div>

      <p className="mt-3 font-body text-label-caps uppercase tracking-eyebrow text-muted">
        {template.name}
      </p>
    </div>
  );
}

export default function TemplatePickerView({ onNext, onBack }) {
  return (
    <div className="bg-bg text-ink min-h-screen flex flex-col font-body overflow-x-hidden">
      {/* Header — no step text here since it's shown in body */}
      <Header onBack={onBack} />

      <main className="flex-grow flex flex-col items-center px-margin-mobile md:px-margin-desktop">
        {/* Wordmark repeat (as in reference — wordmark appears below header) */}
        <div className="pt-12 md:pt-20 pb-8 md:pb-12">
          <span className="font-display text-headline-lg-mobile text-ink italic tracking-tight select-none">
            Selphie
          </span>
        </div>

        {/* Heading Section */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="font-display text-headline-lg-mobile md:text-headline-lg text-ink mb-3 leading-tight">
            Pilih Template
          </h1>
          <p className="font-body text-body-md text-muted mb-4">
            Select an editorial layout for your session.
          </p>
          <p className="font-body text-label-caps text-accent uppercase tracking-eyebrow">
            Langkah 1 dari 3
          </p>
        </div>

        {/* Template Gallery */}
        <div className="flex gap-5 md:gap-8 items-end justify-center pb-6 max-w-4xl w-full overflow-x-auto">
          {templateCards.map(t => (
            <TemplateCard key={t.id} template={t} isSelected={t.active} />
          ))}
        </div>

        {/* Action Button — below selected card */}
        <div className="mt-8 mb-16">
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
