// Custom SVG Charts & SHAP Visualizations

export function drawHealthScoreGauge(score) {
  // Determine color based on score
  let strokeColor = "var(--primary)";
  if (score >= 80) strokeColor = "var(--success)";
  else if (score >= 50) strokeColor = "var(--warning)";
  else strokeColor = "var(--danger)";

  const circumference = 2 * Math.PI * 50; // Radius = 50
  const offset = circumference - (circumference * score) / 100;

  return `
    <svg width="120" height="120" viewBox="0 0 120 120" style="display: block;">
      <!-- Background Circle -->
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        fill="none" 
        stroke="rgba(255,255,255,0.03)" 
        stroke-width="10"
      ></circle>
      <!-- Glowing active arc -->
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        fill="none" 
        stroke="${strokeColor}" 
        stroke-width="10" 
        stroke-dasharray="${circumference}" 
        stroke-dashoffset="${offset}" 
        stroke-linecap="round"
        transform="rotate(-90 60 60)"
        style="transition: stroke-dashoffset 1s ease-out; filter: drop-shadow(0 0 6px ${strokeColor}44);"
      ></circle>
    </svg>
  `;
}

export function drawShapChart(contributions = []) {
  if (!contributions || contributions.length === 0) {
    return `<p style="color: var(--text-muted); font-size: 0.85rem;">No SHAP explanation available for this metrics selection.</p>`;
  }

  // Find max absolute contribution for scaling
  const maxVal = Math.max(...contributions.map(c => Math.abs(c.value)), 1);

  return `
    <div class="shap-container">
      <div class="shap-legend">
        <div class="legend-item">
          <div class="legend-square positive"></div>
          <span>Increases Risk</span>
        </div>
        <div class="legend-item">
          <div class="legend-square negative"></div>
          <span>Reduces Risk</span>
        </div>
      </div>
      
      <div class="shap-chart-body">
        ${contributions.map(item => {
          const valAbs = Math.abs(item.value);
          const widthPct = Math.min((valAbs / maxVal) * 50, 50); // Max 50% on either side of center
          const isPositive = item.direction === "positive";
          
          let fillStyle = "";
          let valuePrefix = "";
          let colorClass = "";

          if (isPositive) {
            fillStyle = `left: 50%; width: ${widthPct}%;`;
            valuePrefix = "+";
            colorClass = "positive";
          } else {
            fillStyle = `right: 50%; width: ${widthPct}%;`;
            valuePrefix = "-";
            colorClass = "negative";
          }

          return `
            <div class="shap-bar-row">
              <div class="shap-feature-name" title="${item.feature}">${item.feature}</div>
              <div class="shap-visual-bar-container">
                <div class="shap-visual-bar-center"></div>
                <div class="shap-visual-bar-fill ${colorClass}" style="${fillStyle}"></div>
              </div>
              <div class="shap-value-text ${colorClass}">${valuePrefix}${valAbs}%</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
