'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/cn';

const TYPE_MS = 32;
const HOLD_MS = 1800;

/**
 * An "Ask MindX" box that types each question in turn, with the full list
 * below as the real content. The typing box is decorative; with reduced
 * motion it shows the first question.
 */
export function TypingPrompts({ questions }: { questions: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(questions[0]?.length ?? 0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let q = 0;
    let c = 0;
    let timer: number;
    const tick = () => {
      const text = questions[q];
      if (c < text.length) {
        c += 1;
        setIndex(q);
        setChars(c);
        timer = window.setTimeout(tick, TYPE_MS);
      } else {
        timer = window.setTimeout(() => {
          q = (q + 1) % questions.length;
          c = 0;
          setIndex(q);
          setChars(0);
          tick();
        }, HOLD_MS);
      }
    };
    setChars(0);
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [questions]);

  const typing = questions[index].slice(0, chars);

  return (
    <div>
      <div
        aria-hidden="true"
        className="flex items-center gap-3 rounded-[18px] border border-gray-200 bg-white p-3 pl-4 shadow-mock"
      >
        <Sparkles className="h-5 w-5 shrink-0 text-blue-600" />
        <span className="min-h-[26px] flex-1 text-body-m text-ink-950 md:text-body">
          {typing}
          <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-blue-600" />
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill bg-blue-600 text-white">
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {questions.map((question, i) => (
          <li
            key={question}
            className={cn(
              'rounded-btn border px-4 py-3 text-small transition-colors duration-300',
              i === index ? 'border-blue-600 bg-blue-50 text-ink-950' : 'border-gray-200 bg-white text-ink-700',
            )}
          >
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}
