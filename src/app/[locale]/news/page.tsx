import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, Newspaper } from "lucide-react";

const newsItems = [
  {
    date: "2023-06-26",
    source: "Free Malaysia Today",
    titleEn: "Illegal for pawnshops to sell gold, valuables — Court of Appeal rules",
    titleMs: "Haram untuk pajak gadai jual emas, barang berharga — Mahkamah Rayuan putuskan",
    titleZh: "上诉法院裁定：当铺出售黄金和贵重物品属违法",
    descEn: "The Court of Appeal upheld a RM 5,000 fine against Kedai Pajak Shin Ngien Sdn Bhd for displaying price-tagged gold items. This confirms pawnshops are licensed ONLY for pawnbroking — not retail. If your pawnshop sells gold over the counter, they're breaking the law.",
    descMs: "Mahkamah Rayuan mengekalkan denda RM 5,000 terhadap Kedai Pajak Shin Ngien Sdn Bhd kerana mempamerkan barangan emas bertanda harga. Ini mengesahkan pajak gadai dilesenkan HANYA untuk pajak gadai — bukan runcit.",
    descZh: "上诉法院维持对Kedai Pajak Shin Ngien Sdn Bhd的RM 5,000罚款，因其展示标价黄金物品。这确认当铺仅获准从事典当业务——而非零售。",
    url: "https://www.freemalaysiatoday.com/category/nation/2023/06/26/illegal-for-pawnshops-to-sell-gold-valuables-court-of-appeal-rules/",
    relevant: true,
  },
  {
    date: "2024-07",
    source: "Bursa Malaysia",
    titleEn: "Well Chip Group Berhad (5325) IPO raises RM 172.5 million",
    titleMs: "Well Chip Group Berhad (5325) IPO mengumpul RM 172.5 juta",
    titleZh: "Well Chip Group Berhad（5325）IPO筹集RM 1.725亿",
    descEn: "WELLCHIP listed on Bursa Malaysia's Main Market in July 2024, raising RM 172.5 million. Parent company: ValueMax Group (SGX). Operates 27+ pawn outlets and 5 gold retail shops across Johor and Perak. Their prospectus claims: \"No hidden charges, no compounding interest.\"",
    descMs: "WELLCHIP tersenarai di Pasaran Utama Bursa Malaysia pada Julai 2024, mengumpul RM 172.5 juta. Syarikat induk: ValueMax Group (SGX). Mengoperasikan 27+ cawangan pajak gadai dan 5 kedai emas runcit di Johor dan Perak.",
    descZh: "WELLCHIP于2024年7月在马来西亚交易所主板上市，筹集RM 1.725亿。母公司：ValueMax Group（新交所）。经营27+家当铺和5家黄金零售店，分布在柔佛和霹雳。",
    url: null,
    relevant: true,
  },
  {
    date: "2024",
    source: "KPKT / BKK",
    titleEn: "KPKT reminds public to report pawnshop overcharging",
    titleMs: "KPKT ingatkan orang ramai laporkan caj berlebihan pajak gadai",
    titleZh: "KPKT提醒公众举报当铺乱收费",
    descEn: "KPKT's Bahagian Kawalan Kredit Komuniti (BKK) posted a public reminder on Facebook: \"The public is reminded to lodge complaints with KPKT if pawnshops charge excessive rates.\" Despite this, no documented cases of KPKT fining a major licensed pawnshop chain for interest overcharging have been found.",
    descMs: "Bahagian Kawalan Kredit Komuniti (BKK) KPKT menyiarkan peringatan awam di Facebook: \"Orang ramai diingatkan agar membuat aduan kepada KPKT jika ada premis pajak gadai yang mengenakan kadar berlebihan.\" Namun, tiada kes terdokumen ditemui di mana KPKT mendenda rangkaian pajak gadai berlesen utama.",
    descZh: "KPKT的社区信贷控制局（BKK）在Facebook上发布公开提醒：「公众应向KPKT投诉收取过高费率的当铺。」然而，至今未发现KPKT对主要持牌当铺连锁店因利息超收而处以罚款的记录案例。",
    url: null,
    relevant: true,
  },
  {
    date: "2017",
    source: "Malaysiakini / FOMCA",
    titleEn: "Be Aware of Your Rights Under the Pawnbrokers Act 1972",
    titleMs: "Ketahui Hak Anda Di Bawah Akta Pemegang Pajak Gadai 1972",
    titleZh: "了解您在《1972年当商法令》下的权利",
    descEn: "The Federation of Malaysian Consumers Associations (FOMCA) published a comprehensive guide on consumer rights under the Pawnbrokers Act 1972. Key point: the 2% monthly interest cap, and the right to surplus auction proceeds. Most customers don't know these rights exist.",
    descMs: "Gabungan Persatuan Pengguna Malaysia (FOMCA) menerbitkan panduan komprehensif tentang hak pengguna di bawah Akta Pemegang Pajak Gadai 1972. Perkara utama: had faedah 2% sebulan, dan hak ke atas lebihan hasil lelongan.",
    descZh: "马来西亚消费者协会联合会（FOMCA）发布了《1972年当商法令》下消费者权利的全面指南。重点：每月2%的利息上限，以及拍卖剩余收益的权利。大多数客户不知道这些权利的存在。",
    url: "https://www.fomca.org.my/v1/index.php/2-uncategorised/190-be-aware-of-your-rights-under-pawnbrokers-act-1972",
    relevant: true,
  },
  {
    date: "2023",
    source: "NCCC",
    titleEn: "NCCC pawnshop guide: conventional pawnbroking system explained",
    titleMs: "Panduan NCCC pajak gadai: sistem pajak gadai konvensional diterangkan",
    titleZh: "NCCC当铺指南：传统典当系统说明",
    descEn: "The National Consumer Complaints Centre published a detailed breakdown of how the conventional pawnbroking system works — including the 2% interest cap, 6-month minimum pawn period, and the auction process. A useful reference for understanding your baseline rights.",
    descMs: "Pusat Aduan Pengguna Nasional menerbitkan pecahan terperinci tentang cara sistem pajak gadai konvensional berfungsi — termasuk had faedah 2%, tempoh pajak minimum 6 bulan, dan proses lelongan.",
    descZh: "国家消费者投诉中心发布了传统典当系统运作方式的详细说明——包括2%的利息上限、6个月最低典当期限和拍卖流程。了解基本权利的有用参考。",
    url: "https://www.nccc.org.my/v2/index.php/home/1754-sistem-pajak-gadai-konvensional",
    relevant: true,
  },
  {
    date: "2026-05-01",
    source: "PawnJustice / Police Report",
    titleEn: "Police report LARKIN/006020/26 filed against WELLCHIP Larkin branch",
    titleMs: "Laporan polis LARKIN/006020/26 difailkan terhadap cawangan WELLCHIP Larkin",
    titleZh: "针对WELLCHIP Larkin分行的警方报案 LARKIN/006020/26 已提交",
    descEn: "The first documented police report against a WELLCHIP branch for systematic interest overcharging. Mr. C was charged 2.5% monthly on a RM 4,000 pawn — above both the 1%/1.5% ticket rate and the 2% legal maximum. The shop admitted: \"We no longer follow the receipt given.\"",
    descMs: "Laporan polis pertama terdokumen terhadap cawangan WELLCHIP untuk caj faedah berlebihan sistematik. En. C dikenakan 2.5% sebulan atas pajak RM 4,000 — melebihi kadar tiket 1%/1.5% dan had undang-undang 2%.",
    descZh: "首份针对WELLCHIP分行系统性利息超收的警方报案记录。C先生在RM 4,000的典当中被收取每月2.5%——超出1%/1.5%的当票利率和2%的法定上限。",
    url: null,
    relevant: true,
  },
  {
    date: "2025-07-21",
    source: "Bernama / Scoop Malaysia",
    titleEn: "Consumer Credit Bill 2025 passed — new oversight of pawnshops",
    titleMs: "Rang Undang-undang Kredit Pengguna 2025 diluluskan — pengawasan baharu pajak gadai",
    titleZh: "《2025年消费者信贷法案》通过——当铺面临新监管",
    descEn: "Malaysia passed the Consumer Credit Bill 2025, establishing a Consumer Credit Commission bringing pawnbroking under coordinated oversight of KPKT, Bank Negara, and the Securities Commission. The biggest regulatory shift for pawnshops in decades — closing gaps that let non-compliant operators exploit consumers.",
    descMs: "Malaysia meluluskan Rang Undang-undang Kredit Pengguna 2025, menubuhkan Suruhanjaya Kredit Pengguna yang meletakkan pajak gadai di bawah penyeliaan KPKT, Bank Negara, dan Suruhanjaya Sekuriti. Perubahan kawal selia terbesar dalam beberapa dekad.",
    descZh: "马来西亚通过《2025年消费者信贷法案》，设立消费者信贷委员会，将典当业纳入KPKT、国家银行和证券委员会的协调监管。几十年来当铺面临的最大监管变革。",
    url: "https://www.bernama.com/en/news.php?id=2447659",
    relevant: true,
  },
  {
    date: "2024-11-22",
    source: "The Malaysian Reserve",
    titleEn: "Pappajack Berhad moves to Bursa Main Market — second listed pawnshop chain",
    titleMs: "Pappajack Berhad berpindah ke Pasaran Utama Bursa — rangkaian pajak gadai tersenarai kedua",
    titleZh: "Pappajack Berhad升至马来西亚交易所主板——第二家上市当铺连锁",
    descEn: "Pappajack (53 pawnshops nationwide) transferred to Bursa Main Market. Together with WELLCHIP, two major chains are now publicly listed — meaning higher accountability, mandatory disclosures, and more at stake when consumer complaints go public.",
    descMs: "Pappajack (53 pajak gadai seluruh negara) berpindah ke Pasaran Utama Bursa. Bersama WELLCHIP, dua rangkaian utama kini tersenarai awam — bermakna akauntabiliti lebih tinggi dan lebih banyak yang dipertaruhkan.",
    descZh: "Pappajack（全国53家当铺）升至马来西亚交易所主板。与WELLCHIP一起，两大连锁现为上市公司——意味着更高的问责性和更多公开投诉的风险。",
    url: "https://themalaysianreserve.com/2024/11/05/pappajack-gets-green-light-to-move-to-main-market/",
    relevant: true,
  },
  {
    date: "2024",
    source: "iPajak / FOMCA",
    titleEn: "Unlicensed pawnshops charge up to 6% monthly — triple the legal rate",
    titleMs: "Pajak gadai tidak berlesen kenakan sehingga 6% sebulan — tiga kali ganda had undang-undang",
    titleZh: "无牌当铺月息高达6%——法定上限的三倍",
    descEn: "NCCC and FOMCA have documented unlicensed operators charging up to 6% monthly interest — triple the 2% legal cap. As of April 2024, Malaysia has only 881 licensed pawnbrokers. If a shop can't show you their license, walk away. And even licensed ones like WELLCHIP can overcharge.",
    descMs: "NCCC dan FOMCA mendokumenkan pengendali tidak berlesen yang mengenakan faedah sehingga 6% sebulan — tiga kali ganda had 2%. Sehingga April 2024, Malaysia hanya mempunyai 881 pajak gadai berlesen.",
    descZh: "NCCC和FOMCA记录了无牌经营者收取高达每月6%的利息——法定2%上限的三倍。截至2024年4月，马来西亚仅有881家持牌当铺。",
    url: "https://ipajak.com.my/pawn-shop-license-in-malaysia-why-it-matters/",
    relevant: true,
  },
  {
    date: "2024",
    source: "Bernama",
    titleEn: "KPKT upgrading credit monitoring system — acknowledging gaps",
    titleMs: "KPKT naik taraf sistem pemantauan kredit — mengakui jurang",
    titleZh: "KPKT升级信贷监控系统——承认存在漏洞",
    descEn: "Bernama reported KPKT is upgrading its Community Credit Management System to better track licensed pawnbrokers. Translation: their old system wasn't catching violations. That's how shops like WELLCHIP can overcharge for months without anyone noticing — until a customer files a report.",
    descMs: "Bernama melaporkan KPKT sedang menaik taraf Sistem Pengurusan Kredit Komuniti untuk memantau pajak gadai berlesen dengan lebih baik. Bermaksud: sistem lama mereka tidak mengesan pelanggaran.",
    descZh: "Bernama报道KPKT正在升级其社区信贷管理系统以更好地追踪持牌当铺。言下之意：旧系统无法发现违规行为。这就是WELLCHIP这样的店铺能连续数月多收费用而无人察觉的原因。",
    url: "https://www.bernama.com/en/news.php?id=2363888",
    relevant: true,
  },
  {
    date: "2024-04-20",
    source: "The Star",
    titleEn: "Pawnbrokers Act 1972 — outdated law that hasn't been amended in 50+ years",
    titleMs: "Akta Pemegang Pajak Gadai 1972 — undang-undang lapuk yang belum dipinda 50+ tahun",
    titleZh: "《1972年当商法令》——50多年未修订的过时法律",
    descEn: "The Malaysia Pawnbrokers Association publicly acknowledged the Act hasn't been amended and called for a 3-year moratorium on new licenses. The regulatory vacuum means weak enforcement and consumers left vulnerable to shops that know nobody's really watching.",
    descMs: "Persatuan Pemegang Pajak Gadai Malaysia mengakui secara terbuka Akta ini tidak dipinda dan meminta moratorium 3 tahun untuk lesen baharu. Kekosongan kawal selia bermakna penguatkuasaan lemah.",
    descZh: "马来西亚当铺协会公开承认该法令未经修订，并呼吁对新执照实施3年暂停令。监管真空意味着执法力度薄弱，消费者容易受害。",
    url: "https://www.thestar.com.my/news/nation/2024/04/20/pawnshops-need-help-to-stay-afloat",
    relevant: true,
  },
  {
    date: "2004",
    source: "Malaysian Government Gazette",
    titleEn: "Pawnbrokers Control and Licensing Regulations 2004 — 2% interest cap formalized",
    titleMs: "Peraturan Kawalan dan Pelesenan Pemegang Pajak Gadai 2004 — had faedah 2% diformalkan",
    titleZh: "2004年当铺控制和许可条例——2%利息上限正式化",
    descEn: "The 2004 Regulations (P.U.(A) 317/2004) formally set the maximum interest rate at 2% per month and introduced the RM 0.50 handling charge. These regulations strengthened the original 1972 Act and remain in force today.",
    descMs: "Peraturan 2004 (P.U.(A) 317/2004) secara rasmi menetapkan kadar faedah maksimum pada 2% sebulan dan memperkenalkan caj pengendalian RM 0.50.",
    descZh: "2004年条例（P.U.(A) 317/2004）正式将最高利率设定为每月2%，并引入了RM 0.50的手续费。这些条例加强了原始的1972年法令，至今仍然有效。",
    url: null,
    relevant: true,
  },
];

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NewsContent locale={locale} />;
}

function NewsContent({ locale }: { locale: string }) {
  const t = useTranslations("news");

  const getTitle = (item: (typeof newsItems)[0]) =>
    locale === "ms" ? item.titleMs : locale === "zh" ? item.titleZh : item.titleEn;
  const getDesc = (item: (typeof newsItems)[0]) =>
    locale === "ms" ? item.descMs : locale === "zh" ? item.descZh : item.descEn;

  // Sort by date descending
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-white/80 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {sorted.map((item, i) => (
            <article
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-navy hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Newspaper className="w-4 h-4" />
                  <span className="font-medium">{item.source}</span>
                  <span>·</span>
                  <time>{item.date}</time>
                </div>
              </div>
              <h2 className="text-lg font-bold mb-2 text-navy">
                {getTitle(item)}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {getDesc(item)}
              </p>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-navy font-medium hover:text-red-accent transition-colors"
                >
                  {t("readMore")} <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
