// src/data/questions/it_support.ts
// IT Support / Helpdesk — 50 scenario-based questions modeled on real desk work.
// Style: situations, troubleshooting steps, ticket triage, communication.
// Every question has: explanation.short, takeaway, rich tags, balanced choices.

import type { TrackBundle } from "@/types/question";

export const itSupportBundle: TrackBundle = {
  track: "it_support",
  titleAr: "الدعم الفني",
  titleEn: "IT Support",
  descriptionAr:
    "سيناريوهات حقيقية: troubleshooting، تذاكر، VPN، طابعات، Active Directory، تواصل مع المستخدم — ليست تعريفات.",
  descriptionEn:
    "Real-world scenarios: troubleshooting, tickets, VPN, printers, AD, user communication — not just definitions.",
  questions: [
    // ============================================================
    // LEVEL 1 — Foundations of triage and methodology
    // ============================================================
    {
      id: "sup-l1-q01", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "مستخدم يقول 'الإيميل ما يشتغل'. ما أول سؤال تطرحه قبل أي خطوة تقنية؟",
        en: "A user says 'email isn't working.' What's your first question before any technical step?",
      },
      choices: [
        { id: "a", text: { ar: "ما رسالة الخطأ والتوقيت ونطاقها — إرسال أم استلام؟", en: "What's the error, the timing, and is it sending or receiving?" } },
        { id: "b", text: { ar: "هل أعدت تشغيل جهازك أو محاولة إغلاق Outlook وفتحه؟", en: "Have you restarted your computer or tried closing and reopening Outlook?" } },
        { id: "c", text: { ar: "هل تستخدم Outlook على Desktop أم Webmail عبر المتصفح؟", en: "Are you using Outlook desktop or webmail through the browser?" } },
        { id: "d", text: { ar: "هل بريدك ممتلئ أو حصلت على تحذير quota مؤخراً؟", en: "Is your mailbox full, or have you seen a quota warning recently?" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "'الإيميل ما يشتغل' عبارة فضفاضة. اسأل عن الخطأ الفعلي والتوقيت ونطاق المشكلة (إرسال/استلام). هذا يقلّص ساعات تشخيص.", en: "'Email isn't working' is vague. Ask for the actual error, timing, and scope (sending/receiving). That alone cuts hours of diagnosis." },
        commonMistake: { ar: "الانتقال مباشرة لأسئلة 'هل أعدت التشغيل' قبل فهم المشكلة.", en: "Jumping to 'have you restarted' before understanding the problem." },
        takeaway: { ar: "ابدأ كل تذكرة بـ: ماذا، متى، كيف نطاقه (مستخدم واحد أم الجميع، إرسال أم استلام).", en: "Start every ticket with: what, when, scope (one user vs everyone, sending vs receiving)." },
      },
      tags: ["triage", "communication", "email"], estimatedSeconds: 35,
    },
    {
      id: "sup-l1-q02", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "ثلاثة موظفين من نفس الطابق يبلّغون عن انقطاع الإنترنت. ماذا تستنتج؟",
        en: "Three users on the same floor report no internet. What do you infer?",
      },
      choices: [
        { id: "a", text: { ar: "مشكلة فردية في كل جهاز — افحص جهاز كل واحد على حدة", en: "Individual issue on each PC — troubleshoot each one separately" } },
        { id: "b", text: { ar: "عطل DNS على مستوى الشركة بأكملها يؤثر على الكل", en: "Company-wide DNS outage affecting everyone in the building" } },
        { id: "c", text: { ar: "غالباً مشكلة شبكة على مستوى الـ switch أو access point للطابق", en: "Likely a network issue at the floor's switch or access point level" } },
        { id: "d", text: { ar: "هجوم سيبراني محتمل على المؤسسة — أبلغ الأمن فوراً", en: "Possible cyberattack on the organization — alert security immediately" } },
      ],
      correctAnswer: "c",
      explanation: {
        short: { ar: "نطاق المشكلة (طابق واحد) يحدد الطبقة المتأثرة. عدة مستخدمين في موقع واحد = البنية التحتية المحلية، ليس أجهزتهم.", en: "Scope tells you the layer. Multiple users in one location = local infrastructure, not their devices." },
        takeaway: { ar: "نطاق المشكلة يحدد طبقة الحل: شخص واحد = جهازه، طابق = switch، مبنى = موزّع، الجميع = إنترنت/خادم مركزي.", en: "Scope determines the layer: one person = their device, floor = switch, building = uplink, everyone = ISP/central." },
      },
      tags: ["scoping", "networking", "triage"], estimatedSeconds: 40,
    },
    {
      id: "sup-l1-q03", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "لاب توب لا يقلع — يضيء ضوء الطاقة لكن الشاشة سوداء. ما أبسط فحص قبل افتراض عطل hardware؟",
        en: "A laptop won't boot — power light is on but screen is black. Simplest check before assuming hardware failure?",
      },
      choices: [
        { id: "a", text: { ar: "افحص السطوع وصل شاشة خارجية لاختبار الـ GPU والشاشة", en: "Check brightness and connect external monitor to test GPU/display" } },
        { id: "b", text: { ar: "أرسل اللاب توب فوراً للمصنّع للإصلاح بضمان دون فحص", en: "Send the laptop to the manufacturer immediately for warranty repair" } },
        { id: "c", text: { ar: "غيّر القرص الصلب بقرص جديد لأنه السبب الأكثر احتمالاً", en: "Swap the hard drive with a new one as the most likely cause" } },
        { id: "d", text: { ar: "أعد تثبيت Windows من USB لاستعادة عمل النظام", en: "Reinstall Windows from USB to restore system operation" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "كثير من حالات 'الشاشة لا تعمل' تكون: سطوع على الصفر، أو شاشة LCD معطلة لكن GPU سليم. الشاشة الخارجية تفصل المشكلتين في 30 ثانية.", en: "Many 'screen not working' cases are: brightness at 0 or broken LCD with intact GPU. External monitor separates these in 30 seconds." },
        takeaway: { ar: "ابدأ بأرخص وأبسط فحص. لا تقفز للحلول المكلفة قبل استبعاد البديهي.", en: "Start with the cheapest, simplest check. Don't jump to costly fixes before ruling out the obvious." },
      },
      tags: ["hardware", "troubleshooting", "laptop"], estimatedSeconds: 40,
    },
    {
      id: "sup-l1-q04", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "مستخدم يطلب 'صلاحيات admin على جهازه فوراً'. ما الإجراء الصحيح؟",
        en: "A user demands 'admin rights on their PC immediately.' Correct action?",
      },
      choices: [
        { id: "a", text: { ar: "امنحه فوراً لتجنب التأخير على عمله ولا تسأل عن السبب", en: "Grant immediately to avoid delaying his work, no questions asked" } },
        { id: "b", text: { ar: "ارفض دائماً — لا يحصل أي مستخدم على admin مهما كانت الظروف", en: "Always refuse — no user ever gets admin under any circumstances" } },
        { id: "c", text: { ar: "اسأل عن السبب، اقترح بديلاً least-privilege، ثم escalate إن لزم", en: "Ask the reason, suggest a least-privilege alternative, then escalate if needed" } },
        { id: "d", text: { ar: "اطلب منه شراء لاب شخصي ليتجنب قيود الشركة الأمنية", en: "Tell him to buy a personal laptop to avoid company security restrictions" } },
      ],
      correctAnswer: "c",
      explanation: {
        short: { ar: "Least privilege قاعدة أمن أساسية. كثير من طلبات admin يحلّها app installer أو صلاحية محددة. عدم الموافقة المباشرة ليس رفضاً — هو حماية.", en: "Least privilege is a core security rule. Many admin requests are solvable by an installer service or scoped permission. Not approving immediately isn't refusal — it's protection." },
        takeaway: { ar: "لا تمنح admin من غير سؤال 'لماذا'. غالباً يوجد بديل أأمن.", en: "Never grant admin without asking 'why'. There's almost always a safer alternative." },
      },
      tags: ["security", "permissions", "least-privilege", "communication"], estimatedSeconds: 50,
    },
    {
      id: "sup-l1-q05", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "مستخدم يبلّغ عن مشكلة. أنت لست متأكداً من الحل. ما التصرف الأكثر مهنية؟",
        en: "A user reports an issue. You're not sure of the fix. Most professional response?",
      },
      choices: [
        { id: "a", text: { ar: "اعترف أنك تحتاج وقتاً، أعطِ ETA معقول، ووثّق للمتابعة", en: "Acknowledge you need time, give a reasonable ETA, document for follow-up" } },
        { id: "b", text: { ar: "أعطِ حلاً تفترض أنه صحيح حتى لا تبدو غير كفء أمامه", en: "Give a guess you assume is correct so you don't look incompetent" } },
        { id: "c", text: { ar: "حوّل التذكرة لزميل ولا تتعلم شيئاً من هذا الموقف لاحقاً", en: "Pass the ticket to a colleague and don't learn anything from this" } },
        { id: "d", text: { ar: "تجاهل التذكرة لتنتهي صلاحيتها تلقائياً بعد فترة", en: "Ignore the ticket so it auto-closes after some time" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "الصدق + ETA + متابعة هو المعيار المهني. التخمين يكسر الثقة، التحويل دون تعلم يبقيك ضعيفاً.", en: "Honesty + ETA + follow-up is the professional standard. Guessing breaks trust, blind handoffs keep you stuck." },
        takeaway: { ar: "'لا أعرف بعد، سأرجع لك خلال ساعة' أفضل بكثير من تخمين خاطئ.", en: "'I don't know yet, I'll get back to you in an hour' beats a wrong guess every time." },
      },
      tags: ["communication", "professionalism", "tickets"], estimatedSeconds: 45,
    },
    {
      id: "sup-l1-q06", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "موظف غير تقني يصف مشكلة بطريقة مربكة وغاضبة. ما أفضل أسلوب؟",
        en: "A non-technical, frustrated user describes a problem in a confusing way. Best approach?",
      },
      choices: [
        { id: "a", text: { ar: "صحّح مصطلحاته التقنية فوراً ليتعلم اللغة المهنية الصحيحة", en: "Correct his terminology immediately so he learns proper technical language" } },
        { id: "b", text: { ar: "اسمع بتعاطف، أعد الصياغة بكلماته، اطلب مثالاً، تجنّب jargon", en: "Listen empathetically, rephrase in his words, ask for an example, avoid jargon" } },
        { id: "c", text: { ar: "اطلب منه مراسلة الـ helpdesk بالإنجليزية بدل المحادثة الصوتية", en: "Ask him to email helpdesk in English instead of voice conversation" } },
        { id: "d", text: { ar: "حوّله لزميل آخر فوراً قبل أن يزداد توتر المحادثة بينكما", en: "Transfer to another colleague immediately before the conversation escalates" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "الغضب رد فعل على شعور بفقدان السيطرة. التعاطف + إعادة الصياغة يعيد الثقة. الـ jargon يزيد الإحباط.", en: "Frustration is a reaction to feeling out of control. Empathy + rephrasing rebuilds trust. Jargon escalates frustration." },
        takeaway: { ar: "في الدعم: 80% تواصل، 20% تقني. التعاطف يهدئ المستخدم ويسرّع الحل.", en: "Support is 80% communication, 20% technical. Empathy calms the user and speeds resolution." },
      },
      tags: ["communication", "soft-skills", "non-technical-users"], estimatedSeconds: 50,
    },
    {
      id: "sup-l1-q07", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "مستخدم نسي كلمة مرور Windows لجهاز محلي (ليس domain account). ما الإجراء الصحيح؟",
        en: "A user forgot their Windows password on a local (non-domain) account. Correct action?",
      },
      choices: [
        { id: "a", text: { ar: "حمّل أداة كسر كلمات المرور من الإنترنت لاستعادة الوصول", en: "Download a password cracking tool from the internet to recover access" } },
        { id: "b", text: { ar: "تحقق من هويته، استخدم local admin أو reset disk، ثم وثّق", en: "Verify his identity, use local admin or reset disk, then document it" } },
        { id: "c", text: { ar: "أعد تثبيت Windows من جديد لمسح الحساب وإنشاء حساب جديد", en: "Reinstall Windows from scratch to wipe the account and start over" } },
        { id: "d", text: { ar: "أعطه كلمة مرور جديدة عبر الهاتف بدون التحقق من هويته أولاً", en: "Give him a new password over the phone without verifying identity first" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "تحقق الهوية أولاً (احتيال هويات شائع). استخدم أدوات شرعية. وثّق. علّم المستخدم منع التكرار.", en: "Verify identity first (impersonation is common). Use legitimate tools. Document. Educate the user to prevent recurrence." },
        commonMistake: { ar: "إعادة كلمة المرور دون التحقق من الهوية = ثغرة هندسة اجتماعية.", en: "Resetting a password without verifying identity = social engineering vulnerability." },
        takeaway: { ar: "حتى للطلبات البسيطة: تحقق هوية، استخدم أدوات شرعية، وثّق.", en: "Even for simple requests: verify identity, use legitimate tools, document." },
      },
      tags: ["password-reset", "identity-verification", "windows"], estimatedSeconds: 50,
    },
    {
      id: "sup-l1-q08", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "أي معلومة لا تطلب أبداً من المستخدم عبر البريد أو الهاتف؟",
        en: "Which info do you NEVER ask a user for via email or phone?",
      },
      choices: [
        { id: "a", text: { ar: "اسم جهازه أو username الخاص به في الـ Active Directory", en: "His hostname or his username inside Active Directory" } },
        { id: "b", text: { ar: "كلمة المرور الخاصة بحسابه — لا تطلبها أبداً تحت أي ظرف", en: "His account password — never ask for it under any circumstance" } },
        { id: "c", text: { ar: "نظام التشغيل وإصداره ورقم الـ build لتشخيص المشكلة", en: "His OS, version, and build number to help diagnose the issue" } },
        { id: "d", text: { ar: "رسالة الخطأ التي يراها على الشاشة بنصها الكامل والدقيق", en: "The exact error message he sees on screen, in its full text" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "كلمات المرور لا تُشارك أبداً — حتى مع IT. إذا احتجتها (نادراً)، استخدم آلية reset رسمية تُجبر المستخدم على تغييرها بنفسه.", en: "Passwords are never shared — even with IT. If needed (rare), use an official reset that forces the user to set it themselves." },
        takeaway: { ar: "مبدأ ثابت: كلمة المرور = خاصة بالمستخدم وحده. كل محاولة طلبها = ثغرة محتملة.", en: "Hard rule: a password belongs only to the user. Any request for it = potential breach." },
      },
      tags: ["security", "passwords", "social-engineering"], estimatedSeconds: 35,
    },
    {
      id: "sup-l1-q09", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "ما الفرق بين Workaround و Root cause fix؟",
        en: "Workaround vs Root cause fix?",
      },
      choices: [
        { id: "a", text: { ar: "كلاهما متطابقان وظيفياً ولا فرق فعلي بينهما في الممارسة", en: "Both are functionally identical with no real practical difference" } },
        { id: "b", text: { ar: "Workaround يعيد الخدمة فوراً، Root cause fix يمنع التكرار", en: "Workaround restores service immediately; root cause fix prevents recurrence" } },
        { id: "c", text: { ar: "Workaround دائم ومعتمد، root cause fix إجراء مؤقت سريع", en: "Workaround is permanent and approved; root cause fix is a quick temporary action" } },
        { id: "d", text: { ar: "Workaround خاص بالشبكات فقط، root cause fix للأنظمة والتطبيقات", en: "Workaround is networking-only; root cause fix applies to systems and apps" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "في حادث كبير، الـ workaround أولاً (إعادة الخدمة)، ثم root cause fix لاحقاً (منع التكرار). كلاهما مهم — ليس بديلاً عن الآخر.", en: "In an incident: workaround first (restore service), root-cause fix later (prevent recurrence). Both matter — not substitutes." },
        takeaway: { ar: "وثّق كل workaround: 'مؤقت — يحتاج root fix' حتى لا يُنسى ويصبح مزمناً.", en: "Document every workaround as 'temporary — needs root fix' so it doesn't become permanent." },
      },
      tags: ["incident-management", "methodology", "itil"], estimatedSeconds: 45,
    },
    {
      id: "sup-l1-q10", track: "it_support", level: 1, type: "scenario", difficulty: "easy",
      question: {
        ar: "تذكرتان مفتوحتان: (1) الـ CEO لا يستطيع طباعة عرضه. (2) خادم البريد متوقف لـ 200 موظف. أيهما أعلى أولوية؟",
        en: "Two open tickets: (1) CEO can't print his slides. (2) Email server is down for 200 employees. Higher priority?",
      },
      choices: [
        { id: "a", text: { ar: "الـ CEO أولاً — مكانته الإدارية أهم من عدد المتأثرين", en: "CEO first — his executive seniority outweighs the number of affected users" } },
        { id: "b", text: { ar: "خادم البريد — التأثير على 200 يفوق فرداً، أبلغ CEO بـ ETA", en: "Email server — 200 users outweighs an individual; notify CEO with ETA" } },
        { id: "c", text: { ar: "اتركهما معاً ودع فريق الـ helpdesk يقرر الترتيب لاحقاً", en: "Leave both pending and let the helpdesk team decide the order later" } },
        { id: "d", text: { ar: "حلّ الاثنين بنفس الوقت دون تحديد أولوية بينهما واضحة", en: "Solve both at the same time with no clear priority between them" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "أولوية = نطاق التأثير، ليس مكانة الشخص. لكن لا تتجاهل الـ CEO — أبلغه بشفافية بـ ETA و workaround.", en: "Priority = impact scope, not seniority. But don't ignore the CEO — communicate transparent ETA and a workaround." },
        takeaway: { ar: "Severity = (نطاق × أهمية) ÷ توفر workaround. ليس عن من يصرخ أعلى.", en: "Severity = (scope × criticality) ÷ workaround availability. Not about who shouts loudest." },
      },
      tags: ["prioritization", "incident-management", "communication"], estimatedSeconds: 55,
    },

    // ============================================================
    // LEVEL 2 — Common technical scenarios
    // ============================================================
    {
      id: "sup-l2-q01", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "جهاز موظف لا يحصل على IP من DHCP. الكابل موصول، الإنترنت يعمل لأجهزة أخرى على نفس المنفذ. أول خطوة منطقية؟",
        en: "A user's PC isn't getting an IP from DHCP. Cable is plugged, internet works for other devices on the same port. First logical step?",
      },
      choices: [
        { id: "a", text: { ar: "استبدل بطاقة الشبكة فوراً لأنها السبب الأكثر احتمالاً للمشكلة", en: "Replace the network card immediately as the most likely cause" } },
        { id: "b", text: { ar: "أعد تشغيل الراوتر لكل المكتب لمعالجة المشكلة بشكل عام", en: "Reboot the entire office router as a general solution to the issue" } },
        { id: "c", text: { ar: "ipconfig /release ثم /renew، افحص static IP، تحقق من NIC enabled", en: "ipconfig /release and /renew, check for static IP, verify NIC is enabled" } },
        { id: "d", text: { ar: "أعد تثبيت Windows على الجهاز بالكامل ليبدأ من إعدادات نظيفة", en: "Reinstall Windows on the entire machine to start with clean settings" } },
      ],
      correctAnswer: "c",
      explanation: {
        short: { ar: "ابدأ من الجهاز نفسه: release/renew + فحص static IP يدوي + حالة NIC. هذه أكثر الأسباب شيوعاً قبل عطل hardware.", en: "Start at the machine: release/renew + check for manual static IP + NIC status. These are the most common causes before assuming hardware failure." },
        takeaway: { ar: "DHCP issues: ipconfig /release && /renew، ثم تحقق من static IP، ثم NIC، ثم cable، ثم switch port.", en: "DHCP issues: release/renew first, then check for static IP, NIC, cable, switch port — in that order." },
      },
      tags: ["dhcp", "networking", "ipconfig", "windows"], estimatedSeconds: 55,
    },
    {
      id: "sup-l2-q02", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "ping إلى 8.8.8.8 يعمل، لكن المستخدم لا يستطيع فتح أي موقع بالاسم. أين المشكلة الأرجح؟",
        en: "Ping to 8.8.8.8 works, but the user can't load any website by name. Most likely cause?",
      },
      choices: [
        { id: "a", text: { ar: "الكابل غير موصول جيداً — افحص الاتصال الفيزيائي للجهاز", en: "Cable not properly connected — check the physical connection" } },
        { id: "b", text: { ar: "DNS — الاتصال سليم لكن الترجمة فاشلة. جرب nslookup و8.8.8.8", en: "DNS — connectivity works but resolution fails. Try nslookup and 8.8.8.8" } },
        { id: "c", text: { ar: "Firewall للشركة معطّل ويحجب طلبات HTTPS للمواقع الخارجية", en: "Company firewall is down and blocks HTTPS requests to external sites" } },
        { id: "d", text: { ar: "بطاقة الشبكة معطلة وتحتاج استبدال فوري لاستعادة الخدمة", en: "Network card is broken and needs immediate replacement" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "ping بـ IP يعمل = طبقة الشبكة سليمة. الفشل بالاسم فقط = DNS. nslookup يكشف هل DNS server يستجيب أصلاً.", en: "Ping by IP works = network layer is fine. Failure by name only = DNS. nslookup reveals whether the DNS server is responding." },
        takeaway: { ar: "IP يعمل لكن الاسم لا = ابدأ بـ DNS. ليس الكابل ولا الـ NIC.", en: "If IP works but name doesn't = start with DNS. Not cable, not NIC." },
      },
      tags: ["dns", "networking", "nslookup", "troubleshooting"], estimatedSeconds: 55,
    },
    {
      id: "sup-l2-q03", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "مستخدم على VPN يفتح بعض المواقع لكن ليس الإنترانت الداخلي. المعلومة الأهم لطلبها قبل التشخيص؟",
        en: "User on VPN can reach some sites but not the company intranet. Key info to request first?",
      },
      choices: [
        { id: "a", text: { ar: "نوع جهازه (Windows/Mac) واسم الموديل والسنة الإنتاج", en: "His device type (Windows/Mac), the model name, and year of production" } },
        { id: "b", text: { ar: "اسم VPN client، رسالة الخطأ، نطاق المشكلة (إنترانت أم كل الموارد)", en: "VPN client name, error message, scope (intranet only or all resources)" } },
        { id: "c", text: { ar: "لون لاب توبه ومواصفاته الكاملة المسجلة في asset management", en: "His laptop color and full specs as registered in asset management" } },
        { id: "d", text: { ar: "متى آخر مرة قام فيها بترقية الـ BIOS أو firmware للجهاز", en: "When he last upgraded the BIOS or firmware on his device" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "نطاق المشكلة (الإنترانت فقط أم كل الموارد الداخلية) يحدد إن كان VPN معاد توجيهه جزئياً (split tunnel) أم DNS داخلي معطّل.", en: "Scope (intranet only vs all internal resources) tells you if it's split tunneling or internal DNS issue." },
        takeaway: { ar: "VPN tickets: نطاق المشكلة + رسالة الخطأ + هل أعاد الاتصال = 80% من التشخيص.", en: "VPN tickets: scope + error message + did he reconnect = 80% of diagnosis." },
      },
      tags: ["vpn", "networking", "intranet", "scoping"], estimatedSeconds: 55,
    },
    {
      id: "sup-l2-q04", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "Outlook لا يفتح، يعطي 'Cannot start Microsoft Outlook'. أول حل تجربه قبل الحلول العميقة؟",
        en: "Outlook won't open, error 'Cannot start Microsoft Outlook'. First fix before deeper steps?",
      },
      choices: [
        { id: "a", text: { ar: "outlook.exe /safe — يستبعد add-ins ويكشف إن كانت السبب", en: "outlook.exe /safe — disables add-ins and shows if they're the cause" } },
        { id: "b", text: { ar: "أعد تثبيت Microsoft Office كاملاً لحل المشكلة من جذورها", en: "Reinstall the entire Microsoft Office to solve the problem from its roots" } },
        { id: "c", text: { ar: "احذف ملف الـ PST الرئيسي بدون نسخة احتياطية أو تأكد منه", en: "Delete the main PST file without a backup or verifying its content" } },
        { id: "d", text: { ar: "أعد تثبيت Windows من جديد لإصلاح ملفات النظام التالفة", en: "Reinstall Windows from scratch to fix corrupted system files" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "Safe Mode في Outlook يحلّ ~50% من حالات 'لا يفتح'. add-in فاسد، أو navigation pane file تالف، أو OST كبير.", en: "Outlook safe mode solves ~50% of 'won't start' cases. Bad add-in, corrupt nav pane file, or oversized OST." },
        takeaway: { ar: "Outlook لا يفتح: ابدأ بـ /safe، ثم /resetnavpane، ثم Profile جديد. لا تحذف ملفات قبل backup.", en: "Outlook won't start: try /safe, then /resetnavpane, then a new profile. Never delete files before backup." },
      },
      tags: ["outlook", "email", "office", "windows"], estimatedSeconds: 55,
    },
    {
      id: "sup-l2-q05", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "طابعة الشبكة لا يطبع عليها أحد. الكل يقول 'الطابعة معطلة'. ما تفعل أولاً؟",
        en: "Nobody can print to the network printer. Everyone says 'printer is broken'. What do you do first?",
      },
      choices: [
        { id: "a", text: { ar: "اشترِ طابعة جديدة لتفادي الإجراءات الطويلة لإصلاح القديمة", en: "Buy a new printer to avoid long procedures to fix the old one" } },
        { id: "b", text: { ar: "افحص فيزيائياً: أضواء، ورق، حبر، رسالة خطأ، ثم ping و spooler", en: "Physical check: lights, paper, ink, error display, then ping and spooler" } },
        { id: "c", text: { ar: "أعد تشغيل كل أجهزة المستخدمين لمسح الـ print queue من جديد", en: "Reboot all user computers to clear the print queue and try fresh" } },
        { id: "d", text: { ar: "تجاهل التذكرة لأن المستخدمين سيستخدمون الإيميل كحل مؤقت", en: "Ignore the ticket since users can use email as a temporary workaround" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "الفحص الفيزيائي قبل أي شيء: ورق، حبر، رسالة خطأ، طاقة. ثم ping. ثم print spooler. ترتيب من البسيط للمعقد.", en: "Physical check first: paper, ink, error message, power. Then ping. Then print spooler. Simplest first." },
        takeaway: { ar: "Printer issues: انظر الطابعة بعينك أولاً. أكثر من 60% أعطال الطابعات: ورق، حبر، أو error display مغفل عنه.", en: "Printer issues: look at it physically first. Over 60% are paper/ink/ignored error displays." },
      },
      tags: ["printer", "physical-check", "spooler"], estimatedSeconds: 55,
    },
    {
      id: "sup-l2-q06", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "مستخدم نقر رابط phishing وأدخل كلمة المرور. ما أول إجراء؟",
        en: "A user clicked a phishing link and entered their password. First action?",
      },
      choices: [
        { id: "a", text: { ar: "عنّفه على عدم الانتباه واطلب منه أخذ تدريب security awareness", en: "Scold him for not paying attention and require security awareness training" } },
        { id: "b", text: { ar: "غيّر كلمة المرور، اقطع الجلسات، فعّل MFA، راجع النشاط، أبلغ الأمن", en: "Reset password, kill active sessions, enable MFA, audit activity, notify security" } },
        { id: "c", text: { ar: "لا تفعل شيئاً — حادثة فردية ولن تتكرر مع نفس المستخدم غالباً", en: "Do nothing — isolated incident, unlikely to recur with the same user" } },
        { id: "d", text: { ar: "احذف الحساب نهائياً وأنشئ حساباً جديداً بكلمة مرور أقوى", en: "Delete the account permanently and create a new one with a stronger password" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "السرعة حرجة في phishing — قد يستخدم المهاجم credentials خلال دقائق. التعنيف يجعل المستخدمين يخفون الحوادث المستقبلية.", en: "Speed is critical with phishing — attacker may use credentials within minutes. Shaming users makes them hide future incidents." },
        takeaway: { ar: "Phishing: غيّر كلمة المرور → MFA → audit. لا تعنّف — اشكر المستخدم على الإبلاغ.", en: "Phishing: reset → MFA → audit. Never shame — thank them for reporting." },
      },
      tags: ["phishing", "security-incident", "mfa", "communication"], estimatedSeconds: 60,
    },
    {
      id: "sup-l2-q07", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "موظف يقول 'الـ MFA لا يعمل، الكود لا يصل'. ما السبب الأكثر شيوعاً؟",
        en: "User says 'MFA isn't working, code isn't arriving.' Most common cause?",
      },
      choices: [
        { id: "a", text: { ar: "خادم MFA معطل تماماً للمؤسسة — أبلغ الفريق وانتظر استعادته", en: "MFA server is completely down for the organization — alert team and wait" } },
        { id: "b", text: { ar: "ساعة الجهاز/الهاتف غير متزامنة، رقم خاطئ، أو نقل authenticator مفقود", en: "Device/phone clock out of sync, wrong number, or missed authenticator migration" } },
        { id: "c", text: { ar: "MFA لا يدعم العمل عن بُعد عبر الـ VPN ويعمل من المكتب فقط", en: "MFA doesn't support remote work via VPN, works from office only" } },
        { id: "d", text: { ar: "كلمة مروره صحيحة فلا حاجة لـ MFA — يمكنه الدخول بدونه الآن", en: "His password is correct so MFA is unnecessary — he can log in without it" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "TOTP يحتاج وقت متزامن للجهاز. تغيير الهاتف بدون نقل Authenticator يفقد الحسابات. SMS قد لا يصل لمشكلة بشركة الاتصال.", en: "TOTP needs synced clocks. Changing phone without migrating Authenticator loses accounts. SMS may fail due to carrier issues." },
        takeaway: { ar: "MFA issues: افحص (1) ساعة الجهاز، (2) نقل الـ authenticator، (3) رقم الهاتف الصحيح، (4) backup codes.", en: "MFA issues: check (1) device clock, (2) authenticator migration, (3) correct phone number, (4) backup codes." },
      },
      tags: ["mfa", "totp", "authenticator", "security"], estimatedSeconds: 60,
    },
    {
      id: "sup-l2-q08", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "Laptop بطيء جداً بعد تحديث Windows. كيف تشخّص؟",
        en: "Laptop very slow after a Windows update. How do you diagnose?",
      },
      choices: [
        { id: "a", text: { ar: "Task Manager للـ bottleneck، Event Viewer للأخطاء، SFC /scannow", en: "Task Manager for the bottleneck, Event Viewer for errors, SFC /scannow" } },
        { id: "b", text: { ar: "أعد تثبيت Windows من الصفر فوراً قبل تجربة أي تشخيص آخر", en: "Reinstall Windows from scratch immediately before any other diagnosis" } },
        { id: "c", text: { ar: "غيّر الـ RAM وأضف SSD جديد لتسريع الجهاز بشكل ملحوظ", en: "Replace RAM and add a new SSD to noticeably speed up the device" } },
        { id: "d", text: { ar: "اشترِ جهازاً جديداً بمواصفات أعلى لتجنب مشاكل الأداء مستقبلاً", en: "Buy a new device with higher specs to avoid future performance issues" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "Task Manager يكشف الـ bottleneck (CPU/RAM/Disk) في 30 ثانية. Update غالباً ينشط Defender scan أو driver متعارض. SFC يصلح ملفات نظام تالفة.", en: "Task Manager reveals the bottleneck (CPU/RAM/Disk) in 30s. Update often triggers Defender scan or driver conflict. SFC repairs corrupted system files." },
        takeaway: { ar: "Slow PC after update: Task Manager → Event Viewer → SFC scannow. ابدأ بأرخص وأسرع تشخيص.", en: "Slow PC after update: Task Manager → Event Viewer → SFC. Start with cheapest, fastest diagnostics." },
      },
      tags: ["windows", "performance", "task-manager", "sfc"], estimatedSeconds: 60,
    },
    {
      id: "sup-l2-q09", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "تحويلة تذكرة لـ L2 (مستوى أعلى). ما أهم شيء تضمّنه قبل الـ escalation؟",
        en: "You're escalating a ticket to L2. Most important thing to include before escalation?",
      },
      choices: [
        { id: "a", text: { ar: "اسم المستخدم فقط ورقم التذكرة الأصلية بدون تفاصيل إضافية", en: "Just the user's name and the original ticket number, no extra details" } },
        { id: "b", text: { ar: "المشكلة، النطاق، خطواتك ونتائجها، logs، تأثير الأعمال، آخر تواصل", en: "Problem, scope, your steps and outcomes, logs, business impact, last contact" } },
        { id: "c", text: { ar: "اعتذار عن عدم القدرة على الحل وطلب مغفرة من الفريق التالي", en: "An apology for not solving it and asking for understanding from the next team" } },
        { id: "d", text: { ar: "نقل التذكرة لـ L2 بدون أي ملاحظات إضافية لتوفير الوقت عليك", en: "Move the ticket to L2 with no additional notes to save your own time" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Escalation سيئة = L2 يبدأ من الصفر. Escalation جيدة = L2 يكمل من حيث وقفت. وثّق كل شيء جربته ولماذا فشل.", en: "Bad escalation = L2 starts from scratch. Good escalation = L2 continues from where you stopped. Document everything you tried and why it failed." },
        takeaway: { ar: "Rule: التذكرة المُحوّلة يجب أن يفهمها زميل لم يرَها قبل الآن في 60 ثانية.", en: "Rule: an escalated ticket must be understandable by a colleague seeing it for the first time in 60 seconds." },
      },
      tags: ["escalation", "tickets", "documentation"], estimatedSeconds: 60,
    },
    {
      id: "sup-l2-q10", track: "it_support", level: 2, type: "scenario", difficulty: "medium",
      question: {
        ar: "مستخدم يقول 'لا يطبع'. ما 4 معلومات تطلبها قبل ترك الـ desk؟",
        en: "User says 'won't print'. What 4 pieces of info do you ask for before leaving your desk?",
      },
      choices: [
        { id: "a", text: { ar: "اسم الطابعة، رسالة الخطأ، هل يطبع آخرون عليها، آخر مرة عملت", en: "Printer name, error message, are others printing successfully, last working time" } },
        { id: "b", text: { ar: "ماركة الجهاز فقط ولا حاجة لمعلومات أخرى عن الطابعة نفسها", en: "Just the device brand, no other info needed about the printer itself" } },
        { id: "c", text: { ar: "هل يحب الطابعات الملونة أم الأبيض والأسود في الاستخدام اليومي", en: "Whether he prefers color or black-and-white printers for daily use" } },
        { id: "d", text: { ar: "متى تم شراء الطابعة وما مدة الضمان المتبقية على الجهاز", en: "When the printer was purchased and how much warranty time remains" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "هذه الأربعة: تحدد الطابعة + الخطأ المحدد + النطاق (هو فقط أم الجميع) + التوقيت (متى آخر مرة عملت). 4 معلومات = 80% من التشخيص.", en: "These four: identify printer + actual error + scope (only him or everyone) + timing (when did it last work). 4 data points = 80% of diagnosis." },
        takeaway: { ar: "في كل تذكرة: ماذا، أين، نطاق، متى. هذه الـ 4 W's لا تتغير.", en: "Every ticket: what, where, scope, when. These 4 W's never change." },
      },
      tags: ["triage", "printer", "information-gathering"], estimatedSeconds: 55,
    },

    // ============================================================
    // LEVEL 3 — Advanced scenarios + AD/Windows
    // ============================================================
    {
      id: "sup-l3-q01", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "موظف لا يستطيع تسجيل الدخول لـ domain account من الصباح. The trust relationship... فشل. ما الإصلاح المعروف؟",
        en: "A user can't log into their domain account this morning. 'Trust relationship... failed' error. Known fix?",
      },
      choices: [
        { id: "a", text: { ar: "Re-join للـ domain، أو Reset-ComputerMachinePassword من PowerShell", en: "Re-join the device to the domain, or Reset-ComputerMachinePassword in PowerShell" } },
        { id: "b", text: { ar: "أعد تثبيت Windows على الجهاز كاملاً لاستعادة العلاقة مع الـ domain", en: "Reinstall Windows entirely to restore the relationship with the domain" } },
        { id: "c", text: { ar: "غيّر كلمة المرور للـ user account وأعد المحاولة بعد دقائق قليلة", en: "Change the user account password and try again after a few minutes" } },
        { id: "d", text: { ar: "غيّر اسم الجهاز في Computer Properties ثم أعد تشغيله مرتين", en: "Rename the computer in Computer Properties and reboot twice" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "Trust relationship failed = computer password بين الجهاز و domain غير متطابق (غالباً جهاز كان معطّل لمدة طويلة). Re-join يصحّح. كلمة مرور المستخدم لا علاقة لها.", en: "Trust relationship failed = computer/domain password mismatch (often a long-offline machine). Re-joining fixes it. User password is unrelated." },
        takeaway: { ar: "Trust failed = computer object problem، ليس user. Re-join أو Reset-ComputerMachinePassword يحل في دقائق.", en: "'Trust failed' = computer object issue, not user. Re-join or Reset-ComputerMachinePassword fixes in minutes." },
      },
      tags: ["active-directory", "domain", "windows", "trust"], estimatedSeconds: 65,
    },
    {
      id: "sup-l3-q02", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "موظف يقول 'لا أستطيع الوصول لـ shared folder X رغم أن زميلي في نفس الفريق يستطيع'. ما الفحص الأول؟",
        en: "User says 'I can't access shared folder X even though my teammate can.' First check?",
      },
      choices: [
        { id: "a", text: { ar: "افحص عضوية الـ AD groups: هل المستخدم في الـ security group الصحيحة؟", en: "Check AD group membership: is the user in the right security group?" } },
        { id: "b", text: { ar: "أعطه admin على الـ file server ليتجاوز كل قيود الصلاحيات", en: "Give him admin on the file server to bypass all permission restrictions" } },
        { id: "c", text: { ar: "اعتذر له واطلب منه استخدام إيميل لإرسال الملفات مؤقتاً", en: "Apologize and ask him to use email to send files temporarily" } },
        { id: "d", text: { ar: "أعد تشغيل الـ file server لمسح cache الصلاحيات على الـ shares", en: "Reboot the file server to clear the permissions cache on shares" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "الصلاحيات في AD مبنية على group membership. زميل واحد يصل والآخر لا = membership مختلف. تحقق بـ 'whoami /groups' أو AD Users.", en: "AD permissions are group-based. One teammate works, another doesn't = different group membership. Check via 'whoami /groups' or ADUC." },
        takeaway: { ar: "Permission issues: ابدأ بفحص الـ group membership. لا تمنح أبداً صلاحيات مباشرة على ملف بدلاً من group.", en: "Permission issues: start with group membership. Never grant direct file permissions instead of via groups." },
      },
      tags: ["active-directory", "permissions", "groups", "shared-folders"], estimatedSeconds: 60,
    },
    {
      id: "sup-l3-q03", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "خدمة production تعطلت بعد deployment قبل 10 دقائق. ما أول إجراء؟",
        en: "A production service crashed 10 minutes after deployment. First action?",
      },
      choices: [
        { id: "a", text: { ar: "Rollback فوراً، حقّق بعد الاستقرار، أبلغ المعنيين بـ ETA", en: "Rollback immediately, investigate after stability, notify with ETA" } },
        { id: "b", text: { ar: "ابحث طويلاً في الكود عن الـ bug قبل أي إجراء على الإنتاج", en: "Spend hours searching the code for the bug before any production action" } },
        { id: "c", text: { ar: "احذف الخدمة نهائياً من الـ cluster وأنشئ بديلاً لها لاحقاً", en: "Permanently delete the service from the cluster and recreate it later" } },
        { id: "d", text: { ar: "تجاهل المشكلة وانتظر أن تراها فرق أخرى وتبلّغ بنفسها", en: "Ignore the problem and wait for other teams to notice and report it" } },
      ],
      correctAnswer: "a",
      explanation: {
        short: { ar: "Rollback أولاً = إعادة الخدمة. التحقيق بعد الاستقرار. المستخدمون لا يهمهم لماذا، يهمهم متى. اتصال شفاف مهم بقدر الإصلاح.", en: "Rollback first = restore service. Investigate after stability. Users don't care why, they care when. Transparent comms matter as much as the fix." },
        takeaway: { ar: "Production incident: استعادة الخدمة قبل تشخيص السبب. لا تحقق و الخدمة معطلة.", en: "Production incident: restore service before root-causing. Don't investigate while service is down." },
      },
      tags: ["incident-response", "production", "deployment", "rollback"], estimatedSeconds: 60,
    },
    {
      id: "sup-l3-q04", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "Cloud VM لا تقبل SSH. آخر مرة عملت كانت قبل ساعة. ما تفحص أولاً؟",
        en: "A Cloud VM rejects SSH. Last worked an hour ago. What do you check first?",
      },
      choices: [
        { id: "a", text: { ar: "احذف الـ VM وأنشئ واحدة جديدة بنفس الإعدادات بدون تشخيص", en: "Delete the VM and create a new one with the same settings without diagnosing" } },
        { id: "b", text: { ar: "VM running؟ SG يسمح بـ port 22 من IP الحالي؟ console screenshot؟", en: "Is VM running? SG allows port 22 from current IP? Console screenshot?" } },
        { id: "c", text: { ar: "أرسل تذكرة لمزود السحابة فوراً بدون محاولة أي تشخيص بنفسك", en: "Open a cloud provider support ticket immediately without diagnosing yourself" } },
        { id: "d", text: { ar: "أعد تشغيل اللاب توب الخاص بك لعلّ المشكلة منه وليست من الـ VM", en: "Reboot your laptop in case the issue is on your side, not the VM" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "أكثر الأسباب: VM stopped أو security group تغيّر أو IP العميل تغيّر (شبكة جديدة). console screenshot يكشف بسرعة هل النظام يقلع أصلاً.", en: "Most common: VM stopped, security group changed, or your client IP changed (new network). Console screenshot quickly shows if the OS is even booting." },
        takeaway: { ar: "Cloud SSH lost: VM state → SG → IP → console screenshot. كل شيء قبل recreate.", en: "Cloud SSH lost: VM state → SG → IP → console screenshot. Everything before recreate." },
      },
      tags: ["cloud", "ssh", "vm", "security-groups"], estimatedSeconds: 70,
    },
    {
      id: "sup-l3-q05", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "API ترجع 500 errors بعد تغيير environment variable. ما الاحتمال الأكبر؟",
        en: "An API returns 500 errors after an env variable change. Most likely cause?",
      },
      choices: [
        { id: "a", text: { ar: "DDoS attack محتمل على الـ API — راجع WAF logs وحجب الـ source IPs", en: "Possible DDoS attack on the API — check WAF logs and block source IPs" } },
        { id: "b", text: { ar: "env var بها typo، escape مفقود، مسافة، أو الخدمة لم يُعد تشغيلها", en: "env var has a typo, missing escape, whitespace, or service wasn't restarted" } },
        { id: "c", text: { ar: "كلمة مرور المستخدم خاطئة وتسبب fail في الـ API authentication", en: "User password is wrong and causes failure in API authentication" } },
        { id: "d", text: { ar: "اشتراك السحابة منتهي ولذلك الـ API ترفض الطلبات تلقائياً", en: "Cloud subscription expired so the API automatically rejects requests" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "أكثر الأسباب: nginx أو docker لم يُعد تشغيلهما، أو القيمة بها مسافة/escape مفقود. logs الـ application تكشف بسرعة.", en: "Most common: nginx or docker not restarted, or value has whitespace/missing escape. App logs reveal quickly." },
        takeaway: { ar: "Env var change → دائماً restart الخدمة + افحص logs + diff القيمة القديمة والجديدة.", en: "Env var change → always restart service + check logs + diff old vs new value." },
      },
      tags: ["api", "environment", "configuration", "deployment"], estimatedSeconds: 60,
    },
    {
      id: "sup-l3-q06", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "Alert من SIEM: 50 محاولة تسجيل دخول فاشلة على نفس الحساب خلال دقيقتين. ما أول إجراء؟",
        en: "SIEM alert: 50 failed logins on the same account in 2 minutes. First action?",
      },
      choices: [
        { id: "a", text: { ar: "تجاهل الـ alert — على الأرجح المستخدم نسي كلمة المرور فقط", en: "Ignore the alert — probably the user just forgot their password" } },
        { id: "b", text: { ar: "اقفل الحساب مؤقتاً، تحقق من source IP، اتصل بالمستخدم، ابحث عن نمط", en: "Temporarily lock the account, check source IP, call the user, look for pattern" } },
        { id: "c", text: { ar: "احذف الحساب نهائياً وأنشئ حساباً جديداً بسياسات أمان أقوى", en: "Permanently delete the account and create a new one with stronger policies" } },
        { id: "d", text: { ar: "غيّر كل كلمات مرور المؤسسة كإجراء وقائي شامل لكل الموظفين", en: "Reset every password in the org as a sweeping precaution for all staff" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "نمط brute force كلاسيكي. القفل المؤقت يحمي الحساب أثناء التحقيق. هل source IP من شبكة الشركة؟ هل هناك account lockouts أخرى متزامنة؟", en: "Classic brute-force pattern. Temporary lock protects during investigation. Is the source IP company network? Other concurrent lockouts?" },
        takeaway: { ar: "Suspicious failed logins: lock first، investigate second، communicate third. ليس العكس.", en: "Suspicious failed logins: lock first, investigate second, communicate third. Not the reverse." },
      },
      tags: ["siem", "brute-force", "security-incident", "account-lockout"], estimatedSeconds: 65,
    },
    {
      id: "sup-l3-q07", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "مستخدم يطلب إذن للوصول لمعلومات HR ليست من اختصاصه. كيف ترد؟",
        en: "A user requests access to HR data outside their role. How do you respond?",
      },
      choices: [
        { id: "a", text: { ar: "امنحه فوراً ليتجنب الإحراج في علاقتك مع زملائك في HR", en: "Grant immediately to avoid awkwardness in your relationship with HR colleagues" } },
        { id: "b", text: { ar: "ارفض بأدب: 'يحتاج موافقة مدير HR والمدير المباشر — أرسل لهم'", en: "Politely refuse: 'Needs HR manager and direct manager approval — email them'" } },
        { id: "c", text: { ar: "اعتذر بأنك لا تعرف كيف تقوم بهذا الإجراء وحوّله لزميل آخر", en: "Apologize that you don't know how to do this and pass to another colleague" } },
        { id: "d", text: { ar: "أبلغ الأمن أن الموظف خطر ومحاولاته للوصول مشبوهة جداً", en: "Tell security he's a threat and his access attempts are highly suspicious" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "السياسة تحمي الجميع. الرفض المهني يستند للسياسة وليس للشخص. 'هذه السياسة' أسهل من 'لن أفعل ذلك لك'.", en: "Policy protects everyone. Professional refusal references policy, not personality. 'It's policy' is easier than 'I won't do it for you'." },
        takeaway: { ar: "حماية الـ access: تحدّث عن العملية، ليس عن الشخص. اطلب موافقات رسمية، لا تكن boundaries-keeper وحدك.", en: "Access protection: speak about the process, not the person. Request formal approvals; don't be the lone gatekeeper." },
      },
      tags: ["access-control", "policy", "communication", "compliance"], estimatedSeconds: 55,
    },
    {
      id: "sup-l3-q08", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "مستخدم يبلّغ عن مشكلة، تحلّها، يغلق التذكرة. بعد أسبوع نفس المشكلة لـ 5 مستخدمين. ما الدرس؟",
        en: "A user reports an issue, you solve it, ticket closes. A week later the same issue affects 5 users. Lesson?",
      },
      choices: [
        { id: "a", text: { ar: "هذا جزء طبيعي من العمل ولا يوجد درس يمكن تعلمه من تكرار المشكلة", en: "It's normal work, no lesson to learn from the recurring problem" } },
        { id: "b", text: { ar: "علامة على حل أعراض لا root cause. وثّق، فعّل alert، حقّق في السبب", en: "Sign of fixing symptoms not root cause. Document, set up alerts, investigate" } },
        { id: "c", text: { ar: "ألقِ اللوم على المستخدمين لأنهم لا يتعلمون من الأخطاء السابقة", en: "Blame the users because they don't learn from their previous mistakes" } },
        { id: "d", text: { ar: "اطلب من الإدارة موارد أكثر لمواجهة الزيادة في عدد التذاكر", en: "Ask management for more resources to handle the increase in tickets" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "تكرار = symptom fix لا root fix. التوثيق يقلل وقت الحل، الـ alert يكتشف قبل أن يبلّغ المستخدمون، root cause يمنع التكرار.", en: "Recurrence = symptom fix not root fix. Documentation reduces resolution time, alerts catch before users report, root cause prevents recurrence." },
        takeaway: { ar: "Pattern detection = rebrand كـ 'problem' في ITIL. لا تحل tickets — حل problems.", en: "Pattern detection = rebrand as a 'problem' in ITIL. Don't solve tickets — solve problems." },
      },
      tags: ["itil", "problem-management", "knowledge-base", "root-cause"], estimatedSeconds: 65,
    },
    {
      id: "sup-l3-q09", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "تواصل remote support مع مستخدم. ما تطلبه قبل بدء الجلسة؟",
        en: "Starting a remote support session with a user. What do you confirm before starting?",
      },
      choices: [
        { id: "a", text: { ar: "اتصل بالـ user وابدأ الـ remote session مباشرة دون مقدمات أو تأكيد", en: "Connect to the user and start the remote session without any preamble" } },
        { id: "b", text: { ar: "موافقة صريحة، إغلاق التطبيقات الحساسة، شفافية في كل خطوة تنفذها", en: "Explicit consent, close sensitive apps, transparency in every step you take" } },
        { id: "c", text: { ar: "اطلب كلمة مروره لتسجيل الدخول بنفسك وحلّ المشكلة بسرعة أكبر", en: "Ask for his password to log in yourself and solve the problem faster" } },
        { id: "d", text: { ar: "ارفض الـ remote session واطلب منه القدوم للمكتب لحل المشكلة شخصياً", en: "Refuse remote and tell him to come to the office for in-person help" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Remote support = ثقة. الموافقة + الشفافية + إغلاق الحساس = حماية للمستخدم وحماية لك من اتهامات. اشرح كل عمل = تعليم وتوثيق.", en: "Remote support = trust. Consent + transparency + closing sensitive apps = protect the user and protect you from accusations. Explaining each action = teaching and documentation." },
        takeaway: { ar: "Remote support: 'I'm going to do X now, OK?' قبل كل خطوة. لا تكن صندوقاً أسود.", en: "Remote support: 'I'm going to do X now, OK?' before each step. Never be a black box." },
      },
      tags: ["remote-support", "consent", "communication", "professionalism"], estimatedSeconds: 60,
    },
    {
      id: "sup-l3-q10", track: "it_support", level: 3, type: "scenario", difficulty: "medium",
      question: {
        ar: "ما الفرق بين Incident و Service Request في ITIL؟",
        en: "Incident vs Service Request in ITIL?",
      },
      choices: [
        { id: "a", text: { ar: "كلاهما متطابقان من ناحية الإجراءات والـ SLAs ولا فرق وظيفي بينهما", en: "Both are identical in procedures and SLAs with no functional difference" } },
        { id: "b", text: { ar: "Incident = شيء معطّل (استعادة)، Service Request = طلب طبيعي (وصول، تثبيت)", en: "Incident = something broken (restore); Service Request = normal request (access, install)" } },
        { id: "c", text: { ar: "Incident خاص بالأمن السيبراني فقط ولا يستخدم في غيره من المجالات", en: "Incident is for cybersecurity only and isn't used in other domains" } },
        { id: "d", text: { ar: "Service Request خاصة بـ HR فقط للموظفين الجدد عند الانضمام للشركة", en: "Service Request is HR-only for new employees when joining the company" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "الخلط بينهما = تذاكر سيئة. Incident = severity high، إجراءات سريعة. Service Request = workflow ثابت، موافقات مسبقة، ETA معلوم.", en: "Confusing them = bad ticketing. Incident = high severity, fast procedures. Service Request = fixed workflow, pre-set approvals, known ETA." },
        takeaway: { ar: "صنّف صح من البداية: 'معطّل' vs 'محتاج'. التصنيف يحدد الإجراء والـ SLA.", en: "Classify right at intake: 'broken' vs 'need'. Classification determines procedure and SLA." },
      },
      tags: ["itil", "incident", "service-request", "tickets"], estimatedSeconds: 60,
    },

    // ============================================================
    // LEVEL 4 — Cross-domain advanced scenarios
    // ============================================================
    {
      id: "sup-l4-q01", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "Kubernetes pod في حالة CrashLoopBackOff. أول 3 أوامر تشغّلها؟",
        en: "A Kubernetes pod is in CrashLoopBackOff. First 3 commands you run?",
      },
      choices: [
        { id: "a", text: { ar: "kubectl delete pod ثم انتظر إعادة الإنشاء التلقائية من الـ controller", en: "kubectl delete pod and wait for automatic recreation from the controller" } },
        { id: "b", text: { ar: "أعد تشغيل cluster كاملاً لإعادة جدولة كل الـ pods من الصفر", en: "Reboot the entire cluster to reschedule all pods from scratch" } },
        { id: "c", text: { ar: "describe pod، logs --previous (للـ crash السابق)، get events --sort-by", en: "describe pod, logs --previous (for prior crash), get events --sort-by" } },
        { id: "d", text: { ar: "احذف الـ deployment بالكامل وأنشئ deployment جديداً بنفس المواصفات", en: "Delete the entire deployment and create a new one with the same specs" } },
      ],
      correctAnswer: "c",
      explanation: {
        short: { ar: "describe يكشف الـ events والـ exit code. logs --previous يعرض ما حدث قبل crash (هذه الكلمة المفتاحية حاسمة). events يعطي ترتيب زمني.", en: "describe reveals events and exit code. logs --previous shows what happened before the crash (this flag is critical). events gives a timeline." },
        takeaway: { ar: "CrashLoopBackOff: describe → logs --previous → events. هذه الـ 3 = 90% من التشخيص.", en: "CrashLoopBackOff: describe → logs --previous → events. These 3 = 90% of diagnosis." },
      },
      tags: ["kubernetes", "crashloop", "kubectl", "troubleshooting"], estimatedSeconds: 70,
    },
    {
      id: "sup-l4-q02", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "صفحة موقع الشركة بطيئة لـ بعض المستخدمين فقط، ولا تظهر أي أخطاء في server logs. أين تبدأ؟",
        en: "Company website is slow for SOME users, no errors in server logs. Where to start?",
      },
      choices: [
        { id: "a", text: { ar: "أعد تشغيل الخادم لمسح أي cache قد يكون السبب في المشكلة", en: "Reboot the server to clear any cache that might be causing the issue" } },
        { id: "b", text: { ar: "اطلب traceroute و DevTools Network من المتأثرين، CDN logs، DNS", en: "Get traceroute and DevTools Network from affected users, CDN logs, DNS" } },
        { id: "c", text: { ar: "أضف خوادم جديدة فوراً لمعالجة الحمل الزائد على البنية التحتية", en: "Add new servers immediately to handle the extra load on the infrastructure" } },
        { id: "d", text: { ar: "تجاهل المشكلة لأن الخادم سليم ولا تظهر أخطاء في server logs", en: "Ignore — server is fine, no errors appear in server logs" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "'بعض المستخدمين' = network path أو CDN edge أو DNS resolver. الخادم سليم لا يعني الشبكة سليمة. DevTools Network tab يكشف المرحلة البطيئة.", en: "'Some users' = network path, CDN edge, or DNS resolver. A healthy server doesn't mean a healthy network. DevTools Network tab reveals the slow phase." },
        takeaway: { ar: "Performance issue 'لبعض المستخدمين' = ابحث في الشبكة وCDN وDNS، ليس على الخادم.", en: "Performance issue 'for some users' = look at network, CDN, DNS — not the server." },
      },
      tags: ["performance", "cdn", "network", "troubleshooting"], estimatedSeconds: 75,
    },
    {
      id: "sup-l4-q03", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "BitLocker مفعّل، الجهاز يطلب recovery key بعد BIOS update. أين تجد المفتاح؟",
        en: "BitLocker prompts for recovery key after a BIOS update. Where do you find it?",
      },
      choices: [
        { id: "a", text: { ar: "اطلبه من Microsoft عبر هاتف الدعم الفني الرسمي للشركات", en: "Call Microsoft official enterprise support and request the key from them" } },
        { id: "b", text: { ar: "في AD أو Microsoft account للمستخدم أو Intune أو نسخة محفوظة آمنة", en: "In AD, the user's Microsoft account, Intune, or a saved secure copy" } },
        { id: "c", text: { ar: "حاول bypass الـ encryption عبر commands خاصة في Recovery Console", en: "Try to bypass encryption with special commands in the Recovery Console" } },
        { id: "d", text: { ar: "مسح القرص بالكامل وإعادة التثبيت من جديد لاستعادة عمل الجهاز", en: "Wipe the entire disk and reinstall from scratch to restore the device" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "BitLocker key يجب أن يُخزَّن مركزياً قبل أي مشكلة. AD/Entra/Intune هي الطرق الصحيحة. BIOS update أحياناً يبدّل TPM hash و يطلب الـ key.", en: "BitLocker key must be stored centrally before any problem. AD/Entra/Intune are correct. BIOS updates sometimes change TPM hash and prompt for the key." },
        takeaway: { ar: "BitLocker rule: لا تفعّله بدون escrow في AD/Intune. بدون الـ key المفقود = wipe.", en: "BitLocker rule: never enable without AD/Intune escrow. Lost key = wipe." },
      },
      tags: ["bitlocker", "encryption", "recovery", "active-directory"], estimatedSeconds: 65,
    },
    {
      id: "sup-l4-q04", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "Group Policy لا تطبّق على جهاز جديد بعد domain join. أول أمر؟",
        en: "Group Policy doesn't apply to a newly domain-joined PC. First command?",
      },
      choices: [
        { id: "a", text: { ar: "أعد تثبيت Windows للحصول على نسخة نظيفة تدعم Group Policy افتراضياً", en: "Reinstall Windows for a clean version that supports Group Policy by default" } },
        { id: "b", text: { ar: "gpupdate /force ثم gpresult /h لرؤية أي GPOs تُطبّق وأيها مرفوض", en: "gpupdate /force, then gpresult /h to see which GPOs apply and which are rejected" } },
        { id: "c", text: { ar: "احذف الجهاز من الـ domain ولا ترجعه — استخدم workgroup بدلاً منه", en: "Remove from domain permanently — use workgroup mode instead" } },
        { id: "d", text: { ar: "أعد تشغيل domain controller الرئيسي لإعادة فرض الـ policies على الكل", en: "Reboot the primary domain controller to re-apply policies on everyone" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "gpupdate /force = إعادة تطبيق فوراً. gpresult /h = report HTML تفصيلي بأي GPOs تُطبّق وأي مرفوضة (security filtering, WMI filter، أو OU خاطئ).", en: "gpupdate /force = re-apply immediately. gpresult /h = detailed HTML report on which GPOs apply, which are rejected, and why (security filtering, WMI filter, wrong OU)." },
        takeaway: { ar: "GPO debugging: gpupdate /force → gpresult /h → افحص: OU، security filtering، WMI، link enabled.", en: "GPO debugging: gpupdate /force → gpresult /h → check: OU, security filtering, WMI, link enabled." },
      },
      tags: ["group-policy", "active-directory", "gpresult", "windows"], estimatedSeconds: 70,
    },
    {
      id: "sup-l4-q05", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "مستخدم على Mac جديد يريد الوصول لـ shared drive في Windows file server. ماذا تحتاج؟",
        en: "A new Mac user wants access to a Windows file server share. What do you need?",
      },
      choices: [
        { id: "a", text: { ar: "اشترِ له لاب توب Windows لأن Mac لا يدعم الاتصال بـ Windows servers", en: "Buy him a Windows laptop since Mac doesn't support connecting to Windows servers" } },
        { id: "b", text: { ar: "Mac يدعم SMB أصلاً. Finder → Connect → smb://server. تحقق من credentials", en: "Mac supports SMB natively. Finder → Connect → smb://server. Verify credentials" } },
        { id: "c", text: { ar: "إعادة تثبيت macOS بنسخة خاصة معدة للعمل مع شبكات Active Directory", en: "Reinstall macOS with a special edition prepared for Active Directory networks" } },
        { id: "d", text: { ar: "إخباره أنه لا يمكن الوصول من Mac إلى Windows shares في بيئة الشركة", en: "Tell him it's impossible to access Windows shares from Mac in our environment" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Mac يستخدم SMB protocol منذ سنين. أهم نقطة: format اسم المستخدم (DOMAIN\\user أو user@domain.com) و عضوية الـ AD group.", en: "Mac speaks SMB natively. Key gotcha: username format (DOMAIN\\user or user@domain.com) and AD group membership." },
        takeaway: { ar: "Mac in Windows env: SMB يعمل، الـ credentials و AD groups هي الفخ المعتاد.", en: "Mac in Windows env: SMB works, credentials and AD groups are the usual trap." },
      },
      tags: ["mac", "smb", "active-directory", "cross-platform"], estimatedSeconds: 65,
    },
    {
      id: "sup-l4-q06", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "معالج جهاز عند 100% بدون عمليات واضحة في Task Manager. ما السبب الأرجح؟",
        en: "CPU at 100% with no obvious process in Task Manager. Most likely cause?",
      },
      choices: [
        { id: "a", text: { ar: "Hardware failure حتمي وغيّر الـ CPU أو الـ motherboard فوراً", en: "Definitive hardware failure — replace the CPU or motherboard immediately" } },
        { id: "b", text: { ar: "Process مخفي يحتاج 'Show all users'، أو svchost، أو malware — Process Explorer", en: "Hidden process needs 'Show all users', or svchost, or malware — use Process Explorer" } },
        { id: "c", text: { ar: "تجاهل المشكلة لأن Task Manager لم يظهر السبب فهي ليست مشكلة فعلية", en: "Ignore — Task Manager shows nothing so it isn't a real problem" } },
        { id: "d", text: { ar: "أعد تثبيت Windows من الصفر لمسح أي عملية معطوبة في النظام", en: "Reinstall Windows from scratch to wipe any corrupted process in the system" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Task Manager يخفي افتراضياً عمليات system. Process Explorer يكشف svchost الفعلي. Antimalware Service Executable (defender scan) سبب شائع.", en: "Task Manager hides system processes by default. Process Explorer shows the actual svchost. Antimalware Service Executable (Defender scan) is a common culprit." },
        takeaway: { ar: "100% CPU بدون سبب ظاهر: Process Explorer (Sysinternals)، ليس Task Manager.", en: "100% CPU with no obvious cause: Process Explorer (Sysinternals), not Task Manager." },
      },
      tags: ["windows", "performance", "cpu", "sysinternals"], estimatedSeconds: 65,
    },
    {
      id: "sup-l4-q07", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "Disk space ممتلئ على Linux server (/var مليان). أول أمر؟",
        en: "Disk space full on Linux server (/var is full). First command?",
      },
      choices: [
        { id: "a", text: { ar: "rm -rf /var/* لتحرير المساحة فوراً قبل أن يتعطل الخادم تماماً", en: "rm -rf /var/* to free space immediately before the server fully crashes" } },
        { id: "b", text: { ar: "du -sh للأكبر، journalctl --vacuum-size، docker prune، حذف logs بـ backup", en: "du -sh for biggest, journalctl --vacuum-size, docker prune, delete logs with backup" } },
        { id: "c", text: { ar: "أعد تثبيت OS لأن الخادم أصبح غير قابل للإصلاح بهذا الحجم من الـ logs", en: "Reinstall OS — the server is unsalvageable with this amount of logs" } },
        { id: "d", text: { ar: "أوقف الخادم بدون تشخيص ودع فريق آخر يتعامل مع المشكلة لاحقاً", en: "Shut down the server without diagnosis and let another team handle it later" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "du يحدد المشكلة. journalctl + docker logs أكثر الأسباب على modern servers. لا تحذف عشوائياً.", en: "du identifies the issue. journalctl + docker logs are top culprits on modern servers. Never delete blindly." },
        takeaway: { ar: "/var ممتلئ: du -sh أولاً، ثم journalctl، ثم docker. لا rm -rf قبل التشخيص.", en: "/var full: du -sh first, then journalctl, then docker. Never rm -rf before diagnosis." },
      },
      tags: ["linux", "disk-space", "logs", "docker"], estimatedSeconds: 65,
    },
    {
      id: "sup-l4-q08", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "Webex/Teams call ينقطع لمستخدم واحد فقط. الإنترنت يعمل عادة. ماذا تفحص؟",
        en: "Webex/Teams calls drop for one user only. Internet otherwise works. What do you check?",
      },
      choices: [
        { id: "a", text: { ar: "افترض الإنترنت سيئ — لا تفحص شيئاً وأخبره أن يستخدم الهاتف بدلاً منه", en: "Assume bad internet — don't investigate, tell him to use phone calls instead" } },
        { id: "b", text: { ar: "Bandwidth، jitter، packet loss (MTR)، QoS، VPN، Wi-Fi vs Ethernet، drivers", en: "Bandwidth, jitter, packet loss (MTR), QoS, VPN, Wi-Fi vs Ethernet, drivers" } },
        { id: "c", text: { ar: "إخباره أن يستخدم telephone بدل video لتجنب مشاكل الـ network كلياً", en: "Tell him to use phone calls instead of video to avoid network issues entirely" } },
        { id: "d", text: { ar: "تثبيت antivirus جديد لعلّ الموجود يستهلك الـ bandwidth في الخلفية", en: "Install a new antivirus in case the current one is using bandwidth in background" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "VoIP/Video حساس للـ jitter وpacket loss. ping بسيط لا يكفي — استخدم continuous ping أو pingpath أو MTR. Wi-Fi غالباً المتهم.", en: "VoIP/video is sensitive to jitter and packet loss. Plain ping isn't enough — use continuous ping, pingpath, or MTR. Wi-Fi is often the culprit." },
        takeaway: { ar: "Call drops: jitter > bandwidth في الأهمية. اختبر بـ MTR وحاول Ethernet للاستبعاد.", en: "Call drops: jitter > bandwidth in importance. Test with MTR and try Ethernet to rule out." },
      },
      tags: ["voip", "video-call", "jitter", "network"], estimatedSeconds: 70,
    },
    {
      id: "sup-l4-q09", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "موظف جديد يبدأ غداً. ما الذي يجب أن يكون جاهزاً قبل صباح الأحد؟",
        en: "New employee starts tomorrow. What must be ready before Monday morning?",
      },
      choices: [
        { id: "a", text: { ar: "نتعامل معه يوم وصوله الأول ونعطيه الأساسيات تدريجياً خلال الأسبوع", en: "Handle on his arrival day, give him basics gradually during the week" } },
        { id: "b", text: { ar: "AD، email، MFA، groups، laptop مُهيّأ، VPN، badge، gear، onboarding doc", en: "AD, email, MFA, groups, configured laptop, VPN, badge, gear, onboarding doc" } },
        { id: "c", text: { ar: "اللاب توب فقط جاهزاً يوم البداية، الباقي يمكن إكماله الأسبوع القادم", en: "Just the laptop ready on day one, the rest can be completed next week" } },
        { id: "d", text: { ar: "أن يحضر laptop شخصي وننصبّ عليه أدوات الشركة الأساسية في يومه الأول", en: "Have him bring a personal laptop, install company tools on day one" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Onboarding سيء = أول انطباع سلبي + إنتاجية ضائعة. Checklist موحدة + automation = onboarding مهني. كل بند مفقود = ساعات إنتاجية ضائعة.", en: "Bad onboarding = bad first impression + lost productivity. Standard checklist + automation = professional onboarding. Each missing item = lost productive hours." },
        takeaway: { ar: "Onboarding rule: checklist مكتوب، آخر deadline = الجمعة قبل البدء، لا day-of scrambling.", en: "Onboarding rule: written checklist, deadline = Friday before start, no day-of scrambling." },
      },
      tags: ["onboarding", "checklist", "active-directory", "lifecycle"], estimatedSeconds: 65,
    },
    {
      id: "sup-l4-q10", track: "it_support", level: 4, type: "scenario", difficulty: "hard",
      question: {
        ar: "موظف يستقيل اليوم. ما إجراءات IT للـ offboarding؟",
        en: "An employee resigns today. IT offboarding actions?",
      },
      choices: [
        { id: "a", text: { ar: "احذف حسابه فوراً من كل الأنظمة ولا تحتفظ بأي بيانات لاحقاً", en: "Delete his account immediately from all systems and keep no data afterward" } },
        { id: "b", text: { ar: "عطّل (لا تحذف)، أعد توجيه email، forward الموارد، استرجع الـ assets", en: "Disable (don't delete), forward email, forward resources, recover assets" } },
        { id: "c", text: { ar: "تجاهل لأنه قد يعود للشركة ولا حاجة لأي إجراء أمني الآن", en: "Ignore — he might come back, no security action needed right now" } },
        { id: "d", text: { ar: "أرسل بياناته كلها لمدير عام للمراجعة قبل اتخاذ أي قرار نهائي", en: "Send all his data to the general manager for review before any decision" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Offboarding ضعيف = ثغرة كبرى. الحذف الفوري يفقد بيانات. الـ retention الإلزامي قانوني. التعطيل قبل الحذف يحفظ السجلات.", en: "Weak offboarding = major risk. Immediate delete loses data. Legal retention is required. Disable before delete preserves audit trail." },
        takeaway: { ar: "Offboarding: disable (لا delete) → forward → retrieve assets → retain. الترتيب يحمي الأدلة والقانون.", en: "Offboarding: disable (don't delete) → forward → retrieve assets → retain. Order protects audit trail and legal compliance." },
      },
      tags: ["offboarding", "lifecycle", "active-directory", "data-retention"], estimatedSeconds: 75,
    },

    // ============================================================
    // LEVEL 5 — Senior judgement, methodology, and edge cases
    // ============================================================
    {
      id: "sup-l5-q01", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "جهاز موظف فيه malware معروف. الـ EDR لم يحجبه تلقائياً. ماذا تفعل في الترتيب الصحيح؟",
        en: "Known malware on an employee's PC. EDR didn't block it. Correct sequence of actions?",
      },
      choices: [
        { id: "a", text: { ar: "احذف الملف فوراً وأخفِ الحادثة عن الإدارة لتجنب الإحراج المهني", en: "Delete the file immediately and hide the incident from management" } },
        { id: "b", text: { ar: "اعزل عن الشبكة (لا تطفئ — memory artifacts)، أبلغ الأمن، احفظ image", en: "Isolate from network (don't power off — memory artifacts), notify security, image" } },
        { id: "c", text: { ar: "اطفئ الجهاز فوراً لمنع الـ malware من إكمال أي ضرر إضافي", en: "Power off immediately to prevent the malware from doing further damage" } },
        { id: "d", text: { ar: "أعد تشغيله لعلّ المشكلة تختفي بعد إعادة تشغيل النظام بشكل عادي", en: "Reboot — the problem may disappear after a normal system restart" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "إيقاف التشغيل يضيع memory artifacts (مفاتيح encryption، processes النشطة، connections). العزل يوقف الانتشار. الـ image للتحليل القانوني.", en: "Powering off loses memory artifacts (encryption keys, active processes, connections). Isolation stops spread. Forensic image for analysis." },
        takeaway: { ar: "Malware: isolate (لا power off) → notify → image → clean. الترتيب يحفظ الأدلة.", en: "Malware: isolate (don't power off) → notify → image → clean. Order preserves evidence." },
      },
      tags: ["malware", "incident-response", "forensics", "edr"], estimatedSeconds: 75,
    },
    {
      id: "sup-l5-q02", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "Ransomware اكتُشف. أكثر من 50 جهاز مصاب. أنت أول من رأى. ماذا تفعل؟",
        en: "Ransomware detected. 50+ machines infected. You're the first responder. What do you do?",
      },
      choices: [
        { id: "a", text: { ar: "ادفع الفدية لتختصر الوقت وتعيد الخدمة بأسرع طريقة ممكنة الآن", en: "Pay the ransom to save time and restore service as fast as possible" } },
        { id: "b", text: { ar: "اعزل الشبكة، فعّل IR plan، اتصل بـ leadership/legal، استعد من backups", en: "Isolate the network, activate IR plan, call leadership/legal, restore from backups" } },
        { id: "c", text: { ar: "تجاهل وانتظر تعليمات من الإدارة قبل اتخاذ أي إجراء على الأنظمة المصابة", en: "Ignore and wait for management instructions before any action on infected systems" } },
        { id: "d", text: { ar: "احذف كل الملفات المصابة فوراً قبل أن ينتشر الضرر لمزيد من الأجهزة", en: "Delete all infected files immediately before damage spreads further" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "العزل يوقف الانتشار الجانبي. IR plan وthe legal/leadership = قرارات اتصال + قرار عدم الدفع. Backups = الحل النهائي. الدفع لا يضمن الـ decryption ويُشجّع المهاجمين.", en: "Isolation stops lateral spread. IR plan + legal/leadership = communication + decision not to pay. Backups = the real fix. Paying doesn't guarantee decryption and emboldens attackers." },
        takeaway: { ar: "Ransomware: isolate → activate IR → restore. لا تدفع. وثّق كل دقيقة من البداية للعبر القانوني والـ insurance.", en: "Ransomware: isolate → activate IR → restore. Don't pay. Log every minute from the start for legal and insurance." },
      },
      tags: ["ransomware", "incident-response", "isolation", "backups"], estimatedSeconds: 80,
    },
    {
      id: "sup-l5-q03", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "تذكرة معقدة: مستخدم لا يستطيع الدخول لتطبيق SaaS عبر SSO. أي طبقات تفحصها بالترتيب؟",
        en: "Complex ticket: user can't login to a SaaS app via SSO. Which layers do you check in order?",
      },
      choices: [
        { id: "a", text: { ar: "احذف حسابه نهائياً من كل الأنظمة وأنشئ واحداً جديداً بكلمة مرور أقوى", en: "Delete his account from all systems and create a new one with stronger password" } },
        { id: "b", text: { ar: "AD، IdP group، SaaS license، SAML، clock skew، attribute mapping، browser", en: "AD attrs, IdP group, SaaS license, SAML, clock skew, attribute mapping, browser" } },
        { id: "c", text: { ar: "أخبره أن يستخدم حساباً شخصياً مؤقتاً للوصول إلى التطبيق المطلوب", en: "Tell him to use a personal account temporarily to access the required app" } },
        { id: "d", text: { ar: "أعد تثبيت Windows على جهازه لإصلاح أي مشكلة في الـ SSO certificates", en: "Reinstall Windows on his device to fix any issue with SSO certificates" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "SSO له طبقات متعددة. ابدأ من المستخدم وارتقِ: AD → IdP → SaaS license → settings. clock skew خطأ شائع منسي. browser cache يخفي مشاكل قديمة.", en: "SSO has many layers. Start from user upward: AD → IdP → SaaS license → settings. Clock skew is a frequently forgotten cause. Browser cache hides old issues." },
        takeaway: { ar: "SSO debugging = طبقي. احفظ checklist من 7 نقاط. لا تنسَ clock skew.", en: "SSO debugging = layered. Keep a 7-point checklist. Never forget clock skew." },
      },
      tags: ["sso", "saml", "active-directory", "saas", "troubleshooting"], estimatedSeconds: 80,
    },
    {
      id: "sup-l5-q04", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "Helpdesk team تتلقى 200 تذكرة في الأسبوع، نفس الـ 5 أسئلة تتكرر. ما تفعل كـ team lead؟",
        en: "Helpdesk gets 200 tickets/week, same 5 questions recur. What do you do as team lead?",
      },
      choices: [
        { id: "a", text: { ar: "وظّف 5 موظفين إضافيين لمعالجة الزيادة في عدد التذاكر الأسبوعية", en: "Hire 5 additional staff to handle the increase in weekly tickets" } },
        { id: "b", text: { ar: "حلّل الـ pattern، أنشئ KB، أتمتة الإجراءات، تواصل مع المستخدمين", en: "Analyze the pattern, create KB articles, automate actions, communicate with users" } },
        { id: "c", text: { ar: "تجاهل التكرار لأن الـ helpdesk عمله الطبيعي هو معالجة هذه الأنواع", en: "Ignore the recurrence — that's just normal helpdesk work, this is the job" } },
        { id: "d", text: { ar: "اطرد المستخدمين الذين يكررون نفس الأسئلة عدة مرات خلال الشهر", en: "Fire users who repeat the same questions multiple times in a month" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "تكرار = فرصة. KB + automation + self-service يُقلّل tickets بـ 30-50%. توظيف فقط = تكلفة بدون حل جذري.", en: "Recurrence = opportunity. KB + automation + self-service reduces tickets by 30-50%. Hiring only = cost without root fix." },
        takeaway: { ar: "Helpdesk maturity: من reactive إلى proactive. كل ticket مكرر = فرصة automation أو KB.", en: "Helpdesk maturity: from reactive to proactive. Every recurring ticket = automation or KB opportunity." },
      },
      tags: ["leadership", "automation", "knowledge-base", "self-service"], estimatedSeconds: 80,
    },
    {
      id: "sup-l5-q05", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "ميزانية السنة القادمة تُحسم. كيف تبرّر استثمار في monitoring/observability tooling لـ helpdesk؟",
        en: "Next year's budget is being decided. How do you justify investing in monitoring/observability tooling for helpdesk?",
      },
      choices: [
        { id: "a", text: { ar: "'أنا أريد ذلك' وكفى — الفريق يعرف قيمتها التقنية ولا تحتاج تبرير", en: "'I want it' is enough — the team knows the technical value, no justification needed" } },
        { id: "b", text: { ar: "Metrics: MTTR، tickets prevented، downtime cost، benchmark، ROI واضح", en: "Metrics: MTTR, tickets prevented, downtime cost, benchmark, clear ROI" } },
        { id: "c", text: { ar: "اطلب الميزانية بدون أرقام واعتمد على ثقة الإدارة في خبرتك التقنية", en: "Ask for budget without numbers, rely on management trust in your expertise" } },
        { id: "d", text: { ar: "هدّد بالاستقالة إن لم تحصل عليها لأنك لن تستطيع العمل بدونها", en: "Threaten to resign if not approved since you can't work without it" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Senior IT = يتحدّث بلغة الأعمال. ROI، MTTR، تكلفة downtime، churn. تجاهل الأرقام = تجاهل من الإدارة.", en: "Senior IT = speaks business language. ROI, MTTR, downtime cost, staff churn. Skip the numbers = get skipped by management." },
        takeaway: { ar: "كل طلب ميزانية = business case. لا 'أحب هذه الأداة' = 'هذه الأداة توفر $X سنوياً'.", en: "Every budget ask = business case. Not 'I like this tool' = 'this tool saves $X/year'." },
      },
      tags: ["leadership", "business-case", "metrics", "budgeting"], estimatedSeconds: 75,
    },
    {
      id: "sup-l5-q06", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "عضو فريق helpdesk يخطئ كثيراً. كيف تتصرف كـ lead؟",
        en: "A helpdesk team member makes frequent mistakes. How do you handle it as lead?",
      },
      choices: [
        { id: "a", text: { ar: "اطرده فوراً بعد تكرار الأخطاء عدة مرات لمنع أي تأثير على الفريق كله", en: "Fire him immediately after repeated mistakes to prevent impact on the team" } },
        { id: "b", text: { ar: "1:1، تشخيص (تدريب/workload/أدوات/شخصي)، خطة 30/60/90، توثيق", en: "1:1, diagnose (training/workload/tools/personal), 30/60/90 plan, documentation" } },
        { id: "c", text: { ar: "تجاهل المشكلة وتمنّى أن تتحسن من تلقاء نفسها مع مرور الوقت والخبرة", en: "Ignore the problem and hope it improves by itself with time and experience" } },
        { id: "d", text: { ar: "احذف منه التذاكر الصعبة وأعطها لزميل آخر أكثر خبرة منه دون تفسير", en: "Take difficult tickets away and give them to a more experienced colleague silently" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "الأخطاء = أعراض. السبب قد يكون: تدريب، أدوات، workload، شخصي. القفز للطرد يفقد staff قابل للإصلاح ويرفع insurance/legal exposure.", en: "Mistakes = symptoms. Cause might be: training, tooling, workload, personal. Jumping to firing loses fixable staff and raises insurance/legal exposure." },
        takeaway: { ar: "Performance issue: تشخيص قبل الحكم. وثّق كل خطوة. أعطِ فرصة محددة المدة.", en: "Performance issue: diagnose before judging. Document every step. Give time-boxed chance." },
      },
      tags: ["leadership", "people-management", "performance"], estimatedSeconds: 75,
    },
    {
      id: "sup-l5-q07", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "Service desk software يقترب من نهاية صلاحيته. الإدارة تريد توفير مال. كيف تقيّم البدائل؟",
        en: "Service desk software is approaching end-of-life. Management wants to save money. How do you evaluate alternatives?",
      },
      choices: [
        { id: "a", text: { ar: "اختر الأرخص فوراً لتوفير المال للإدارة بأسرع طريقة ممكنة هذا العام", en: "Pick the cheapest immediately to save money for management as fast as possible" } },
        { id: "b", text: { ar: "متطلبات (must/nice)، POC، TCO الكامل، feedback، خطة هجرة بـ rollback", en: "Requirements (must/nice), POC, full TCO, feedback, migration plan with rollback" } },
        { id: "c", text: { ar: "تجديد الأداة الحالية بدون تفكير لتجنب أي مخاطر في تغيير الأنظمة الآن", en: "Renew the current tool without thinking to avoid any risk of changing systems" } },
        { id: "d", text: { ar: "توقّف عن استخدام أي ticketing tool واعتمد على الإيميل والـ chat للتذاكر", en: "Stop using any ticketing tool, rely on email and chat for handling tickets" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "TCO = أكثر من license. Integration و training و migration و rollback خطر = نصف المشروع. POC يكشف القابلية الحقيقية. Feedback يقلل المقاومة.", en: "TCO = more than license. Integration, training, migration, and rollback risk = half the project. POC reveals real fit. Feedback reduces adoption resistance." },
        takeaway: { ar: "Tool selection: متطلبات، POC، TCO، plan with rollback. ليس 'الأرخص'.", en: "Tool selection: requirements, POC, TCO, plan with rollback. Not 'the cheapest'." },
      },
      tags: ["procurement", "evaluation", "leadership", "migration"], estimatedSeconds: 80,
    },
    {
      id: "sup-l5-q08", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "كيف تنتقل من helpdesk إلى دور أعلى (sysadmin، DevOps، security)؟",
        en: "How do you progress from helpdesk to a higher role (sysadmin, DevOps, security)?",
      },
      choices: [
        { id: "a", text: { ar: "انتظر ترقية تلقائية بسبب الأقدمية لأن الشركات تكافئ الولاء عادة", en: "Wait for automatic seniority promotion — companies usually reward loyalty" } },
        { id: "b", text: { ar: "حدّد الدور، اكتسب skills، شارك بمشاريع، شهادات، GitHub، شبكة داخلية", en: "Pick the role, gain skills, join projects, certs, GitHub, internal network" } },
        { id: "c", text: { ar: "غيّر الشركة كل 6 شهور لأن هذا أسرع طريقة لزيادة الراتب والمسمى الوظيفي", en: "Change companies every 6 months — fastest way to higher salary and title" } },
        { id: "d", text: { ar: "ابدأ من الصفر في مجال جديد كلياً ليس له علاقة بخبرتك في الـ helpdesk", en: "Start from scratch in a brand new field unrelated to your helpdesk experience" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Helpdesk = أرضية ممتازة لأنك ترى كل الطبقات. الترقية = إثبات skill في الدور المستهدف، ليس انتظار الأقدمية. مشاريع داخلية + GitHub = portfolio حقيقي.", en: "Helpdesk = excellent foundation since you see every layer. Promotion = proving skill in the target role, not awaiting seniority. Internal projects + GitHub = real portfolio." },
        takeaway: { ar: "خطّة المهنة: تعلّم → نفّذ → اعرض → اطلب. لا تنتظر — اصنع.", en: "Career plan: learn → execute → show → ask. Don't wait — create." },
      },
      tags: ["career", "growth", "skills", "promotion"], estimatedSeconds: 75,
    },
    {
      id: "sup-l5-q09", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "Senior leadership يطلب 'لماذا نتائج المستخدمين سيئة عن IT؟'. كيف تجيب؟",
        en: "Senior leadership asks 'why are user satisfaction scores low for IT?' How do you respond?",
      },
      choices: [
        { id: "a", text: { ar: "ألقِ اللوم على المستخدمين لأنهم لا يفهمون التقنية ويتوقعون المستحيل", en: "Blame the users — they don't understand tech and expect the impossible" } },
        { id: "b", text: { ar: "اطلب وقت تحليل، drill في الأسباب الجذرية، خطة بـ KPIs و quarterly checkpoints", en: "Ask for analysis time, drill into root causes, plan with KPIs and quarterly checkpoints" } },
        { id: "c", text: { ar: "اطلب ميزانية أكبر بدون شرح لأن المشكلة تحتاج موارد أكثر بشكل واضح", en: "Ask for a bigger budget without explanation — the problem clearly needs more resources" } },
        { id: "d", text: { ar: "استقل فوراً لأن الإدارة لا تقدّر المجهود الذي تبذله في تحسين الخدمة", en: "Resign immediately — management doesn't appreciate the effort you put in" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Customer dissatisfaction = signal، ليس attack. Drill للأسباب الجذرية، اقترح خطة قابلة للقياس. الإجابة الدفاعية تفقد الثقة.", en: "Customer dissatisfaction = signal, not attack. Drill into root causes, propose measurable plan. Defensive answer loses trust." },
        takeaway: { ar: "أمام الإدارة: اعترف، احقّق، اقترح خطة محددة. لا دفاع، لا تجاهل.", en: "With leadership: acknowledge, investigate, propose measurable plan. No defense, no dismissal." },
      },
      tags: ["leadership", "metrics", "improvement", "communication"], estimatedSeconds: 80,
    },
    {
      id: "sup-l5-q10", track: "it_support", level: 5, type: "scenario", difficulty: "hard",
      question: {
        ar: "ما الفرق بين 'good' و 'great' helpdesk engineer؟",
        en: "Difference between a 'good' and a 'great' helpdesk engineer?",
      },
      choices: [
        { id: "a", text: { ar: "السرعة فقط في الإجابات والـ closure rate العالي على الـ tickets الواردة", en: "Just speed of replies and high closure rate on incoming tickets" } },
        { id: "b", text: { ar: "Good يحل، Great يحل + يوثّق + يعلّم + يكتشف pattern + يحسّن النظام", en: "Good solves; great solves + documents + teaches + spots pattern + improves system" } },
        { id: "c", text: { ar: "Great يطلب راتباً أعلى فقط ولا فرق آخر في طريقة عمله أو إنتاجيته", en: "Great just asks for higher salary, no other difference in work or productivity" } },
        { id: "d", text: { ar: "Good يعمل بمفرده مستقلاً، Great يعتمد دائماً على فريق كامل من الزملاء", en: "Good works independently alone; great always depends on a full team of colleagues" } },
      ],
      correctAnswer: "b",
      explanation: {
        short: { ar: "Helpdesk حقيقي = ساحة قيادة. Great engineer يصنع نظاماً يحلّ مشكلة مرة واحدة لكل المستخدمين، ليس مرة لكل مستخدم. هذا الـ leverage.", en: "True helpdesk = leadership ground. A great engineer builds a system that solves a problem once for all users, not once per user. That's leverage." },
        takeaway: { ar: "هدفك: حل واحد يخدم 100 مستخدم، ليس 100 حل لـ 100 مستخدم.", en: "Your aim: one solution serving 100 users, not 100 solutions for 100 users." },
      },
      tags: ["career", "leadership", "leverage", "professionalism"], estimatedSeconds: 70,
    },
  ],
};
