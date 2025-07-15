// This script tracks user behavior on the website for analytics purposes.
// It captures:
//   - A unique session ID for each visit
//   - The page URL the user is on
//   - Scroll depth
//   - Time spent on the page
//   - Click events on elements with the 'data-track' attribute
//
// When a user clicks on a tracked element, a payload is sent to the backend API (`/api/analytics`)
// including the interaction details like timestamp, session ID, clicked target, scroll position, and duration.
// The script is self-contained, does not use external libraries, and is designed to be lightweight.

(function () {
  const sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const page = window.location.pathname;
  const backendURL = 'http://localhost:3003/api/analytics';

  let scrollDepth = 0;
  let startTime = Date.now();

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY + window.innerHeight;
    if (scrolled > scrollDepth) scrollDepth = scrolled;
  });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-track]');
    if (target) {
      const duration = (Date.now() - startTime) / 1000;
      const payload = {
        type: 'click',
        page,
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        click_target: target.getAttribute('data-track') || target.tagName,
        scroll_depth: Math.round(scrollDepth),
        page_duration: duration
      };
      fetch(backendURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  });
})();
