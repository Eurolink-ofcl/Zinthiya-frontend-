import { DonationRecord, DonorUser } from "./api";

function escapePdfText(str: string): string {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/£/g, "\\243")
    .replace(/•/g, "-")
    .replace(/✓/g, "[OK]");
}

export function generateReceiptPdfBlob(donation: any, donor?: DonorUser | null): { blob: Blob; filename: string } {
  const ref = donation.reference || (donation.id ? `ZT-${donation.id.substring(0, 8).toUpperCase()}` : "ZT-DONATION");
  const filename = `Zinthiya_Trust_Receipt_${ref}.pdf`;

  const amountNum = Number(donation.amount) || 0;
  const giftAidAmount = donation.giftAid ? (amountNum * 0.25).toFixed(2) : "0.00";
  const totalImpact = donation.giftAid ? (amountNum * 1.25).toFixed(2) : amountNum.toFixed(2);

  const donorName = donation.donorName || donor?.fullName || donation.user?.fullName || "Valued Supporter";
  const donorEmail = donation.donorEmail || donor?.email || donation.user?.email || "supporter@zinthiyatrust.org";
  const donorAddress = [
    donor?.address,
    donor?.townCity,
    donor?.postcode
  ].filter(Boolean).join(", ") || "Leicester, United Kingdom";

  const rawDate = donation.createdAt || new Date().toISOString();
  const dateFormatted = new Date(rawDate).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const campaignTitle = donation.campaign?.title || donation.campaignTitle || "The Zinthiya Trust General Relief";
  const paymentMethod = donation.paymentMethod || "Credit/Debit Card";
  const isRecurring = donation.type === "RECURRING";
  const freqLabel = isRecurring ? "Monthly Recurring Support" : "One-Time Donation";
  const statusLabel = (donation.status || "COMPLETED").toUpperCase();

  // PDF Page Size: A4 = 595.28 x 841.89 points
  // Construct standard PDF graphic & text operators
  const ops: string[] = [
    // Header Organization Name
    "BT",
    "/F2 20 Tf",
    "0.902 0.071 0.494 rg", // Magenta #E6127E
    "50 782 Td",
    `(${escapePdfText("THE ZINTHIYA TRUST")}) Tj`,
    "ET",

    // Organization Subheader
    "BT",
    "/F1 9 Tf",
    "0.36 0.28 0.35 rg", // Slate
    "50 766 Td",
    `(${escapePdfText("Registered Charity No. 1137350 (England & Wales)  |  Official Charitable Giving Record")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.45 0.38 0.44 rg",
    "50 752 Td",
    `(${escapePdfText("Head Office: 12 New Walk, Leicester LE1 6TF  |  Tel: 0116 254 5168  |  info@zinthiyatrust.org")}) Tj`,
    "ET",

    // Magenta top divider bar
    "0.902 0.071 0.494 RG",
    "2 w",
    "50 740 m 545 740 l S",

    // RECEIPT REFERENCE & STATUS BOX
    "0.99 0.96 0.98 rg", // light pink fill
    "0.902 0.071 0.494 RG",
    "1 w",
    "50 668 495 56 re B",

    "BT",
    "/F1 9 Tf",
    "0.72 0.05 0.39 rg",
    "66 706 Td",
    `(${escapePdfText("RECEIPT REFERENCE")}) Tj`,
    "ET",
    "BT",
    "/F2 13 Tf",
    "0.902 0.071 0.494 rg",
    "66 688 Td",
    `(${escapePdfText(ref)}) Tj`,
    "ET",

    "BT",
    "/F1 9 Tf",
    "0.2 0.5 0.2 rg",
    "420 706 Td",
    `(${escapePdfText("PAYMENT STATUS")}) Tj`,
    "ET",
    "BT",
    "/F2 12 Tf",
    "0.05 0.6 0.35 rg", // Green
    "420 688 Td",
    `(${escapePdfText("[OK] " + statusLabel)}) Tj`,
    "ET",

    // DONOR & METADATA 2-COLUMN BOX
    "0.98 0.98 0.99 rg",
    "0.85 0.85 0.88 RG",
    "0.75 w",
    "50 580 240 76 re B", // Left box (Donor)
    "305 580 240 76 re B", // Right box (Payment)

    // Donor Details Text
    "BT",
    "/F1 8 Tf",
    "0.55 0.45 0.54 rg",
    "62 642 Td",
    `(${escapePdfText("DONOR DETAILS")}) Tj`,
    "ET",
    "BT",
    "/F2 11 Tf",
    "0.14 0.07 0.13 rg",
    "62 626 Td",
    `(${escapePdfText(donorName)}) Tj`,
    "ET",
    "BT",
    "/F1 9 Tf",
    "0.35 0.25 0.34 rg",
    "62 612 Td",
    `(${escapePdfText(donorEmail)}) Tj`,
    "ET",
    "BT",
    "/F1 8 Tf",
    "0.5 0.45 0.5 rg",
    "62 598 Td",
    `(${escapePdfText(donorAddress.substring(0, 42))}) Tj`,
    "ET",

    // Payment Metadata Text
    "BT",
    "/F1 8 Tf",
    "0.55 0.45 0.54 rg",
    "317 642 Td",
    `(${escapePdfText("PAYMENT METADATA")}) Tj`,
    "ET",
    "BT",
    "/F1 9 Tf",
    "0.25 0.18 0.24 rg",
    "317 626 Td",
    `(${escapePdfText("Date: " + dateFormatted)}) Tj`,
    "ET",
    "BT",
    "/F1 9 Tf",
    "0.25 0.18 0.24 rg",
    "317 612 Td",
    `(${escapePdfText("Method: " + paymentMethod)}) Tj`,
    "ET",
    "BT",
    "/F1 9 Tf",
    "0.25 0.18 0.24 rg",
    "317 598 Td",
    `(${escapePdfText("Type: " + freqLabel)}) Tj`,
    "ET",

    // FINANCIAL BREAKDOWN TABLE
    // Table Outer Box
    "1 1 1 rg",
    "0.85 0.85 0.88 RG",
    "0.75 w",
    "50 380 495 186 re B",

    // Table Header Bar
    "0.96 0.95 0.96 rg",
    "0.85 0.85 0.88 RG",
    "50 540 495 26 re B",
    "BT",
    "/F2 9 Tf",
    "0.3 0.2 0.3 rg",
    "66 550 Td",
    `(${escapePdfText("DESCRIPTION & ALLOCATION")}) Tj`,
    "ET",
    "BT",
    "/F2 9 Tf",
    "0.3 0.2 0.3 rg",
    "445 550 Td",
    `(${escapePdfText("AMOUNT (GBP)")}) Tj`,
    "ET",

    // Row 1: Campaign Allocation
    "BT",
    "/F2 11 Tf",
    "0.14 0.07 0.13 rg",
    "66 518 Td",
    `(${escapePdfText(campaignTitle)}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.5 0.4 0.5 rg",
    "66 504 Td",
    `(${escapePdfText("Direct charitable gift supporting Leicestershire relief projects")}) Tj`,
    "ET",
    "BT",
    "/F2 13 Tf",
    "0.14 0.07 0.13 rg",
    "450 514 Td",
    `(${escapePdfText("£" + amountNum.toFixed(2))}) Tj`,
    "ET",

    // Divider line between Row 1 and Row 2
    "0.9 0.9 0.9 RG",
    "0.5 w",
    "50 490 m 545 490 l S",

    // Row 2: UK Gift Aid Relief Box (Green tint)
    donation.giftAid ? "0.93 0.99 0.96 rg" : "0.98 0.98 0.98 rg",
    "50 442 495 48 re f",
    "BT",
    "/F2 10 Tf",
    donation.giftAid ? "0.05 0.55 0.35 rg" : "0.5 0.5 0.5 rg",
    "66 470 Td",
    `(${escapePdfText(donation.giftAid ? "UK HMRC Gift Aid Tax Relief (+25%)" : "UK HMRC Gift Aid Relief")}) Tj`,
    "ET",
    "BT",
    "/F1 8 Tf",
    donation.giftAid ? "0.04 0.45 0.28 rg" : "0.55 0.55 0.55 rg",
    "66 456 Td",
    `(${escapePdfText(donation.giftAid ? "Reclaimed under Chapter 2, Part 8, Income Tax Act 2007 at zero cost to donor" : "Not claimed by donor for this contribution")}) Tj`,
    "ET",
    "BT",
    "/F2 12 Tf",
    donation.giftAid ? "0.05 0.55 0.35 rg" : "0.5 0.5 0.5 rg",
    "450 464 Td",
    `(${escapePdfText((donation.giftAid ? "+£" : "£") + giftAidAmount)}) Tj`,
    "ET",

    // Row 3: Total Charitable Value (Pink Highlight)
    "0.99 0.93 0.96 rg",
    "50 380 495 62 re f",
    "0.902 0.071 0.494 RG",
    "1 w",
    "50 442 m 545 442 l S",
    "BT",
    "/F2 12 Tf",
    "0.24 0.12 0.21 rg",
    "66 414 Td",
    `(${escapePdfText("Total Charitable Value to The Zinthiya Trust")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.55 0.35 0.5 rg",
    "66 398 Td",
    `(${escapePdfText("Total purchasing power and assistance deployed to crisis beneficiaries")}) Tj`,
    "ET",
    "BT",
    "/F2 18 Tf",
    "0.902 0.071 0.494 rg", // Magenta
    "440 408 Td",
    `(${escapePdfText("£" + totalImpact)}) Tj`,
    "ET",

    // OFFICIAL STATUTORY & TAX NOTICE BOX
    "0.98 0.98 0.98 rg",
    "0.88 0.88 0.9 RG",
    "0.5 w",
    "50 255 495 105 re B",

    "BT",
    "/F2 9.5 Tf",
    "0.24 0.12 0.21 rg",
    "66 338 Td",
    `(${escapePdfText("OFFICIAL CHARITY TAX AUDIT STATEMENT")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.4 0.35 0.4 rg",
    "66 322 Td",
    `(${escapePdfText("The Zinthiya Trust is a charitable trust registered under charity number 1137350.")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.4 0.35 0.4 rg",
    "66 308 Td",
    `(${escapePdfText("Registered with HMRC for Gift Aid tax reclaims under s.414 of the Income Tax Act 2007.")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.4 0.35 0.4 rg",
    "66 294 Td",
    `(${escapePdfText("Funds received directly fund poverty relief, emergency heating, food parcels, and women refuge services.")}) Tj`,
    "ET",
    "BT",
    "/F2 8.5 Tf",
    "0.2 0.5 0.3 rg",
    "66 274 Td",
    `(${escapePdfText("Please retain this official document for your personal tax return and accounting records.")}) Tj`,
    "ET",

    // SIGNATURE & TRUSTEE AUTHORIZATION
    "0.8 0.8 0.8 RG",
    "0.75 w",
    "360 180 m 530 180 l S", // signature line

    "BT",
    "/F2 10 Tf",
    "0.14 0.07 0.13 rg",
    "360 166 Td",
    `(${escapePdfText("The Board of Trustees")}) Tj`,
    "ET",
    "BT",
    "/F1 8.5 Tf",
    "0.5 0.45 0.5 rg",
    "360 152 Td",
    `(${escapePdfText("The Zinthiya Trust")}) Tj`,
    "ET",

    // BOTTOM FOOTER WATERMARK
    "BT",
    "/F1 8 Tf",
    "0.65 0.6 0.65 rg",
    "50 110 Td",
    `(${escapePdfText("Official Computer-Generated Tax Receipt. Valid without physical seal under Charities Act 2011.")}) Tj`,
    "ET",
    "BT",
    "/F2 8 Tf",
    "0.902 0.071 0.494 rg",
    "50 96 Td",
    `(${escapePdfText("The Zinthiya Trust | Empowering women, eradicating poverty, supporting our community.")}) Tj`,
    "ET"
  ];

  const streamContent = ops.join("\n");
  const streamLen = streamContent.length;

  let body = "%PDF-1.4\n";
  const offsets: number[] = [];

  function addObj(str: string) {
    offsets.push(body.length);
    body += str + "\n";
  }

  // 1 0 obj Catalog
  addObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");
  // 2 0 obj Pages
  addObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj");
  // 3 0 obj Page
  addObj(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj"
  );
  // 4 0 obj Contents
  addObj(`4 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}\nendstream\nendobj`);
  // 5 0 obj Font F1 (Helvetica)
  addObj("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj");
  // 6 0 obj Font F2 (Helvetica-Bold)
  addObj("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj");

  const startXref = body.length;
  body += "xref\n0 7\n0000000000 65535 f \n";
  for (let i = 0; i < offsets.length; i++) {
    body += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }
  body += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  // Convert to binary Uint8Array for valid binary PDF delivery
  const buffer = new Uint8Array(body.length);
  for (let i = 0; i < body.length; i++) {
    buffer[i] = body.charCodeAt(i) & 0xff;
  }

  const blob = new Blob([buffer], { type: "application/pdf" });
  return { blob, filename };
}

export function downloadReceiptPdf(donation: any, donor?: DonorUser | null): void {
  const { blob, filename } = generateReceiptPdfBlob(donation, donor);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
