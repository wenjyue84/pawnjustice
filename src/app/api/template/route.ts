import { NextResponse } from "next/server";

// Generates a printable HTML complaint letter template
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";

  const content = templates[lang as keyof typeof templates] ?? templates.en;

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="UTF-8">
<title>${content.title}</title>
<style>
  @page { margin: 2cm; size: A4; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; color: #000; padding: 2cm; max-width: 21cm; margin: 0 auto; }
  h1 { font-size: 16pt; text-align: center; margin-bottom: 24pt; text-transform: uppercase; letter-spacing: 1px; }
  h2 { font-size: 13pt; margin-top: 18pt; margin-bottom: 6pt; border-bottom: 1px solid #333; padding-bottom: 3pt; }
  .field { margin: 8pt 0; display: flex; gap: 8pt; }
  .field-label { font-weight: bold; min-width: 180pt; flex-shrink: 0; }
  .field-value { border-bottom: 1px dotted #999; flex: 1; min-height: 16pt; }
  .field-value.multiline { border-bottom: none; border: 1px solid #ccc; min-height: 80pt; padding: 4pt; }
  .instructions { background: #f5f5f5; border: 1px solid #ddd; padding: 12pt; margin: 12pt 0; font-size: 10pt; }
  .instructions h3 { font-size: 11pt; margin-bottom: 6pt; }
  .instructions li { margin: 3pt 0; margin-left: 16pt; }
  .section { margin-bottom: 16pt; }
  .signature-block { margin-top: 36pt; }
  .signature-line { border-bottom: 1px solid #000; width: 200pt; margin-top: 48pt; margin-bottom: 4pt; }
  .date-field { margin-top: 12pt; }
  .header-info { text-align: right; margin-bottom: 24pt; font-size: 11pt; }
  .recipient { margin-bottom: 24pt; }
  .body-text { text-align: justify; margin: 12pt 0; }
  .checklist { margin: 12pt 0; }
  .checklist li { list-style: none; margin: 6pt 0; padding-left: 24pt; position: relative; }
  .checklist li::before { content: "☐"; position: absolute; left: 0; }
  .footer-note { margin-top: 24pt; font-size: 9pt; color: #666; border-top: 1px solid #ccc; padding-top: 8pt; }
  @media print { .no-print { display: none; } body { padding: 0; } }
  .print-btn { position: fixed; top: 16px; right: 16px; background: #1a3c5e; color: white; border: none; padding: 12px 24px; font-size: 14px; cursor: pointer; border-radius: 6px; font-family: sans-serif; }
  .print-btn:hover { background: #2a5580; }
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">${content.printBtn}</button>

<h1>${content.title}</h1>

<div class="instructions no-print">
<h3>${content.instructionsTitle}</h3>
<ol>
${content.instructionSteps.map((s: string) => `<li>${s}</li>`).join("\n")}
</ol>
</div>

<div class="header-info">
<div class="field"><span class="field-label">${content.dateLabel}:</span> <span class="field-value"></span></div>
</div>

<div class="recipient">
<p><strong>${content.toLabel}:</strong></p>
<p>${content.recipientLine1}</p>
<p>${content.recipientLine2}</p>
<p>${content.recipientLine3}</p>
</div>

<h2>${content.section1Title}</h2>
<div class="section">
<div class="field"><span class="field-label">${content.nameLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.icLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.addressLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.phoneLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.emailLabel}:</span> <span class="field-value"></span></div>
</div>

<h2>${content.section2Title}</h2>
<div class="section">
<div class="field"><span class="field-label">${content.pawnshopNameLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.pawnshopAddressLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.pawnshopPhoneLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.licenseLabel}:</span> <span class="field-value"></span></div>
</div>

<h2>${content.section3Title}</h2>
<div class="section">
<div class="field"><span class="field-label">${content.pawnDateLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.itemLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.loanAmountLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.ticketNoLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.ticketRateLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.actualRateLabel}:</span> <span class="field-value"></span></div>
<div class="field"><span class="field-label">${content.overchargeLabel}:</span> <span class="field-value"></span></div>
</div>

<h2>${content.section4Title}</h2>
<div class="section">
<p class="body-text">${content.section4Intro}</p>
<div class="field"><span class="field-value multiline"></span></div>
</div>

<h2>${content.section5Title}</h2>
<div class="section">
<p class="body-text">${content.section5Text}</p>
</div>

<h2>${content.section6Title}</h2>
<div class="checklist">
<ul>
${content.attachments.map((a: string) => `<li>${a}</li>`).join("\n")}
</ul>
</div>

<div class="signature-block">
<p>${content.declarationText}</p>
<div class="signature-line"></div>
<p><strong>${content.signatureLabel}</strong></p>
<div class="date-field">
<div class="field"><span class="field-label">${content.dateLabel}:</span> <span class="field-value"></span></div>
</div>
</div>

<div class="footer-note">
<p>${content.footerNote}</p>
<p>${content.footerSource}</p>
</div>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="complaint-template-${lang}.html"`,
    },
  });
}

const templates = {
  en: {
    title: "Pawnshop Overcharging — Formal Complaint Letter",
    printBtn: "🖨️ Print / Save as PDF",
    instructionsTitle: "How to use this template",
    instructionSteps: [
      "Fill in all fields by hand or digitally (open in browser, print to PDF)",
      "Attach copies of your pawn ticket, payment receipts, and photos",
      "Send by registered post (Pos Berdaftar) to KPKT and/or the pawnshop",
      "Keep a copy for yourself and note the posting date",
      "If sending to KPKT, also file online at kpkt.spab.gov.my for faster processing",
      "If no response within 14 days, file with Consumer Tribunal (RM 5 fee)",
    ],
    dateLabel: "Date",
    toLabel: "To",
    recipientLine1: "Bahagian Kawalan Kredit Komuniti (BKK)",
    recipientLine2: "Kementerian Perumahan dan Kerajaan Tempatan (KPKT)",
    recipientLine3: "Level 22, No. 51, Persiaran Perdana, Presint 4, 62100 Putrajaya",
    section1Title: "A. Complainant Details",
    nameLabel: "Full Name",
    icLabel: "IC Number",
    addressLabel: "Address",
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    section2Title: "B. Pawnshop Details",
    pawnshopNameLabel: "Pawnshop Name",
    pawnshopAddressLabel: "Full Address",
    pawnshopPhoneLabel: "Phone",
    licenseLabel: "License No. (if known)",
    section3Title: "C. Overcharging Details",
    pawnDateLabel: "Date Item Was Pawned",
    itemLabel: "Item Description",
    loanAmountLabel: "Loan Amount (RM)",
    ticketNoLabel: "Pawn Ticket Number",
    ticketRateLabel: "Interest Rate on Ticket (%)",
    actualRateLabel: "Actual Rate Charged (%)",
    overchargeLabel: "Total Overcharged Amount (RM)",
    section4Title: "D. Description of Events",
    section4Intro: "Please describe what happened in your own words. Include dates, amounts, and what the pawnshop staff said:",
    section5Title: "E. Legal Basis",
    section5Text: "This complaint is made under the Pawnbrokers Act 1972 (Act 81), Section 17, which prohibits charging interest in excess of the prescribed rate (maximum 2% per month). The pawnshop's conduct may also constitute an offence under Section 420 of the Penal Code (cheating) and/or Section 406 (criminal breach of trust). I request that KPKT investigate this matter, take enforcement action, and order restitution of the overcharged amount.",
    section6Title: "F. Attachments Checklist",
    attachments: [
      "Copy of pawn ticket (tiket pajak)",
      "Copies of payment receipts / app screenshots",
      "Copy of IC (front and back)",
      "Photos of pawnshop signage",
      "Police report copy (if filed)",
      "Any other supporting documents",
    ],
    declarationText: "I declare that the information provided above is true and correct to the best of my knowledge.",
    signatureLabel: "Signature & Name",
    footerNote: "This template is provided by PawnJustice (pawnjustice.vercel.app) as a public service. It does not constitute legal advice.",
    footerSource: "Legal references: Pawnbrokers Act 1972, s.17; Penal Code, s.406, s.420; KPKT complaint portal: kpkt.spab.gov.my",
  },
  ms: {
    title: "Pajak Gadai Caj Berlebihan — Surat Aduan Rasmi",
    printBtn: "🖨️ Cetak / Simpan sebagai PDF",
    instructionsTitle: "Cara menggunakan templat ini",
    instructionSteps: [
      "Isi semua ruangan dengan tangan atau secara digital (buka di pelayar, cetak ke PDF)",
      "Lampirkan salinan tiket pajak, resit pembayaran, dan foto",
      "Hantar melalui pos berdaftar ke KPKT dan/atau pajak gadai",
      "Simpan salinan untuk diri sendiri dan catatkan tarikh penghantaran",
      "Jika menghantar ke KPKT, juga failkan secara dalam talian di kpkt.spab.gov.my",
      "Jika tiada jawapan dalam 14 hari, failkan ke Tribunal Pengguna (yuran RM 5)",
    ],
    dateLabel: "Tarikh",
    toLabel: "Kepada",
    recipientLine1: "Bahagian Kawalan Kredit Komuniti (BKK)",
    recipientLine2: "Kementerian Perumahan dan Kerajaan Tempatan (KPKT)",
    recipientLine3: "Aras 22, No. 51, Persiaran Perdana, Presint 4, 62100 Putrajaya",
    section1Title: "A. Maklumat Pengadu",
    nameLabel: "Nama Penuh",
    icLabel: "No. Kad Pengenalan",
    addressLabel: "Alamat",
    phoneLabel: "No. Telefon",
    emailLabel: "E-mel",
    section2Title: "B. Maklumat Pajak Gadai",
    pawnshopNameLabel: "Nama Pajak Gadai",
    pawnshopAddressLabel: "Alamat Penuh",
    pawnshopPhoneLabel: "No. Telefon",
    licenseLabel: "No. Lesen (jika diketahui)",
    section3Title: "C. Butiran Caj Berlebihan",
    pawnDateLabel: "Tarikh Barang Dipajak",
    itemLabel: "Keterangan Barang",
    loanAmountLabel: "Jumlah Pinjaman (RM)",
    ticketNoLabel: "No. Tiket Pajak",
    ticketRateLabel: "Kadar Faedah pada Tiket (%)",
    actualRateLabel: "Kadar Sebenar Dikenakan (%)",
    overchargeLabel: "Jumlah Caj Berlebihan (RM)",
    section4Title: "D. Keterangan Peristiwa",
    section4Intro: "Sila huraikan apa yang berlaku dengan perkataan anda sendiri. Sertakan tarikh, jumlah, dan apa yang dikatakan kakitangan pajak gadai:",
    section5Title: "E. Asas Undang-undang",
    section5Text: "Aduan ini dibuat di bawah Akta Pemegang Pajak Gadai 1972 (Akta 81), Seksyen 17, yang melarang mengenakan faedah melebihi kadar yang ditetapkan (maksimum 2% sebulan). Tindakan pajak gadai ini juga mungkin merupakan kesalahan di bawah Seksyen 420 Kanun Keseksaan (penipuan) dan/atau Seksyen 406 (pecah amanah jenayah). Saya memohon KPKT menyiasat perkara ini, mengambil tindakan penguatkuasaan, dan mengarahkan pemulangan jumlah caj berlebihan.",
    section6Title: "F. Senarai Semak Lampiran",
    attachments: [
      "Salinan tiket pajak",
      "Salinan resit pembayaran / tangkap layar app",
      "Salinan kad pengenalan (depan dan belakang)",
      "Foto papan tanda pajak gadai",
      "Salinan laporan polis (jika ada)",
      "Dokumen sokongan lain",
    ],
    declarationText: "Saya mengaku bahawa maklumat yang diberikan di atas adalah benar dan tepat setakat pengetahuan saya.",
    signatureLabel: "Tandatangan & Nama",
    footerNote: "Templat ini disediakan oleh PawnJustice (pawnjustice.vercel.app) sebagai perkhidmatan awam. Ia bukan nasihat undang-undang.",
    footerSource: "Rujukan undang-undang: Akta Pemegang Pajak Gadai 1972, s.17; Kanun Keseksaan, s.406, s.420; Portal aduan KPKT: kpkt.spab.gov.my",
  },
  zh: {
    title: "当铺乱收费——正式投诉信",
    printBtn: "🖨️ 打印 / 保存为PDF",
    instructionsTitle: "如何使用此模板",
    instructionSteps: [
      "手写或数字方式填写所有栏目（在浏览器中打开，打印为PDF）",
      "附上当票、付款收据和照片的副本",
      "通过挂号邮件（Pos Berdaftar）寄送至KPKT和/或当铺",
      "保留副本并记录寄出日期",
      "如寄送KPKT，也请在 kpkt.spab.gov.my 在线提交以加快处理",
      "如14天内无回应，向消费者仲裁庭提交（费用RM 5）",
    ],
    dateLabel: "日期",
    toLabel: "致",
    recipientLine1: "社区信贷控制局（BKK）",
    recipientLine2: "房屋及地方政府部（KPKT）",
    recipientLine3: "Level 22, No. 51, Persiaran Perdana, Presint 4, 62100 Putrajaya",
    section1Title: "A. 投诉人资料",
    nameLabel: "姓名",
    icLabel: "身份证号码",
    addressLabel: "地址",
    phoneLabel: "电话号码",
    emailLabel: "电子邮件",
    section2Title: "B. 当铺资料",
    pawnshopNameLabel: "当铺名称",
    pawnshopAddressLabel: "完整地址",
    pawnshopPhoneLabel: "电话",
    licenseLabel: "执照编号（如知道）",
    section3Title: "C. 乱收费详情",
    pawnDateLabel: "典当日期",
    itemLabel: "物品描述",
    loanAmountLabel: "贷款金额（RM）",
    ticketNoLabel: "当票编号",
    ticketRateLabel: "当票上的利率（%）",
    actualRateLabel: "实际收取利率（%）",
    overchargeLabel: "多收总金额（RM）",
    section4Title: "D. 事件描述",
    section4Intro: "请用您自己的话描述发生了什么。包括日期、金额以及当铺工作人员的回应：",
    section5Title: "E. 法律依据",
    section5Text: "本投诉根据《1972年当商法令》（第81号法令）第17条提出，该条禁止收取超过规定利率（每月最高2%）的利息。当铺的行为也可能构成《刑事法典》第420条（欺诈）和/或第406条（刑事失信）的犯罪。本人请求KPKT调查此事，采取执法行动，并下令退还多收金额。",
    section6Title: "F. 附件清单",
    attachments: [
      "当票副本",
      "付款收据/App截图副本",
      "身份证副本（正反面）",
      "当铺招牌照片",
      "警方报案副本（如已报案）",
      "其他支持文件",
    ],
    declarationText: "本人声明以上提供的信息据我所知是真实和正确的。",
    signatureLabel: "签名及姓名",
    footerNote: "此模板由PawnJustice（pawnjustice.vercel.app）提供，作为公共服务。不构成法律建议。",
    footerSource: "法律参考：当商法令1972, s.17; 刑事法典, s.406, s.420; KPKT投诉门户: kpkt.spab.gov.my",
  },
};
