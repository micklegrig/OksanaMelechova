/* ===== Контент сайту. Значення з класом .tbd / позначкою TBD потрібно уточнити в адвоката. ===== */
window.SITE = {
  name:{uk:"Оксана Мелехова",en:"Oksana Melekhova"},
  brand:{uk:"Адвокатське бюро",en:"Law Office"},
  phone:"+380-96-391-08-98",
  phoneHref:"tel:+380963910898",
  email:"info@melekhova.law",
  tg:"https://t.me/melekhova_law",
  viber:"viber://chat?number=%2B380963910898",
  wa:"https://wa.me/380963910898",
  address:{uk:"м. Київ, вул. Кирилівська, 31-Б",en:"31-B Kyrylivska St., Kyiv"},
  maps:"https://www.google.com/maps/dir/?api=1&destination=%D0%9A%D0%B8%D1%97%D0%B2%2C+%D0%B2%D1%83%D0%BB.+%D0%9A%D0%B8%D1%80%D0%B8%D0%BB%D1%96%D0%B2%D1%81%D1%8C%D0%BA%D0%B0+31-%D0%91",
  hours:[
    {d:{uk:"Пн – Пт",en:"Mon – Fri"},h:"09:00 – 19:00"},
    {d:{uk:"Сб – Нд",en:"Sat – Sun"},h:{uk:"за домовленістю",en:"by appointment"}}
  ],
  years:20, cases:2500
};

window.SERVICES = [
 {slug:"migratsiyni-spory",icon:"globe",cases:270,
  t:{uk:"Міграційні спори",en:"Migration disputes"},
  s:{uk:"Посвідки на проживання, відмови ДМС, статус біженця, заборона вʼїзду.",en:"Residence permits, migration service refusals, refugee status, entry bans."},
  d:{uk:"Супроводжую іноземців та осіб без громадянства у відносинах з Державною міграційною службою, прикордонною службою та судами — від підготовки документів до оскарження рішень про видворення.",en:"I support foreign nationals and stateless persons in dealings with the State Migration Service, the Border Guard and the courts — from preparing documents to challenging removal decisions."},
  h:{uk:["Оскарження відмов у видачі посвідки на тимчасове чи постійне проживання","Захист у справах про примусове повернення та видворення","Отримання статусу біженця або особи, яка потребує додаткового захисту","Оскарження заборони вʼїзду в Україну","Супровід процедури набуття громадянства України","Представництво в адміністративних судах усіх інстанцій"],
     en:["Appealing refusals of temporary or permanent residence permits","Defence in forced return and removal cases","Obtaining refugee or complementary protection status","Challenging entry bans to Ukraine","Support with acquiring Ukrainian citizenship","Representation in administrative courts of all instances"]},
  f:[{q:{uk:"Скільки часу є на оскарження рішення ДМС?",en:"How long do I have to appeal a migration service decision?"},a:{uk:"Строки залежать від виду рішення і можуть бути дуже короткими — інколи лічені дні. Тому звертайтеся одразу після отримання рішення: я перевірю строк і підготую скаргу чи позов.",en:"Deadlines depend on the type of decision and can be very short — sometimes just days. Contact me as soon as you receive the decision: I will check the deadline and prepare the appeal."}},
     {q:{uk:"Чи можна вести справу, якщо я за кордоном?",en:"Can you handle my case while I am abroad?"},a:{uk:"Так. Консультації проводжу онлайн, а представництво — за довіреністю, оформленою в консульстві або нотаріально з апостилем.",en:"Yes. Consultations are held online, and representation is arranged under a power of attorney issued at a consulate or notarised with an apostille."}},
     {q:{uk:"Якими мовами можна отримати консультацію?",en:"In which languages are consultations available?"},a:{uk:"Українською та англійською. Переклад документів організую за потреби.",en:"Ukrainian and English. I can arrange document translation if needed."}}],
  r:["administratyvni-spory","simeini-spory","kryminalni-spravy"]},

 {slug:"administratyvni-spory",icon:"landmark",cases:260,
  t:{uk:"Адміністративні спори",en:"Administrative disputes"},
  s:{uk:"Оскарження рішень, дій та бездіяльності органів влади й посадових осіб.",en:"Challenging decisions, actions and inaction of public authorities and officials."},
  d:{uk:"Захищаю громадян і бізнес у спорах з державними органами та органами місцевого самоврядування: податкова, Пенсійний фонд, ТЦК, міські ради, інспекції.",en:"I protect individuals and businesses in disputes with state and local authorities: tax service, Pension Fund, military enlistment offices, city councils and inspectorates."},
  h:{uk:["Оскарження рішень органів державної влади та місцевого самоврядування","Податкові спори та оскарження податкових повідомлень-рішень","Спори щодо пенсій і соціальних виплат","Оскарження постанов про адміністративні правопорушення","Спори з ТЦК та СП щодо відстрочок і військового обліку","Земельні та містобудівні спори з органами влади"],
     en:["Appealing decisions of state and local authorities","Tax disputes and appeals against tax assessment notices","Pension and social benefit disputes","Appealing administrative offence rulings","Disputes with enlistment offices on deferrals and military registration","Land and urban planning disputes with authorities"]},
  f:[{q:{uk:"Чи обовʼязково спершу скаржитися до вищого органу?",en:"Do I have to file an administrative complaint first?"},a:{uk:"Не завжди. У більшості випадків можна одразу звертатися до суду, але для окремих категорій (наприклад, податкових) досудове оскарження впливає на строки. Обираю шлях під конкретну ситуацію.",en:"Not always. In most cases you can go straight to court, but for some categories (e.g. tax) an administrative appeal affects deadlines. I choose the route for your situation."}},
     {q:{uk:"Хто сплачує судовий збір, якщо справу виграно?",en:"Who pays the court fee if the case is won?"},a:{uk:"За загальним правилом судові витрати відшкодовуються за рахунок субʼєкта владних повноважень, рішення якого визнано протиправним.",en:"As a general rule, court costs are reimbursed by the authority whose decision was found unlawful."}},
     {q:{uk:"Скільки триває розгляд справи?",en:"How long does a case take?"},a:{uk:"Залежить від категорії та навантаження суду: від кількох тижнів у спрощеному провадженні до кількох місяців.",en:"It depends on the category and the court's workload: from a few weeks in simplified proceedings to several months."}}],
  r:["migratsiyni-spory","hospodarski-spory","vidshkoduvannia-shkody"]},

 {slug:"tsyvilni-spory",icon:"scale",cases:320,
  t:{uk:"Цивільні спори",en:"Civil disputes"},
  s:{uk:"Договори, нерухомість, спадщина, стягнення боргів, захист прав споживачів.",en:"Contracts, real estate, inheritance, debt recovery, consumer protection."},
  d:{uk:"Веду цивільні справи на всіх стадіях: досудове врегулювання, переговори, суд першої інстанції, апеляція, касація та виконання рішення.",en:"I handle civil cases at every stage: pre-trial settlement, negotiations, first instance, appeal, cassation and enforcement."},
  h:{uk:["Спори щодо виконання та розірвання договорів","Спори щодо права власності на нерухомість","Спадкові справи та визнання права на спадщину","Стягнення боргів і збитків","Захист прав споживачів","Супровід виконавчого провадження"],
     en:["Disputes over performance and termination of contracts","Real estate ownership disputes","Inheritance cases and recognition of inheritance rights","Debt and damages recovery","Consumer protection","Support in enforcement proceedings"]},
  f:[{q:{uk:"Чи варто намагатися домовитися до суду?",en:"Is it worth trying to settle before court?"},a:{uk:"Часто так: вдала претензія чи переговори економлять місяці. Але я одночасно готую позицію для суду, щоб не втратити строки.",en:"Often yes: a well-drafted claim letter or negotiation saves months. At the same time I prepare the court position so no deadlines are missed."}},
     {q:{uk:"Який строк позовної давності?",en:"What is the limitation period?"},a:{uk:"Загальний строк — три роки, але для окремих вимог закон встановлює спеціальні строки. Перевірю на консультації.",en:"The general period is three years, but the law sets special periods for certain claims. I will check this at the consultation."}},
     {q:{uk:"Що робити, якщо боржник не виконує рішення суду?",en:"What if the debtor ignores the court judgment?"},a:{uk:"Відкриваю виконавче провадження, шукаю майно боржника та контролюю дії виконавця.",en:"I open enforcement proceedings, trace the debtor's assets and supervise the enforcement officer."}}],
  r:["simeini-spory","hospodarski-spory","vidshkoduvannia-shkody"]},

 {slug:"korporatyvni-spory",icon:"users",cases:280,
  t:{uk:"Корпоративні спори",en:"Corporate disputes"},
  s:{uk:"Конфлікти учасників, захист частки, оскарження рішень загальних зборів.",en:"Shareholder conflicts, protecting your stake, challenging general meeting resolutions."},
  d:{uk:"Допомагаю власникам і керівникам бізнесу вирішувати конфлікти між учасниками, захищати частки в компаніях і протидіяти незаконному захопленню контролю.",en:"I help business owners and managers resolve shareholder conflicts, protect their stakes and counter unlawful takeovers."},
  h:{uk:["Оскарження рішень загальних зборів учасників","Захист частки в статутному капіталі","Вихід учасника та розрахунок вартості частки","Протидія рейдерським захопленням","Спори щодо реєстраційних дій","Корпоративні договори та превентивний захист"],
     en:["Challenging general meeting resolutions","Protecting a share in the authorised capital","Member exit and valuation of the share","Countering hostile takeovers","Disputes over registration actions","Shareholder agreements and preventive protection"]},
  f:[{q:{uk:"Як швидко можна заблокувати незаконну реєстраційну дію?",en:"How quickly can an unlawful registration be blocked?"},a:{uk:"Можна подати скаргу до Мінʼюсту та заяву про забезпечення позову в суді. Чим раніше звернетеся, тим більше інструментів доступно.",en:"A complaint to the Ministry of Justice and a motion for interim measures can be filed. The sooner you act, the more tools are available."}},
     {q:{uk:"Чи можна захистити компанію заздалегідь?",en:"Can a company be protected in advance?"},a:{uk:"Так: корпоративний договір, коректний статут і контроль доступу до реєстраційних дій суттєво знижують ризики.",en:"Yes: a shareholder agreement, a sound charter and controlled access to registration actions significantly reduce risks."}},
     {q:{uk:"Чи працюєте ви з іноземними учасниками?",en:"Do you work with foreign shareholders?"},a:{uk:"Так, консультую українською та англійською.",en:"Yes, I advise in Ukrainian and English."}}],
  r:["hospodarski-spory","tsyvilni-spory","administratyvni-spory"]},

 {slug:"hospodarski-spory",icon:"briefcase",cases:350,
  t:{uk:"Господарські спори",en:"Commercial disputes"},
  s:{uk:"Спори між компаніями та ФОП, стягнення заборгованості, банкрутство.",en:"Disputes between companies and sole traders, debt collection, insolvency."},
  d:{uk:"Представляю бізнес у господарських судах: від претензійної роботи до виконання рішення. Оцінюю перспективи та витрати ще до подання позову.",en:"I represent businesses in commercial courts: from claim letters to enforcement. I assess prospects and costs before filing."},
  h:{uk:["Стягнення дебіторської заборгованості","Спори за договорами поставки, підряду, оренди","Процедури банкрутства та захист кредиторів","Спори з банками та лізинговими компаніями","Забезпечення позову та арешт активів","Претензійна робота та медіація"],
     en:["Recovery of receivables","Disputes under supply, construction and lease contracts","Insolvency proceedings and creditor protection","Disputes with banks and leasing companies","Interim measures and asset freezes","Claim letters and mediation"]},
  f:[{q:{uk:"Чи обовʼязкова досудова претензія?",en:"Is a pre-trial claim letter mandatory?"},a:{uk:"Як правило, ні, якщо інше не передбачено договором. Але вона часто прискорює оплату і посилює позицію в суді.",en:"Usually not, unless the contract requires it. But it often speeds up payment and strengthens the position in court."}},
     {q:{uk:"Чи можна стягнути з боржника витрати на адвоката?",en:"Can legal fees be recovered from the debtor?"},a:{uk:"Так, за умови належного підтвердження витрат. Я готую документи так, щоб суд міг їх відшкодувати.",en:"Yes, if the costs are properly documented. I prepare the paperwork so the court can award them."}},
     {q:{uk:"Що робити, якщо контрагент виводить активи?",en:"What if the counterparty is moving assets out?"},a:{uk:"Подаю заяву про забезпечення позову — арешт коштів чи майна — одночасно з позовом або до нього.",en:"I file for interim measures — freezing funds or property — together with or before the claim."}}],
  r:["korporatyvni-spory","tsyvilni-spory","administratyvni-spory"]},

 {slug:"kryminalni-spravy",icon:"shield",cases:380,
  t:{uk:"Кримінальні справи",en:"Criminal cases"},
  s:{uk:"Захист на всіх стадіях, представництво потерпілих, обшуки, запобіжні заходи.",en:"Defence at every stage, victim representation, searches, pre-trial measures."},
  d:{uk:"Захищаю підозрюваних і обвинувачених та представляю інтереси потерпілих — від першого контакту з правоохоронцями до вироку й оскарження.",en:"I defend suspects and accused persons and represent victims — from the first contact with law enforcement to the verdict and appeal."},
  h:{uk:["Захист під час досудового розслідування","Присутність адвоката під час обшуку та допиту","Оскарження запобіжних заходів і арешту майна","Захист у суді першої інстанції, апеляції та касації","Представництво потерпілих","Захист у справах про економічні злочини"],
     en:["Defence during pre-trial investigation","Lawyer's presence during searches and questioning","Challenging pre-trial measures and asset seizures","Defence at first instance, appeal and cassation","Representation of victims","Defence in economic crime cases"]},
  f:[{q:{uk:"Що робити, якщо прийшли з обшуком?",en:"What should I do if there is a search?"},a:{uk:"Не перешкоджайте, попросіть показати ухвалу суду, зателефонуйте адвокату та не давайте пояснень до його приїзду.",en:"Do not obstruct, ask to see the court order, call your lawyer and give no statements until they arrive."}},
     {q:{uk:"Чи можна відмовитися давати показання?",en:"Can I refuse to testify?"},a:{uk:"Так, Конституція гарантує право не свідчити проти себе та близьких родичів.",en:"Yes, the Constitution guarantees the right not to testify against yourself and close relatives."}},
     {q:{uk:"Як швидко адвокат може приїхати?",en:"How fast can a lawyer arrive?"},a:{uk:"У Києві — якнайшвидше, домовляюся під конкретну ситуацію. Телефонуйте одразу.",en:"In Kyiv — as soon as possible, depending on the situation. Call straight away."}}],
  r:["administratyvni-spory","hospodarski-spory","tsyvilni-spory"]},

 {slug:"simeini-spory",icon:"home",cases:260,
  t:{uk:"Сімейні спори",en:"Family disputes"},
  s:{uk:"Розлучення, поділ майна, аліменти, місце проживання та виїзд дитини.",en:"Divorce, division of property, child support, child residence and travel."},
  d:{uk:"Делікатно і конфіденційно допомагаю вирішувати сімейні конфлікти — з пріоритетом домовленостей та інтересів дитини, а коли потрібно — у суді.",en:"I resolve family conflicts discreetly and confidentially — prioritising agreement and the child's interests, and in court when needed."},
  h:{uk:["Розірвання шлюбу, зокрема з іноземцем","Поділ спільного майна подружжя","Стягнення та зміна розміру аліментів","Визначення місця проживання дитини","Дозвіл на виїзд дитини за кордон","Шлюбні договори та договори про аліменти"],
     en:["Divorce, including with a foreign spouse","Division of marital property","Recovery and adjustment of child support","Determining the child's place of residence","Permission for a child to travel abroad","Prenuptial and child support agreements"]},
  f:[{q:{uk:"Чи можна розлучитися, якщо один з подружжя за кордоном?",en:"Can a divorce proceed if one spouse is abroad?"},a:{uk:"Так, справу можна вести за довіреністю без особистої присутності.",en:"Yes, the case can be handled under a power of attorney without personal presence."}},
     {q:{uk:"Як вирішити питання виїзду дитини без згоди другого з батьків?",en:"How can a child travel without the other parent's consent?"},a:{uk:"Через суд — з доказами, що поїздка відповідає інтересам дитини. Підкажу, які документи зібрати.",en:"Through the court — with evidence that the trip is in the child's best interests. I'll tell you what to gather."}},
     {q:{uk:"Чи дізнаються сторонні про мою справу?",en:"Will others find out about my case?"},a:{uk:"Усе, що ви розповідаєте адвокату, становить адвокатську таємницю.",en:"Everything you tell your lawyer is protected by attorney–client privilege."}}],
  r:["tsyvilni-spory","migratsiyni-spory","vidshkoduvannia-shkody"]},

 {slug:"vidshkoduvannia-shkody",icon:"house",cases:190,
  t:{uk:"Відшкодування шкоди, завданої агресією",en:"Compensation for war damage"},
  s:{uk:"Зруйноване майно, Реєстр збитків, «єВідновлення», позови до РФ.",en:"Destroyed property, Register of Damage, eRecovery, claims against Russia."},
  d:{uk:"Допомагаю зафіксувати та задокументувати шкоду, завдану збройною агресією РФ, подати заяви до державних та міжнародних механізмів і звернутися до суду.",en:"I help document damage caused by Russian armed aggression, file applications with national and international mechanisms and go to court."},
  h:{uk:["Фіксація та документування пошкодженого чи знищеного майна","Подання заяв до Реєстру збитків (RD4U)","Супровід компенсації за програмою «єВідновлення»","Позови до РФ про відшкодування шкоди в українських судах","Відшкодування шкоди за загибель або поранення близьких","Спори зі страховими компаніями"],
     en:["Recording and documenting damaged or destroyed property","Filing claims with the Register of Damage (RD4U)","Support with eRecovery compensation","Lawsuits against Russia for damages in Ukrainian courts","Compensation for death or injury of family members","Disputes with insurers"]},
  f:[{q:{uk:"З чого почати, якщо житло пошкоджене?",en:"Where do I start if my home is damaged?"},a:{uk:"Зробіть фото та відео, отримайте акт обстеження від місцевої влади й подайте повідомлення через «Дію». Далі — консультація щодо механізмів компенсації.",en:"Take photos and video, get an inspection report from the local authority and report the damage via Diia. Then consult me on compensation routes."}},
     {q:{uk:"Чи можна подати заяву, якщо я за кордоном?",en:"Can I apply while abroad?"},a:{uk:"Так, більшість заяв подається онлайн або через представника.",en:"Yes, most applications are filed online or through a representative."}},
     {q:{uk:"Чи реально виконати рішення суду проти РФ?",en:"Can a judgment against Russia actually be enforced?"},a:{uk:"Виконання залежить від міжнародних механізмів, які зараз розвиваються. Судове рішення фіксує розмір шкоди і стане основою для майбутніх виплат.",en:"Enforcement depends on international mechanisms that are still developing. A judgment establishes the amount of damage and will underpin future payments."}}],
  r:["tsyvilni-spory","administratyvni-spory","simeini-spory"]}
];

window.STEPS = [
 {t:{uk:"Знайомство",en:"Introduction"},d:{uk:"Ви описуєте ситуацію, я уточнюю ключові обставини",en:"You describe the situation, I clarify the key facts"}},
 {t:{uk:"Аналіз",en:"Analysis"},d:{uk:"Вивчаю документи, оцінюю перспективи та можливі ризики",en:"I review documents and assess prospects and risks"}},
 {t:{uk:"Стратегія",en:"Strategy"},d:{uk:"Погоджую з вами план дій, строки, формат і вартість роботи",en:"I agree with you on the plan, timeline, format and fee"}},
 {t:{uk:"Супровід",en:"Representation"},d:{uk:"Беру на себе документи, переговори та представництво",en:"I handle the paperwork, negotiations and representation"}},
 {t:{uk:"Результат",en:"Outcome"},d:{uk:"Доводжу справу до виконання рішення та звітую про кожен етап",en:"I see the case through to enforcement and report on every stage"}}
];

window.NEWS = [
 {slug:"vidmova-dms-5-krokiv",img:"img/news-1.jpg",cat:"migr",date:"2026-11-04",art:"c1",icon:"globe",
  t:{uk:"Відмова ДМС у посвідці: 5 кроків, які варто зробити одразу",en:"Residence permit refused: 5 steps to take right away"},
  e:{uk:"Що перевірити в рішенні, як не пропустити строк оскарження і які документи підготувати.",en:"What to check in the decision, how not to miss the deadline and which documents to prepare."},
  b:{uk:["Відмова у видачі посвідки на проживання — не вирок. Але від того, наскільки швидко ви дієте, залежить, чи вдасться її оскаржити.","## 1. Отримайте рішення письмово","Попросіть копію рішення з підставами відмови. Без нього неможливо оцінити перспективи та обрахувати строк.","## 2. Перевірте строк оскарження","Строки у міграційних справах можуть бути дуже короткими. Зафіксуйте дату отримання рішення.","## 3. Зберіть документи","Паспорт, підстави перебування, попередні посвідки, договори, довідки — усе, що підтверджує законність вашого перебування.","## 4. Не порушуйте режим перебування","Поки рішення оскаржується, важливо не створювати нових підстав для видворення.","## 5. Зверніться до адвоката","> Що раніше юрист побачить справу, то більше варіантів захисту залишиться."],
     en:["A refused residence permit is not the end. But how quickly you act determines whether it can be overturned.","## 1. Get the decision in writing","Ask for a copy with the grounds for refusal. Without it the prospects and deadline cannot be assessed.","## 2. Check the appeal deadline","Deadlines in migration cases can be very short. Record the date you received the decision.","## 3. Gather documents","Passport, grounds for stay, previous permits, contracts, certificates — anything proving your lawful stay.","## 4. Stay compliant","While the decision is under appeal, avoid creating new grounds for removal.","## 5. Talk to a lawyer","> The sooner a lawyer sees the case, the more defence options remain."]}},
 {slug:"fiksatsiia-poshkodzhenoho-zhytla",img:"img/news-2.jpg",cat:"war",date:"2026-10-21",art:"c4",icon:"house",
  t:{uk:"Як зафіксувати пошкоджене житло для подальшого відшкодування",en:"How to document a damaged home for future compensation"},
  e:{uk:"Фото, акти, свідки та онлайн-заяви: що знадобиться для державних і міжнародних механізмів.",en:"Photos, reports, witnesses and online applications: what national and international mechanisms require."},
  b:{uk:["Правильна фіксація шкоди — основа будь-якої майбутньої компенсації.","## Що зробити в першу чергу","Сфотографуйте та зніміть на відео пошкодження з різних ракурсів, з видимими орієнтирами та датою.","Отримайте акт обстеження від комісії місцевої влади.","## Онлайн-заяви","Подайте повідомлення про пошкоджене майно через «Дію» та розгляньте подання заяви до міжнародного Реєстру збитків.","> Зберігайте документи на право власності та чеки на ремонт — вони знадобляться."],
     en:["Proper documentation is the foundation of any future compensation.","## First steps","Photograph and film the damage from several angles, with visible landmarks and dates.","Get an inspection report from the local authority commission.","## Online applications","Report the damaged property via Diia and consider filing with the international Register of Damage.","> Keep title documents and repair receipts — you will need them."]}},
 {slug:"vyizd-dytyny-za-kordon",img:"img/news-3.jpg",cat:"fam",date:"2026-10-08",art:"photo",icon:"home",
  t:{uk:"Виїзд дитини за кордон без згоди одного з батьків",en:"Child travel abroad without one parent's consent"},
  e:{uk:"Коли потрібна згода, як отримати дозвіл суду і що враховує суд.",en:"When consent is required, how to get court permission and what the court considers."},
  b:{uk:["Питання виїзду дитини за кордон — одне з найчастіших у сімейній практиці.","## Коли потрібен дозвіл суду","Якщо другий з батьків не дає згоди і немає законних підстав для виїзду без неї.","## Що враховує суд","Мету та строк поїздки, умови проживання за кордоном, звʼязок дитини з обома батьками.","> Ключове — довести, що поїздка відповідає найкращим інтересам дитини."],
     en:["Child travel abroad is one of the most common family law questions.","## When court permission is needed","When the other parent refuses consent and there are no legal grounds to travel without it.","## What the court considers","Purpose and length of the trip, living conditions abroad, the child's bond with both parents.","> The key is proving the trip serves the child's best interests."]}},
 {slug:"obshuk-v-ofisi",img:"img/news-4.jpg",cat:"crim",date:"2026-09-24",art:"c3",icon:"shield",
  t:{uk:"Обшук в офісі: алгоритм дій для керівника",en:"Office search: an action plan for managers"},
  e:{uk:"Що можна і чого не можна робити під час обшуку, і чому адвокат має бути поруч.",en:"What to do and not do during a search, and why your lawyer should be there."},
  b:{uk:["Обшук — стрес для команди. Чіткий алгоритм допомагає уникнути помилок.","## Під час обшуку","Попросіть ухвалу суду, перевірте адресу та межі дозволу. Негайно повідомте адвоката.","## Чого не робити","Не перешкоджайте слідчим і не давайте пояснень без адвоката.","> Фіксуйте все, що вилучається, і перевіряйте протокол перед підписанням."],
     en:["A search is stressful for any team. A clear plan helps avoid mistakes.","## During the search","Ask for the court order, check the address and scope. Notify your lawyer immediately.","## What not to do","Do not obstruct investigators or give statements without a lawyer.","> Record everything seized and check the report before signing."]}},
 {slug:"zakhyst-chastky-v-tov",img:"img/svc-korporatyvni-spory.jpg",cat:"biz",date:"2026-09-10",art:"c2",icon:"users",
  t:{uk:"Корпоративний конфлікт: як захистити частку в ТОВ",en:"Corporate conflict: protecting your stake in an LLC"},
  e:{uk:"Превентивні інструменти та дії, якщо конфлікт уже почався.",en:"Preventive tools and steps when a conflict has already begun."},
  b:{uk:["Корпоративні конфлікти найчастіше виникають там, де правила не прописані заздалегідь.","## Превентивні кроки","Корпоративний договір, актуальний статут, контроль доступу до ЕЦП і реєстраційних дій.","## Якщо конфлікт почався","Оскарження рішень загальних зборів, забезпечення позову, скарги на реєстраційні дії.","> Найдешевший корпоративний спір — той, якого вдалося уникнути."],
     en:["Corporate conflicts usually arise where rules were not set in advance.","## Preventive steps","A shareholder agreement, an up-to-date charter, control over e-signatures and registration actions.","## If a conflict has started","Challenging resolutions, interim measures, complaints about registration actions.","> The cheapest corporate dispute is the one you avoid."]}},
 {slug:"stiahnennia-borhu-z-kontrahenta",img:"img/svc-hospodarski-spory.jpg",cat:"biz",date:"2026-08-27",art:"c1",icon:"briefcase",
  t:{uk:"Стягнення боргу з контрагента: претензія чи одразу суд?",en:"Recovering a debt: claim letter or straight to court?"},
  e:{uk:"Порівнюю шляхи стягнення та пояснюю, як не втратити час.",en:"Comparing recovery routes and how not to lose time."},
  b:{uk:["Вибір між претензією та позовом залежить від суми, доказів і поведінки боржника.","## Коли достатньо претензії","Якщо боржник платоспроможний і зацікавлений у подальшій співпраці.","## Коли варто йти до суду","Якщо є ризик виведення активів — разом із позовом подаю заяву про забезпечення.","> Важливо зберігати всі документи, що підтверджують поставку чи надання послуг."],
     en:["The choice between a claim letter and a lawsuit depends on the amount, evidence and the debtor's conduct.","## When a claim letter is enough","When the debtor is solvent and interested in continued cooperation.","## When to go to court","If assets may be moved out — I file for interim measures together with the claim.","> Keep all documents proving delivery or services rendered."]}},
 {slug:"oskarzhennia-rishen-tsk",img:"img/svc-administratyvni-spory.jpg",cat:"adm",date:"2026-08-12",art:"c4",icon:"landmark",
  t:{uk:"Оскарження рішень ТЦК: на що звернути увагу",en:"Appealing enlistment office decisions: what to watch for"},
  e:{uk:"Підстави для оскарження, строки та докази, які варто зібрати заздалегідь.",en:"Grounds for appeal, deadlines and evidence to gather in advance."},
  b:{uk:["Рішення та дії ТЦК і СП можна оскаржити в адміністративному суді.","## Типові підстави","Відмова у відстрочці за наявності підстав, порушення процедури, неправильні дані обліку.","## Докази","Довідки, що підтверджують підстави для відстрочки, листування з ТЦК, відомості з реєстру.","> Діяти варто одразу — строки звернення до суду обмежені."],
     en:["Decisions and actions of enlistment offices can be appealed in administrative court.","## Typical grounds","Refused deferral despite valid grounds, procedural violations, incorrect registration data.","## Evidence","Certificates supporting deferral grounds, correspondence with the office, registry extracts.","> Act promptly — court filing deadlines are limited."]}}
];

window.NEWS_CATS = {
 migr:{uk:"Міграційне право",en:"Migration law"},
 war:{uk:"Відшкодування шкоди",en:"War damage"},
 fam:{uk:"Сімейне право",en:"Family law"},
 crim:{uk:"Кримінальне право",en:"Criminal law"},
 biz:{uk:"Бізнес",en:"Business"},
 adm:{uk:"Адміністративне право",en:"Administrative law"}
};

window.LINKS = [
 {cat:{uk:"Законодавство та суди",en:"Legislation & courts"},items:[
  {i:"book",t:{uk:"Бази даних «Законодавство України»",en:"Legislation of Ukraine databases"},u:"https://zakon.rada.gov.ua/"},
  {i:"clock",t:{uk:"Стан розгляду справ",en:"Case status"},u:"https://court.gov.ua/fair/"},
  {i:"gavel",t:{uk:"Єдиний державний реєстр судових рішень",en:"Unified State Register of Court Decisions"},u:"https://reyestr.court.gov.ua/"},
  {i:"landmark",t:{uk:"База правових позицій Верховного Суду",en:"Supreme Court legal positions database"},u:"https://lpd.court.gov.ua/"}]},
 {cat:{uk:"Реєстри та перевірки",en:"Registers & checks"},items:[
  {i:"usercheck",t:{uk:"Єдиний реєстр адвокатів",en:"Unified Register of Advocates"},u:"https://erau.unba.org.ua/"},
  {i:"filecheck",t:{uk:"Отримання довідки про несудимість",en:"Criminal record certificate"},u:"https://diia.gov.ua/services/vityag-pro-nesudimist"},
  {i:"shieldalert",t:{uk:"Єдиний державний реєстр осіб, які вчинили корупційні або повʼязані з корупцією правопорушення",en:"Register of persons who committed corruption offences"},u:"https://corruptinfo.nazk.gov.ua/"},
  {i:"globe",t:{uk:"Перелік осіб, повʼязаних зі здійсненням терористичної діяльності або стосовно яких застосовано міжнародних санкцій",en:"List of persons linked to terrorism or under international sanctions"},u:"https://fiu.gov.ua/pages/dijalnist/protidija-terorizmu/perelik-teroristiv/aktualnij-perelik-osib-pov-yazanix-z-provadzhennyam-teroristichnoji-diyalnosti-abo-stosovno-yakix-zastosovano-mizhnarodni-sankcziji.html"},
  {i:"graduation",t:{uk:"Перевірка документів про освіту",en:"Education documents check"},u:"https://info.edbo.gov.ua/edu-documents/"}]},
 {cat:{uk:"Нерухомість, транспорт, нотаріат",en:"Property, vehicles, notary"},items:[
  {i:"map",t:{uk:"Публічна кадастрова карта",en:"Public cadastral map"},u:"https://kadastrova-karta.com/"},
  {i:"car",t:{uk:"Централізована база даних МТСБУ",en:"MTIBU central database"},u:"https://cbd.mtsbu.ua/Login.aspx"},
  {i:"stamp",t:{uk:"Єдиний реєстр спеціальних бланків нотаріальних документів",en:"Register of notarial document forms"},u:"https://rnb.nais.gov.ua/"},
  {i:"coins",t:{uk:"Єдиний реєстр виконавчих проваджень",en:"Register of enforcement proceedings"},u:"https://asvpweb.minjust.gov.ua/#/search-debtors"}]},
 {cat:{uk:"Послуги та пошта",en:"Services & mail"},items:[
  {i:"database",t:{uk:"Реєстр адміністративних послуг",en:"Register of administrative services"},u:"https://data.gov.ua/dataset/reyest-admin-poslug"},
  {i:"mappin",t:{uk:"Перелік центрів адміністративних послуг м. Київ",en:"Kyiv administrative service centres"},u:"https://kyivcnap.gov.ua/OneStopShops/Details/ababc65b-0d0b-4ba9-bbda-8ad86a601f5a"},
  {i:"package",t:{uk:"Пошук поштових відправлень",en:"Parcel tracking"},u:"https://track.ukrposhta.ua/tracking_UA.html"}]}
];
// порядок для головної, як у макеті Figma
window.HOME_LINKS=["https://zakon.rada.gov.ua/","https://erau.unba.org.ua/","https://court.gov.ua/fair/","https://reyestr.court.gov.ua/","https://lpd.court.gov.ua/","https://diia.gov.ua/services/vityag-pro-nesudimist","https://corruptinfo.nazk.gov.ua/","https://fiu.gov.ua","https://info.edbo.gov.ua/edu-documents/","https://kadastrova-karta.com/","https://cbd.mtsbu.ua/Login.aspx","https://rnb.nais.gov.ua/","https://asvpweb.minjust.gov.ua/#/search-debtors","https://data.gov.ua/dataset/reyest-admin-poslug","https://kyivcnap.gov.ua","https://track.ukrposhta.ua/tracking_UA.html"];
