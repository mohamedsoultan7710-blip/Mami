// Liste officielle des élèves, telle que fournie par l'enseignante
// (photo de la grille de suivi des résultats). NE PAS inventer de noms,
// NE PAS corriger l'orthographe : cette liste fait foi.
// Pour ajouter/modifier un élève : voir le fichier supabase/seed.sql
// (source de vérité une fois Supabase connecté) ou modifier ce tableau
// puis relancer le script de seed.

export type Student = {
  id: string;
  name: string;
};

export const students: Student[] = [
  { id: "s01", name: "عبدالجبار عبدالرحمان علي" },
  { id: "s02", name: "عبدالله محمد يوسف" },
  { id: "s03", name: "عبدالرحمن محمد سجه" },
  { id: "s04", name: "أبوبكر الصديق مختار موسى" },
  { id: "s05", name: "آدم محمود إبراهيم" },
  { id: "s06", name: "أفنان ياسين وابري" },
  { id: "s07", name: "عائشة يوسف إبراهيم" },
  { id: "s08", name: "أمنة الزهرة جبريل إسماعيل" },
  { id: "s09", name: "عرفات عوالي ميرني" },
  { id: "s10", name: "فاطمة حسين إسماعيل" },
  { id: "s11", name: "حمده عثمان علي" },
  { id: "s12", name: "هند عبدالرحمان روبلي" },
  { id: "s13", name: "حنان روبلي إدلي" },
  { id: "s14", name: "حسن آدم عثمان" },
  { id: "s15", name: "حواء لول عبدي بولي" },
  { id: "s16", name: "هودو عبدالرحمان علي" },
  { id: "s17", name: "هدى هيبي عبدالرحمان" },
  { id: "s18", name: "خديجة عبدالقادر محمد" },
  { id: "s19", name: "مسعود ليبان أحمد" },
  { id: "s20", name: "مهدية عبدالرحمن موسى" },
  { id: "s21", name: "حنان إبراهيم علي" },
  { id: "s22", name: "نوارة علي أوبكر" },
  { id: "s23", name: "أما أوبكر علي" },
  { id: "s24", name: "أم الخير مصطفى نوح" },
  { id: "s25", name: "عمرة محمد عبدي" },
  { id: "s26", name: "رحمه عبدي أحمد" },
  { id: "s27", name: "ريان عبدي وابري" },
  { id: "s28", name: "سعد محمد أحمد" },
  { id: "s29", name: "سلمان علي عبدي" },
  { id: "s30", name: "سلمان عبدالله موسى" },
  { id: "s31", name: "سلمى ناصر عوض" },
  { id: "s32", name: "زيد علي عبدي" },
];
