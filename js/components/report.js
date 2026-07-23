// Clinical Report Generator and Print Module

export function generatePrintReport(profile) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to generate the clinical print report.");
    return;
  }

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const geneticRows = profile.geneticAnalysis.map(gene => `
    <tr>
      <td><strong>${gene.gene}</strong></td>
      <td><code>${gene.genotype}</code></td>
      <td>${gene.status}</td>
      <td>${gene.clinical}</td>
    </tr>
  `).join('');

  const avoidRows = profile.medications.avoid.map(med => `
    <tr class="danger-row">
      <td><strong>${med.name}</strong></td>
      <td>${med.classification}</td>
      <td>${med.reason}</td>
    </tr>
  `).join('');

  const recRows = profile.medications.recommended.map(med => `
    <tr class="success-row">
      <td><strong>${med.name}</strong></td>
      <td>${med.classification}</td>
      <td>${med.reason}</td>
    </tr>
  `).join('');

  const riskRows = profile.diseaseRisks.map(risk => `
    <tr>
      <td><strong>${risk.name}</strong></td>
      <td>${risk.risk}%</td>
      <td>${risk.confidence}%</td>
      <td><span class="badge badge-${risk.level}">${risk.level.toUpperCase()}</span></td>
    </tr>
  `).join('');

  const lifestyleRows = profile.lifestylePlan.map(plan => `
    <div class="lifestyle-item">
      <strong>${plan.category} - ${plan.title}:</strong> ${plan.desc}
    </div>
  `).join('');

  const preExistingStr = profile.preExistingConditions.join(', ');
  const medsStr = profile.currentMedications.join(', ');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Clinical Summary Report - ${profile.name}</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #111;
          background: #fff;
          line-height: 1.5;
          padding: 40px;
          font-size: 11pt;
        }
        .header {
          border-bottom: 3px double #333;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .logo-box h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .logo-box p {
          margin: 4px 0 0 0;
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .report-meta {
          text-align: right;
          font-size: 11px;
          color: #555;
        }
        .demographics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          background: #f5f5f7;
          padding: 18px;
          border-radius: 6px;
          margin-bottom: 30px;
          border: 1px solid #e5e5eb;
        }
        .demo-item {
          font-size: 12px;
        }
        .demo-item strong {
          color: #333;
        }
        h2 {
          font-size: 16px;
          border-bottom: 1px solid #333;
          padding-bottom: 6px;
          margin-top: 30px;
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th {
          background: #eaeaea;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          padding: 8px 10px;
          border: 1px solid #ccc;
        }
        td {
          padding: 10px;
          font-size: 11px;
          border: 1px solid #ccc;
          vertical-align: top;
        }
        .danger-row {
          background: #fff5f5;
        }
        .success-row {
          background: #f6fff9;
        }
        .badge {
          font-size: 9px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid;
          display: inline-block;
        }
        .badge-danger { color: #c53030; border-color: #feb2b2; background: #fff5f5; }
        .badge-warning { color: #dd6b20; border-color: #fbd38d; background: #fffaf0; }
        .badge-success { color: #22543d; border-color: #9ae6b4; background: #f0fff4; }
        
        .summary-box {
          background: #fafafa;
          border-left: 4px solid #4f46e5;
          padding: 16px;
          font-style: italic;
          margin-bottom: 30px;
          font-size: 12px;
        }
        .lifestyle-item {
          margin-bottom: 10px;
          font-size: 11px;
        }
        .signoff-section {
          margin-top: 60px;
          display: flex;
          justify-content: space-between;
          page-break-inside: avoid;
        }
        .signature-line {
          border-top: 1px solid #000;
          width: 220px;
          text-align: center;
          padding-top: 6px;
          font-size: 11px;
          margin-top: 40px;
        }
        @media print {
          body {
            padding: 0;
          }
          .demographics-grid {
            background: #f5f5f7 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .danger-row {
            background: #fff5f5 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .success-row {
            background: #f6fff9 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo-box">
          <h1>AEGIS CLINICAL GENOMICS</h1>
          <p>Precision Decision Support Platform Summary</p>
        </div>
        <div class="report-meta">
          <strong>Report Date:</strong> ${currentDate}<br>
          <strong>Status:</strong> FINAL REPORT
        </div>
      </div>

      <div class="demographics-grid">
        <div class="demo-item"><strong>Patient Name:</strong> ${profile.name}</div>
        <div class="demo-item"><strong>Age / Gender:</strong> ${profile.age} / ${profile.gender}</div>
        <div class="demo-item"><strong>BMI:</strong> ${profile.bmi} (${profile.weight} / ${profile.height})</div>
        <div class="demo-item"><strong>BP / Cholesterol:</strong> ${profile.bloodPressure} / ${profile.cholesterol}</div>
        <div class="demo-item"><strong>Smoking Status:</strong> ${profile.smokingStatus}</div>
        <div class="demo-item"><strong>Pre-existing Conditions:</strong> ${preExistingStr}</div>
        <div class="demo-item" style="grid-column: span 3; margin-top: 8px;"><strong>Current Medications:</strong> ${medsStr}</div>
      </div>

      <h2>AI Medical Summary</h2>
      <div class="summary-box">
        "${profile.aiSummary}"
      </div>

      <h2>Pharmacogenomics (PGx) Status & Variant Mapping</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 15%">Gene Locus</th>
            <th style="width: 15%">Genotype</th>
            <th style="width: 25%">Phenotype Classification</th>
            <th style="width: 45%">Clinical Implication & Guidance</th>
          </tr>
        </thead>
        <tbody>
          ${geneticRows}
        </tbody>
      </table>

      <h2>Critical Medication Advisories</h2>
      <h3>Contraindicated Medications (Avoid)</h3>
      <table>
        <thead>
          <tr>
            <th style="width: 25%">Medication</th>
            <th style="width: 20%">Classification</th>
            <th style="width: 55%">Contraindication Rationale</th>
          </tr>
        </thead>
        <tbody>
          ${avoidRows}
        </tbody>
      </table>

      <h3>Recommended Alternative / Indicated Therapeutics</h3>
      <table>
        <thead>
          <tr>
            <th style="width: 25%">Medication</th>
            <th style="width: 20%">Classification</th>
            <th style="width: 55%">Clinical Benefit Rationale</th>
          </tr>
        </thead>
        <tbody>
          ${recRows}
        </tbody>
      </table>

      <h2>Polygenic Disease Risk Assessment</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 40%">Disease Profile</th>
            <th style="width: 20%">Calculated Risk</th>
            <th style="width: 20%">Model Confidence</th>
            <th style="width: 20%">Risk Category</th>
          </tr>
        </thead>
        <tbody>
          ${riskRows}
        </tbody>
      </table>

      <h2>Lifestyle & Screening Recommendations</h2>
      <div style="margin-bottom: 30px;">
        ${lifestyleRows}
      </div>

      <div class="signoff-section">
        <div>
          <div class="signature-line">Attending Physician Signature</div>
        </div>
        <div>
          <div class="signature-line">Genetics Director Sign-off</div>
        </div>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
