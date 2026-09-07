// Contenu pédagogique — révision de 4e année (niveau 5e année primaire bilingue, EBT Djibouti)
// 4 notions uniquement : واو الحال، واو العطف، لكن، عندما
// Règle simple enseignée aux élèves :
//   واو الحال = و + هو/هي/هم + فعل مضارع → تصف حالة صاحب الفعل أثناء وقوع الفعل الأول
//   واو العطف = تربط بين اسمين، أو فعلين متتاليين، بدون وصف حالة
//   لكن = تفيد الاستدراك (تناقض بين فكرتين)
//   عندما = تفيد الزمن (فيها معنى "في وقتِ...")

export type Notion = "حال" | "عطف" | "لكن" | "عندما";

export const notionLabels: Record<Notion, string> = {
  حال: "واو الحال",
  عطف: "واو العطف",
  لكن: "لكن",
  عندما: "عندما",
};

export const notionColors: Record<Notion, string> = {
  حال: "bg-sky text-white",
  عطف: "bg-leaf text-white",
  لكن: "bg-berry text-white",
  عندما: "bg-coral text-white",
};

// ---------- NIVEAU 1 : أتعرّف (reconnaissance واو الحال / واو العطف) ----------
export type RecognitionItem = {
  id: string;
  sentence: string;
  answer: "حال" | "عطف";
  explanation: string;
};

export const level1: RecognitionItem[] = [
  {
    id: "l1-1",
    sentence: "عادَ التلميذُ إلى البيتِ وهو يضحكُ.",
    answer: "حال",
    explanation: "هذه واو الحال لأنها تصف حالة التلميذ (كان يضحك) أثناء عودته إلى البيت.",
  },
  {
    id: "l1-2",
    sentence: "اشترتِ الأمُّ تفاحًا وموزًا من السوقِ.",
    answer: "عطف",
    explanation: "هذه واو العطف لأنها تربط بين شيئين اشترتهما الأمّ: التفاح والموز.",
  },
  {
    id: "l1-3",
    sentence: "دخلَ الطفلُ الصفَّ وهو يحملُ حقيبتَه.",
    answer: "حال",
    explanation: "هذه واو الحال لأنها تصف حالة الطفل (يحمل حقيبته) وقت دخوله الصفّ.",
  },
  {
    id: "l1-4",
    sentence: "فتحَ عليٌّ الكتابَ وقرأَ الدرسَ.",
    answer: "عطف",
    explanation: "هذه واو العطف لأنها تربط بين فعلين متتاليين قام بهما عليّ: فتحَ ثم قرأَ.",
  },
  {
    id: "l1-5",
    sentence: "مشى الرجلُ في الحديقةِ وهو يُغنّي.",
    answer: "حال",
    explanation: "هذه واو الحال لأنها تصف حالة الرجل (يُغنّي) أثناء مشيه.",
  },
  {
    id: "l1-6",
    sentence: "غسلَ خالدٌ يديه وأكلَ طعامَه.",
    answer: "عطف",
    explanation: "هذه واو العطف لأنها تربط بين فعلين متتاليين: غسلَ ثم أكلَ.",
  },
  {
    id: "l1-7",
    sentence: "جلستْ سارةُ على الكرسيِّ وهي تبتسمُ.",
    answer: "حال",
    explanation: "هذه واو الحال لأنها تصف حالة سارة (تبتسم) أثناء جلوسها.",
  },
  {
    id: "l1-8",
    sentence: "رسمَ الطفلُ بيتًا وشجرةً.",
    answer: "عطف",
    explanation: "هذه واو العطف لأنها تربط بين شيئين رسمهما الطفل: بيتًا وشجرةً.",
  },
];

// ---------- NIVEAU 2 : أُفرّق (différencier — nouvelles phrases) ----------
export const level2: RecognitionItem[] = [
  {
    id: "l2-1",
    sentence: "خرجَ الأولادُ من المدرسةِ وهم يجرون.",
    answer: "حال",
    explanation: "بعد الواو ضمير (هم) ثم فعل مضارع (يجرون) يصف حالتَهم: هذه واو الحال.",
  },
  {
    id: "l2-2",
    sentence: "أكلتِ القطةُ السمكَ وشربتِ الحليبَ.",
    answer: "عطف",
    explanation: "فعلان ماضيان متتاليان (أكلت ثم شربت) بدون وصف حالة: هذه واو العطف.",
  },
  {
    id: "l2-3",
    sentence: "وقفَ الحارسُ عند البابِ وهو يراقبُ.",
    answer: "حال",
    explanation: "بعد الواو ضمير (هو) ثم فعل مضارع (يراقب) يصف حالته: هذه واو الحال.",
  },
  {
    id: "l2-4",
    sentence: "اشترى بابا قلمًا ودفترًا.",
    answer: "عطف",
    explanation: "تربط بين اسمين: قلمًا ودفترًا. هذه واو العطف.",
  },
  {
    id: "l2-5",
    sentence: "سبحَ الولدُ في البحرِ وهو يضحكُ.",
    answer: "حال",
    explanation: "بعد الواو ضمير (هو) ثم فعل مضارع (يضحك) يصف حالته أثناء السباحة: هذه واو الحال.",
  },
  {
    id: "l2-6",
    sentence: "نظّفتْ أختي غرفتَها ورتّبتْ كتبَها.",
    answer: "عطف",
    explanation: "فعلان ماضيان متتاليان (نظّفت ثم رتّبت): هذه واو العطف.",
  },
  {
    id: "l2-7",
    sentence: "ركضَ الحصانُ في الحقلِ وهو يصهلُ.",
    answer: "حال",
    explanation: "بعد الواو ضمير (هو) ثم فعل مضارع (يصهل) يصف حالة الحصان: هذه واو الحال.",
  },
  {
    id: "l2-8",
    sentence: "زارَ عمّي بيتَنا وأحضرَ هديةً.",
    answer: "عطف",
    explanation: "فعلان ماضيان متتاليان (زارَ ثم أحضرَ): هذه واو العطف.",
  },
];

// ---------- NIVEAU 3 : لكن أم عندما؟ ----------
export type BinaryChoiceItem = {
  id: string;
  sentence: string; // uses "______" as blank
  options: [string, string];
  answer: string;
  explanation: string;
};

export const level3: BinaryChoiceItem[] = [
  {
    id: "l3-1",
    sentence: "أحبُّ اللعبَ، ______ يجبُ أن أدرسَ.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك: أحبُّ اللعب، لكن الدراسة واجبة.",
  },
  {
    id: "l3-2",
    sentence: "______ أعودُ إلى البيتِ، أراجعُ دروسي.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ عودتي أراجع دروسي.",
  },
  {
    id: "l3-3",
    sentence: "أرادَ أحمدُ الخروجَ، ______ الجوَّ كان ممطرًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك: أرادَ الخروج، لكن المطر منعه.",
  },
  {
    id: "l3-4",
    sentence: "______ يرنُّ الجرسُ، يخرجُ التلاميذُ إلى الاستراحةِ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ رنين الجرس يخرج التلاميذ.",
  },
  {
    id: "l3-5",
    sentence: "الجوُّ جميلٌ اليومَ، ______ الريحَ باردةٌ قليلًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك بين فكرتين: الجمال والبرودة.",
  },
  {
    id: "l3-6",
    sentence: "______ تشرقُ الشمسُ، يستيقظُ الديكُ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ شروق الشمس يستيقظ الديك.",
  },
  {
    id: "l3-7",
    sentence: "تريدُ فاطمةُ النومَ، ______ عليها إنهاءَ واجبِها أولًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك: تريدُ النوم، لكن الواجب أولًا.",
  },
  {
    id: "l3-8",
    sentence: "______ يأتي الشتاءُ، تسقطُ الأوراقُ عن الأشجارِ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ مجيء الشتاء تسقط الأوراق.",
  },
];

// ---------- NIVEAU 4 : أُكمل (compléter — 3 choix) ----------
export type CompleteItem = {
  id: string;
  sentence: string;
  options: string[]; // 3 options among و / لكن / عندما
  answer: string;
  explanation: string;
};

export const level4: CompleteItem[] = [
  {
    id: "l4-1",
    sentence: "______ أذهبُ إلى المدرسةِ، أحيّي معلمي.",
    options: ["عندما", "لكن", "و"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ ذهابي أحيّي معلمي.",
  },
  {
    id: "l4-2",
    sentence: "اشتريتُ قلمًا ______ كراسًا.",
    options: ["و", "لكن", "عندما"],
    answer: "و",
    explanation: "\"و\" هنا تربط بين شيئين (قلمًا وكراسًا): هذه واو العطف.",
  },
  {
    id: "l4-3",
    sentence: "الجوُّ باردٌ اليومَ، ______ سأخرجُ للّعبِ.",
    options: ["لكن", "عندما", "و"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك بين البرد والرغبة في اللعب.",
  },
  {
    id: "l4-4",
    sentence: "______ يدقُّ الجرسُ، يدخلُ التلاميذُ إلى الصفِّ.",
    options: ["عندما", "و", "لكن"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ دقّ الجرس يدخل التلاميذ.",
  },
  {
    id: "l4-5",
    sentence: "تناولتُ الفطورَ ______ شربتُ عصيرًا.",
    options: ["و", "لكن", "عندما"],
    answer: "و",
    explanation: "\"و\" هنا تربط بين فعلين متتاليين: تناولتُ ثم شربتُ.",
  },
  {
    id: "l4-6",
    sentence: "أحبُّ القراءةَ، ______ ليس لديَّ وقتٌ كافٍ اليومَ.",
    options: ["لكن", "عندما", "و"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك: أحبُّ القراءة، لكن الوقت غير كافٍ.",
  },
  {
    id: "l4-7",
    sentence: "______ تغربُ الشمسُ، تعودُ الطيورُ إلى أعشاشِها.",
    options: ["عندما", "لكن", "و"],
    answer: "عندما",
    explanation: "\"عندما\" تفيد الزمن: في وقتِ غروب الشمس تعود الطيور.",
  },
  {
    id: "l4-8",
    sentence: "حفظتُ الدرسَ، ______ نسيتُ بعضَ الكلماتِ.",
    options: ["لكن", "و", "عندما"],
    answer: "لكن",
    explanation: "\"لكن\" تفيد الاستدراك بين الحفظ والنسيان.",
  },
];

// ---------- NIVEAU 5 : أُرتّب (remettre dans l'ordre) ----------
export type ReorderItem = {
  id: string;
  words: string[]; // ordre correct
  notion: Notion;
};

export const level5: ReorderItem[] = [
  {
    id: "l5-1",
    words: ["عندما", "أذهبُ", "إلى", "المدرسةِ", "أحيّي", "معلمي"],
    notion: "عندما",
  },
  {
    id: "l5-2",
    words: ["عادَ", "الولدُ", "وهو", "يضحكُ"],
    notion: "حال",
  },
  {
    id: "l5-3",
    words: ["اشترتِ", "الأمُّ", "تفاحًا", "وموزًا"],
    notion: "عطف",
  },
  {
    id: "l5-4",
    words: ["أحبُّ", "اللعبَ", "لكن", "يجبُ", "أن", "أدرسَ"],
    notion: "لكن",
  },
  {
    id: "l5-5",
    words: ["دخلَ", "الطفلُ", "الصفَّ", "وهو", "يحملُ", "حقيبتَه"],
    notion: "حال",
  },
];

// ---------- NIVEAU 6 : أُوصّل (associer phrase → notion) ----------
export type MatchItem = {
  id: string;
  phrase: string;
  notion: Notion;
};

export const level6: MatchItem[] = [
  { id: "l6-1", phrase: "عادَ التلميذُ وهو يضحكُ", notion: "حال" },
  { id: "l6-2", phrase: "اشترى بابا قلمًا ودفترًا", notion: "عطف" },
  { id: "l6-3", phrase: "أحبُّ اللعبَ لكن يجبُ أن أدرسَ", notion: "لكن" },
  { id: "l6-4", phrase: "عندما تشرقُ الشمسُ يستيقظُ الديكُ", notion: "عندما" },
  { id: "l6-5", phrase: "دخلَ الطفلُ الصفَّ وهو يحملُ حقيبتَه", notion: "حال" },
  { id: "l6-6", phrase: "غسلَ خالدٌ يديه وأكلَ طعامَه", notion: "عطف" },
  { id: "l6-7", phrase: "الجوُّ جميلٌ لكن الريحَ باردةٌ", notion: "لكن" },
  { id: "l6-8", phrase: "عندما يرنُّ الجرسُ يخرجُ التلاميذُ", notion: "عندما" },
];

// ---------- NIVEAU 7 : التحدي (mélange, plus difficile) ----------
export type ChallengeItem = {
  id: string;
  sentence: string;
  options: Notion[];
  answer: Notion;
  explanation: string;
};

const allNotions: Notion[] = ["حال", "عطف", "لكن", "عندما"];

export const level7: ChallengeItem[] = [
  {
    id: "l7-1",
    sentence: "دخلتِ البنتُ المطبخَ وهي تُغنّي أغنيةً جميلةً.",
    options: allNotions,
    answer: "حال",
    explanation: "و + هي + تُغنّي: تصف حالة البنت أثناء الدخول.",
  },
  {
    id: "l7-2",
    sentence: "زارَ الجدُّ حفيدَه وأحضرَ له لعبةً جميلةً.",
    options: allNotions,
    answer: "عطف",
    explanation: "فعلان متتاليان: زارَ ثم أحضرَ.",
  },
  {
    id: "l7-3",
    sentence: "أرادتْ سلمى الذهابَ إلى الحديقةِ، لكن السماءَ كانت ملبّدةً بالغيومِ.",
    options: allNotions,
    answer: "لكن",
    explanation: "استدراك بين الرغبة في الذهاب وحالة الجوّ.",
  },
  {
    id: "l7-4",
    sentence: "عندما تنتهي الحصةُ، يخرجُ التلاميذُ بهدوءٍ إلى الساحةِ.",
    options: allNotions,
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ انتهاء الحصة يخرج التلاميذ.",
  },
  {
    id: "l7-5",
    sentence: "جرى الكلبُ خلفَ الكرةِ وهو يهزُّ ذيلَه بفرحٍ.",
    options: allNotions,
    answer: "حال",
    explanation: "و + هو + يهزّ: تصف حالة الكلب أثناء الجري.",
  },
  {
    id: "l7-6",
    sentence: "قرأتْ المعلمةُ القصةَ وشرحتْ معناها للتلاميذِ.",
    options: allNotions,
    answer: "عطف",
    explanation: "فعلان متتاليان: قرأتْ ثم شرحتْ.",
  },
  {
    id: "l7-7",
    sentence: "يحبُّ سعيدٌ الرسمَ، لكنه لا يحبُّ الألوانَ الداكنةَ.",
    options: allNotions,
    answer: "لكن",
    explanation: "استدراك بين حبّ الرسم وكراهية بعض الألوان.",
  },
  {
    id: "l7-8",
    sentence: "عندما يسقطُ المطرُ، يفرحُ الفلاحون بالمحصولِ.",
    options: allNotions,
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ سقوط المطر يفرح الفلاحون.",
  },
];

// ---------- التحدي الكبير : Grand défi final (10 questions mixtes) ----------
export type FinalItem = {
  id: string;
  mode: "identify" | "fill";
  sentence: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const finalChallenge: FinalItem[] = [
  {
    id: "f-1",
    mode: "identify",
    sentence: "خرجَ الأولادُ من الصفِّ وهم يضحكون.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هم + يضحكون: تصف حالتهم أثناء الخروج.",
  },
  {
    id: "f-2",
    mode: "identify",
    sentence: "اشترى أبي خبزًا وحليبًا من الدكانِ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "تربط بين شيئين: خبزًا وحليبًا.",
  },
  {
    id: "f-3",
    mode: "fill",
    sentence: "أحبُّ السباحةَ، ______ الماءَ اليومَ باردٌ جدًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "استدراك بين حبّ السباحة وبرودة الماء.",
  },
  {
    id: "f-4",
    mode: "fill",
    sentence: "______ يأتي فصلُ الصيفِ، تُفتحُ المسابحُ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ مجيء الصيف تُفتح المسابح.",
  },
  {
    id: "f-5",
    mode: "identify",
    sentence: "دخلتْ فراشةٌ جميلةٌ الحديقةَ وهي تطيرُ بين الزهورِ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هي + تطير: تصف حالة الفراشة أثناء الدخول.",
  },
  {
    id: "f-6",
    mode: "identify",
    sentence: "نظّفَ التلاميذُ الصفَّ ورتّبوا الكراسيَّ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "فعلان متتاليان: نظّفَ ثم رتّبوا.",
  },
  {
    id: "f-7",
    mode: "fill",
    sentence: "أرادَ يوسفُ اللعبَ، ______ عليه إنهاءَ واجباتِه أولًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "استدراك بين الرغبة في اللعب وواجب الدراسة.",
  },
  {
    id: "f-8",
    mode: "fill",
    sentence: "______ تغيبُ الشمسُ، تُضاءُ المصابيحُ في الشارعِ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ غياب الشمس تُضاء المصابيح.",
  },
  {
    id: "f-9",
    mode: "identify",
    sentence: "وقفَ الجنديُّ أمامَ البابِ وهو يحرسُ المكانَ بانتباهٍ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هو + يحرس: تصف حالة الجندي أثناء الوقوف.",
  },
  {
    id: "f-10",
    mode: "identify",
    sentence: "قرأَ الطفلُ القصةَ وحفظَ العبرةَ منها.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "فعلان متتاليان: قرأَ ثم حفظَ.",
  },
];

// ---------- Devoir (homework quiz) : sous-ensemble équilibré, 10 questions ----------
// Réutilise le format "final" pour garder un moteur de correction unique.
export const homeworkQuiz: FinalItem[] = [
  {
    id: "h-1",
    mode: "identify",
    sentence: "عادَ التلميذُ إلى البيتِ وهو يضحكُ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هو + يضحك: تصف حالته أثناء العودة.",
  },
  {
    id: "h-2",
    mode: "identify",
    sentence: "اشترتِ الأمُّ تفاحًا وموزًا من السوقِ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "تربط بين التفاح والموز.",
  },
  {
    id: "h-3",
    mode: "fill",
    sentence: "أحبُّ اللعبَ، ______ يجبُ أن أدرسَ.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "استدراك بين اللعب والدراسة.",
  },
  {
    id: "h-4",
    mode: "fill",
    sentence: "______ أعودُ إلى البيتِ، أراجعُ دروسي.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ العودة.",
  },
  {
    id: "h-5",
    mode: "identify",
    sentence: "جلستْ سارةُ على الكرسيِّ وهي تبتسمُ.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هي + تبتسم: تصف حالتها أثناء الجلوس.",
  },
  {
    id: "h-6",
    mode: "identify",
    sentence: "غسلَ خالدٌ يديه وأكلَ طعامَه.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "فعلان متتاليان: غسلَ ثم أكلَ.",
  },
  {
    id: "h-7",
    mode: "fill",
    sentence: "الجوُّ جميلٌ اليومَ، ______ الريحَ باردةٌ قليلًا.",
    options: ["لكن", "عندما"],
    answer: "لكن",
    explanation: "استدراك بين الجمال والبرودة.",
  },
  {
    id: "h-8",
    mode: "fill",
    sentence: "______ يرنُّ الجرسُ، يخرجُ التلاميذُ إلى الاستراحةِ.",
    options: ["لكن", "عندما"],
    answer: "عندما",
    explanation: "تفيد الزمن: في وقتِ رنين الجرس.",
  },
  {
    id: "h-9",
    mode: "identify",
    sentence: "مشى الرجلُ في الحديقةِ وهو يُغنّي.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو الحال",
    explanation: "و + هو + يُغنّي: تصف حالته أثناء المشي.",
  },
  {
    id: "h-10",
    mode: "identify",
    sentence: "زارَ عمّي بيتَنا وأحضرَ هديةً.",
    options: ["واو الحال", "واو العطف", "لكن", "عندما"],
    answer: "واو العطف",
    explanation: "فعلان متتاليان: زارَ ثم أحضرَ.",
  },
];
