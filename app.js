/* E-Digital Quran Search AtTartil — static PWA, no build step.
   Data: data/roots.json (Quranic Arabic Corpus morphology, GPL), data/quran.json (ayah text),
         data/fatihah.json (AtTartil entries: meanings + lughah notes, each with a review status). */
(() => {
  'use strict';

  // ---------- i18n ----------
  /* <T> — UI strings; the deploy gate evaluates this block to check every Malay string's bracket glosses */
  const T = {
    ms: {
      title: 'E-Digital Quran Search AtTartil', ph: 'Cari akar, kata atau makna',
      vision: 'Where Qur\'anic Knowledge Transforms Lives',
      dev: 'Dibangunkan oleh Ustaz Zulkiflee Bachik, AtTartil Quranic Institute, Singapura. Pembangun bertanggungjawab sepenuhnya atas susunan kandungan ini; sebarang kesilapan adalah daripada kelemahan kami. Mohon maklumkan melalui www.attartilqi.com supaya dapat dibetulkan. Aplikasi ini alat bantu belajar, bukan fatwa; rujuklah guru dan ulama yang muktabar. Mohon doakan agar usaha kecil ini diterima Allah dan memberi manfaat.', credit: 'Data morfologi & kekerapan: Quranic Arabic Corpus (Kais Dukes, GPL) melalui fork quran-morphology. Nukilan ulama: al-Maktabah al-Shamela. Makna & catatan: AtTartil.',
      intro: 'Cari kalimah al-Quran mengikut akar kata. Lihat kekerapan, bentuk morfologi, makna umum dan catatan ulama lughah (bahasa) dengan rujukan kitab. Contoh carian: akar ر ح م, perkataan رحمة atau makna kasih.',
      coll: 'Koleksi', soon: 'akan datang', allRoots: 'Semua akar (1,651)',
      times: 'kali', freq: 'Kekerapan dalam al-Quran', rank: 'Kedudukan', forms: 'Bentuk', ayatF: 'Dalam al-Fatihah',
      meaning: 'Makna umum', draft: 'Draf', pending: 'Belum diisi',
      morph: 'Morfologi — Sarf (ilmu bentuk kata)', lemma: 'Bentuk asas kalimah (perkataan)', type: 'Jenis', bab: 'Bab (kelompok pola kata kerja) / Wazan (pola kata)', count: 'Bil.',
      lughah: 'Catatan ulama lughah (bahasa)', occ: 'Kedudukan dalam al-Quran', showMore: 'Tunjuk lagi', tapAyah: 'Tekan rujukan untuk melihat ayat.',
      back: '← Kembali', noRes: 'Tiada padanan. Cuba tulis akar kata sahaja, contoh: ع ل م', results: 'Hasil carian',
      noEntry: 'Akar ini belum ada entri AtTartil. Data morfologi di bawah dijana automatik daripada korpus.',
      vol: 'Jld.', page: 'hlm.', loading: 'Memuatkan…', surah: 'Surah', ayah: 'Ayat', word: 'perkataan ke-',
      clear: 'Padam', space: 'Jarak',
      openShamela: 'Buka di al-Maktabah al-Shamela', notFound: 'Tiada entri dalam kitab ini',
      shamelaOnly: 'Semua nukilan diambil daripada al-Maktabah al-Shamela, disemak kata demi kata. Halaman mengikut cetakan.',
      surahs: 'Surah', ready: 'Sedia digunakan', soon2: 'Akan datang', juz30: 'Juz \'Amma (Juz 30)', surahsN: 'surah', openSurah: 'Buka ayat demi ayat', rootList: 'Senarai akar', tapWord: 'Tekan mana-mana perkataan untuk melihat jenisnya — Isim (kata nama), Fi\'il (kata kerja) atau Harf (kata tugas) — serta akar kata dan penerangan ulama.',
      isim: 'Isim (kata nama)', fiil: 'Fi\'il (kata kerja)', harf: 'Harf (kata tugas)', parts: 'Pecahan perkataan', root: 'Akar kata', fullRoot: 'Lihat akar penuh',
      scholars: 'Penerangan ulama (al-Maktabah al-Shamela)', grammarSrc: 'Analisis tatabahasa: Quranic Arabic Corpus', trDraft: 'Terjemahan AtTartil — draf, menunggu semakan',
      stated: 'Ulama ini menyebut ayat ini secara khusus', general: 'Penerangan umum — ulama ini tidak menyebut ayat ini', noNote: 'Penerangan ulama belum disediakan.', close: 'Tutup', ayatN: 'ayat', reported: 'pandangan yang dinukil (qila)',
      tabMakna: 'Makna', tabBab: 'Bab (kelompok pola kata kerja) & Wazan (pola kata)', tabFuruq: 'Furuq (perbezaan halus makna)', tabAll: 'Semua',
      famT: 'Keluarga Makna', famIntro: 'Satu perkataan Melayu, beberapa kalimah al-Quran. Lihat beza halusnya menurut ulama bahasa.', famRoots: 'akar kata', famDefs: 'Huraian ulama & contoh ayat', famDiff: 'Apa bezanya?', famDiffIntro: 'Perbezaan halus yang dihuraikan oleh ulama. Nama ulama disebut pada setiap kad.', famWujuh: 'Makna-makna __W__ dalam al-Quran', famRootLink: 'Lihat akar penuh', famChosenScholar: 'Dipetik oleh __S__', famChosenUs: 'Contoh pilihan AtTartil', famEdition: 'Bacaan edisi lain', famIn: 'Keluarga makna', famGaps: 'Catatan', famCount: 'kali dalam makna ini', famPartial: '(kiraan terpilih)', tdT: 'Sudut Taraduf (kata seerti)', tdViews: 'Tiga pandangan ulama', tdBenefits: 'Faedah kata seerti menurut Ibn \'Ashur', tdMuk: 'Kata-kata pertolongan dalam al-Mukhassas', tdNew: 'baharu dalam keluarga ini', tdQuran: 'Contoh dalam al-Quran: disangka seerti, sebenarnya berbeza', tdLink: 'Kaitan dengan halaman ini', tdReported: 'dinukil',
      glossTitle: 'Glosari istilah', glossIntro: 'Setiap istilah Arab yang muncul dalam app ini, dengan penjelasan ringkas. Tekan mana-mana istilah bergaris dalam nota untuk sampai ke sini.', glossPh: 'Cari istilah…', glossN: 'istilah', glossCat: { nahu: 'Nahu (tatabahasa)', sarf: 'Sarf (bentuk kata)', balaghah: 'Balaghah (gaya bahasa)', tafsir: 'Tafsir', lughah: 'Lughah (makna kata)', umum: 'Umum' }, glossAll: 'Semua', glossNone: 'Tiada istilah sepadan.',
      babThis: 'Bab (kelompok pola kata kerja) kalimah ini', babOther: 'Bentuk lain akar ini dalam al-Quran', babMeaning: 'Makna bab (kelompok pola kata kerja) ini menurut ulama sarf (ilmu bentuk kata)',
      inQuran: 'dalam al-Quran', noBab: 'Kalimah ini bukan fi\'il (kata kerja) yang berwazan (mengikut pola kata); tiada bab (kelompok pola kata kerja).', noFuruq: 'Tiada entri tentang furuq (perbezaan halus makna) kalimah ini dalam kitab al-Furuq al-Lughawiyyah.',
      scholarNote: 'Catatan ulama tentang ayat ini', irab: "I'rab (kedudukan dan baris akhir kata) ringkas", furuqIntro: 'Beza kalimah ini dengan kalimah yang hampir sama maknanya.', babIntro: 'Bagaimana makna berubah apabila bab (kelompok pola kata kerja) berubah.',
      times2: 'kali',
      lvMudah: 'Mudah', lvIlmiah: 'Ilmiah', lvLabel: 'Aras bacaan',
      trBy: 'Terjemahan ayat:', notesBy: 'Ulasan kitab diterjemah oleh AtTartil dalam Bahasa Melayu mudah; nukilan asalnya dipaparkan di sebelahnya.',
      oneQ: 'Apa ayat ini mahu sampaikan?',
      oneSrc: 'Ringkasan daripada nukilan ulama di bawah — bukan tambahan baharu.',
      lvHintM: 'Aras Mudah: makna dalam Bahasa Melayu sahaja. Tekan «Ilmiah» untuk melihat nukilan Arab, i\'rab (kedudukan dan baris akhir kata) serta fi\'il (kata kerja) dan fa\'il (pelaku).',
      seeQuote: 'Lihat nukilan asal', seeMore: 'Lihat huraian penuh (aras Ilmiah)',
      wMeaning: 'Maknanya',
      elided: 'tidak ditulis (dibuang)', rootMeaning: 'Makna akar kata',
      otherRef: 'Ulama ini menulis penerangan ini untuk ayat lain (__R__). Ia dipaparkan di sini sebagai penerangan umum, bukan bacaan khusus bagi perkataan ini.',
      irabDiff: 'Label di atas dan nota ulama di bawah dipilih mengikut tag Quranic Arabic Corpus. Kitab i\'rab (kedudukan dan baris akhir kata) karya Mahmud Safi, al-Jadwal, yang dinukil dalam panel I\'rab bagi ayat ini, membaca perkataan ini secara berbeza:',
      irabDiffM: 'Kitab i\'rab (kedudukan dan baris akhir kata) membaca perkataan ini secara berbeza. Lihat aras Ilmiah.',
      prev: '‹ Sebelum', next: 'Seterusnya ›',
      failT: "Fi'il (kata kerja) & Fa'il (pelaku)", failIntro: 'Setiap fi\'il (kata kerja) dalam ayat ini dan pelakunya, dinukil daripada kitab i\'rab (kedudukan dan baris akhir kata).',
      failNone: 'Tiada fi\'il (kata kerja) dalam ayat ini.', failSub: 'Pelaku', failTaqdir: 'Taqdir (lafaz yang diandaikan)',
      mjBack: 'Kembali kepada', failSubPass: 'Pengganti pelaku (naib fa\'il)', mjKitab: 'Menurut', mjSiyaq: 'Difahami daripada susunan ayat', mjViews: 'Dua pendapat ulama:', mjQuote: 'Lihat nukilan kitab',
      failNotStated: 'Kitab tidak menamakan fa\'il (pelaku) bagi fi\'il (kata kerja) ini.', failList: 'Senarai fi\'il (kata kerja) & fa\'il (pelaku) surah ini',
      failXref: 'Kitab merujuk kembali kepada i\'rab (kedudukan dan baris akhir kata) terdahulu (ayat __A__); nukilan kedua di bawah ialah i\'rab yang dirujuk itu.',
      voiceAct: 'Fi\'il Ma\'lum (kata kerja aktif)', voicePass: 'Fi\'il Majhul (kata kerja pasif)',
      failInWord: 'Pelaku ada dalam kalimah itu sendiri', failVerbs: 'kata kerja',
      tafT: 'Tafsir ringkas — Ibn \'Ashur', tafPts: 'nukilan',
      tafIntro: 'Nukilan ringkas daripada al-Tahrir wa al-Tanwir. Hanya nukilan kata beliau; bukan fatwa, bukan ijmak (kesepakatan ulama), dan bukan tadabbur (renungan peribadi terhadap ayat).',
      tafDup: 'Nukilan ini dipaparkan penuh dalam «Catatan ulama tentang ayat ini» di atas.',
      mqT: 'Maqsad Ayat (tujuan ayat)', mqPts: 'nukilan',
      mqNukil: 'Maqsad ayat — nukilan ulama',
      mqIntro: 'Maqsad (tujuan) ayat ini, dinukil daripada kitab tafsir.',
      babPartial: 'Nukilan di bawah merangkumi sebahagian makna ini sahaja; nukilan khusus bagi setiap makna sedang disiapkan.',
      lemOnly: 'Catatan ini bagi kalimah:',
      babHidden: 'Makna-makna umum pola ini menurut al-Hamlawi tidak dipaparkan bagi kalimah ini.',
      babGeneral: 'Ini makna-makna umum pola ini menurut al-Hamlawi. Tidak semuanya terpakai pada kalimah ini.',
      babOneUnknown: 'Data ini tidak dapat menentukan sama ada kalimah ini mengikut pola فَعَلَ, فَعِلَ atau فَعُلَ. Oleh itu makna bab (kelompok pola kata kerja) tidak dipaparkan.',
      tdHomeT: 'Sudut Taraduf (kata seerti)', tdHomeDef: 'Taraduf (kata seerti) ialah dua perkataan atau lebih yang menunjuk kepada satu makna yang sama. Ulama bahasa berbeza pendapat tentangnya: ada yang menolak, ada yang menerima, dan ada pandangan pertengahan.', tdHomeViews: 'Lihat tiga pandangan ulama', tdHomeList: 'Senarai perkataan (A–Z)', tdHomeHint: 'Tekan satu perkataan Melayu untuk melihat kalimah-kalimah al-Quran yang hampir sama maknanya dan apa bezanya menurut ulama.', tdPageIntro: 'Halaman ini menghimpunkan pandangan ulama tentang taraduf (kata seerti). Setiap pandangan disertakan nukilan kitabnya. Ketiga-tiganya dipaparkan tanpa diutamakan satu atas yang lain.', tdWords: 'kalimah',
      msT: 'Maqsad Surah (tujuan surah)', msIntro: 'Tujuan induk surah ini menurut ulama yang mengkaji maqasid (tujuan-tujuan utama) surah. Dua ulama boleh merangkanya dengan cara berbeza; kedua-duanya dipaparkan tanpa dipilih salah satu.',
      tadLab: 'Tadabbur · Renungan, bukan tafsir', tadRenung: 'Renung', tadTanya: 'Tanya Diri', tadTanyaHint: 'Jujurlah; hanya Allah yang melihat.',
      tadFoot: 'Renungan AtTartil berdasarkan makna ayat. Huraian ulama ada dalam Maqsad Ayat dan Tafsir.',
      tadDraft: 'Draf — belum disemak', tadSee: 'lihat tadabbur ayat __R__',
      tadHomeT: 'Ayat Pilihan Tadabbur', tadHomeIntro: 'Ayat-ayat pilihan untuk tadabbur (merenung makna). Renungi maknanya dan tanya diri sendiri.', tadHomeGo: 'Lihat senarai ayat pilihan',
      tadListIntro: 'Ayat pilihan disusun mengikut tema. Tekan satu ayat untuk membuka kad tadabburnya pada ayat itu.',
      tadNone: 'Ayat pilihan sedang disediakan.'
    },
    en: {
      title: 'E-Digital Quran Search AtTartil', ph: 'Search a root, word or meaning',
      vision: 'Where Qur\'anic Knowledge Transforms Lives',
      dev: 'Developed by Ustaz Zulkiflee Bachik, AtTartil Quranic Institute, Singapore. The developer takes full responsibility for how this content is arranged; any error is our own shortcoming. Please report it via www.attartilqi.com so it can be corrected. This app is a learning aid, not a fatwa; please refer to qualified teachers and scholars. Kindly pray that this small effort is accepted by Allah and brings benefit.', credit: 'Morphology & frequency data: Quranic Arabic Corpus (Kais Dukes, GPL) via the quran-morphology fork. Scholarly quotations: al-Maktabah al-Shamela. Meanings & notes: AtTartil.',
      intro: 'Look up Qur\'anic words by root. See frequency, morphological forms, general meaning and notes from the scholars of lughah with book references. Try: the root ر ح م, the word رحمة or the meaning mercy.',
      coll: 'Collections', soon: 'coming soon', allRoots: 'All roots (1,651)',
      times: 'times', freq: 'Frequency in the Qur\'an', rank: 'Rank', forms: 'Forms', ayatF: 'In al-Fatihah',
      meaning: 'General meaning', draft: 'Draft', pending: 'Not yet filled',
      morph: 'Morphology (Sarf)', lemma: 'Word (lemma)', type: 'Type', bab: 'Verb form / pattern', count: 'Count',
      lughah: 'Notes from the scholars of lughah', occ: 'Occurrences in the Qur\'an', showMore: 'Show more', tapAyah: 'Tap a reference to see the ayah.',
      back: '← Back', noRes: 'No match. Try typing just the root letters, e.g. ع ل م', results: 'Search results',
      noEntry: 'This root has no AtTartil entry yet. The morphology below is generated automatically from the corpus.',
      vol: 'Vol.', page: 'p.', loading: 'Loading…', surah: 'Surah', ayah: 'Ayah', word: 'word ',
      clear: 'Clear', space: 'Space',
      openShamela: 'Open in al-Maktabah al-Shamela', notFound: 'No entry in this book',
      shamelaOnly: 'All quotations are taken from al-Maktabah al-Shamela and checked word for word. Page numbers follow the printed edition.',
      surahs: 'Surahs', ready: 'Ready to use', soon2: 'Coming soon', juz30: 'Juz \'Amma (Juz 30)', surahsN: 'surahs', openSurah: 'Open ayah by ayah', rootList: 'Root list', tapWord: 'Tap any word to see its type (Isim, Fi\'il, Harf), its root and the scholars\' explanation.',
      isim: 'Isim (noun)', fiil: 'Fi\'il (verb)', harf: 'Harf (particle)', parts: 'Parts of the word', root: 'Root', fullRoot: 'See full root',
      scholars: 'Scholars\' explanation (al-Maktabah al-Shamela)', grammarSrc: 'Grammar analysis: Quranic Arabic Corpus', trDraft: 'AtTartil translation — draft, awaiting review',
      stated: 'This scholar cites this very ayah', general: 'General explanation — this scholar does not cite this ayah', noNote: 'Scholars\' explanation not yet prepared.', close: 'Close', ayatN: 'ayat', reported: 'a reported view (qila)',
      tabMakna: 'Meaning', tabBab: 'Form & pattern', tabFuruq: 'Furuq', tabAll: 'All',
      famT: 'Meaning Families', famIntro: 'One Malay word, several Qur\'anic words. See their fine differences according to the classical linguists.', famRoots: 'roots', famDefs: 'Scholars\' explanations & example ayat', famDiff: 'What is the difference?', famDiffIntro: 'Fine differences explained by the scholars. Each card names its scholar.', famWujuh: 'The meanings of __W__ in the Qur\'an', famRootLink: 'See the full root', famChosenScholar: 'Cited by __S__', famChosenUs: 'Example chosen by AtTartil', famEdition: 'Another edition reads', famIn: 'Meaning family', famGaps: 'Note', famCount: 'times in this sense', famPartial: '(selected count)', tdT: 'The Synonymy Corner', tdViews: 'Three scholarly views', tdBenefits: 'Benefits of synonyms according to Ibn \'Ashur', tdMuk: 'Words for help in al-Mukhassas', tdNew: 'new to this family', tdQuran: 'Qur\'anic examples: thought synonymous, actually different', tdLink: 'How this connects to this page', tdReported: 'reported',
      glossTitle: 'Glossary of terms', glossIntro: 'Every Arabic term used in this app, with a short explanation. Tap any underlined term in a note to come here.', glossPh: 'Search terms…', glossN: 'terms', glossCat: { nahu: 'Nahu (syntax)', sarf: 'Sarf (morphology)', balaghah: 'Balaghah (rhetoric)', tafsir: 'Tafsir', lughah: 'Lughah (lexicon)', umum: 'General' }, glossAll: 'All', glossNone: 'No matching term.',
      babThis: 'The form of this word', babOther: 'Other forms of this root in the Qur\'an', babMeaning: 'What this form adds, per the scholars of sarf',
      inQuran: 'in the Qur\'an', noBab: 'This word is not a patterned verb form; no bab.', noFuruq: 'No al-Furuq al-Lughawiyyah entry for this word.',
      scholarNote: 'Scholars\' note on this ayah', irab: 'Brief i\'rab', furuqIntro: 'How this word differs from its near-synonyms.', babIntro: 'How the meaning changes when the pattern (bab) changes.',
      times2: 'times',
      lvMudah: 'Simple', lvIlmiah: 'Scholarly', lvLabel: 'Reading level',
      trBy: 'Verse translation:', notesBy: 'The scholars\' notes are rendered into plain Malay by AtTartil; the original quotation is shown beside each one.',
      oneQ: 'What is this ayah getting at?',
      oneSrc: 'A summary of the scholars\' words quoted below — nothing added.',
      lvHintM: 'Simple level: meanings in plain language only. Tap "Scholarly" to see the Arabic quotations, i\'rab and verb subjects.',
      seeQuote: 'See the original quotation', seeMore: 'See the full treatment (Scholarly level)',
      wMeaning: 'Meaning',
      elided: 'not written (elided)', rootMeaning: 'Root meaning',
      otherRef: 'The scholar wrote this note for another ayah (__R__). It is shown here as a general explanation, not as the reading of this word.',
      irabDiff: 'The label above and the scholar\'s note below follow the Quranic Arabic Corpus tag. Mahmud Safi\'s al-Jadwal, quoted in this ayah\'s I\'rab panel, reads this word differently:',
      irabDiffM: 'The book of i\'rab reads this word differently. See the Scholarly level.',
      prev: '‹ Previous', next: 'Next ›',
      failT: 'Verb & subject (Fa\'il)', failIntro: 'Every verb in this ayah and its subject, quoted from the books of i\'rab.',
      failNone: 'No verb in this ayah.', failSub: 'Subject', failTaqdir: 'Taqdir',
      mjBack: 'Refers back to', failSubPass: 'Stand-in subject (na\'ib fa\'il)', mjKitab: 'According to', mjSiyaq: 'Understood from the wording of the ayah', mjViews: 'Two scholarly views:', mjQuote: 'See the kitab quotation',
      failNotStated: 'The book does not name a fa\'il for this verb.', failList: 'Verbs & subjects in this surah',
      failXref: 'The book cross-refers to its earlier parse (ayah __A__); the second quotation below is the parse referred to.',
      voiceAct: 'Active (ma\'lum)', voicePass: 'Passive (majhul)',
      failInWord: 'The subject is inside the word itself', failVerbs: 'verbs',
      tafT: 'Brief tafsir — Ibn \'Ashur', tafPts: 'points',
      tafIntro: 'Short quotations from al-Tahrir wa al-Tanwir. These are his words only — not a fatwa, not ijma\', and not tadabbur.',
      tafDup: 'This passage is shown in full under "Scholars\' note on this ayah" above.',
      mqT: 'Maqsad of the ayah (its purpose)', mqPts: 'points',
      mqNukil: 'Maqsad of the ayah — scholars\' words',
      mqIntro: 'The maqsad (purpose) of this ayah, quoted from the books of tafsir.',
      babPartial: 'The quotations below cover only some of these meanings; a quotation for each meaning is being prepared.',
      lemOnly: 'This note is for the word(s):',
      babHidden: 'Al-Hamlawi\'s general meanings of this pattern are not shown for this word.',
      babGeneral: 'These are the general meanings of this pattern according to al-Hamlawi. Not all of them apply to this word.',
      babOneUnknown: 'The data cannot tell whether this word follows فَعَلَ, فَعِلَ or فَعُلَ, so no bab meanings are shown.',
      tdHomeT: 'Taraduf corner (synonyms)', tdHomeDef: 'Taraduf (synonymy) means two or more words that point to one and the same meaning. Scholars of Arabic differ on it: some deny it, some accept it, and there is a middle view.', tdHomeViews: 'See the three scholarly views', tdHomeList: 'Word list (A–Z)', tdHomeHint: 'Tap a Malay word to see the Qur\'anic words that are close in meaning and how the scholars tell them apart.', tdPageIntro: 'This page gathers the scholars\' views on taraduf (synonymy), each with its quotations. The three views are shown without one being preferred.', tdWords: 'words',
      msT: 'Maqsad of the surah (its purpose)', msIntro: 'This surah\'s governing purpose according to the scholars of maqasid al-suwar. Two scholars may frame it differently; both are shown without one being preferred.',
      tadLab: 'Tadabbur · A reflection, not tafsir', tadRenung: 'Reflect', tadTanya: 'Ask yourself', tadTanyaHint: 'Be honest; only Allah is watching.',
      tadFoot: 'AtTartil\'s reflection, based on the meaning of the ayah. The scholars\' explanations are in Maqsad of the ayah and Brief tafsir.',
      tadDraft: 'Draft — not yet reviewed', tadSee: 'see the tadabbur for ayat __R__',
      tadHomeT: 'Selected Ayat for Tadabbur', tadHomeIntro: 'Selected ayat for tadabbur, reflecting on the meaning. Reflect on the meaning and ask yourself.', tadHomeGo: 'See the list of selected ayat',
      tadListIntro: 'The selected ayat are grouped by theme. Tap an ayah to open its tadabbur card at that ayah.',
      tadNone: 'The selected ayat are being prepared.'
    }
  };
  /* </T> */
  // Grammar label tables (TYPES, PTAG, NTAG, CASE, MOOD, person/gender/number) live in data/labels.json,
  // each with the glossary key of its Malay gloss; the deploy gate checks them against glossary.json.
  let LB = { TYPE: {}, TYPES: {}, PTAG: {}, NTAG: {}, CASE: {}, MOOD: {}, PERSON: {}, GENDER: {}, NUMBER: {}, MISC: {}, manifest: {} };
  // Form I has three babs (فَعَلَ / فَعِلَ / فَعُلَ); the real one is read from the lemma's middle vowel (see PICK.formOneWazan)
  const BAB = { '1': ['I', 'فَعَلَ / فَعِلَ / فَعُلَ'], '2': ['II', 'فَعَّلَ'], '3': ['III', 'فَاعَلَ'], '4': ['IV', 'أَفْعَلَ'],
    '5': ['V', 'تَفَعَّلَ'], '6': ['VI', 'تَفَاعَلَ'], '7': ['VII', 'انْفَعَلَ'], '8': ['VIII', 'افْتَعَلَ'], '9': ['IX', 'افْعَلَّ'],
    '10': ['X', 'اسْتَفْعَلَ'], '11': ['XI', 'افْعَالَّ'], '12': ['XII', 'افْعَوْعَلَ'] };
  // roots.json counts of a lemma's forms (V-PERF, V-IMPF …), which formOneWazan needs to tell a past lemma from a present one
  const lemForms = (root, lemma) => { const l = ROOTS && ROOTS[root] && ROOTS[root].lem.find(x => x[0] === lemma); return l ? l[4] : null; };
  const babWazan = (vf, lemma, forms) => (vf === '1' && PICK.formOneWazan(lemma, forms)) || (BAB[vf] || ['', ''])[1];
  // a Form I noun (راحِم) takes the bab of its root's Form I verb when that verb's bab is known and unique
  const babCell = (vf, lemma, R, isVerb, forms) => {
    const wz = vf === '1' && !isVerb && !PICK.formOneWazan(lemma, forms) && R ? (PICK.rootFormOne(R.lem) || BAB[vf][1]) : babWazan(vf, lemma, forms);
    return BAB[vf] ? `<span class="arw1${wz.includes('/') ? ' tri' : ''}">${wz}</span><span class="muted small">${esc(lab(LB.MISC.BAB, false))} ${BAB[vf][0]}${mudah() && lang !== 'en' && glossOf('bab') ? ` (${esc(glossOf('bab'))})` : ''}${vf === '1' ? ' · ' + esc(lab(LB.MISC.THULATHI)) : ''}</span>` : ''; };
  const SURAH = ['الفاتحة','البقرة','آل عمران','النساء','المائدة','الأنعام','الأعراف','الأنفال','التوبة','يونس','هود','يوسف','الرعد','إبراهيم','الحجر','النحل','الإسراء','الكهف','مريم','طه','الأنبياء','الحج','المؤمنون','النور','الفرقان','الشعراء','النمل','القصص','العنكبوت','الروم','لقمان','السجدة','الأحزاب','سبأ','فاطر','يس','الصافات','ص','الزمر','غافر','فصلت','الشورى','الزخرف','الدخان','الجاثية','الأحقاف','محمد','الفتح','الحجرات','ق','الذاريات','الطور','النجم','القمر','الرحمن','الواقعة','الحديد','المجادلة','الحشر','الممتحنة','الصف','الجمعة','المنافقون','التغابن','الطلاق','التحريم','الملك','القلم','الحاقة','المعارج','نوح','الجن','المزمل','المدثر','القيامة','الإنسان','المرسلات','النبأ','النازعات','عبس','التكوير','الانفطار','المطففين','الانشقاق','البروج','الطارق','الأعلى','الغاشية','الفجر','البلد','الشمس','الليل','الضحى','الشرح','التين','العلق','القدر','البينة','الزلزلة','العاديات','القارعة','التكاثر','العصر','الهمزة','الفيل','قريش','الماعون','الكوثر','الكافرون','النصر','المسد','الإخلاص','الفلق','الناس'];

  // ---------- state ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
  };
  let lang = store.get('kamus.lang', 'ms');
  let size = store.get('kamus.size', 19);
  let level = store.get('kamus.level', 'mudah');        // 'mudah' = beginner, 'ilmiah' = full
  const mudah = () => level === 'mudah';
  let ROOTS = null, ROOT_KEYS = [], ENTRIES = {}, COLLS = [], QURAN = null, LEMMA_IDX = [], HURUF = {}, NOTES = {}, BABS = null, IRAB = [], FAIL = { books: {}, v: {} }, TAFSIR = { book: {}, v: {} }, MAQSAD = { books: {}, v: {} }, MAQSURAH = { s: {} }, GLOSS = { terms: [] }, GLOSS_IDX = null, GLOSS_RE = null, GLOSS_K = new Map(), GLOSS_BASE = new Map(), GLOSS_ANY_RE = null, WHO = {}, FAMS = { families: [] }, TAD = { themes: [], items: [] };
  const SDATA = {}, STR = {}, SHUR = {};
  const FORM_IDX = new Map(); // mushaf word form (normalised) -> roots
  const t = k => (T[lang] && T[lang][k]) || T.ms[k] || k;
  const $ = s => document.querySelector(s);
  // P1 gate: a raw data field name left in a note ("(3/366, page_id 1288)") is never shown: → "(3/366)"
  const esc = s => String(s ?? '').replace(/[,;]?\s*\bpage_id\s*[:=]?\s*\d+/g, '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Arabic normalisation for search: drop harakat/tatweel, unify hamza seats & alif forms
  const norm = s => String(s || '')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[ٱأإآ]/g, 'ا').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
    .replace(/[\s\-_.,،]+/g, '');
  const isArabic = s => /[؀-ۿ]/.test(s);
  const spaced = r => r.split('').join(' ');

  // ---------- data ----------
  async function load() {
    const [roots, colls, fat, huruf, notes, babs, irab, fail, taf, mq, mqs, gl, bk, fm, lb, td] = await Promise.all([
      fetch('data/roots.json').then(r => r.json()),
      fetch('data/collections.json').then(r => r.json()),
      fetch('data/fatihah.json').then(r => r.json()),
      fetch('data/huruf.json').then(r => r.json()).catch(() => ({})),
      fetch('data/notes.json').then(r => r.json()).catch(() => ({})),
      fetch('data/babs.json').then(r => r.json()).catch(() => null),
      fetch('data/irab.json').then(r => r.json()).catch(() => []),
      fetch('data/fail.json').then(r => r.json()).catch(() => ({ books: {}, v: {} })),
      fetch('data/tafsir.json').then(r => r.json()).catch(() => ({ book: {}, v: {} })),
      fetch('data/maqsad.json').then(r => r.json()).catch(() => ({ books: {}, v: {} })),
      fetch('data/maqsad-surah.json').then(r => r.json()).catch(() => ({ s: {} })),
      fetch('data/glossary.json').then(r => r.json()).catch(() => ({ terms: [] })),
      fetch('data/books.json').then(r => r.json()).catch(() => ({ books: {} })),
      fetch('data/families.json').then(r => r.json()).catch(() => ({ families: [] })),
      fetch('data/labels.json').then(r => r.json()),
      fetch('data/tadabbur.json').then(r => r.json()).catch(() => ({ themes: [], items: [] }))
    ]);
    LB = lb;
    HURUF = huruf; NOTES = notes; BABS = babs; IRAB = irab; FAIL = fail; TAFSIR = taf; MAQSAD = mq; MAQSURAH = mqs; GLOSS = gl; buildGlossIdx(); WHO = bk.books || {}; FAMS = fm; TAD = td && Array.isArray(td.items) ? td : { themes: [], items: [] };
    ROOTS = roots; ROOT_KEYS = Object.keys(roots); COLLS = colls;
    fat.entries.forEach(e => { ENTRIES[e.root] = Object.assign({ coll: fat.id }, e); });
    ROOT_KEYS.forEach(r => {
      roots[r].lem.forEach(l => LEMMA_IDX.push([norm(l[0]), r]));
      (roots[r].w || '').split(' ').forEach(w => w && FORM_IDX.set(w, (FORM_IDX.get(w) || new Set()).add(r)));
    });
  }
  async function loadQuran() {
    if (!QURAN) QURAN = await fetch('data/quran.json').then(r => r.json());
    return QURAN;
  }

  // ---------- search ----------
  function search(q) {
    const out = new Map();
    const add = (r, score) => { if (!out.has(r) || out.get(r) < score) out.set(r, score); };
    if (isArabic(q)) {
      const n = norm(q);
      if (!n) return [];
      ROOT_KEYS.forEach(r => {
        const nr = norm(r);
        if (nr === n) add(r, 100);
        else if (n.length >= 2 && nr.startsWith(n)) add(r, 60);
      });
      LEMMA_IDX.forEach(([nl, r]) => {
        if (nl === n) add(r, 90);
        else if (n.length >= 2 && nl.includes(n)) add(r, 40);
      });
      (FORM_IDX.get(n) || []).forEach(r => add(r, 95));
      // word as written in the mushaf with prefixes (e.g. والرحمة): try stripping common prefixes
      const stripped = n.replace(/^(وال|فال|بال|كال|لل|ال|و|ف|ب|ل|ك)/, '');
      if (stripped !== n && stripped.length >= 2) LEMMA_IDX.forEach(([nl, r]) => { if (nl === stripped) add(r, 80); });
    } else {
      const n = q.trim().toLowerCase();
      if (n.length < 2) return [];
      Object.values(ENTRIES).forEach(e => {
        const hay = (e.meaning.ms + ' ' + e.meaning.en).toLowerCase();
        if (hay.includes(n)) add(e.root, 70);
      });
    }
    return [...out.entries()].sort((a, b) => b[1] - a[1] || ROOTS[b[0]].f - ROOTS[a[0]].f).map(x => x[0]).slice(0, 60);
  }

  // ---------- views ----------
  const maxF = () => ROOTS[ROOT_KEYS[0]].f;
  function rootCard(r) {
    const R = ROOTS[r], e = ENTRIES[r];
    const pct = Math.max(2, Math.round(Math.log(R.f + 1) / Math.log(maxF() + 1) * 100));
    return `<a class="rcard" href="#/root/${encodeURIComponent(r)}">
      <div class="rt">${esc(spaced(r))}</div>
      <div class="mn">${e ? esc(e.meaning[lang]) : `<span class="ar">${esc(R.lem[0][0])}</span>`}</div>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <div class="fq"><span>${R.f.toLocaleString()} ${t('times')}</span><span>${R.lem.length} ${t('forms').toLowerCase()}</span></div>
    </a>`;
  }

  function viewHome() {
    const ready = COLLS.filter(c => c.ready), soon = COLLS.filter(c => !c.ready);
    const juz30 = soon.filter(c => c.juz === 30), other = soon.filter(c => c.juz !== 30);
    const rcard = c => `<a class="scard" href="#/s/${c.surah}"><span class="sc-ar ar">${esc(SURAH[c.surah - 1])}</span>
        <span class="sc-meta"><b>${esc(c.name_ms || 'Surah')}</b><span class="muted small">${t('surah')} ${c.surah} · ${c.range ? `${t('ayatN')} <span class="nw">${esc(c.range)}</span>` : `${c.ayat} ${t('ayatN')}`} · ${t('openSurah')} →</span></span></a>`;
    const scard = (c, tight) => `<div class="scard off"><span class="sc-ar ar">${esc(SURAH[c.surah - 1])}</span>
        <span class="sc-meta"><b>${esc((c.name_ms || 'Surah').replace(/^Surah /, tight ? '' : 'Surah '))}</b><span class="muted small">${tight ? `${c.surah} · ${c.ayat} ${t('ayatN')}` : `${t('surah')} ${c.surah} · ${c.range ? `${t('ayatN')} <span class="nw">${esc(c.range)}</span>` : `${c.ayat} ${t('ayatN')}`}`}</span></span></div>`;
    return `<section class="card"><p style="margin:0">${t('intro')}</p></section>
      <h2>${t('ready')}</h2><div class="sgrid">${ready.map(rcard).join('')}</div>
      ${other.length ? `<h2 class="soon-h">${t('soon2')}</h2><div class="sgrid">${other.map(scard).join('')}</div>` : ''}
      ${juz30.length ? `<h2 class="soon-h">${t('juz30')} <span class="muted small">(${juz30.length} ${t('surahsN')} · ${t('soon')})</span></h2>
        <div class="sgrid compact">${juz30.map(c => scard(c, true)).join('')}</div>` : ''}
      <div class="chips" style="margin-top:16px"><a class="chip" href="#/c/fatihah">${t('rootList')} · <span class="ar">الفاتحة</span></a><a class="chip" href="#/all">${t('allRoots')}</a><a class="chip" href="#/istilah">${t('glossTitle')}</a><a class="chip" href="#/makna">${t('famT')}</a>${tadItems().length ? `<a class="chip" href="#/tadabbur">${t('tadHomeT')}</a>` : ''}</div>
      ${tadHome()}${tdHome()}`;
  }
  // ---------- Sudut Taraduf (home): definition, link to the three views, alphabetical list of meaning families ----------
  const famSorted = () => (FAMS.families || []).filter(f => f.status === 'verified')
    .slice().sort((a, b) => String(a['title_' + lang] || a.title_ms).localeCompare(String(b['title_' + lang] || b.title_ms), lang));
  function tdLetters() {
    const by = new Map();
    famSorted().forEach(f => { const k = String(f['title_' + lang] || f.title_ms).charAt(0).toUpperCase(); if (!by.has(k)) by.set(k, []); by.get(k).push(f); });
    return [...by.entries()].map(([k, fs]) => `<div class="td-az"><span class="td-l">${esc(k)}</span><span class="chips">${fs.map(f => `<a class="chip" href="#/makna/${esc(f.id)}">${esc(f['title_' + lang] || f.title_ms)}</a>`).join('')}</span></div>`).join('');
  }
  function tdHome() {
    const n = famSorted().length; if (!n) return '';
    return `<section class="card td-home"><h2>${t('tdHomeT')}</h2><p>${t('tdHomeDef')}</p>
      <p><a class="more-link" href="#/taraduf">${t('tdHomeViews')} →</a></p>
      <h3>${t('tdHomeList')} <span class="muted small">(${n})</span></h3><p class="muted small">${t('tdHomeHint')}</p>${tdLetters()}</section>`;
  }
  function viewTaraduf() {
    const src = (FAMS.families || []).find(f => f.taraduf && f.taraduf.status === 'verified');
    const td = src && src.taraduf; const L = o => o['note_' + lang] || o.note_ms;
    return `<a class="back" href="#/">${t('back')}</a><h2>${t('tdHomeT')}</h2><p class="fam-intro">${t('tdHomeDef')}</p><p class="muted">${t('tdPageIntro')}</p>
      ${td ? `<h3>${t('tdViews')}</h3><div class="td-grid">${(td.views || []).map(v => `<article class="card td-v"><h4>${esc(v['label_' + lang] || v.label_ms)}</h4>${tdQuoted(v.quotes, L(v))}</article>`).join('')}</div>
      ${td.ibn_ashur_benefits ? `<article class="card td-b"><h3>${t('tdBenefits')}</h3>${tdQuoted(td.ibn_ashur_benefits.quotes, L(td.ibn_ashur_benefits))}<div>${ayChips(td.ibn_ashur_benefits.ayat)}</div></article>` : ''}` : ''}
      <section class="card td-home"><h3>${t('tdHomeList')} <span class="muted small">(${famSorted().length})</span></h3>${tdLetters()}</section>`;
  }

  function viewRoots(collId) {
    const id = collId || 'fatihah';
    const list = Object.values(ENTRIES).filter(e => e.coll === id).map(e => e.root);
    return `<a class="back" href="#/">${t('back')}</a><h2>${t('rootList')} · <span class="ar">${esc((COLLS.find(c => c.id === id) || {}).ar || '')}</span></h2>
      <div class="grid">${list.map(rootCard).join('')}</div>`;
  }

  function viewAll(page) {
    const per = 60, p = Math.max(1, page | 0), start = (p - 1) * per;
    const slice = ROOT_KEYS.slice(start, start + per);
    const pages = Math.ceil(ROOT_KEYS.length / per);
    return `<a class="back" href="#/">${t('back')}</a><h2>${t('allRoots')}</h2>
      <div class="grid">${slice.map(rootCard).join('')}</div>
      <div class="chips" style="margin-top:16px">
        ${p > 1 ? `<a class="chip pg" href="#/all/${p - 1}">${t('prev')}</a>` : ''}<span class="chip on pg-n">${p} / ${pages}</span>${p < pages ? `<a class="chip pg" href="#/all/${p + 1}">${t('next')}</a>` : ''}
      </div>`;
  }

  function viewSearch(q) {
    const res = search(q);
    return `<h2>${t('results')} <span class="muted small">(${res.length})</span></h2>
      ${res.length ? `<div class="grid">${res.map(rootCard).join('')}</div>` : `<div class="empty">${t('noRes')}</div>`}`;
  }

  function typeLabel(types) {
    const used = new Set();   // P1 gate: a term is glossed on its first use in the row only (Fi'il Mudari' … then Fi'il Mudari' · Majhul)
    return Object.entries(types).sort((a, b) => b[1] - a[1]).map(([k, n]) => {
      const pass = k.endsWith('-PASS'); const base = pass ? k.slice(0, -5) : k;
      const L = LB.TYPES[base] ? lab(LB.TYPES[base], used.has(base) ? false : undefined) : base; used.add(base);
      return `<span class="tl">${esc(L)}${pass ? (lang === 'en' ? ' (passive)' : mudah() ? ' · ' + esc(lab(LB.MISC.PASS, used.has('@PASS') ? false : undefined)) + (used.add('@PASS'), '') : ' · ' + esc(lab(LB.MISC.PASS, false))) : ''} <span class="muted">×${n}</span></span>`;
    }).join('');
  }

  function refLabel(ref) {
    const [s, a, w] = ref.split(':');
    return `${SURAH[s - 1] ? `<span class="ar">${SURAH[s - 1]}</span> ` : ''}${s}:${a}${w ? ` <span class="muted">(${t('word')}${w})</span>` : ''}`;
  }

  function viewRoot(r) {
    const R = ROOTS[r];
    if (!R) return `<a class="back" href="#/">${t('back')}</a><div class="empty">${t('noRes')}</div>`;
    const e = ENTRIES[r];
    const rank = ROOT_KEYS.indexOf(r) + 1;
    const badge = s => s === 'verified' ? '' : `<span class="badge ${s}">${t(s === 'draft' ? 'draft' : s === 'not_found' ? 'notFound' : 'pending')}</span>`;
    // P1-F5: notes.json (newer, ATV-checked) comes before the older fatihah.json wording when both exist
    const nm = (NOTES.meaning || {})[r], mean = nm && nm[lang] ? nm : e && e.meaning;
    const lexN = Object.values((NOTES.lex || {})[r] || {}).filter(x => x && x.status === 'verified' && x.arabic && x.book_id);
    const meaning = mean ? `<section class="card"><h2>${t('meaning')} ${badge(mean.status || 'draft')}</h2>
        <p style="font-size:1.1rem;margin:0">${esc(mean[lang])}</p>
        ${lang === 'en' && mean.ms ? `<p class="muted small" style="margin:.3em 0 0">${esc(mean.ms)}</p>` : ''}</section>`
      : e || lexN.length ? '' : `<section class="card muted">${t('noEntry')}</section>`;

    const forms = `<section class="card"><h2>${t('morph')}</h2><div class="tscroll"><table>
      <thead><tr><th>${t('lemma')}</th><th>${t('type')}</th><th>${t('bab')}</th><th>${t('count')}</th></tr></thead><tbody>
      ${R.lem.map(l => `<tr><td class="arw">${esc(lemmaShown(r, l)) || '<span class="muted">—</span>'}</td><td>${typeLabel(l[4])}</td><td class="bab">${babCell(l[3], l[0], R, l[2] === 'V', l[4])}</td><td><b>${l[1]}</b></td></tr>`).join('')}
      </tbody></table></div></section>`;

    const shamelaUrl = L => {
      const pid = L.page_id || L.ref_page_id;
      return L.book_id && pid ? `https://shamela.ws/book/${encodeURIComponent(L.book_id)}/${encodeURIComponent(pid)}` : '';
    };
    // only sources with a Shamela book + page are shown in full; others stay as "pending" placeholders
    const lughah = lexN.length ? `<section class="card"><h2>${t('lughah')}</h2>
      <p class="muted small" style="margin-top:0">${t('shamelaOnly')}</p>
      ${lexN.map(x => `<div class="lg">${noteCard(x).replace('</div>', '</div>' + lemOnly(x))}</div>`).join('')}</section>`
      : e ? `<section class="card"><h2>${t('lughah')}</h2>
      <p class="muted small" style="margin-top:0">${t('shamelaOnly')}</p>
      ${e.lughah.filter(L => L.status === 'verified' || L.status === 'not_found' || (L.book_id && L.page_id && L.arabic)).map(L => {
        const url = shamelaUrl(L);
        const sourced = L.status === 'not_found' || (L.book_id && L.page_id);
        if (mudah() && L.status === 'verified' && L.arabic && L.book_id) return `<div class="lg"><h3>${who(L.book_id, L.author || L.book)}</h3>
        ${L['note_' + lang] ? `<p style="margin:.3em 0 .4em">${esc(L['note_' + lang])}</p>` : ''}
        <details class="src"><summary>${t('seeQuote')}</summary>
          <div class="muted small"><b>${esc(L.book)}</b> ${esc(L.author || '')}${L.vol ? ` · ${t('vol')} ${esc(L.vol)}` : ''}${L.page ? `${L.vol ? ',' : ' ·'} ${t('page')} ${esc(L.page)}` : ''}</div>
          <div class="q">«${esc(L.arabic)}»</div>
          ${url ? `<a class="shamela" href="${url}" target="_blank" rel="noopener">${t('openShamela')} ↗</a>` : ''}</details></div>`;
        return `<div class="lg"><h3>${esc(L.book)}${L.status === 'verified' ? '' : ' ' + badge(L.status)}</h3>
        ${L.author ? `<div class="muted small">${esc(L.author)}${sourced && L.vol ? ` · ${t('vol')} ${esc(L.vol)}` : ''}${sourced && L.page ? `${L.vol ? ',' : ' ·'} ${t('page')} ${esc(L.page)}` : ''}</div>` : ''}
        ${sourced && L.arabic ? `<div class="q">«${esc(L.arabic)}»</div>` : ''}
        ${sourced && L['note_' + lang] ? `<p style="margin:.3em 0 .4em">${esc(L['note_' + lang])}</p>` : ''}
        ${url ? `<a class="shamela" href="${url}" target="_blank" rel="noopener">${t('openShamela')} ↗</a>` : ''}
      </div>`;
      }).join('')}</section>` : '';

    const fat = e && e.fatihah && e.fatihah.length ? `<div class="stat"><b>${e.fatihah.length}</b><span>${t('ayatF')}</span></div>` : '';
    const refs = R.refs.split(' ');
    return `<a class="back" href="#/">${t('back')}</a>
      <section class="card hero">
        <div class="big">${esc(spaced(r))}</div>
        <div class="stats">
          <div class="stat"><b>${R.f.toLocaleString()}</b><span>${t('freq')}</span></div>
          <div class="stat"><b>#${rank}</b><span>${t('rank')} / ${ROOT_KEYS.length}</span></div>
          <div class="stat"><b>${R.lem.length}</b><span>${t('forms')}</span></div>${fat}
        </div>
      </section>
      ${meaning}${(fs => fs.length ? `<div class="chips fam-link">${fs.map(f => `<a class="chip" href="#/makna/${esc(f.id)}">${t('famIn')}: ${esc(f['title_' + lang] || f.title_ms)} →</a>`).join('')}</div>` : '')(famsOf(r))}${forms}${lughah}
      <section class="card"><h2>${t('occ')} <span class="muted small">(${refs.length})</span></h2>
        <p class="muted small" style="margin-top:0">${t('tapAyah')}</p>
        <div id="ayahBox"></div>
        <div class="occ" id="occ" data-root="${esc(r)}" data-shown="0"></div>
        <button class="btn ghost" id="more" type="button" style="margin-top:10px">${t('showMore')}</button>
      </section>`;
  }

  // P1-F5: the "Bentuk asas" column shows a lemma only when it is a real base form. The corpus fork cuts weak
  // verbs (لَقُ، مَشَ، عَتَ) and keeps some inflected forms (مَلَكَتْ، إِقامَت); those are replaced by the lemma of the
  // same root and verb form in notes.json → forms when one exists there, otherwise left blank. Nothing is made up.
  const AR_L = /[\u0621-\u064A\u0671]/g;
  // a past-tense verb lemma: 3+ letters ending in fatha (خَلَقَ، ضَلَّ) or alif (أَلْقَى); a form seen only in the present
  // and starting with a present-tense prefix (يَدَّعُ، يَلِجَ) is not one
  const goodVerb = (s, forms, vf) => { const b = String(s || '').replace(/[\u06DF\u06E0\u0670]/g, ''), n = (b.match(AR_L) || []).length + (b.match(/\u0651/g) || []).length;
    return n >= 3 && /(?:[\u0621-\u064A\u0671][\u064E\u0651]*\u064E[\u0651]?|[\u0649\u0627][\u064B-\u0652]*)$/.test(b) && !/[\u0648\u0624][\u064B-\u0652]*\u0627$/.test(b)
      && !(forms && !forms['V-PERF'] && !forms['V-PERF-PASS'] && /^[\u064A\u0646\u0623]|^\u062A/.test(b) && !(/^\u062A/.test(b) && (vf === '5' || vf === '6'))); };
  // a noun with an open feminine ta (إِقامَت، مَوْتَت) or a plural ending (مُلاقُوا) is an inflected form
  const goodNoun = s => !/(?:\u064E\u062A[\u064B-\u0652]*|\u0648\u0627[\u064B-\u0652]*)$/.test(String(s || '').replace(/[\u06DF\u06E0]/g, ''));
  function lemmaShown(r, l) {
    if (l.length > 6) return l[6];   // "" = no verified base form → «—»   // P2-C: corpus-derived base form with its ayah (roots.json lem[i][6])
    if (l[2] === 'V' ? goodVerb(l[0], l[4], l[3]) : goodNoun(l[0])) return l[0];
    if (l[2] !== 'V') return '';
    const alt = ((NOTES.forms || {})[r] || []).filter(x => x.form === l[3] && x.lemma && !/[\/،,]/.test(x.lemma) && goodVerb(x.lemma));
    return alt.length && alt.every(x => x.lemma === alt[0].lemma) ? alt[0].lemma : '';
  }
  // a lex / furuq record written for some lemmas of the root only (rec.lemmas) names them on the root page
  const lemOnly = x => Array.isArray(x.lemmas) && x.lemmas.length ? `<p class="muted small lem-only">${t('lemOnly')} <span class="ar">${x.lemmas.map(esc).join('، ')}</span></p>` : '';
  const lemFits = (x, lem) => !Array.isArray(x.lemmas) || !lem || x.lemmas.includes(lem);

  function renderOcc(reset) {
    const box = $('#occ'); if (!box) return;
    const refs = ROOTS[box.dataset.root].refs.split(' ');
    let shown = reset ? 0 : +box.dataset.shown;
    const next = refs.slice(shown, shown + 40);
    box.insertAdjacentHTML('beforeend', next.map(x => `<button type="button" data-ref="${x}">${refLabel(x)}</button>`).join(''));
    shown += next.length; box.dataset.shown = shown;
    const more = $('#more'); if (more) more.hidden = shown >= refs.length;
  }

  async function showAyah(ref, btn) {
    document.querySelectorAll('#occ button.on').forEach(b => b.classList.remove('on'));
    if (btn) btn.classList.add('on');
    const box = $('#ayahBox'); box.innerHTML = `<div class="ayah muted">${t('loading')}</div>`;
    const Q = await loadQuran();
    const [s, a, w] = ref.split(':');
    const words = (Q[`${s}:${a}`] || '').split(' ');
    const html = words.map((x, i) => (i + 1 === +w ? `<mark>${esc(x)}</mark>` : esc(x))).join(' ');
    box.innerHTML = `<div class="ayah">${html} <span class="ref">${t('surah')} ${SURAH[s - 1]} (${s}) · ${t('ayah')} ${a}</span></div>`;
  }


  // ---------- ayah-by-ayah view ----------
  // Grammar labels from Quranic Arabic Corpus tags (pos N = isim, V = fi'il, P = harf), worded per data/labels.json.
  // Mudah (BM): "Fi'il Mudari' (kata kerja masa kini atau akan datang)" — the bracket is the glossary.json gloss.
  // Ilmiah (BM): the bare term. English: the English label.
  const glossOf = k => { const e = GLOSS_K && GLOSS_K.get(String(k || '').toLowerCase()); return e ? e.ms : ''; };
  function lab(x, gloss) {
    if (!x) return '';
    if (lang === 'en') return x.en;
    const s = (x.pre ? x.pre + ' ' : '') + x.term, g = glossOf(x.gl);
    return (gloss === undefined ? mudah() : gloss) && g ? `${s} (${g})` : s;
  }
  // a Malay label that came from a data note ("Waw Isti'naf", "Isim Mausul (Ma)"). In Mudah: drop a bracket that only
  // holds more Arabic ("(Ma)", "(Lam Kay)", "(أَوَلَمْ)"), then put the glossary gloss after each term on its first use.
  // The sense is matched through the segment's own label, so "Huruf Jawab" gets "jawapan", not "ayat balasan".
  // P1-F1: a bracket is added only when its sense is certain: the segment's own label sense, or the term's only
  // glossary sense. A term that names the particle itself at the head of the label (Lam, Hal, Bal, Lamma…) gets that
  // one sense only when the glossary entry is this very particle (its Arabic = the segment's key); otherwise no bracket.
  function glossLabel(s, tagLab, key) {
    if (lang === 'en' || !mudah() || !s) return s;
    s = String(s).replace(/\s*\(([^()]*)\)\s*$/, (m, br) => (PICK.isQualifier(br) ? '' : m));
    const inside = off => { let d = 0, q = 0; for (let i = 0; i < off; i++) { const c = s[i]; if (c === '(') d++; else if (c === ')') d = Math.max(0, d - 1); else if (c === '«') q++; else if (c === '»') q = Math.max(0, q - 1); } return d > 0 || q > 0; };
    if (!GLOSS_ANY_RE) return s;
    const want = tagLab && GLOSS_K.get(String(tagLab.gl).toLowerCase());
    const nk = norm(key || '');
    const done = new Set();
    return s.replace(GLOSS_ANY_RE, (m, pre, term, off, str) => {
      const base = term.replace(/\u2019/g, "'").toLowerCase(), c = GLOSS_BASE.get(base) || [];
      const head = off + pre.length === 0;
      const e = (want && c.includes(want) && want) || (c.length === 1 && (!head || (nk && norm(c[0].ar) === nk)) ? c[0] : null);
      if (!e || done.has(e) || inside(off + pre.length) || /^\s*\(/.test(str.slice(off + m.length))) return m;
      done.add(e); return `${pre}${term} (${e.ms})`;
    });
  }
  const pgnLab = (tags, gloss) => { // person / gender / number from tags like 1P, 2MS, 3MP, MS
    const m = tags.map(x => /^([123])?([MF])?([SDP])$/.exec(x)).find(Boolean); if (!m) return '';
    return [m[1] && lab(LB.PERSON[m[1]], gloss), m[2] && lab(LB.GENDER[m[2]], gloss), m[3] && lab(LB.NUMBER[m[3]], gloss)].filter(Boolean).join(' · ');
  };

  /* <pick> — pure functions, no DOM: which verified note a rootless segment gets, which ayat an i'rab group covers,
     and whether the corpus-tag note disagrees with the app's own i'rab. The deploy gate (scripts/check-sources.mjs)
     evaluates this exact block and simulates every word of the surahs with it. */
  const PICK = (() => {
    const DETACH_OK = new Set(['CONJ', 'REM', 'CIRC', 'SUP', 'INTG', 'CAUS', 'RSLT', 'EMPH']);
    // detached (munfasil) = a word of its own: only a conjunction-type prefix (wa-, fa-, a-) stands before it
    const pronAttached = (w, si) => w.segs[si].tags.includes('SUFF')
      || w.segs.slice(0, si).some(s => !(s.pos === 'P' && s.tags.some(x => DETACH_OK.has(x))));
    const segKey = g => g.key || (g.tags.includes('PRON') && !g.t ? 'ي' : '');   // elided ya' of نَذِيرِ / نَكِيرِ
    // P1 gate: the kaf/lam of ذَٰلِكَ (tags ADDR, DIST) are not prepositions: they no longer fall back to pos "P",
    // which made them pick the Kaf Jar note
    const noteTag = (g, LB) => g.tags.find(x => LB.PTAG[x] || LB.NTAG[x] || x === 'PRON') || (g.tags.find(x => x === 'ADDR' || x === 'DIST')) || g.pos;
    // the interrogative hamzah is a harf even though the corpus gives it pos N
    const segType = g => g.pos === 'V' ? 'fiil' : g.pos === 'N' && !(g.key === 'أ' && g.tags.includes('INTG')) ? 'isim' : 'harf';
    const ok = h => (h && h.status === 'verified' ? h : null);
    const refsOf = h => (Array.isArray(h.refs) && h.refs.length ? h.refs : null);
    // P1-F3: singular / dual / plural of a relative noun. The segment's number comes from its tags (MS, MD, MP …);
    // a note's number from the form its quotation and note name (الذي / اللذان / الذين). Unknown on either side = no check.
    const segNum = g => (g.tags.find(x => /^[123]?[MF]?[SDP]$/.test(x)) || '').slice(-1) || null;
    const noteNum = h => { const s = `${(h.quotes || []).map(q => q.arabic).join(' ')} ${h.arabic || ''} ${h.note_ms || ''}`.replace(/[\u064B-\u0652\u0670]/g, '');
      return /الذين|اللاتي|اللائي/.test(s) ? 'P' : /اللذان|اللذين|اللتان|اللتين/.test(s) ? 'D' : /الذي|التي|للمفرد/.test(s) ? 'S' : null; };
    function pickNote(o) {                       // o: { surah, ayah, wi, si, w, tagged, HURUF, LB }
      const g = o.w.segs[o.si]; if (g.root) return null;
      const key = segKey(g), tag = noteTag(g, o.LB), ref = `${o.surah}:${o.ayah}:${o.wi + 1}`;
      const T = o.tagged || {}, H = o.HURUF || {};
      let h = null, id = null, override = false;
      const sn = tag === 'REL' ? segNum(g) : null;
      const numOk = x => { const nn = sn && noteNum(x); return !sn || !nn || nn === sn; };
      // P1-F2: a note that lists the words it was written for (refs) is the reading of those words only
      const fits = x => { const r = refsOf(x); return (!r || r.includes(ref)) && numOk(x); };
      const tryId = (x, force) => { if (!h && x && ok(T[x]) && (force || fits(T[x]))) { h = T[x]; id = x; } };
      // a reviewer's per-word override in huruf-NNN.json: "@ref": { "67:17:10": "ف|RSLT" }
      [].concat((T['@ref'] || {})[ref] || []).forEach(x => { if (!h && String(x).split('|')[0] === key) { tryId(x, true); override = !!h; } });
      const fat = () => { if (!h && o.surah === 1 && ok(H[key]) && numOk(H[key])) { h = H[key]; id = 'HURUF:' + key; } };   // al-Fatihah notes are keyed by the bare word
      // elsewhere, a general al-Fatihah note of the same particle (no refs, same class as the tag, same number) may stand in
      const gen = () => { const x = ok(H[key]); if (!h && o.surah !== 1 && x && x.sense_in_ayah === 'general' && !refsOf(x) && numOk(x)
        && (noteClass(x, tag) || {}).c === tag) { h = x; id = 'HURUF:' + key; } };
      if (tag === 'PRON') { tryId(key + '|PRON'); fat(); tryId(pronAttached(o.w, o.si) ? '@MUTTASIL' : '@MUNFASIL'); }
      else { tryId(key + '|' + tag); fat(); gen(); }
      if (!h) return { key, tag, ref, id: null, h: null, stated: false, otherRefs: null, override };
      const refs = Array.isArray(h.refs) && h.refs.length ? h.refs : null;
      const own = !refs || refs.includes(ref);
      return { key, tag, ref, id, h, override, stated: h.sense_in_ayah === 'stated' && own, otherRefs: h.sense_in_ayah === 'stated' && !own ? refs : null };
    }
    // a note written for another ayah drops its ayah-specific qualifier: "Huruf Jar (Min Za'idah)" -> "Huruf Jar".
    // A Malay gloss in brackets ("(huruf sendi nama)", lower-case) is not a qualifier and stays.
    const isQualifier = br => /[\u0600-\u06FF]/.test(br) || /^\s*[A-Z]/.test(br);
    const generalLabel = (s, en) => String(s || '').replace(/\s*\(([^()]*)\)\s*$/, (m, br) => (en || isQualifier(br) ? '' : m));

    // ---- i'rab groups: which ayat a group really covers (a later ayah starts with its number, e.g. "١١ - ")
    const arNum = s => +String(s).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    function irabParts(r) {
      const text = (r.blocks || []).map(b => b.arabic || '').join(' \n ');
      const out = new Map(); let cur = r.from, last = 0, m;
      // al-Mulk groups mark an ayah as "١١ - "; al-Jadwal on Yasin marks it "(١١)" or a range "(٣ - ٥)"
      const re = r.marks === 'paren' ? /\(([٠-٩]{1,3})(?:\s*-\s*([٠-٩]{1,3}))?\)/g : /(?:^|\s)([٠-٩]{1,3})\s*-\s/g;
      const span = new Map(); let curTo = r.from;
      while ((m = re.exec(text))) {
        const a = arNum(m[1]); if (a <= cur || a > r.to) continue;
        out.set(cur, (out.get(cur) || '') + text.slice(last, m.index)); span.set(cur, curTo); cur = a; curTo = m[2] ? Math.min(r.to, arNum(m[2])) : a; last = m.index;
      }
      out.set(cur, (out.get(cur) || '') + text.slice(last)); span.set(cur, curTo);
      // a range marker covers every ayah in it; with r.fill, an unnumbered ayah shares the part before it
      [...span.entries()].forEach(([a, b]) => { for (let x = a + 1; x <= b; x++) if (!out.has(x)) out.set(x, out.get(a)); });
      if (r.fill) { let prev = null; for (let x = r.from; x <= r.to; x++) { if (out.has(x)) prev = out.get(x); else if (prev != null) out.set(x, prev); } }
      return new Map([...out.entries()].sort((p, q) => p[0] - q[0]));
    }
    // ---- does the corpus-tag note disagree with the i'rab text of the same ayah?
    const PNAME = { 'و': 'الواو', 'ف': 'الفاء', 'ل': 'اللام', 'ما': 'ما', 'أ': 'الهمزة' };
    const NOTE_CLS = [['CONJ', /'at(h)?af|'atifah|conjunction|coordinat/], ['REM', /isti'naf|resum/], ['RSLT', /rabitah|result/],
      ['CIRC', /\bhal\b|circumstantial/], ['CAUS', /sababiyyah|causative/], ['REL', /mausul|relative/], ['EMPH', /qasam|taukid|emphatic/],
      ['INTG', /istifham|interrogative/], ['PREV', /kaffah|preventive/], ['SUP', /za'id|supplement/], ['NEG', /nafi|negative/]];
    const IRAB_CLS = [['CONJ', /^عاطف/], ['REM', /^استئناف/], ['RSLT', /^رابط/], ['SUP', /^زائد/], ['CIRC', /^حالي/], ['CAUS', /^(?:لل)?سببي/],
      ['REL', /^(?:اسم )?موصول/], ['EMPH', /^لام القسم|^للقسم|^واقعة في جواب القسم|^للتوكيد|^لام التوكيد/], ['INTG', /^(?:لل)?استفهام/],
      ['NEG', /^نافي/], ['PREV', /^كافّ?ة/]];
    const SENSE = [['taqriri', /taqriri|affirmative/, /تقريري|التقرير/], ['tawbikhi', /tawbikhi/, /توبيخ/], ['tahdidi', /tahdidi/, /تهديد/],
      ['taqri\'i', /taqri'i/, /تقريع/], ['inkari', /inkari/, /إنكار/]];
    const noteClass = (h, tag) => {
      const s = `${h.label_ms || ''} ${h.label_en || ''}`.toLowerCase();
      const c = (NOTE_CLS.find(([, re]) => re.test(s)) || [])[0] || (NOTE_CLS.some(([k]) => k === tag) ? tag : null);
      const sense = (SENSE.find(([, re]) => re.test(s)) || [])[0] || null;
      return c ? { c, sense } : null;
    };
    function irabConflict(p, text) {
      if (!p || !p.h || !text || p.otherRefs) return null;
      const name = PNAME[p.key]; if (!name) return null;
      const nc = noteClass(p.h, p.tag); if (!nc) return null;
      const re = new RegExp(`(?:^|[\\s(«])${name}[)»]?\\s+([^\\s(),.«»]+(?:\\s[^\\s(),.«»]+){0,3})`, 'g');
      const hits = []; let m;
      while ((m = re.exec(text))) {
        const d = m[1], c = (IRAB_CLS.find(([, r]) => r.test(d)) || [])[0]; if (!c) continue;
        hits.push({ c, sense: (SENSE.find(([, , r]) => r.test(d)) || [])[0] || null, quote: m[0].trim().replace(/[\s،؛,.:]+$/, '') });
      }
      if (!hits.length) return null;
      const same = hits.filter(x => x.c === nc.c);
      if (same.length && (!nc.sense || same.some(x => !x.sense || x.sense === nc.sense))) return null;
      return { quote: (same.length ? same[0] : hits[0]).quote };
    }
    // Form I: fa'ala / fa'ila / fa'ula from the middle radical's vowel of the lemma; null when it cannot be read (hollow, doubled)
    function formOneWazan(lem, forms) {
      // letters C[i] with their marks L[i]. Only an active past (madi ma'lum) of three letters is read: a passive (قُطِعَ),
      // a mudari' lemma (تَمُورُ) or a mis-tagged tafa''ala (تَمَنَّى) returns null and the app shows all three babs.
      const C = [], L = [];
      for (const ch of String(lem || '')) { if (/[\u0621-\u064A\u0671]/.test(ch)) { C.push(ch); L.push(''); } else if (L.length) L[L.length - 1] += ch; }
      if (C.length === 4 && C[3] === 'ت' && !L[3].includes('\u064F')) { C.pop(); L.pop(); }   // feminine ta' of a lemma such as مُلِئَتْ
      if (C.length !== 3 || !L[0].includes('\u064E')) return null;
      // any shadda (يَضُرَّ، تَسُرُّ، تَحَرَّ) or a damma ending (يَصِفُ) means it is not a 3rd-person past form
      if (L.some(x => x.includes('\u0651')) || L[2].includes('\u064F')) return null;
      // a lemma attested only in the present (يَصِلُ، يَلِجَ، تَعِيَ) starting with a present-tense prefix is not read
      if (forms && !forms['V-PERF'] && !forms['V-PERF-PASS'] && /[يتنأ]/.test(C[0])) return null;
      const v = L[1];
      return v.includes('َ') ? 'فَعَلَ' : v.includes('ِ') ? 'فَعِلَ' : v.includes('ُ') ? 'فَعُلَ' : null;
    }
    // a Form I noun (راحِم) borrows the bab of its root's Form I verb(s) when they all read the same, else null
    const rootFormOne = lem => { const w = [...new Set(lem.filter(l => l[2] === 'V' && l[3] === '1').map(l => formOneWazan(l[0], l[4])))]; return w.length === 1 ? w[0] : null; };
    return { pronAttached, segKey, noteTag, segType, pickNote, isQualifier, generalLabel, irabParts, irabConflict, noteClass, formOneWazan, rootFormOne };
  })();
  /* </pick> */

  function segInfo(g, w, si) {
    const tg = g.tags, type = PICK.segType(g); let label, extra = [];
    if (type === 'fiil') {
      label = lab(LB.TYPES[tg.includes('PERF') ? 'V-PERF' : tg.includes('IMPV') ? 'V-IMPV' : 'V-IMPF']);
      if (tg.includes('PASS')) extra.push(lab(LB.MISC.PASS, false));
      const md = tg.find(x => LB.MOOD[x]); if (md) extra.push(lab(LB.MOOD[md], false));
      const vf = (tg.find(x => x.startsWith('VF:')) || '').slice(3); if (BAB[vf]) extra.push(`${lab(LB.MISC.BAB, false)} ${BAB[vf][0]} (${babWazan(vf, g.lem, lemForms(g.root, g.lem))})`);
      const p = pgnLab(tg, false); if (p) extra.push(p);
    } else if (type === 'isim') {
      if (tg.includes('PRON')) label = lab(w && PICK.pronAttached(w, si) ? LB.MISC.PRON_ATT : LB.MISC.PRON_DET);
      else { const k = Object.keys(LB.NTAG).find(x => tg.includes(x)); label = lab(k ? LB.NTAG[k] : LB.TYPES.N); }
      const c = tg.find(x => LB.CASE[x]); if (c) extra.push(lab(LB.CASE[c], false));
      const vf = (tg.find(x => x.startsWith('VF:')) || '').slice(3); if (BAB[vf]) extra.push(`${lab(LB.MISC.BAB, false)} ${BAB[vf][0]}`);
      if (tg.includes('PRON')) { const p = pgnLab(tg, false); if (p) extra.push(p); if (!g.t) extra.push(t('elided')); }
    } else {
      const k = g.key === 'أ' && tg.includes('INTG') ? null : Object.keys(LB.PTAG).find(x => tg.includes(x));
      // ATV-P1-03: a particle with no scholar note keeps its glossary bracket at both levels (Huruf Jar (huruf sendi nama))
      label = g.key === 'أ' && tg.includes('INTG') ? lab(LB.MISC.HAMZA_INTG, true) : k ? lab(LB.PTAG[k], true) : lab(LB.TYPE.harf);
    }
    return { type, label, extra };
  }
  // the corpus label object behind a segment (used to sense-match a note's label for its gloss)
  const tagLabOf = g => g.key === 'أ' && g.tags.includes('INTG') ? LB.MISC.HAMZA_INTG
    : g.tags.includes('PRON') ? null : (LB.PTAG[Object.keys(LB.PTAG).find(x => g.tags.includes(x))] || LB.NTAG[Object.keys(LB.NTAG).find(x => g.tags.includes(x))] || null);
  const segText = g => g.t || (g.tags.includes('PRON') ? '(ي)' : '');

  async function loadSurah(n) {
    if (!SDATA[n]) {
      const pad = String(n).padStart(3, '0');
      const [d, tr, hs] = await Promise.all([
        fetch(`data/surah-${pad}.json`).then(r => r.json()),
        fetch(`data/surah-${pad}-tr.json`).then(r => r.json()).catch(() => null),
        (LB.manifest.surahHuruf || []).includes(n) ? fetch(`data/huruf-${pad}.json`).then(r => r.json()).catch(() => null) : null
      ]);
      SDATA[n] = d; STR[n] = tr; if (hs) SHUR[n] = hs;
    }
    return SDATA[n];
  }

  function viewSurahShell(n) { return `<a class="back" href="#/">${t('back')}</a><div id="surahBox"><div class="empty">${t('loading')}</div></div>`; }

  const cur = { n: 0 };
  async function renderSurah(n) {
    cur.n = n;
    const box = $('#surahBox'); if (!box) return;
    let D; try { D = await loadSurah(n); } catch (e) { box.innerHTML = `<div class="empty">${t('noRes')}</div>`; return; }
    const TR = STR[n];
    const legend = ['isim', 'fiil', 'harf'].map(k => `<span class="lg-chip t-${k}">${esc(lab(LB.TYPE[k]))}</span>`).join('');
    const ayahLine = ay => {
      const ws = ay.words.map((w, i) => `<button type="button" class="w" data-s="${n}" data-a="${ay.a}" data-w="${i}" aria-label="${esc(w.t)}">${
        w.segs.map(g => `<span class="t-${PICK.segType(g)}">${esc(g.t)}</span>`).join('')}</button>`);
      const last = ws.pop();
      return `${ws.join(' ')}${ws.length ? ' ' : ''}<span class="ay-end">${last} <span class="ay-no">${String(ay.a).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])}</span></span>`;
    };
    box.innerHTML = `<section class="card surah-head">
        <div class="sh-ar ar">سُورَةُ ${esc(SURAH[n - 1])}</div>
        <div class="muted small">${t('surah')} ${n} · ${(() => { const c = COLLS.find(x => x.surah === n); return c && c.range ? `${t('ayatN')} <span class="nw">${esc(c.range)}</span>` : `${D.ayat.length} ${t('ayatN')}`; })()}</div>
        <div class="legend">${legend}</div>
        <p class="small" style="margin:.4em 0 0">${t('tapWord')}</p>
        ${mudah() ? `<p class="lvhint">${t('lvHintM')}</p>` : ''}
        ${maqsadSurah(n)}${failSurahList(n)}
      </section>
      ${D.ayat.map(ay => `<article class="card ayah-card" id="ay-${ay.a}">
        <div class="ay-ar" dir="rtl">${ayahLine(ay)}</div>
        ${TR && TR.ayat[ay.a] ? `<p class="tr">${esc(TR.ayat[ay.a][lang])}</p>` : ''}
        ${oneLine(n, ay.a)}
        ${TR && TR.ayat[ay.a] && TR.ayat[ay.a].note ? ayNote(TR.ayat[ay.a].note) : ''}
        <div class="ind-row">${irabPanel(n, ay.a)}${failPanel(n, ay.a)}${tafPanel(n, ay.a)}${mqPanel(n, ay.a)}${tadPanel(n, ay.a)}</div>
        <div class="wpanel" id="wp-${ay.a}" hidden></div>
      </article>`).join('')}
      ${TR ? `<p class="trsrc"><b>${t('trBy')}</b> ${esc(TR['source_' + lang])}${TR.tr_source === 'basmeih' ? '' : ` <span class="badge draft">${t('draft').split(' — ')[0]}</span>`}${TR['tr_note_' + lang] ? `<br><span class="muted small">${esc(TR['tr_note_' + lang])}</span>` : ''}</p>` : ''}
      <p class="muted small">${t('notesBy')}</p>
      <p class="muted small">${t('grammarSrc')}</p>`;
    linkGloss(box);
  }

  // an i'rab group is shown only under the ayat its text actually covers (a group "1–4" holding ayah 1 alone is not shown under 2–4)
  const IRAB_PARTS = new Map();
  const irabParts = r => { if (!IRAB_PARTS.has(r)) IRAB_PARTS.set(r, PICK.irabParts(r)); return IRAB_PARTS.get(r); };
  function irabFor(surah, a) { return IRAB.find(x => x.surah === surah && a >= x.from && a <= x.to && irabParts(x).has(a)); }
  const irabText = (surah, a) => { const r = irabFor(surah, a); return r ? irabParts(r).get(a) : ''; };
  function irabPanel(n, a) {
    if (mudah()) return '';                       // unvowelled kitab text — too heavy for a beginner
    const r = irabFor(n, a); if (!r) return '';
    const cov = [...irabParts(r).keys()];
    const range = cov.length === 1 ? `${cov[0]}` : cov.every((x, i) => !i || x === cov[i - 1] + 1) ? `${cov[0]}–${cov[cov.length - 1]}` : cov.join(', ');
    return `<details class="irab"><summary>${t('irab')} <span class="muted small">${t('ayatN')} ${range} · ${esc(r.author)}</span></summary>
      <div class="irab-body">
        ${r.blocks.map(b => `<div class="q">${esc(b.arabic)}</div>
          <div class="muted small">${esc(r.book)} · ${t('vol')} ${esc(b.vol)}, ${t('page')} ${esc(b.page)} · <a href="${shLink(r.book_id, b.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`).join('')}
        <p>${esc(r['note_' + lang] || '')}</p>
      </div></details>`;
  }
  // ---------- Fi'il & Fa'il (subject of every verb), quoted from the books of i'rab ----------
  function failFor(n, a) { return (FAIL.v || {})[n + ':' + a] || []; }
  function failWord(n, a, w) { return failFor(n, a).filter(x => x.w === w); }
  function failBook(id) { const b = (FAIL.books || {})[String(id)]; return b || { ar: '', name: '', author: '' }; }

  function failSubject(x, n, a) {
    if (!x.found) return `<span class="muted">${t('failNotStated')}</span>`;
    const parts = [];
    if (x.w_sub != null) {
      const ay = (SDATA[n] || { ayat: [] }).ayat.find(y => y.a === a);
      const wd = ay && ay.words[x.w_sub];
      parts.push(`<b class="ar fa-sub">${esc(x.text || (wd ? wd.t : ''))}</b>`);
      if (wd) parts.push(`<span class="muted small">(${t('word')}${x.w_sub + 1})</span>`);
    } else if (x.text) {
      parts.push(`<b class="ar fa-sub">${esc(x.text)}</b>`);
      if (x.kind === 'bariz_muttasil') parts.push(`<span class="muted small">${esc(t('failInWord'))}</span>`);
    } else if (x.taqdir) {
      parts.push(`<b class="ar fa-sub">${esc(x.taqdir)}</b><span class="muted small">${t('failTaqdir')}</span>`);
    } else {
      parts.push(`<span class="muted small">${esc(x['kind_' + lang] || '')}</span>`);
    }
    if (x.taqdir && !(x.w_sub == null && !x.text)) parts.push(`<span class="muted small">· ${t('failTaqdir')} <span class="ar">${esc(x.taqdir)}</span></span>`);
    return parts.join(' ');
  }

  // P3: page label with its volume. q.vol wins; a Shamela printed page «15/ 25» (volume/page) reads «Jld. 15, hlm. 25»
  const volPage = q => { const pg = String(q.page == null ? '' : q.page), m = pg.match(/^\s*(\d+)\s*\/\s*(\d+(?:\s*[–-]\s*\d+)?)\s*$/);
    return q.vol ? `${t('vol')} ${esc(q.vol)}, ${t('page')} ${esc(m ? m[2] : pg)}` : m ? `${t('vol')} ${esc(m[1])}, ${t('page')} ${esc(m[2])}` : `${t('page')} ${esc(pg)}`; };
  // WHO a hidden fa'il refers to. "kitab" = a scholar names it (quote attached); "siyaq" = reasoned from the ayah.
  function marjiLine(m) {
    if (!m) return '';
    const bk = id => failBook(id);
    const qsrc = e => { const b = bk(e.book_id); return `<div class="muted small">${esc(b.ar)}${b.author ? ` — ${esc(b.author)}` : ''} · ${volPage(e)} · <a href="${shLink(e.book_id, e.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`; };
    const quotes = [m.ev, ...(m.views || []).map(v => v.ev), ...(m.also || []).map(v => v.ev)].filter(Boolean);
    const tag = m.src === 'kitab' && m.ev
      ? `<span class="mj-src kitab">${t('mjKitab')} ${esc(mudah() && whoName(m.ev.book_id) ? whoName(m.ev.book_id) : (bk(m.ev.book_id).name || bk(m.ev.book_id).ar))}</span>`
      : `<span class="mj-src siyaq">${t('mjSiyaq')}</span>`;
    return `<div class="marji">
      <div class="mj-h"><span class="mj-k">↳ ${t('mjBack')}:</span> <b class="mj-v">${esc(m[lang] || m.ms)}</b> ${tag}</div>
      <p class="mj-why">${esc(m['note_' + lang] || '')}</p>
      ${(m.views || []).length ? `<div class="mj-views"><span class="muted small">${t('mjViews')}</span><ol>${m.views.map(v => `<li>${esc(v.ms)}</li>`).join('')}</ol></div>` : ''}
      ${(m.also || []).length ? `<ul class="mj-also">${m.also.map(v => `<li>${esc(v[lang] || v.ms)}</li>`).join('')}</ul>` : ''}
      ${quotes.length ? `<details class="src mj-q"><summary>${t('mjQuote')}</summary>${quotes.map(e => `<div class="q">${esc(e.arabic)}</div>${qsrc(e)}`).join('')}</details>` : ''}
    </div>`;
  }

  function failItem(x, n, a) {
    const bk = failBook(x.q.book_id);
    const role = x['role_' + lang] || '';
    const src = (q, b = failBook(q.book_id)) => `<div class="muted small">${esc(b.ar)}${b.author ? ` — ${esc(b.author)}` : ''} · ${volPage(q)} · <a href="${shLink(q.book_id, q.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`;
    return `<div class="frow${x.found ? '' : ' nf'}">
      <div class="fr-h"><b class="ar fr-v">${esc(x.verb)}</b>
        <span class="muted small">${t(x.voice === 'passive' ? 'voicePass' : 'voiceAct')}</span></div>
      <div class="fr-s">${role ? `<span class="fr-lab">${esc(role)}:</span>` : `<span class="muted small">${t(x.voice === 'passive' ? 'failSubPass' : 'failSub')}:</span>`} ${failSubject(x, n, a)}
        ${x.found && x['kind_' + lang] && (x.text || x.w_sub != null || x.taqdir) ? `<span class="muted small">· ${esc(x['kind_' + lang])}</span>` : ''}</div>
      ${marjiLine(x.marji)}
      ${x.q.xref ? `<p class="muted small xref">${esc(t('failXref').replace('__A__', x.q.xref))}</p>` : ''}
      <div class="q">${esc(x.q.arabic)}</div>${src(x.q)}
      ${x.q2 ? `<div class="q">${esc(x.q2.arabic)}</div>${src(x.q2)}` : ''}
      <p>${esc(x['note_' + lang] || '')}</p></div>`;
  }

  function failPanel(n, a) {
    if (mudah()) return '';                       // unvowelled kitab text — Ilmiah level only
    const list = failFor(n, a); if (!list.length) return '';
    return `<details class="fail"><summary>${t('failT')} <span class="muted small">${list.length} ${t('failVerbs')}</span></summary>
      <div class="fail-body"><p class="muted small">${t('failIntro')}</p>
        ${list.map(x => failItem(x, n, a)).join('')}</div></details>`;
  }

  function failSurahList(n) {
    if (mudah()) return '';
    const keys = Object.keys(FAIL.v || {}).filter(k => +k.split(':')[0] === n)
      .sort((p, q) => +p.split(':')[1] - +q.split(':')[1]);
    if (!keys.length) return '';
    const total = keys.reduce((s, k) => s + FAIL.v[k].length, 0);
    return `<details class="faillist"><summary>${t('failList')} <span class="muted small">${total} ${t('failVerbs')}</span></summary>
      <table class="ftab"><thead><tr><th>${t('ayah')}</th><th>${t('fiil')}</th><th>${t('failSub')}</th><th>${t('type')}</th></tr></thead><tbody>
      ${keys.map(k => FAIL.v[k].map((x, i) => `<tr><td>${i ? '' : k.split(':')[1]}</td>
        <td class="ar">${esc(x.verb)}</td>
        <td>${x.found ? `${x.text ? `<span class="ar">${esc(x.text)}</span>` : (x.taqdir ? `<span class="ar">${esc(x.taqdir)}</span> <span class="muted small">${t('failTaqdir')}</span>` : `<span class="muted small">${esc(x['kind_' + lang] || '')}</span>`)}` : `<span class="muted small">—</span>`}</td>
        <td class="small">${esc(x['role_' + lang] || '—')}</td></tr>`).join('')).join('')}
      </tbody></table></details>`;
  }

  // ---------- Brief tafsir: Ibn 'Ashur, al-Tahrir wa al-Tanwir (important points only) ----------
  function tafFor(n, a) { return (TAFSIR.v || {})[n + ':' + a] || null; }
  // quotes already shown in this ayah's scholars' note, so the tafsir panel doesn't repeat them
  function ayNoteQuotes(n, a) {
    const TR = STR[n], note = TR && TR.ayat[a] && TR.ayat[a].note;
    return new Set(((note && note.quotes) || []).map(q => norm(q.arabic)));
  }
  function tafPanel(n, a) {
    const r = tafFor(n, a); if (!r || r.status !== 'verified') return '';
    const B = TAFSIR.book || {}, shown = ayNoteQuotes(n, a);
    return `<details class="taf"><summary>${t('tafT')} <span class="muted small">${r.points.length} ${t('tafPts')}</span></summary>
      <div class="taf-body"><p class="muted small">${t('tafIntro')}</p>
        ${mudah() ? `<p class="plain">${esc(r['note_' + lang] || '')}</p>
          <details class="src"><summary>${t('seeQuote')} <span class="muted small">(${r.points.length})</span></summary>
            ${r.points.map(p => `<div class="tpt"><div class="tpt-h">${esc(p['topic_' + lang] || '')}</div>
              <div class="q">${esc(p.arabic)}</div>
              <div class="muted small">${esc(B.ar || '')} · ${volPage(p)} · <a href="${shLink(B.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
          </details></div></details>` : `
        ${r.points.map(p => shown.has(norm(p.arabic)) ? `<div class="tpt"><div class="tpt-h">${esc(p['topic_' + lang] || '')}</div>
          <p class="tdup">${t('tafDup')}</p>
          <div class="muted small">${esc(B.ar || '')} · ${volPage(p)} · <a href="${shLink(B.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`
          : `<div class="tpt"><div class="tpt-h">${esc(p['topic_' + lang] || '')}</div>
          <div class="q">${esc(p.arabic)}</div>
          <div class="muted small">${esc(B.ar || '')}${B.author_ar ? ` — ${esc(B.author_ar)}` : ''} · ${volPage(p)} · <a href="${shLink(B.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
        <p class="tnote">${esc(r['note_' + lang] || '')}</p>`}</div></details>`;
  }

  // ---------- Maqsad Ayat & Refleksi ----------
  // Two layers, kept visibly apart: what the mufassir says the ayah is driving at (nukil),
  // and AtTartil's own reflection (written by the teacher, never generated).
  // The plainest line on the page: one sentence, no Arabic, no technical term.
  // It is a compression of the quoted scholars' words, and says so.
  function oneLine(n, a) {
    const r = mqFor(n, a), one = r && r['one_' + lang];
    if (!one) return '';
    return `<div class="one"><div class="one-q">${t('oneQ')}</div>
      <p class="one-a">${esc(one)}</p>
      <p class="one-s">${t('oneSrc')}</p></div>`;
  }
  function mqFor(n, a) { return (MAQSAD.v || {})[n + ':' + a] || null; }
  function mqPanel(n, a) {
    const r = mqFor(n, a); if (!r || r.status !== 'verified') return '';
    const B = (MAQSAD.books || {})[String(r.book_id)] || {};
    return `<details class="mq"><summary>${t('mqT')} <span class="muted small">${r.points.length} ${t('mqPts')}</span></summary>
      <div class="mq-body"><p class="muted small">${t('mqIntro')}</p>
        ${mudah() ? `<p class="plain">${esc(r['note_' + lang] || '')}</p>
          <details class="src"><summary>${t('seeQuote')} <span class="muted small">(${r.points.length})</span></summary>
            ${r.points.map(p => `<div class="mpt"><div class="mpt-h">${esc(p['topic_' + lang] || '')}</div>
              <div class="q">${esc(p.arabic)}</div>
              <div class="muted small">${esc(B.short_ar || B.ar || '')} · ${t('page')} ${esc(p.page)} · <a href="${shLink(r.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
          </details></div></details>` : `
        <div class="mq-h">${t('mqNukil')}</div>
        ${r.points.map(p => `<div class="mpt"><div class="mpt-h">${esc(p['topic_' + lang] || '')}</div>
          <div class="q">${esc(p.arabic)}</div>
          <div class="muted small">${esc(B.short_ar || B.ar || '')}${B.author_ar ? ` — ${esc(B.author_ar)}` : ''} · ${t('page')} ${esc(p.page)} · <a href="${shLink(r.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
        <p class="mnote">${esc(r['note_' + lang] || '')}</p>`}
      </div></details>`;
  }

  // ---------- Tadabbur & Refleksi Umat (data/tadabbur.json; both levels) ----------
  // AtTartil's own renungan, in the style of «Bila Hamba Berbicara»: no kitab quotes here (those live in Maqsad Ayat and Tafsir).
  // Students see only items with status "disemak". localStorage kamus.preview = '1' also shows "draf" items, with a banner, for UZB's review.
  const preview = () => { try { return localStorage.getItem('kamus.preview') === '1'; } catch (e) { return false; } };
  const tadShown = x => !!x && (x.status === 'disemak' || (x.status === 'draf' && preview()));
  const tadItems = () => (TAD.items || []).filter(tadShown);
  const tadFor = (n, a) => tadItems().find(x => +x.surah === n && a >= +x.from && a <= +x.to) || null;
  const tadRange = x => +x.from === +x.to ? `${x.from}` : `${x.from}–${x.to}`;
  const tadL = (x, k) => x[k + '_' + lang] || x[k + '_ms'] || '';
  const tadArr = (x, k) => [].concat(tadL(x, k) || []).filter(s => typeof s === 'string' && s.trim());
  // renung text with its key phrase highlighted: split on the first exact match, escape each part
  function tadHl(txt, hl) {
    const i = hl ? txt.indexOf(hl) : -1;
    if (i < 0) return esc(txt);
    return `${esc(txt.slice(0, i))}<mark class="tad-hl">${esc(hl)}</mark>${esc(txt.slice(i + hl.length))}`;
  }
  // keep «al-» joined to its word (UZB's adab rule): non-breaking hyphen in text nodes only
  const tadNb = html => html.replace(/>[^<]*/g, m => m.replace(/\b(al|an|ar|as|ash|at|ad|adh|az)-(?=\S)/gi, '$1\u2011'));
  function tadPanel(n, a) { return tadNb(tadPanel0(n, a)); }
  function tadPanel0(n, a) {
    const x = tadFor(n, a); if (!x) return '';
    const rg = tadRange(x);
    // a range shows its card once, at its first ayah; the other ayat get a short link back to it
    if (a !== +x.from) return `<p class="tad-link"><a href="#/s/${n}/${x.from}">${esc(t('tadSee').replace('__R__', rg))} ↑</a></p>`;
    const renung = tadL(x, 'renung'), tagline = tadL(x, 'tagline');
    const tanya = tadArr(x, 'tanya');
    return `<details class="tad" id="tad-${esc(x.id)}"><summary>
        <span class="tad-lab">${t('tadLab')} <span class="tad-rg">· ${t('ayatN')} <span class="nw">${rg}</span></span></span>
        <span class="tad-title">${esc(tadL(x, 'title'))}</span>
        ${tagline ? `<span class="tad-tag">${esc(tagline)}</span>` : ''}
      </summary>
      <div class="tad-body">
        ${x.status !== 'disemak' ? `<p class="tad-draft">${t('tadDraft')}</p>` : ''}
        <div class="tad-grid">
          ${renung ? `<section class="tad-box tad-renung"><h4 class="tad-h">${t('tadRenung')}</h4><p>${tadHl(renung, tadL(x, 'renung_hl'))}</p></section>` : ''}
          ${tanya.length ? `<section class="tad-box tad-tanya"><h4 class="tad-h">${t('tadTanya')}</h4><ul>${tanya.map(s => `<li>${esc(s)}</li>`).join('')}</ul><p class="tad-hint">${t('tadTanyaHint')}</p></section>` : ''}
        </div>
        <p class="tad-foot">${t('tadFoot')}</p>
      </div></details>`;
  }
  function tadHome() {
    const n = tadItems().length; if (!n) return '';
    return `<section class="card tad-home"><h2>${t('tadHomeT')} <span class="muted small">(${n})</span></h2><p>${t('tadHomeIntro')}</p>
      <p class="muted small">${t('tadFoot')}</p><p><a class="more-link" href="#/tadabbur">${t('tadHomeGo')} →</a></p></section>`;
  }
  function viewTadabbur() {
    const items = tadItems();
    const sname = s => (COLLS.find(c => c.surah === +s) || {}).name_ms || `${t('surah')} ${s}`;
    const groups = (TAD.themes || []).map(g => [g, items.filter(x => x.theme === g.id).sort((p, q) => p.surah - q.surah || p.from - q.from)]).filter(([, xs]) => xs.length);
    const card = x => `<a class="scard tad-item" href="#/s/${+x.surah}/${+x.from}"><span class="sc-ar ar">${esc(SURAH[x.surah - 1] || '')}</span>
        <span class="sc-meta"><b>${esc(tadL(x, 'title'))}</b><span class="muted small">${esc(sname(x.surah))} · <span class="nw">${+x.surah}:${tadRange(x)}</span></span>
        ${x.status !== 'disemak' ? `<span><span class="badge draft">${t('draft')}</span></span>` : ''}</span></a>`;
    return `<a class="back" href="#/">${t('back')}</a><h2>${t('tadHomeT')}</h2><p class="fam-intro">${t('tadListIntro')}</p><p class="muted small">${t('tadFoot')}</p>
      ${groups.length ? groups.map(([g, xs]) => `<section class="tad-theme"><h3>${esc(g[lang] || g.ms)}</h3><div class="sgrid">${xs.map(card).join('')}</div></section>`).join('')
        : `<div class="empty">${t('tadNone')}</div>`}`;
  }
  // #/s/<n>/<ayah>: scroll to that ayah and open its tadabbur card, if it has one
  function focusAyah(a) {
    const el = document.getElementById('ay-' + a); if (!el) return;
    const d = el.querySelector('details.tad'); if (d) d.open = true;
    el.scrollIntoView({ block: 'start' });
  }

  function maqsadSurah(n) {
    const r = (MAQSURAH.s || {})[String(n)]; if (!r || r.status !== 'verified') return '';
    const total = r.books.reduce((s, b) => s + b.points.length, 0);
    return `<details class="msur"><summary>${t('msT')} <span class="muted small">${total} ${t('mqPts')}</span></summary>
      <div class="msur-body"><p class="muted small">${t('msIntro')}</p>
        ${mudah() ? `<p class="plain">${esc(r['note_' + lang] || '')}</p>
          <details class="src"><summary>${t('seeQuote')} <span class="muted small">(${total})</span></summary>
            ${r.books.map(b => `<div class="mbook"><div class="mb-h"><b class="ar">${esc(b.book_ar)}</b> <span class="muted small">${esc(b.author_ar)}</span></div>
              ${b.points.map(p => `<div class="mpt"><div class="mpt-h">${esc(p['topic_' + lang] || '')}</div>
                <div class="q">${esc(p.arabic)}</div>
                <div class="muted small">${volPage(p)} · <a href="${shLink(b.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
            </div>`).join('')}
          </details></div></details>` : `
        ${r.books.map(b => `<div class="mbook"><div class="mb-h"><b class="ar">${esc(b.book_ar)}</b> <span class="muted small">${esc(b.author_ar)}</span></div>
          ${b.points.map(p => `<div class="mpt"><div class="mpt-h">${esc(p['topic_' + lang] || '')}</div>
            <div class="q">${esc(p.arabic)}</div>
            <div class="muted small">${volPage(p)} · <a href="${shLink(b.book_id, p.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div></div>`).join('')}
        </div>`).join('')}
        <p class="mnote">${esc(r['note_' + lang] || '')}</p>`}</div></details>`;
  }

  function ayNote(n) {
    const qs = n.quotes || [];
    if (mudah()) return `<div class="aynote"><h4>${t('scholarNote')}</h4>
      <div class="nb">${[...new Set(qs.map(q => String(q.book_id)))].map(id => who(id, (qs.find(q => String(q.book_id) === id) || {}).author)).join(' · ')}</div>
      <p>${esc(n['note_' + lang] || '')}</p>
      ${qs.length ? `<details class="src"><summary>${t('seeQuote')} <span class="muted small">(${qs.length})</span></summary>
        ${qs.map(q => `<div class="q">«${esc(q.arabic)}»</div>
        <div class="muted small">${esc(q.book)} — ${esc(q.author)} · ${volPage(q)} · <a href="${shLink(q.book_id, q.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`).join('')}</details>` : ''}</div>`;
    return `<div class="aynote"><h4>${t('scholarNote')}</h4>
      ${(n.quotes || []).map(q => `<div class="q">«${esc(q.arabic)}»</div>
        <div class="muted small">${esc(q.book)} — ${esc(q.author)} · ${volPage(q)} · <a href="${shLink(q.book_id, q.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`).join('')}
      <p>${esc(n['note_' + lang] || '')}</p></div>`;
  }
  // Mudah level names the SCHOLAR and their field; the full title, volume and page stay in Ilmiah and under "Lihat nukilan".
  function who(bid, fallback) {
    const w = WHO[String(bid)];
    if (!w) return `<b>${esc(fallback || '')}</b>`;
    return `<b class="who">${esc(w['who_' + lang] || w.who_ms)}</b> <span class="muted small">(${esc(w['field_' + lang] || w.field_ms)})</span>`;
  }
  const whoName = bid => { const w = WHO[String(bid)]; return w ? (w['who_' + lang] || w.who_ms) : ''; };
  const shLink = (bid, pid) => `https://shamela.ws/book/${encodeURIComponent(bid)}/${encodeURIComponent(pid)}`;
  function noteCard(x, head) {
    if (mudah() && x.book_id && x.arabic) return `<div class="note"><div class="nb">${who(x.book_id, x.author || x.book)}</div>
      <p>${esc(x['note_' + lang] || '')}</p>
      <details class="src"><summary>${t('seeQuote')}</summary>
        <div class="muted small">${head || `<b>${esc(x.book)}</b>`} ${esc(x.author || '')}${x.vol ? ` · ${t('vol')} ${esc(x.vol)}` : ''}${x.page ? `${x.vol ? ',' : ' ·'} ${t('page')} ${esc(x.page)}` : ''}</div>
        <div class="q">«${esc(x.arabic)}»</div>
        <a class="shamela" href="${shLink(x.book_id, x.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></details></div>`;
    return `<div class="note"><div class="nb">${head || `<b>${esc(x.book)}</b>`} <span class="muted small">${esc(x.author || '')}${x.vol ? ` · ${t('vol')} ${esc(x.vol)}` : ''}${x.page ? `${x.vol ? ',' : ' ·'} ${t('page')} ${esc(x.page)}` : ''}</span></div>
      <div class="q">«${esc(x.arabic)}»</div><p>${esc(x['note_' + lang] || '')}</p>
      <a class="shamela" href="${shLink(x.book_id, x.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`;
  }

  // --- Segment 1: meaning (lexicons)
  const draftBadge = m => m && m.status !== 'verified' ? ` <span class="badge draft">${t('draft').split(' — ')[0]}</span>` : '';
  function segMakna(root, lem) {
    const R = ROOTS[root], m = (NOTES.meaning || {})[root];
    // P1: a lex note written for some lemmas of the root only (rec.lemmas) is shown for those words only
    const notes = Object.values((NOTES.lex || {})[root] || {}).filter(x => lemFits(x, lem));
    return `<div class="blk"><div class="blk-h"><span>${t('root')}</span><b class="ar rootl">${esc(spaced(root))}</b>
        ${R ? `<span class="muted small">${R.f.toLocaleString()} ${t('times2')} ${t('inQuran')}</span>` : ''}</div>
      ${m && m[lang] ? `<p style="margin:.2em 0">${esc(m[lang])}${draftBadge(m)}</p>` : ''}
      ${notes.length ? `<div class="muted small" style="margin-top:6px">${t('scholars')}</div>` + notes.map(x => noteCard(x)).join('')
        : `<p class="muted small">${t('noNote')}</p>`}
      <a class="more-link" href="#/root/${encodeURIComponent(root)}">${t('fullRoot')} →</a></div>`;
  }

  // --- Segment 2: bab (verb pattern) and how the meaning changes across patterns
  function babName(vf, lem, root) { return BAB[vf] ? `${lab(LB.MISC.BAB, false)} ${BAB[vf][0]} · ${babWazan(vf, lem, lemForms(root, lem))}` : ''; }
  // P1-F4: which Form I sub-pattern a Shadha al-'Arf meaning belongs to (its own "wazan" field, else read from its English).
  // The ghalabah item is a vowelling rule for one class of fa'ala verbs, not a meaning of every fa'ala verb, so it is
  // not attached to فَعَلَ (left for ATV/UZB, Peringkat 2).
  const babSub = m => m.wazan || (/^fa'ila\b/.test(m.en || '') ? 'فَعِلَ' : /^fa'ula\b|fa'ula pattern/.test(m.en || '') ? 'فَعُلَ' : null);
  function segBab(root, vf, lem) {
    const list = (NOTES.forms || {})[root] || [];
    const here = vf ? list.filter(x => x.form === vf) : [];
    const others = list.filter(x => x.form !== vf);
    const babRef = BABS && vf && BABS.babs[vf];
    if (!vf && !list.length) return `<div class="blk"><p class="muted small" style="margin:0">${t('noBab')}</p></div>`;
    // Form I: only the meanings of this word's own sub-pattern; none when the sub-pattern cannot be read
    const R = ROOTS && ROOTS[root], forms = lemForms(root, lem), isV = !!(R && (R.lem.find(l => l[0] === lem) || [])[2] === 'V');
    const sub = vf === '1' ? (PICK.formOneWazan(lem, forms) || (!isV && R ? PICK.rootFormOne(R.lem) : null)) : null;
    // ATV-P1-02: تَبَارَكَ is said of Allah only; the general tafa'ala list («berpura-pura» …) is not printed under it
    const hideList = lem === 'تَبارَكَ';
    const meanings = babRef && !hideList ? (vf === '1' ? (sub ? (babRef.meanings || []).filter(m => babSub(m) === sub) : []) : (babRef.meanings || [])) : [];
    const head = vf === '1' && sub ? `${lab(LB.MISC.BAB, false)} ${BAB[vf][0]} · ${sub}` : babName(vf, lem, root);
    return `<div class="blk">
      <p class="muted small" style="margin:.1em 0 .5em">${t('babIntro')}</p>
      ${vf ? `<div class="bab-head"><b class="ar">${esc(vf === '1' && sub ? sub : babWazan(vf, lem, forms))}</b><span>${esc(head)}</span></div>` : ''}
      ${here.map(x => `<div class="formrow"><span class="fgloss">${esc(x['gloss_' + lang] || '')}</span>${noteCard(x)}</div>`).join('')}
      ${babRef && vf === '1' && !sub ? `<p class="muted small bab-unknown">${t('babOneUnknown')}</p>` : ''}
      ${babRef && hideList ? `<p class="muted small bab-unknown">${t('babHidden')}</p>` : ''}
      ${babRef && meanings.length ? `<div class="muted small" style="margin-top:8px">${t('babMeaning')}</div>
        <p class="bab-general">${t('babGeneral')}</p>
        <div class="note"><div class="nb"><b>${esc(BABS.book)}</b> <span class="muted small">${esc(BABS.author)}</span></div>
          <ol class="mlist">${meanings.map(m => `<li><span class="mn-t">${esc(m[lang] || '')}</span>
            ${m.arabic ? `<div class="q">«${esc(m.arabic)}»</div>
              <div class="muted small">${t('page')} ${esc(m.page)} · <a href="${shLink(BABS.book_id, m.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`
              : `<p class="partial">${t('babPartial')}</p>`}</li>`).join('')}</ol>
</div>` : ''}
      ${others.length ? `<div class="muted small" style="margin-top:10px">${t('babOther')}</div>
        <div class="forms-grid">${others.map(x => `<div class="fcard"><div class="fc-h"><b class="ar">${esc(x.lemma || '')}</b><span class="muted small">${esc(babName(x.form, x.lemma, root))}</span></div>
          <div class="fgloss">${esc(x['gloss_' + lang] || '')}</div>
          <details><summary>${esc(x.book)}</summary>${noteCard(x)}</details></div>`).join('')}</div>` : ''}
    </div>`;
  }

  // --- Segment 3: al-Furuq al-Lughawiyyah
  function segFuruq(root, lem) {
    const list = ((NOTES.furuq || {})[root] || []).filter(x => lemFits(x, lem));
    if (!list.length) return `<div class="blk"><p class="muted small" style="margin:0">${t('noFuruq')}</p></div>`;
    return `<div class="blk"><p class="muted small" style="margin:.1em 0 .5em">${t('furuqIntro')}</p>
      ${list.map(x => noteCard(x, `<b class="ar fq-t">${esc(x.title)}</b>`)).join('')}</div>`;
  }

  function rootBlock(root, vf, lem) {
    const tabs = [['makna', segMakna(root, lem)], ['bab', segBab(root, vf, lem)], ['furuq', segFuruq(root, lem)]];
    const id = 'tb' + Math.random().toString(36).slice(2, 8);
    return `<div class="tabs" id="${id}">
      <div class="tabbar" role="tablist">${tabs.map((x, i) => `<button type="button" role="tab" class="tab ${i ? '' : 'on'}" data-tab="${x[0]}" data-tabs="${id}" aria-selected="${i ? 'false' : 'true'}">${t('tab' + x[0][0].toUpperCase() + x[0].slice(1))}</button>`).join('')}</div>
      ${tabs.map((x, i) => `<div class="tabp" data-tabp="${x[0]}"${i ? ' hidden' : ''}>${x[1]}</div>`).join('')}</div>`;
  }

  // rootless segment: the verified note PICK chose, its label, and any disagreement with this ayah's i'rab
  function segNote(n, a, wi, si, w) {
    const p = PICK.pickNote({ surah: n, ayah: a, wi, si, w, tagged: SHUR[n] || {}, HURUF, LB });
    if (!p) return null;
    p.conflict = p.h ? PICK.irabConflict(p, irabText(n, a)) : null;
    p.label = p.h ? (p.otherRefs ? PICK.generalLabel(p.h['label_' + lang] || p.h.label_ms, lang === 'en') : (p.h['label_' + lang] || p.h.label_ms)) : '';
    return p;
  }
  const refsTxt = rs => rs.map(r => r.split(':').slice(0, 2).join(':')).filter((x, i, A) => A.indexOf(x) === i).join(', ');
  function hurufBlock(p, label, shown) {
    const key = p.key || '';
    if (!p.h) return `<div class="blk"><div class="blk-h"><b class="ar">${esc(shown || key)}</b><span>${esc(label)}</span></div><p class="muted small">${t('noNote')}</p></div>`;
    const h = p.h;
    const qs = h.quotes || [{ arabic: h.arabic, page_id: h.page_id, vol: h.vol, page: h.page }];
    return `<div class="blk"><div class="blk-h"><b class="ar">${esc(shown || key)}</b><span>${esc(p.label || label)}</span></div>
      ${p.conflict ? `<div class="irab-diff"><p>${esc(t('irabDiff'))}</p><div class="q">${esc(p.conflict.quote)}</div></div>` : ''}
      <div class="muted small" style="margin-top:4px">${t('scholars')}</div>
      <div class="note"><div class="nb"><b>${esc(h.book)}</b> <span class="muted small">${esc(h.author)}</span></div>
        ${qs.map(q => `<div class="q">«${esc(q.arabic)}»</div><div class="muted small">${volPage(q)} · <a href="${shLink(h.book_id, q.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`).join('')}
        <p>${esc(h['note_' + lang])}</p>
        ${p.otherRefs ? `<p class="muted small other-ref">${esc(t('otherRef').replace('__R__', refsTxt(p.otherRefs)))}</p>` : ''}
        <span class="badge ${p.stated ? 'verified' : 'pending'}">${t(p.stated ? 'stated' : 'general')}</span></div></div>`;
  }

  function wordPanel(n, a, i) {
    const w = SDATA[n].ayat.find(x => x.a === a).words[i];
    const TR = STR[n], gl = TR && TR.ayat[a] && TR.ayat[a].w[i];
    const segs = w.segs.map((g, si) => {
      const info = segInfo(g, w, si), note = g.root ? null : segNote(n, a, i, si, w);
      // A9/A22: a verified kitab note names the particle; its label replaces the corpus tag's label for this segment
      if (note && note.h && note.label) info.label = note.label;
      // P2-A: a reviewer's per-word kitab record that reads a corpus isim as a particle (ma za'idah 67:23) colours its chip as harf
      if (note && note.override && info.type === 'isim' && ['SUP', 'NEG', 'PREV'].includes((PICK.noteClass(note.h, note.tag) || {}).c)) info.type = 'harf';
      return { g, si, info, note };
    });
    const fv = failWord(n, a, i);
    const seen = new Set();
    const blocks = segs.map(({ g, info, note }) => {
      const id = g.root ? 'r:' + g.root : 'k:' + PICK.segKey(g) + '|' + (note && note.id); if (seen.has(id)) return ''; seen.add(id);
      if (g.root) return rootBlock(g.root, (g.tags.find(x => x.startsWith('VF:')) || '').slice(3), g.lem);
      return hurufBlock(note, info.label, segText(g));
    }).join('');
    return `<div class="wp-top"><div><div class="wp-word ar">${esc(w.t)}</div>
        ${gl ? `<div class="wp-gloss">${esc(gl[lang === 'ms' ? 0 : 1])}</div>` : ''}</div>
        <button type="button" class="btn ghost wp-close" data-close="${a}">${t('close')}</button></div>
      ${mudah() ? '' : `<div class="muted small">${t('parts')}</div>
      <div class="segs">${segs.map(({ g, info }) => `<div class="seg"><span class="seg-ar ar t-${info.type}">${esc(segText(g))}</span>
        <span class="chip-t t-bg-${info.type}">${esc(lab(LB.TYPE[info.type]))}</span>
        <span class="seg-l"><b>${esc(info.label)}</b>${info.extra.length ? ` <span class="muted">· ${esc(info.extra.join(' · '))}</span>` : ''}</span></div>`).join('')}</div>`}
      ${mudah() ? simpleMeaning(segs, gl) + fv.filter(x => x.marji).map(x => `<div class="blk fablk mj-mudah"><div class="muted small">${t(x.voice === 'passive' ? 'failSubPass' : 'failSub')} <span class="ar">${esc(x.verb)}</span></div>${marjiLine(x.marji)}</div>`).join('') : `
      ${fv.length ? `<div class="blk fablk"><div class="muted small">${t('failT')}</div>${fv.map(x => failItem(x, n, a)).join('')}</div>` : ''}
      ${blocks}`}`;
  }

  // Mudah level: one plain line per part of the word, no kitab, no Arabic quotation
  function simpleMeaning(segs, gl) {
    const seen = new Set(), rows = [];
    const whole = gl ? gl[lang === 'ms' ? 0 : 1] : '';
    segs.forEach(({ g, info, note }) => {
      const id = g.root ? 'r:' + g.root : 'k:' + PICK.segKey(g) + '|' + (note && note.id); if (seen.has(id)) return; seen.add(id);
      let ms = '', sub = '', msB = '', subB = '';
      if (g.root) {
        const m = (NOTES.meaning || {})[g.root], rm = m && m[lang];
        // A13: the word's own gloss first; the root's general meaning is labelled as the root's, not the word's.
        // P1-F6: a draft root meaning carries its «Draf» mark here too; a word with prefixes (ٱلْمَوْتَ) whose root has
        // no meaning line shows the word's own gloss (surah-NNN-tr.json w[i]) on its root part
        if (segs.length === 1 && whole) { ms = whole; if (rm) { sub = `${t('rootMeaning')}: ${rm}`; subB = draftBadge(m); } }
        else if (rm) { ms = `${t('rootMeaning')}: ${rm}`; msB = draftBadge(m); }
        // ATV-P1-01: only for ال + a plain isim (ٱلْمَوْتَ) — every other part is the article and the stem's label is the
        // bare type; any other affixed word keeps its stem's grammar label
        else if (whole && segs.every(x => x.g.root === g.root || x.g.tags.includes('DET')) && info.label === lab(LB.TYPE[info.type])) ms = whole;
      } else if (note && note.h) {
        ms = glossLabel(note.label, tagLabOf(g), PICK.segKey(g));
        if (note.conflict) sub = t('irabDiffM');
      }
      rows.push(`<div class="sm-row"><span class="sm-ar ar t-${info.type}">${esc(segText(g))}</span>
        <span class="sm-b"><span class="chip-t t-bg-${info.type}">${esc(lab(LB.TYPE[info.type]))}</span>
        ${ms ? `<span class="sm-m">${esc(ms)}${msB}</span>` : info.label && info.label !== lab(LB.TYPE[info.type]) ? `<span class="sm-m sm-lab">${esc(info.label)}</span>` : ''}
        ${sub ? `<span class="muted small sm-sub">${esc(sub)}${subB}</span>` : ''}</span></div>`);
    });
    return `<div class="blk simple"><div class="muted small">${t('wMeaning')}</div>${rows.join('')}
      <button type="button" class="more-link" data-lv="ilmiah">${t('seeMore')} →</button></div>`;
  }

  function openWord(btn) {
    const n = +btn.dataset.s, a = +btn.dataset.a, i = +btn.dataset.w;
    document.querySelectorAll('.w.on').forEach(b => b.classList.remove('on'));
    document.querySelectorAll('.wpanel').forEach(p => { if (p.id !== 'wp-' + a) p.hidden = true; });
    btn.classList.add('on');
    document.querySelectorAll('.w.fa-on').forEach(b => b.classList.remove('fa-on'));
    failWord(n, a, i).forEach(x => {
      if (x.w_sub == null) return;
      const s = document.querySelector(`.w[data-a="${a}"][data-w="${x.w_sub}"]`);
      if (s) s.classList.add('fa-on');
    });
    const p = $('#wp-' + a); p.innerHTML = wordPanel(n, a, i); p.hidden = false; linkGloss(p);
    p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }



  // ---------- Keluarga Makna (semantic families) ----------
  const famsOf = root => (FAMS.families || []).filter(f => f.status === 'verified' && f.members.some(m => m.root === root));
  const bookAr = bid => (WHO[String(bid)] || {}).book_ar || '';
  const fullCite = q => `<div class="muted small">${esc(bookAr(q.book_id))} · ${volPage(q)} · <a href="${shLink(q.book_id, q.page_id)}" target="_blank" rel="noopener">${t('openShamela')} ↗</a></div>`;
  // Mudah: scholar + Malay first, the quotation under "Lihat nukilan"; Ilmiah: quotation, citation, then Malay
  // P1-F7: who a quotation is reported from. BM shows reported_from_ms, or the plain field when it holds no English
  // words; an English-only note (e.g. "…, via al-Raghib", "some exegetes (unnamed)") is hidden in BM, not shown.
  const EN_WORDS = /\b(?:via|same|some|for|the|of|only|unnamed|text|his|its|is|not|stated|speaker|scholars|sages|exegetes|definition|body)\b|page_id|Shamela/i;
  const repTxt = q => { if (!q) return ''; if (lang === 'en') return q.reported_from_en || q.reported_from || '';
    if (q.reported_from_ms) return q.reported_from_ms; const s = q.reported_from || ''; return s && !EN_WORDS.test(s) ? s : ''; };
  const repBy = q => repTxt(q) ? `<span class="muted small td-rep">${esc(repTxt(q))}</span>` : '';
  function famQuoted(qs, note) {
    qs = qs.filter(Boolean);
    if (mudah()) return `<div class="nb">${[...new Set(qs.map(q => String(q.book_id)))].map(id => who(id)).join(' · ')}</div>
      <p>${esc(note || '')}</p>
      <details class="src"><summary>${t('seeQuote')}</summary>${qs.map(q => `${repBy(q)}<div class="q">${esc(q.arabic)}</div>${fullCite(q)}`).join('')}</details>`;
    return `${qs.map(q => `<div class="nb">${who(q.book_id)}</div>${repBy(q)}<div class="q">${esc(q.arabic)}</div>${fullCite(q)}`).join('')}<p>${esc(note || '')}</p>`;
  }
  function viewFamilies() {
    const fs = famSorted();
    return `<a class="back" href="#/">${t('back')}</a><h2>${t('famT')}</h2><p class="muted" style="margin-top:0">${t('famIntro')}</p>
      <div class="sgrid">${fs.map(f => `<a class="scard" href="#/makna/${esc(f.id)}"><span class="sc-meta"><b>${esc(f['title_' + lang] || f.title_ms)}</b>
        <span class="muted small">${f.members.length} ${t('famRoots')} · <span class="ar">${f.members.map(m => esc(m.root)).join(' · ')}</span></span></span></a>`).join('')}</div>`;
  }

  // Sudut Taraduf: quotations may be one scholar reporting another (reported_from)
  function tdQuoted(qs, note) {
    qs = (qs || []).filter(Boolean);
    const by = repBy;
    if (mudah()) return `<div class="nb">${[...new Set(qs.map(q => String(q.book_id)))].map(id => who(id)).join(' · ')}</div>
      <p>${esc(note || '')}</p>
      ${qs.length ? `<details class="src"><summary>${t('seeQuote')}</summary>${qs.map(q => `${by(q)}<div class="q">${esc(q.arabic)}</div>${fullCite(q)}`).join('')}</details>` : ''}`;
    return `<p>${esc(note || '')}</p>${qs.map(q => `<div class="td-q"><div class="nb">${who(q.book_id)}</div>${by(q)}<div class="q">${esc(q.arabic)}</div>${fullCite(q)}</div>`).join('')}`;
  }
  const ayChips = rs => (rs || []).length ? `<span class="fw-refs">${rs.map(r => `<span class="chip"><span class="ar">${esc(SURAH[r.split(':')[0] - 1])}</span> ${esc(r)}</span>`).join(' ')}</span>` : '';
  function taradufHtml(td) {
    if (!td || td.status !== 'verified') return '';
    const L = o => o['note_' + lang] || o.note_ms;
    const mk = td.mukhassas;
    return `<section class="td-sec"><h2>${t('tdT')}</h2><p class="fam-intro">${esc(L(td))}</p>
      <h3>${t('tdViews')}</h3>
      <div class="td-grid">${(td.views || []).map(v => `<article class="card td-v"><h4>${esc(v['label_' + lang] || v.label_ms)}</h4>${tdQuoted(v.quotes, L(v))}</article>`).join('')}</div>
      ${td.ibn_ashur_benefits ? `<article class="card td-b"><h3>${t('tdBenefits')}</h3>${tdQuoted(td.ibn_ashur_benefits.quotes, L(td.ibn_ashur_benefits))}<div>${ayChips(td.ibn_ashur_benefits.ayat)}</div></article>` : ''}
      ${mk ? `<article class="card td-m"><h3>${t('tdMuk')}</h3><div class="nb">${who(mk.book_id)}</div><p>${esc(L(mk))}</p>
        <ul class="td-words">${(mk.words || []).map(x => `<li><div class="tw-h"><span class="ar tw-ar">${esc(x.ar)}</span> <b>${esc(x.tr)}</b>${x.new_to_family ? ` <span class="badge tw-new">${t('tdNew')}</span>` : ''}</div>
          <div>${esc(x[lang] || x.ms)} ${ayChips(x.ayat)}</div>
          <details class="src"><summary>${t('seeQuote')}</summary>${repBy(x.quote)}<div class="q">${esc(x.quote.arabic)}</div>${fullCite(x.quote)}</details></li>`).join('')}</ul></article>` : ''}
      ${td.quran ? `<article class="card td-qr"><h3>${t('tdQuran')}</h3>${tdQuoted(td.quran.quotes, L(td.quran))}<div>${ayChips(td.quran.ayat)}</div></article>` : ''}
      ${td.link_ms ? `<aside class="card td-link"><h3>${t('tdLink')}</h3>${tdQuoted(td.link_quotes, td['link_' + lang] || td.link_ms)}</aside>` : ''}
    </section>`;
  }
  async function renderFamily(id) {
    const box = $('#famBox'); const f = (FAMS.families || []).find(x => x.id === id && x.status === 'verified');
    if (!f) { box.innerHTML = `<div class="empty">${t('noRes')}</div>`; return; }
    const Q = await loadQuran();
    const ex = (m, e) => { const [s] = e.ref.split(':');
      const by = e.chosen_by === 'attartil' ? t('famChosenUs') : t('famChosenScholar').replace('__S__', whoName(e.chosen_by) || '');
      return `<div class="fm-ex"><div class="ar fm-ay">${esc(Q[e.ref] || '')}</div><p class="fm-tr">${esc(e.ms)}</p>
        <div class="muted small">${t('surah')} <span class="ar">${esc(SURAH[s - 1])}</span> ${esc(e.ref)} · <span class="fm-by${e.chosen_by === 'attartil' ? ' us' : ''}">${esc(by)}</span></div></div>`; };
    const member = m => `<article class="card fam-m">
        <div class="fm-h"><span class="ar fm-w">${esc(m.word)}</span><b class="fm-tr2">${esc(m.tr)}</b><span class="ar muted fm-root">${esc(m.root)}</span></div>
        <p class="fm-s">${esc(m['short_' + lang] || m.short_ms)}</p>
        <div class="muted small">${m.freq} ${t('famCount')}${m.freq_partial ? ' ' + t('famPartial') : ''}${mudah() ? '' : ` · <span class="ar">${(m.freq_lemmas || []).map(esc).join('، ')}</span>`}</div>
        ${!mudah() && m['freq_note_' + lang] ? `<p class="muted small fm-fn">${esc(m['freq_note_' + lang])}</p>` : ''}
        <details class="fm-more"><summary>${t('famDefs')}</summary>
          ${(m.def || []).map(d => `<div class="fm-def">${famQuoted([d], d['note_' + lang])}</div>`).join('')}
          ${(m.examples || []).map(e => ex(m, e)).join('')}
        </details>
        ${ROOTS[m.root] ? `<a class="more-link" href="#/root/${encodeURIComponent(m.root)}">${t('famRootLink')} →</a>` : ''}</article>`;
    const pair = p => { const prim = (p.quotes || []).filter(q => q.reading === 'primary'), ed = (p.quotes || []).filter(q => q.reading === 'edition');
      return `<article class="card fam-p"><div class="fp-h"><b>${esc(p.a_tr)}</b> <span class="ar">${esc(p.a)}</span> <span class="fp-vs">↔</span> <b>${esc(p.b_tr)}</b> <span class="ar">${esc(p.b)}</span></div>
        ${famQuoted(prim, p['note_' + lang])}
        ${p['sources_note_' + lang] ? `<p class="muted small">${esc(p['sources_note_' + lang])}</p>` : ''}
        ${ed.length ? `<details class="src fp-ed"><summary>${t('famEdition')}</summary><p class="muted small">${esc(p['edition_note_' + lang] || p.edition_note_ms || '')}</p>
          ${ed.map(q => `<div class="q">${esc(q.arabic)}</div>${fullCite(q)}`).join('')}</details>` : ''}</article>`; };
    const wujuh = w => `<section class="card fam-w"><h3>${t('famWujuh').replace('__W__', esc(w.root))}</h3>
        <div class="nb">${who(w.book_id)}</div><p>${esc(w['note_' + lang] || '')}</p>
        <ol class="fw-list">${(w.senses || []).map(sn => `<li><b>${esc(sn[lang] || sn.ms)}</b>
          <span class="fw-refs">${(sn.ayat || []).map(r => `<span class="chip"><span class="ar">${esc(SURAH[r.split(':')[0] - 1])}</span> ${esc(r)}</span>`).join(' ')}</span>
          ${mudah() ? '' : `<div class="q">${esc(sn.arabic)}</div>${fullCite({ book_id: w.book_id, ...sn })}${sn.arabic_cont ? `<div class="q">${esc(sn.arabic_cont)}</div>${fullCite({ book_id: w.book_id, page_id: sn.page_id_cont, page: sn.page_cont })}` : ''}`}</li>`).join('')}</ol>
        ${w['ayat_note_' + lang] ? `<p class="muted small">${esc(w['ayat_note_' + lang])}</p>` : ''}</section>`;
    box.innerHTML = `<h2>${t('famIn')}: ${esc(f['title_' + lang] || f.title_ms)}</h2>
      <p class="fam-intro">${esc(f['note_' + lang] || '')}</p>
      <div class="fam-grid">${f.members.map(member).join('')}</div>
      ${(f.pairs || []).length ? `<h2>${t('famDiff')}</h2><p class="muted" style="margin-top:0">${t('famDiffIntro')}</p>${f.pairs.map(pair).join('')}` : ''}
      ${(f.wujuh || []).map(wujuh).join('')}
      ${taradufHtml(f.taraduf)}
      ${f['gaps_' + lang] ? `<p class="muted small fam-gaps"><b>${t('famGaps')}:</b> ${esc(f['gaps_' + lang])}</p>` : ''}`;
    linkGloss(box);
  }

  // ---------- glossary ----------
  // glossary.json is the single source of truth for every bracket gloss; the deploy gate
  // (scripts/check-sources.mjs) refuses a build in which a term is glossed two different ways.
  function buildGlossIdx() {
    GLOSS_IDX = new Map(); GLOSS_K = new Map(); GLOSS_BASE = new Map();
    const addB = (k, x) => { k = String(k).toLowerCase(); if (!GLOSS_BASE.has(k)) GLOSS_BASE.set(k, []); GLOSS_BASE.get(k).push(x); };
    for (const x of GLOSS.terms || []) {
      GLOSS_IDX.set(x.k.toLowerCase(), x); GLOSS_K.set(x.k.toLowerCase(), x);
      for (const a of x.alt || []) GLOSS_IDX.set(String(a).toLowerCase(), x);
      // "bab (maqayis)" is a sense of "bab": every sense shares the base key, and the bracket text picks the sense
      addB(x.k.replace(/\s*\(.*$/, '').trim(), x); for (const a of x.alt || []) addB(a, x);
    }
    const keys = [...GLOSS_BASE.keys()].sort((a, b) => b.length - a.length)   // longest first: "fi'il mudari'" beats "fi'il"
      .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['\u2019]"));
    GLOSS_RE = keys.length ? new RegExp(`(^|[^\\p{L}'\u2019-])(${keys.join('|')})(?=\\s*\\(([^()]*)\\))`, 'giu') : null;
    GLOSS_ANY_RE = keys.length ? new RegExp(`(^|[^\\p{L}'\u2019-])(${keys.join('|')})(?![\\p{L}'\u2019-])`, 'giu') : null;
  }
  // the entry a bracket gloss belongs to: its own wording, an "also" wording, or one plain word + either
  // ("huruf jawapan" for "jawab (jawapan)"). No match = no link: a link must never open a different sense.
  const normG = s => String(s || '').replace(/[\u2018\u2019]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
  function glossEntry(term, bracket) {
    const c = GLOSS_BASE.get(term.replace(/\u2019/g, "'").toLowerCase()) || [], b = normG(bracket);
    const okW = w => { w = normG(w); return !!w && (b === w || (b.endsWith(' ' + w) && !b.slice(0, -w.length - 1).includes(' '))); };
    return c.find(x => [x.ms, x.en, ...(x.also || [])].some(okW)) || null;
  }
  // Makes "naqis (tidak lengkap …)" in a rendered note tappable. Text nodes only; Arabic, quotes and buttons are never touched.
  function linkGloss(root) {
    if (!GLOSS_RE || !root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => {
      // never inside Arabic, quotations, Basmeih's verse translation (.tr, .fm-tr), book titles (.td-rep, .nb) or controls
      const p = n.parentElement; if (!p || p.closest('a, button, input, .ar, .q, .blk, .sm-ar, .one-a, .tr, .fm-tr, .td-rep, .nb, bdi, h1, h2, h3')) return NodeFilter.FILTER_REJECT;
      return n.nodeValue.includes('(') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP; } });
    const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n);
    for (const tn of nodes) {
      const txt = tn.nodeValue; let last = 0, frag = null, m; GLOSS_RE.lastIndex = 0;
      while ((m = GLOSS_RE.exec(txt))) {
        const e = glossEntry(m[2], m[3]); if (!e) continue;
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(txt.slice(last, m.index + m[1].length)));
        const a = document.createElement('a'); a.className = 'gl'; a.href = '#/istilah/' + encodeURIComponent(e.k); a.textContent = m[2]; frag.appendChild(a);
        last = m.index + m[0].length;
      }
      if (frag) { frag.appendChild(document.createTextNode(txt.slice(last))); tn.replaceWith(frag); }
    }
    isolateArabic(root);
  }
  // Arabic quoted inside Malay/English prose («تبارك الذي...», «هو ... قدير») is put in its own right-to-left
  // island, so the bidi algorithm cannot move the dots or split the phrase around the guillemets.
  const AR_CH = '\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF';
  const AR_RUN = new RegExp(`[${AR_CH}](?:[${AR_CH}\\s.…،؛:-]*[${AR_CH}])?(?:\\s?(?:\\.{2,}|…))?`, 'g');
  function isolateArabic(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => {
      const p = n.parentElement; if (!p || p.closest('.ar, .q, [dir="rtl"], bdi, input, textarea, script, style, .arw, .arw1, .rt, .big, .gl-ar, .fq-t')) return NodeFilter.FILTER_REJECT;
      return /[\u0600-\u06FF]/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP; } });
    const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n);
    for (const tn of nodes) {
      const txt = tn.nodeValue; let last = 0, m; const frag = document.createDocumentFragment(); AR_RUN.lastIndex = 0;
      while ((m = AR_RUN.exec(txt))) {
        frag.appendChild(document.createTextNode(txt.slice(last, m.index)));
        const b = document.createElement('bdi'); b.dir = 'rtl'; b.textContent = m[0];
        // a short quote stays on one line with its guillemets: «هو … قدير» never splits as «…هو / قدير»
        const end = m.index + m[0].length, q1 = txt[end] === '»', lc = frag.lastChild, q0 = !!lc && lc.nodeType === 3 && lc.nodeValue.endsWith('«');
        if (m[0].length <= 25) {
          const w = document.createElement('span'); w.className = 'nw';
          if (q0) { frag.lastChild.nodeValue = frag.lastChild.nodeValue.slice(0, -1); w.append('«'); }
          w.appendChild(b); if (q1) w.append('»'); frag.appendChild(w); last = end + (q1 ? 1 : 0);
        } else { frag.appendChild(b); last = end; }
      }
      frag.appendChild(document.createTextNode(txt.slice(last))); tn.replaceWith(frag);
    }
  }
  function viewGlossary(sel) {
    const terms = (GLOSS.terms || []).slice().sort((a, b) => a.k.localeCompare(b.k));
    const cats = ['nahu', 'sarf', 'balaghah', 'tafsir', 'lughah', 'umum'], C = t('glossCat');
    const row = x => `<div class="gl-row${sel && x.k === sel ? ' hit' : ''}" id="gl-${esc(x.k)}" data-cat="${x.cat}" data-k="${esc([x.k, ...(x.alt || []), x.ms, x.en].join(' ').toLowerCase())}">
        <div class="gl-h"><b>${esc(x.k)}</b>${x.ar ? ` <span class="ar gl-ar">${esc(x.ar)}</span>` : ''}<span class="gl-cat">${esc(C[x.cat] || x.cat)}</span></div>
        <div class="gl-m">${esc(x[lang] || x.ms)}</div></div>`;
    return `<a class="back" href="#/">${t('back')}</a>
      <h2>${t('glossTitle')} <span class="muted small">· ${terms.length} ${t('glossN')}</span></h2>
      <p class="muted" style="margin-top:0">${t('glossIntro')}</p>
      <div class="gl-bar"><input id="glq" type="search" placeholder="${t('glossPh')}" autocomplete="off" aria-label="${t('glossPh')}">
        <div class="chips gl-cats"><button type="button" class="chip on" data-gcat="">${t('glossAll')}</button>${cats.map(c => `<button type="button" class="chip" data-gcat="${c}">${esc(C[c])}</button>`).join('')}</div></div>
      <div class="gl-list">${terms.map(row).join('')}</div><p class="muted gl-none" hidden>${t('glossNone')}</p>`;
  }
  function glossFilter() {
    const ql = (($('#glq') || {}).value || '').trim().toLowerCase();
    const on = document.querySelector('.gl-cats .on'); const cat = on ? on.dataset.gcat : '';
    let shown = 0;
    document.querySelectorAll('.gl-row').forEach(r => { const hide = (cat && r.dataset.cat !== cat) || (ql && !r.dataset.k.includes(ql)); r.hidden = hide; if (!hide) shown++; });
    const none = document.querySelector('.gl-none'); if (none) none.hidden = shown > 0;
  }

  // ---------- router ----------
  function route() {
    const app = $('#app');
    const q = $('#q').value.trim();
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    if (q && !h.startsWith('root/')) { app.innerHTML = viewSearch(q); return; }
    if (h.startsWith('root/')) { app.innerHTML = viewRoot(h.slice(5)); linkGloss(app); renderOcc(true); window.scrollTo(0, 0); return; }
    if (h.startsWith('all')) { app.innerHTML = viewAll(+(h.split('/')[1] || 1)); window.scrollTo(0, 0); return; }
    if (h.startsWith('s/')) { const [, sn, sa] = h.split('/'); const n = +sn || 1, a = +sa || 0; app.innerHTML = viewSurahShell(n); window.scrollTo(0, 0); renderSurah(n).then(() => { if (a) focusAyah(a); }); return; }
    if (h === 'tadabbur') { app.innerHTML = viewTadabbur(); linkGloss(app); window.scrollTo(0, 0); return; }
    if (h.startsWith('tadabbur/')) { const x = tadItems().find(y => String(y.id) === h.slice(9)); location.replace(x ? `#/s/${+x.surah}/${+x.from}` : '#/tadabbur'); return; }
    if (h === 'taraduf') { app.innerHTML = viewTaraduf(); linkGloss(app); window.scrollTo(0, 0); return; }
    if (h === 'makna') { app.innerHTML = viewFamilies(); window.scrollTo(0, 0); return; }
    if (h.startsWith('makna/')) { app.innerHTML = `<a class="back" href="#/makna">${t('back')}</a><div id="famBox"><div class="muted">${t('loading')}</div></div>`; renderFamily(decodeURIComponent(h.slice(6))); window.scrollTo(0, 0); return; }
    if (h.startsWith('istilah')) { const sel = decodeURIComponent(h.split('/')[1] || ''); app.innerHTML = viewGlossary(sel); const hit = sel && document.getElementById('gl-' + sel); if (hit) hit.scrollIntoView({ block: 'center' }); else window.scrollTo(0, 0); return; }
    if (h.startsWith('c/')) { app.innerHTML = viewRoots(h.slice(2)); return; }
    app.innerHTML = viewHome(); linkGloss(app);
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-lang]').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
    document.querySelectorAll('.lvl [data-lv]').forEach(b => {
      b.textContent = t(b.dataset.lv === 'mudah' ? 'lvMudah' : 'lvIlmiah');
      b.classList.toggle('on', b.dataset.lv === level);
    });
    const lv = document.querySelector('.lvl'); if (lv) lv.setAttribute('aria-label', t('lvLabel'));
    buildKbd();
  }
  function applySize() { document.documentElement.style.setProperty('--fs', size + 'px'); }

  function buildKbd() {
    const letters = 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ء أ'.split(' ');
    $('#kbd').innerHTML = letters.map(l => `<button type="button" data-k="${l}">${l}</button>`).join('')
      + `<button type="button" class="wide" data-k=" ">${t('space')}</button><button type="button" class="wide" data-k="⌫">⌫</button><button type="button" class="wide" data-k="clear">${t('clear')}</button>`;
  }

  // ---------- events ----------
  document.addEventListener('click', ev => {
    const b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.lang) { lang = b.dataset.lang; store.set('kamus.lang', lang); applyLang(); route(); }
    else if (b.dataset.lv) { level = b.dataset.lv; store.set('kamus.level', level); applyLang(); route(); }
    else if (b.dataset.size) { size = Math.min(28, Math.max(15, size + (+b.dataset.size) * 2)); store.set('kamus.size', size); applySize(); }
    else if (b.classList.contains('w') && b.dataset.a) { openWord(b); }
    else if (b.dataset.close) { const p = $('#wp-' + b.dataset.close); p.hidden = true; document.querySelectorAll('.w.on, .w.fa-on').forEach(x => { x.classList.remove('on'); x.classList.remove('fa-on'); }); }
    else if (b.dataset.ref) { showAyah(b.dataset.ref, b); }
    else if (b.id === 'more') { renderOcc(false); }
    else if (b.dataset.tab) {
      const box = document.getElementById(b.dataset.tabs); if (!box) return;
      box.querySelectorAll('.tab').forEach(x => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-selected', String(on)); });
      box.querySelectorAll('.tabp').forEach(p => { p.hidden = p.dataset.tabp !== b.dataset.tab; });
    }
    else if (b.dataset.gcat !== undefined) { document.querySelectorAll('.gl-cats .chip').forEach(x => x.classList.toggle('on', x === b)); glossFilter(); }
    else if (b.id === 'kbdToggle') { const k = $('#kbd'); k.hidden = !k.hidden; b.setAttribute('aria-expanded', String(!k.hidden)); }
    else if (b.dataset.k) {
      const q = $('#q'); const k = b.dataset.k;
      q.value = k === 'clear' ? '' : k === '⌫' ? q.value.slice(0, -1) : q.value + k;
      if (q.value.trim() && location.hash.startsWith('#/root/')) history.replaceState(null, '', '#/');
      route();
    }
  });
  document.addEventListener('input', ev => { if (ev.target.id === 'glq') glossFilter(); });
  let timer;
  $('#q').addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const onRoot = location.hash.startsWith('#/root/');
      if (!$('#q').value.trim() && onRoot) return; // clearing the box keeps the open root page
      if (onRoot) history.replaceState(null, '', '#/');
      route();
    }, 150);
  });
  window.addEventListener('hashchange', () => { if (location.hash.startsWith('#/root/')) $('#q').value = ''; if (ROOTS) route(); });   // before the data has loaded, load().then(route) renders it

  applySize(); applyLang();
  $('#app').innerHTML = `<div class="empty">${t('loading')}</div>`;
  load().then(route).catch(err => { $('#app').innerHTML = `<div class="empty">Error: ${esc(err.message)}</div>`; });

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
