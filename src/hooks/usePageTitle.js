import { useEffect } from 'react';

export const usePageTitle = (title) => {
  useEffect(() => {
    const prev = document.title;
    document.title = title
      ? `${title} | Find Your Door`
      : 'Find Your Door | Life & Mindset Coaching for Men | Terry Loughran';

    return () => {
      document.title = prev;
    };
  }, [title]);
};
