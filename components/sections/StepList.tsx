type Step = { title: string; body: string };

/** Numbered steps (A7): horizontal on lg+, vertical on mobile. */
export function StepList({ steps }: { steps: readonly Step[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4 lg:flex-col">
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-blue-600 font-semibold text-white"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="t-h3">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </h3>
            <p className="mt-2 text-ink-700">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
