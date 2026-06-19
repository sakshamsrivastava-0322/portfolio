/* ==========================================================================
   VERCEL SPEED INSIGHTS INTEGRATION
   Tracks web vitals and performance metrics
   ========================================================================== */

// Initialize Speed Insights queue
(function initSpeedInsights() {
  if (window.si) return;
  
  // Create the Speed Insights queue function
  window.si = function() {
    (window.siq = window.siq || []).push(arguments);
  };
})();

// Load the Speed Insights script
(function loadSpeedInsights() {
  // Only track in production (when deployed on Vercel)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1';
  
  if (!isProduction) {
    console.log('[Speed Insights] Skipping in development mode');
    return;
  }
  
  // Create script element
  const script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Add error handler
  script.onerror = function() {
    console.warn('[Speed Insights] Failed to load script');
  };
  
  // Append to document head
  document.head.appendChild(script);
})();
