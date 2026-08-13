/* ============================================================
   Sarge's Knowledge Base
   Static Q&A bank for the chatbot. 150+ entries.

   Schema per entry:
     id          - unique
     category    - grouping
     question    - canonical phrasing
     keywords    - alt phrasings + synonyms (used for fuzzy match)
     answer      - what Sarge says (NO dollar amounts ever)
     routeToForm - true => after answering, push the estimate form
     verify      - true => [VERIFY W/ OWNER] — cautious wording, owner to confirm

   PRICING RULE: any entry with routeToForm:true must NEVER state a dollar
   amount. main chatbot also runs a regex price-detection pre-filter on user
   input that overrides routing — see js/sarge.js.

   [VERIFY W/ OWNER] entries (Dan, please confirm/edit before going live):
     kb-101  Are you licensed and insured?
     kb-102  Insurance details
     kb-103  Warranty / guarantee
     kb-104  Warranty length
     kb-110  Accepted payment methods
     kb-111  Deposit required
     kb-112  Payment terms / financing
   ============================================================ */

window.SARGE_KB = [

  /* ========== SEALCOATING BASICS ========== */
  {
    id: 'kb-001', category: 'sealcoating',
    question: 'What is sealcoating?',
    keywords: ['what is sealcoat', 'what does sealcoating mean', 'sealcoating definition', 'define sealcoat', 'what is seal coat', 'sealcoat'],
    answer: "Listen up — sealcoating is a protective coat we lay over your asphalt. It seals the surface against water, UV rays, gas, and oil — the stuff that breaks blacktop down. Think of it as sunscreen and a raincoat for your driveway."
  },
  {
    id: 'kb-002', category: 'sealcoating',
    question: 'Why should I sealcoat my driveway?',
    keywords: ['why sealcoat', 'reason to sealcoat', 'benefits of sealcoating', 'should i seal my driveway', 'sealcoating worth it', 'is sealing worth it'],
    answer: "Buffalo weather is brutal on asphalt — sun, rain, and freeze-thaw cycles crack and dry it out fast. Sealcoating slows all of that down, keeps the asphalt flexible, and brings the color back to a deep jet-black. Cheap insurance for an expensive surface."
  },
  {
    id: 'kb-003', category: 'sealcoating',
    question: 'How often should I sealcoat?',
    keywords: ['how often sealcoat', 'how frequently seal', 'when to reseal', 'how many years between seal', 'reseal frequency'],
    answer: "Recruit, every 2–3 years on a residential driveway. High-traffic commercial lots sometimes need it yearly. We'll tell you straight if yours actually needs it yet — no upsell."
  },
  {
    id: 'kb-004', category: 'sealcoating',
    question: 'Does sealcoating fix cracks?',
    keywords: ['does sealcoat fix cracks', 'will sealing fill cracks', 'sealcoat over cracks', 'does sealing repair cracks'],
    answer: "Negative — sealcoat is a thin protective layer, not a filler. Cracks get hot-pour rubber crack filling FIRST, then the sealcoat goes over the top. Order matters."
  },
  {
    id: 'kb-005', category: 'sealcoating',
    question: 'Is sealcoating worth the money?',
    keywords: ['is it worth it', 'sealcoating value', 'is sealing worth it', 'should i bother sealing'],
    answer: "A driveway is one of the biggest surfaces on your property. Sealing it every couple years costs a fraction of resurfacing or replacing it down the road. Worth it? Affirmative."
  },
  {
    id: 'kb-006', category: 'sealcoating',
    question: 'What does sealcoat protect against?',
    keywords: ['sealcoat protection', 'what does sealing do', 'what does sealcoat block', 'sealcoat benefits'],
    answer: "UV sun fade, water intrusion, freeze-thaw cracking, gas drips, oil leaks. It also makes the surface easier to clean and easier to clear of snow."
  },
  {
    id: 'kb-007', category: 'sealcoating',
    question: 'Will it make my driveway look new again?',
    keywords: ['look new again', 'make driveway black again', 'restore appearance', 'curb appeal', 'driveway look fresh'],
    answer: "Affirmative. A fresh seal brings back that deep, even jet-black finish with sharp clean edges. Curb appeal jumps the day we're done."
  },
  {
    id: 'kb-008', category: 'sealcoating',
    question: 'Does sealing slow down cracking?',
    keywords: ['does sealing prevent cracks', 'stop cracks forming', 'reduce cracking'],
    answer: "Big time. Sealer keeps asphalt flexible and water out — the two things that cause cracking. Combined with crack filling, you'll get years more life out of your blacktop."
  },
  {
    id: 'kb-009', category: 'sealcoating',
    question: "What's the difference between asphalt and blacktop?",
    keywords: ['asphalt vs blacktop', 'are blacktop and asphalt the same', 'blacktop or asphalt'],
    answer: "Same thing, recruit — different name. Both are aggregate (stones) bound with bitumen. We seal, crack-fill, stripe, and patch all of it."
  },
  {
    id: 'kb-010', category: 'sealcoating',
    question: "What's the difference between sealcoating and paving?",
    keywords: ['sealcoat vs paving', 'sealing vs paving', 'difference paving and sealcoat'],
    answer: "Paving is laying new asphalt — that's a much bigger job. Sealcoating is the maintenance coat that protects the asphalt you already have so it lasts."
  },

  /* ========== NEW ASPHALT / FRESH PAVEMENT ========== */
  {
    id: 'kb-020', category: 'new-asphalt',
    question: 'Can I sealcoat brand-new asphalt?',
    keywords: ['seal new asphalt', 'sealcoat fresh asphalt', 'seal brand new driveway', 'sealcoat new pavement'],
    answer: "Not right away. Fresh asphalt needs to cure and release its oils first — usually 6 to 12 months. Seal too early and it won't bond. We'll tell you when it's ready."
  },
  {
    id: 'kb-021', category: 'new-asphalt',
    question: 'How long after new asphalt before I can seal it?',
    keywords: ['how long after paving to seal', 'wait to sealcoat new driveway', 'when to first sealcoat'],
    answer: "Generally 6–12 months, depending on the season it was laid and the weather since. When in doubt, ask us to take a look before scheduling."
  },
  {
    id: 'kb-022', category: 'new-asphalt',
    question: 'My driveway was just paved — when do I seal it?',
    keywords: ['just paved when seal', 'new driveway sealing timeline', 'fresh blacktop seal'],
    answer: "Give it a full season — usually 6–12 months — so the oils cure out and the surface is ready to bond with the sealer. Schedule a free look-over when you're close."
  },

  /* ========== PROCESS & PREP ========== */
  {
    id: 'kb-030', category: 'process',
    question: 'How do you prep before sealing?',
    keywords: ['prep work', 'how do you prepare', 'driveway prep', 'cleaning before sealcoat', 'what prep is needed'],
    answer: "We clear the surface, blow off all dirt and debris, knock down any weeds in the cracks, fill the cracks with hot-pour rubber, treat oil spots so the sealer bonds, and cut clean edges. Prep is 80% of a job that lasts."
  },
  {
    id: 'kb-031', category: 'process',
    question: 'Do you fill the cracks first?',
    keywords: ['fill cracks first', 'crack filling before sealing', 'cracks before seal'],
    answer: "Always. Hot-pour rubberized crack filler goes in BEFORE any sealer. Sealing over open cracks just hides the problem — we fix it."
  },
  {
    id: 'kb-032', category: 'process',
    question: 'How many coats do you apply?',
    keywords: ['how many coats', 'one coat or two', 'number of coats', 'two coat sealcoat'],
    answer: "Typically two coats for full coverage and durability. Heavily worn surfaces may need extra attention in spots — we'll spec that in your estimate."
  },
  {
    id: 'kb-033', category: 'process',
    question: 'How do you apply the sealer?',
    keywords: ['application method', 'spray or squeegee', 'how is sealcoat applied', 'how do you put it on'],
    answer: "Spray and/or squeegee depending on the surface, with hand-cut edges around garages, lawns, and borders. Crisp edges, no overspray on your siding."
  },
  {
    id: 'kb-034', category: 'process',
    question: 'Do I need to do anything before you arrive?',
    keywords: ['what do i need to do', 'prepare for arrival', 'do i need to move my car', 'before crew arrives'],
    answer: "Just move vehicles, bikes, basketball hoops, and anything else off the driveway. Keep pets and kids clear on the day. We handle the rest, recruit."
  },
  {
    id: 'kb-035', category: 'process',
    question: 'How do you clean oil stains before sealing?',
    keywords: ['oil stain treatment', 'oil spots', 'gas stain prep', 'oil leak before seal'],
    answer: "Oil and gas spots get a primer/oil-spot treatment so the sealer can bond. Untreated oil eats through sealcoat fast — we don't skip this step."
  },
  {
    id: 'kb-036', category: 'process',
    question: 'Do you trim the grass / edge the driveway?',
    keywords: ['edge cutting', 'trim around driveway', 'sharp edges', 'grass edge'],
    answer: "Affirmative. We cut clean edges along the lawn, garage, and any borders. Razor-sharp lines are part of the finish."
  },
  {
    id: 'kb-037', category: 'process',
    question: 'How long does a driveway take to seal?',
    keywords: ['how long does it take', 'job duration', 'time to seal driveway', 'how many hours'],
    answer: "Most residential driveways are a one-day job, plus the cure time afterward before you drive on it. Commercial lots scale with size, but we move tight."
  },
  {
    id: 'kb-038', category: 'process',
    question: 'How big a crew comes out?',
    keywords: ['crew size', 'how many people', 'who shows up', 'team size'],
    answer: "Owner-led crew — small, sharp, and focused. You'll have the owner on-site for your job, not a sub-crew."
  },

  /* ========== TIMING & WEATHER ========== */
  {
    id: 'kb-040', category: 'timing',
    question: "What's the best time of year to sealcoat in Buffalo?",
    keywords: ['best season to seal', 'when to sealcoat', 'best time of year', 'best month to seal', 'when can you seal'],
    answer: "Late spring through early fall, when temps are reliably warm and dry. That's prime sealing season in WNY."
  },
  {
    id: 'kb-041', category: 'timing',
    question: 'What temperature do you need to sealcoat?',
    keywords: ['temperature requirement', 'how warm to seal', 'minimum temp for sealcoat', 'sealing temperature'],
    answer: "Generally 50°F and rising, dry, with no rain forecast for about 24 hours. Sealer needs warmth and sun to cure right."
  },
  {
    id: 'kb-042', category: 'timing',
    question: 'Can you sealcoat if rain is in the forecast?',
    keywords: ['rain in forecast', 'will it rain', 'sealing in rain', 'sealcoat rain forecast'],
    answer: "Negative — we need a dry window of roughly 24 hours so the sealer can cure. Rain on fresh sealer ruins it. We watch the forecast and reschedule if needed."
  },
  {
    id: 'kb-043', category: 'timing',
    question: 'How late in the year can you sealcoat?',
    keywords: ['latest season for sealing', 'sealcoat in fall', 'sealing november', 'late fall sealing'],
    answer: "Through the fall, as long as the days stay warm enough. Once it turns cold, sealing season is over and we switch to snow and salt."
  },
  {
    id: 'kb-044', category: 'timing',
    question: 'Can you sealcoat in winter?',
    keywords: ['seal in winter', 'winter sealcoat', 'cold weather sealing', 'sealing in december'],
    answer: "Negative — it's too cold to cure. Winter is our plowing, salting, and walkway season. Get on the list early in spring instead."
  },
  {
    id: 'kb-045', category: 'timing',
    question: 'Can you sealcoat in hot summer weather?',
    keywords: ['summer sealing', 'sealcoat in heat', 'too hot to seal', '90 degree sealing'],
    answer: "Affirmative — hot, dry days are actually ideal. The sealer flashes off fast and cures hard. We'll work early to keep things even."
  },
  {
    id: 'kb-046', category: 'timing',
    question: 'What if rain hits right after you seal?',
    keywords: ['rain after sealing', 'rain after sealcoat', 'rained on fresh sealer'],
    answer: "If we time it right, you've got 24 hours of cure before rain matters. If a storm pops up unexpectedly within hours of laying down sealer, we may need to re-coat the affected area — and we stand behind that."
  },
  {
    id: 'kb-047', category: 'timing',
    question: 'How early can you start in the spring?',
    keywords: ['spring start date', 'when do you start in spring', 'earliest sealing', 'april sealing'],
    answer: "We start as soon as the weather lets us — usually mid-to-late April once daytime temps are reliably in the 50s and overnight stays above freezing."
  },
  {
    id: 'kb-048', category: 'timing',
    question: "What's the forecast threshold for going / no-go?",
    keywords: ['weather go no go', 'when do you cancel', 'forecast call'],
    answer: "We need ~50°F and rising, no rain in the 24-hour window, and a dry surface. We'll call it the morning of and reschedule if it's a no-go — no charge."
  },

  /* ========== CURING & AFTERCARE ========== */
  {
    id: 'kb-050', category: 'curing',
    question: 'How long before I can walk on it?',
    keywords: ['when can i walk on it', 'walking on fresh seal', 'foot traffic after sealing'],
    answer: "Usually a few hours, but give it until it's fully dry to be safe. We'll tell you on the day based on weather."
  },
  {
    id: 'kb-051', category: 'curing',
    question: 'How long before I can drive on it?',
    keywords: ['when can i drive on it', 'how long until i can park', 'drive on fresh sealcoat', 'park on driveway after sealing'],
    answer: "Plan on staying off it for 24–48 hours. Cooler or humid days take longer. We'll give you the exact green light before we roll out."
  },
  {
    id: 'kb-052', category: 'curing',
    question: 'Will the sealer track into my garage?',
    keywords: ['tracks on shoes', 'sealcoat tracks', 'black footprints', 'will it track inside'],
    answer: "Once it's cured, no. Stay off it during the cure window and you're good. If anyone does walk on it too early, the residue cleans up off skin and shoes with water."
  },
  {
    id: 'kb-053', category: 'curing',
    question: 'How do I take care of the sealcoat after?',
    keywords: ['aftercare', 'sealcoat maintenance', 'care for new seal', 'how to maintain'],
    answer: "Keep it clean, clean up gas/oil drips quickly, and don't turn your tires while parked for the first few days. That's about it, recruit."
  },
  {
    id: 'kb-054', category: 'curing',
    question: 'Can I wash my car on it?',
    keywords: ['wash car after sealing', 'water on fresh seal', 'rinse driveway'],
    answer: "Wait at least a week after we seal so it fully hardens. After that, water is fine — that's literally what it's protecting against."
  },
  {
    id: 'kb-055', category: 'curing',
    question: 'Why are my tires leaving marks?',
    keywords: ['tire marks', 'tire scuffs after sealing', 'power steering marks'],
    answer: "Standard for the first week or two on fresh seal — power-steering scuffs happen when you turn the wheel while stopped. Drive forward a couple feet before cranking the wheel and it fades fast."
  },
  {
    id: 'kb-056', category: 'curing',
    question: 'Will rain ruin it after curing?',
    keywords: ['rain after sealcoat cured', 'water damage seal', 'rain on cured seal'],
    answer: "Negative. Once cured (about 24 hours), rain is no problem — keeping water out is the whole point."
  },
  {
    id: 'kb-057', category: 'curing',
    question: 'Can I put my basketball hoop / cars back the same day?',
    keywords: ['return cars same day', 'park same day', 'basketball hoop back'],
    answer: "Same day is too soon — wait the full 24–48 hours. We'll tell you exactly when based on the weather that day."
  },

  /* ========== CRACK FILLING ========== */
  {
    id: 'kb-060', category: 'crack-filling',
    question: 'What is crack filling?',
    keywords: ['what is crack filling', 'crack repair', 'fill cracks asphalt', 'how does crack filling work'],
    answer: "We rout/clean out the cracks and fill them with hot-pour rubberized sealant that flexes with temperature changes. It stops water from getting in and freezing."
  },
  {
    id: 'kb-061', category: 'crack-filling',
    question: 'Why is crack filling important?',
    keywords: ['why fill cracks', 'crack filling benefits', 'importance of crack filling'],
    answer: "Water in a crack freezes, expands, and tears your asphalt apart over a Buffalo winter. Filling cracks early is the cheapest way to add years to your pavement."
  },
  {
    id: 'kb-062', category: 'crack-filling',
    question: 'Can you just fill cracks without sealcoating?',
    keywords: ['crack filling without sealing', 'just crack repair', 'only crack fill', 'crack repair standalone'],
    answer: "Affirmative — we can do crack filling on its own if that's all you need. Many customers crack-fill in odd years and seal in even years."
  },
  {
    id: 'kb-063', category: 'crack-filling',
    question: 'How big a crack can you fill?',
    keywords: ['crack size limit', 'big cracks', 'wide cracks', 'maximum crack width'],
    answer: "Hairline up to about a half-inch wide with hot-pour rubber. Wider than that and we're talking about patching or saw-cut repair — different play."
  },
  {
    id: 'kb-064', category: 'crack-filling',
    question: 'What material do you use for crack filling?',
    keywords: ['crack filler material', 'hot pour rubber', 'crack filling product'],
    answer: "Commercial-grade hot-pour rubberized crack sealant — it melts in, bonds tight, and flexes with the asphalt as temperatures swing."
  },
  {
    id: 'kb-065', category: 'crack-filling',
    question: 'My driveway has alligator cracks — can you fix that?',
    keywords: ['alligator cracks', 'spiderweb cracks', 'crackling asphalt', 'alligatoring'],
    answer: "Alligator cracking means the base under the asphalt has failed — crack filling alone won't last there. We'd look at saw-cut patching or partial replacement. Send a photo and we'll tell you straight."
  },
  {
    id: 'kb-066', category: 'crack-filling',
    question: 'Will the cracks come back?',
    keywords: ['cracks come back', 'crack repair last', 'will cracks return'],
    answer: "Filled cracks can re-open slightly during extreme temperature swings — that's normal — but the filler keeps water out, which is the whole job. Re-touch every few years."
  },

  /* ========== LINE STRIPING / ADA ========== */
  {
    id: 'kb-070', category: 'striping',
    question: 'Do you do parking lot striping?',
    keywords: ['parking lot striping', 'lot striping', 'paint lines', 'parking lines'],
    answer: "Affirmative — crisp, code-compliant lines for lots of any size, with latex traffic paint that holds up to weather and tires."
  },
  {
    id: 'kb-071', category: 'striping',
    question: 'Do you do ADA / handicap stalls?',
    keywords: ['ada striping', 'handicap stalls', 'accessible parking', 'wheelchair symbol', 'ada compliant', 'handicap parking spot'],
    answer: "Yes — ADA-compliant accessible stalls, access aisles, and wheelchair symbols painted to current code. We've done plenty for schools and commercial properties."
  },
  {
    id: 'kb-072', category: 'striping',
    question: 'Can you re-stripe a faded lot?',
    keywords: ['restripe', 'restripe parking lot', 'fading lines', 'paint over faded stripes'],
    answer: "Absolutely. Re-striping a worn lot instantly makes a property look maintained and professional. Same crew that lays sealer can stripe it right after."
  },
  {
    id: 'kb-073', category: 'striping',
    question: 'Do you paint arrows, fire lanes, numbers, and stencils?',
    keywords: ['paint arrows', 'fire lane', 'parking numbers', 'stencils', 'directional arrows', 'no parking'],
    answer: "Yes — directional arrows, fire lanes, 'no parking', stall numbers, custom stencils. If you can spec it, we can paint it."
  },
  {
    id: 'kb-074', category: 'striping',
    question: 'How soon can we drive on fresh paint?',
    keywords: ['drive on paint', 'paint dry time', 'how long until paint dries', 'striping cure'],
    answer: "Traffic paint typically dries to drive on within about an hour, weather depending. We'll cone off until it's safe."
  },
  {
    id: 'kb-075', category: 'striping',
    question: 'How long does line striping last?',
    keywords: ['striping longevity', 'how long do lines last', 'paint lifespan'],
    answer: "On a normal commercial lot, 1–3 years before a re-stripe makes sense — depending on traffic volume and plow scraping in winter."
  },
  {
    id: 'kb-076', category: 'striping',
    question: 'Do you do double lines / hairpin stalls?',
    keywords: ['double lines', 'hairpin stalls', 'european striping'],
    answer: "Yep — single, double, or hairpin layouts. Just tell us the spec and we'll lay them down crisp."
  },
  {
    id: 'kb-077', category: 'striping',
    question: 'Can you stripe a new lot from scratch?',
    keywords: ['new lot striping', 'fresh stripe layout', 'lay out parking lot', 'first time striping'],
    answer: "Affirmative. New layouts, code compliance, stall counts — we'll map it out and lay it down. Bring your site plan or we'll measure it on the spot."
  },

  /* ========== ASPHALT PATCHING / POTHOLES ========== */
  {
    id: 'kb-080', category: 'patching',
    question: 'Do you fix potholes?',
    keywords: ['pothole repair', 'fix potholes', 'patch potholes', 'pothole'],
    answer: "Affirmative — we do hot-asphalt patching for potholes and worn-out spots. We don't paint over problems."
  },
  {
    id: 'kb-081', category: 'patching',
    question: 'Do you do asphalt patching and repair?',
    keywords: ['asphalt patching', 'asphalt repair', 'patch work', 'driveway repair'],
    answer: "Yes — pothole repair, edge restoration, and patch work, compacted for a solid finish that holds up."
  },
  {
    id: 'kb-082', category: 'patching',
    question: 'Can you fix a crumbling driveway edge?',
    keywords: ['crumbling edge', 'driveway edge repair', 'failing edges', 'broken edge'],
    answer: "Often, yes — we can rebuild failing edges with hot-mix patches. Send us a photo or have us take a look in person."
  },
  {
    id: 'kb-083', category: 'patching',
    question: 'Hot patch vs cold patch — which do you use?',
    keywords: ['hot vs cold patch', 'hot asphalt patch', 'cold patch', 'patch type'],
    answer: "Hot-mix when available — it lasts much longer. Cold patch is a winter emergency tool, not a real fix."
  },
  {
    id: 'kb-084', category: 'patching',
    question: 'Can you do a saw-cut patch?',
    keywords: ['saw cut patch', 'sawcut repair', 'saw-cut'],
    answer: "Affirmative — saw-cut, clean removal, base prep if needed, then hot mix and compact. That's the real fix for bigger failures."
  },

  /* ========== CONCRETE ========== */
  {
    id: 'kb-090', category: 'concrete',
    question: 'Do you do concrete work?',
    keywords: ['concrete', 'concrete services', 'do you do concrete', 'concrete contractor'],
    answer: "Yes — concrete is handled through our trusted partner crew, Xquisit Concrete LLC, so you get one point of contact for the whole job."
  },
  {
    id: 'kb-091', category: 'concrete',
    question: 'Can you do curbs, walkways, or aprons?',
    keywords: ['concrete curb', 'walkway', 'apron', 'sidewalk concrete', 'concrete curbs'],
    answer: "Yes — through our concrete partner we cover curbs, walkways, aprons, and similar work. Same coordination, one bill."
  },
  {
    id: 'kb-092', category: 'concrete',
    question: 'Who is Xquisit Concrete?',
    keywords: ['xquisit concrete', 'concrete partner', 'who does the concrete'],
    answer: "Xquisit Concrete LLC is our trusted partner crew for any concrete work — curbs, walkways, aprons. They're local and we vouch for them."
  },
  {
    id: 'kb-093', category: 'concrete',
    question: 'Can you replace my concrete driveway with asphalt?',
    keywords: ['concrete to asphalt', 'replace concrete driveway', 'tear out concrete'],
    answer: "We can scope that out — the removal/base work is the big piece, then asphalt paving on top. Send us details and we'll lay out the path."
  },

  /* ========== RESIDENTIAL ========== */
  {
    id: 'kb-100', category: 'residential', routeToForm: true,
    question: 'Do you do residential driveways?',
    keywords: ['residential driveway', 'home driveway', 'house driveway', 'private driveway'],
    answer: "Affirmative — residential driveways are our bread and butter, from small city drives to long country and estate driveways. Drop your info for a free estimate."
  },
  {
    id: 'kb-100a', category: 'residential',
    question: 'My driveway is gravel — can you sealcoat it?',
    keywords: ['gravel driveway', 'seal gravel', 'sealcoat gravel'],
    answer: "Negative — sealcoating is for asphalt/blacktop only. Gravel can't be sealed. Happy to point you in the right direction if you're thinking about paving."
  },
  {
    id: 'kb-100b', category: 'residential',
    question: 'My driveway is concrete — can you seal it?',
    keywords: ['seal concrete driveway', 'concrete sealing', 'sealcoat concrete'],
    answer: "We specialize in asphalt sealcoating, not concrete sealers — those are different products entirely. For concrete work see our partner Xquisit Concrete."
  },
  {
    id: 'kb-100c', category: 'residential',
    question: 'Do you do long country driveways?',
    keywords: ['long driveway', 'country driveway', 'rural driveway', 'estate driveway'],
    answer: "Affirmative — we've done estate driveways stretching hundreds of feet. Bigger crews, more sealer, same razor-sharp finish."
  },
  {
    id: 'kb-100d', category: 'residential',
    question: 'Do you do small city driveways?',
    keywords: ['city driveway', 'small driveway', 'urban driveway', 'short driveway'],
    answer: "Yes — short, tight, single-car drives are no problem. We'll work clean around your fences and lawn."
  },

  /* ========== COMMERCIAL ========== */
  {
    id: 'kb-105', category: 'commercial', routeToForm: true,
    question: 'Do you do commercial parking lots?',
    keywords: ['commercial parking lot', 'commercial sealcoating', 'business lot', 'commercial lot'],
    answer: "Yes — storefronts, plazas, auto shops, multi-tenant lots. Sealcoating, striping, patching, the works. Drop the property details and the owner will put a number together for you."
  },
  {
    id: 'kb-105a', category: 'commercial',
    question: 'Can you work after hours so you don\'t disrupt my business?',
    keywords: ['after hours', 'overnight work', 'weekend work', 'work around hours', 'business open'],
    answer: "Affirmative — we can schedule around your operating hours, including overnights and weekends, to keep your lot open when you need it."
  },
  {
    id: 'kb-105b', category: 'commercial',
    question: 'Do you work with schools, churches, or HOAs?',
    keywords: ['school parking', 'church lot', 'hoa', 'school striping'],
    answer: "Yes — schools, churches, and HOA properties across WNY, including full ADA striping packages. We're good with administrators and PO paperwork."
  },
  {
    id: 'kb-105c', category: 'commercial',
    question: 'Can you stage a big lot in phases?',
    keywords: ['phased project', 'half the lot', 'staged sealing', 'big lot phases'],
    answer: "Affirmative — we can split a lot into sections so half stays open while the other half cures. Standard play for grocery stores and busy plazas."
  },

  /* ========== WINTER SERVICES ========== */
  {
    id: 'kb-110', category: 'winter',
    question: 'Do you do snow plowing?',
    keywords: ['snow plowing', 'snowplow', 'plow snow', 'plow driveway', 'commercial plowing'],
    answer: "Affirmative — commercial and residential snow plowing across WNY. Slots fill up, so lock yours in early."
  },
  {
    id: 'kb-110a', category: 'winter',
    question: 'Do you offer salting?',
    keywords: ['salting', 'ice melt', 'rock salt', 'de-ice', 'salt driveway'],
    answer: "Yes — salting for lots, driveways, and walkways to keep them safe and ice-free."
  },
  {
    id: 'kb-110b', category: 'winter',
    question: 'Do you clear sidewalks and walkways?',
    keywords: ['sidewalk clearing', 'shovel walkway', 'walkway clearing', 'pedestrian path'],
    answer: "Affirmative — public sidewalks and walkways too, not just driveways and lots."
  },
  {
    id: 'kb-110c', category: 'winter',
    question: 'Can I sign up for the whole season?',
    keywords: ['seasonal contract', 'whole winter', 'snow contract', 'season pass plowing'],
    answer: "Yes — seasonal snow contracts available, but slots are limited. Reach out before the snow flies."
  },
  {
    id: 'kb-110d', category: 'winter',
    question: 'When do you start snow service?',
    keywords: ['when start plowing', 'first snow', 'snow service start'],
    answer: "We're on standby as soon as the forecast goes hostile — usually mid-November. Sign up earlier to lock in your spot."
  },
  {
    id: 'kb-110e', category: 'winter',
    question: 'Do you do salting only, no plowing?',
    keywords: ['salting only', 'just salt', 'salt without plow'],
    answer: "Affirmative — we can do salt-only routes if that's all you need."
  },

  /* ========== SCHEDULING & ESTIMATES ========== */
  {
    id: 'kb-120', category: 'scheduling', routeToForm: true,
    question: 'How do I get an estimate?',
    keywords: ['get estimate', 'free estimate', 'how to get quote', 'estimate', 'quote', 'get a quote'],
    answer: "Free, no-pressure estimates. Drop your details on the estimate form right here and the owner will follow up with a written quote."
  },
  {
    id: 'kb-121', category: 'scheduling',
    question: 'Are estimates free?',
    keywords: ['estimate cost', 'free quote', 'is the estimate free', 'do you charge for estimate'],
    answer: "100% free and no obligation. We'll walk the property, give you a written scope, and never pressure you."
  },
  {
    id: 'kb-122', category: 'scheduling', routeToForm: true,
    question: 'How soon can you come out?',
    keywords: ['how soon', 'fast service', 'turnaround', 'how quickly', 'when can you do it', 'availability'],
    answer: "Depends on the season and weather, but we move fast — drop your info and we'll get you on the schedule."
  },
  {
    id: 'kb-123', category: 'scheduling', routeToForm: true,
    question: 'How do I book a job?',
    keywords: ['book a job', 'schedule a job', 'set up appointment', 'book service'],
    answer: "Easiest path is the estimate form — give us your details, we'll confirm timing, and you're locked in."
  },
  {
    id: 'kb-124', category: 'scheduling',
    question: 'Can I get an estimate without being home?',
    keywords: ['estimate without me', 'not home for estimate', 'remote quote'],
    answer: "Yes — for residential driveways, give us clear access, a couple photos, and approximate dimensions and we can often quote without you on-site."
  },
  {
    id: 'kb-125', category: 'scheduling',
    question: 'How far out are you booking?',
    keywords: ['booking out', 'how busy', 'lead time', 'how far booked'],
    answer: "Varies by season — early summer and early fall are our busiest. Tell us your timeline on the form and we'll be straight with you about realistic dates."
  },
  {
    id: 'kb-126', category: 'scheduling',
    question: 'Do you do emergency repair calls?',
    keywords: ['emergency repair', 'urgent fix', 'rush job'],
    answer: "We'll do our best — call the line directly at 716-907-8259 and we'll see what we can shuffle."
  },
  {
    id: 'kb-127', category: 'scheduling',
    question: 'Can you give me a same-week appointment?',
    keywords: ['same week', 'this week', 'next few days'],
    answer: "Sometimes yes, depending on the weather and what's on the schedule. Drop your info and we'll tell you the soonest opening."
  },

  /* ========== PRICING (ALL ROUTE TO FORM, NEVER QUOTE A NUMBER) ========== */
  {
    id: 'kb-130', category: 'pricing', routeToForm: true,
    question: 'How much does it cost?',
    keywords: ['how much', 'cost', 'price', 'how much does it cost', 'what does it cost', 'pricing'],
    answer: "Fair question, recruit — but every job's different. Price depends on the size, the condition, how many cracks need filling, and which services you want. The only way to a real number is a free estimate — the owner looks at the job and puts it in writing."
  },
  {
    id: 'kb-131', category: 'pricing', routeToForm: true,
    question: 'How much to seal my driveway?',
    keywords: ['cost to seal driveway', 'price driveway sealing', 'cost residential sealcoat', 'how much to sealcoat'],
    answer: "Comes down to square footage, condition, and prep needed — so I won't throw out a number that's wrong. Send your info for a free, exact quote."
  },
  {
    id: 'kb-132', category: 'pricing', routeToForm: true,
    question: 'What does parking lot striping cost?',
    keywords: ['striping cost', 'parking lot striping price', 'cost to stripe', 'striping price', 'cost of striping'],
    answer: "Depends on the number of stalls, layout, ADA work, and whether it's new or a re-stripe. A free estimate gets you a real figure in writing."
  },
  {
    id: 'kb-133', category: 'pricing', routeToForm: true,
    question: 'Can you give me a quote or ballpark?',
    keywords: ['ballpark', 'rough estimate', 'rough number', 'rough price', 'rough cost', 'ball park'],
    answer: "I keep it honest — no guessing on price. Fill out the estimate form and the owner will get you an accurate quote."
  },
  {
    id: 'kb-134', category: 'pricing', routeToForm: true,
    question: 'Do you have a minimum charge?',
    keywords: ['minimum charge', 'minimum job', 'service minimum', 'minimum order'],
    answer: "Pricing depends on the job and travel, so let's get you a real quote rather than a guess. Drop your details."
  },
  {
    id: 'kb-135', category: 'pricing', routeToForm: true,
    question: 'Is sealcoating expensive?',
    keywords: ['is it expensive', 'expensive sealcoat', 'is sealing pricey', 'budget sealcoat'],
    answer: "Lots of homeowners are surprised by how reasonable it is, but every job is different. Get a real number with the free estimate form."
  },
  {
    id: 'kb-136', category: 'pricing', routeToForm: true,
    question: 'How much per square foot?',
    keywords: ['per square foot', 'per sq ft', 'sq ft rate', 'cost per square foot'],
    answer: "Per-square-foot pricing varies with prep, access, condition, and add-ons (cracks, striping). The free estimate is the real number you're looking for."
  },
  {
    id: 'kb-137', category: 'pricing', routeToForm: true,
    question: 'How much for crack filling?',
    keywords: ['crack filling cost', 'price crack repair', 'how much to fill cracks', 'crack fill price'],
    answer: "Depends on the linear feet of cracking and how clean we have to rout them. Free estimate locks in a real number."
  },
  {
    id: 'kb-138', category: 'pricing', routeToForm: true,
    question: 'How much for snow plowing?',
    keywords: ['plowing cost', 'snow plowing price', 'plow season cost', 'snow contract price'],
    answer: "Plowing rates depend on driveway/lot size, location, and whether it's per-storm or seasonal. Drop your details and we'll quote it."
  },
  {
    id: 'kb-139', category: 'pricing', routeToForm: true,
    question: "What's your hourly rate?",
    keywords: ['hourly rate', 'rate per hour', 'how much per hour'],
    answer: "We bid jobs, not hours — that way you know the exact price before we start. Free estimate sets it in writing."
  },

  /* ========== SERVICE AREA ========== */
  {
    id: 'kb-140', category: 'area',
    question: 'What areas do you serve?',
    keywords: ['service area', 'where do you work', 'what towns', 'coverage area', 'do you cover'],
    answer: "Buffalo and the Western New York suburbs — Clarence, Amherst, Williamsville, Tonawanda, Cheektowaga, West Seneca, Lancaster, Orchard Park, Hamburg, and surrounding towns."
  },
  {
    id: 'kb-141', category: 'area', routeToForm: true,
    question: 'Do you serve my town?',
    keywords: ['my town', 'do you cover my area', 'do you come to', 'service in my town'],
    answer: "We cover Buffalo metro and WNY. Tell us where you are on the form and we'll confirm — odds are good."
  },
  {
    id: 'kb-142', category: 'area',
    question: 'Do you travel outside Buffalo?',
    keywords: ['travel outside buffalo', 'far from buffalo', 'further out', 'outside wny'],
    answer: "We work throughout Western New York. If you're a bit outside, just ask — we'll see if it fits the route."
  },
  {
    id: 'kb-143', category: 'area',
    question: 'Do you work in Clarence?',
    keywords: ['clarence', 'serve clarence', 'work in clarence'],
    answer: "Affirmative — Clarence is bread and butter for us. Lots of jobs out there."
  },
  {
    id: 'kb-144', category: 'area',
    question: 'Do you work in Amherst / Williamsville?',
    keywords: ['amherst', 'williamsville', 'serve amherst'],
    answer: "Yes — Amherst, Williamsville, Snyder, Eggertsville, all over the Northtowns."
  },
  {
    id: 'kb-145', category: 'area',
    question: 'Do you work in Hamburg / Orchard Park?',
    keywords: ['hamburg', 'orchard park', 'south towns', 'south buffalo'],
    answer: "Affirmative — we cover the Southtowns including Hamburg, Orchard Park, East Aurora, and surrounding."
  },
  {
    id: 'kb-146', category: 'area',
    question: 'Do you work in Niagara Falls / Lockport?',
    keywords: ['niagara falls', 'lockport', 'niagara county'],
    answer: "Yes — Niagara Falls and Lockport are well within range. Drop your details and we'll confirm timing."
  },

  /* ========== MATERIALS, QUALITY & WARRANTY ========== */
  {
    id: 'kb-150', category: 'materials',
    question: 'What materials do you use?',
    keywords: ['materials', 'product brand', 'what sealer', 'what paint', 'what product'],
    answer: "Commercial-grade sealer, hot-pour rubberized crack filler, and latex traffic paint. No watered-down product, no shortcuts."
  },
  {
    id: 'kb-151', category: 'materials',
    question: 'How long does sealcoating last?',
    keywords: ['lasts how long', 'lifespan', 'sealcoat lifespan', 'durability', 'how long does seal last'],
    answer: "Typically 2–3 years on a residential driveway before it's due again, depending on traffic and weather."
  },
  {
    id: 'kb-152', category: 'materials',
    question: 'Do you water down your sealer?',
    keywords: ['watered down', 'diluted sealer', 'water in product'],
    answer: "Negative. Sealer is mixed per the manufacturer spec — that's how it cures right and protects the surface. We don't cut corners."
  },
  {
    id: 'kb-153', category: 'materials', verify: true,
    question: 'Do you guarantee your work?',
    keywords: ['warranty', 'guarantee', 'do you guarantee', 'workmanship', 'is there a warranty'],
    answer: "We stand behind our work and use premium materials. For specific warranty terms on your job, we'll go over them with your written estimate."
  },
  {
    id: 'kb-154', category: 'materials', verify: true,
    question: 'How long is the warranty?',
    keywords: ['warranty length', 'warranty period', 'warranty time'],
    answer: "Warranty terms depend on the scope of work. Ask in your estimate and we'll spell it out in writing."
  },
  {
    id: 'kb-155', category: 'materials', verify: true,
    question: 'Are you licensed and insured?',
    keywords: ['licensed', 'insured', 'insurance', 'license', 'business license'],
    answer: "We're a local, owner-operated WNY company. For insurance and credential details on your job, reach out and we'll get you what you need."
  },
  {
    id: 'kb-156', category: 'materials',
    question: 'What if I\'m not happy with the job?',
    keywords: ['not satisfied', 'unhappy with job', 'fix problem', 'mistake'],
    answer: "Call the owner directly — 716-907-8259. We don't leave a job until you're happy with it. Owner on every job means accountability."
  },

  /* ========== PAYMENT ========== */
  {
    id: 'kb-160', category: 'payment', verify: true,
    question: 'What payment methods do you take?',
    keywords: ['payment methods', 'how to pay', 'do you take cards', 'credit card', 'check', 'cash', 'venmo'],
    answer: "We'll go over accepted payment options when we give you your estimate. Easiest is to ask on the form so we can confirm."
  },
  {
    id: 'kb-161', category: 'payment', verify: true,
    question: 'Do you require a deposit?',
    keywords: ['deposit', 'down payment', 'pay upfront', 'deposit required'],
    answer: "We'll cover any deposit or payment terms with your written estimate. Nothing gets billed without you knowing first."
  },
  {
    id: 'kb-162', category: 'payment', verify: true,
    question: 'Do you offer financing?',
    keywords: ['financing', 'payment plan', 'finance options', 'split payment'],
    answer: "For larger projects we can discuss payment terms with your estimate. Ask when we quote and we'll see what works."
  },
  {
    id: 'kb-163', category: 'payment',
    question: 'When do I pay?',
    keywords: ['when to pay', 'payment timing', 'pay before or after', 'pay upon completion'],
    answer: "Usually upon completion once you've walked the job and are satisfied. Specific terms are in your written estimate."
  },

  /* ========== ABOUT THE COMPANY ========== */
  {
    id: 'kb-170', category: 'about',
    question: 'Who is Seal Team Six?',
    keywords: ['who are you', 'about company', 'company info', 'about seal team six', 'tell me about you'],
    answer: "Seal Team Six is a local, owner-operated sealcoating and striping outfit based in Buffalo, NY, running since 2022. Residential driveways to commercial lots and schools — we do it all, year-round."
  },
  {
    id: 'kb-171', category: 'about',
    question: 'How do I contact you?',
    keywords: ['contact', 'phone number', 'how to reach', 'how to call', 'reach you', 'email', 'contact info'],
    answer: "Call or text 716-907-8259, email Seal.Team.Six.Snow@gmail.com, or find us on Facebook at SealTeamSix.716. I can also drop your info to the crew right now."
  },
  {
    id: 'kb-172', category: 'about',
    question: 'Is the owner on the job?',
    keywords: ['owner on job', 'is the owner there', 'who runs the crew', 'owner operated'],
    answer: "Affirmative — you get the owner on-site, not a flake-out sub-crew. Concrete is the one exception (handled by our partner Xquisit Concrete)."
  },
  {
    id: 'kb-173', category: 'about',
    question: 'How long have you been in business?',
    keywords: ['how long in business', 'years in business', 'established when', 'since when', 'when did you start'],
    answer: "We've been running since 2022 — locally born and bred in WNY, with hundreds of driveways and lots locked down."
  },
  {
    id: 'kb-174', category: 'about',
    question: 'What\'s your phone number?',
    keywords: ['phone', 'phone number', 'call you', 'number to call'],
    answer: "716-907-8259 — call or text, whichever works."
  },
  {
    id: 'kb-175', category: 'about',
    question: 'What\'s your email?',
    keywords: ['email', 'email address', 'send email'],
    answer: "Seal.Team.Six.Snow@gmail.com — fire away."
  },
  {
    id: 'kb-176', category: 'about',
    question: 'Are you on Facebook?',
    keywords: ['facebook', 'social media', 'instagram', 'fb', 'social'],
    answer: "Yes — facebook.com/SealTeamSix.716. Plenty of job photos and customer feedback there."
  },
  {
    id: 'kb-177', category: 'about',
    question: 'Why the name Seal Team Six?',
    keywords: ['why the name', 'name origin', 'seal team six name'],
    answer: "Because we lock it down. Sealcoating, sharp execution, no excuses — that's the standard."
  },
  {
    id: 'kb-178', category: 'about',
    question: 'What are your hours?',
    keywords: ['hours', 'open hours', 'when are you open', 'business hours'],
    answer: "Monday–Saturday 7 AM – 7 PM, Sunday by appointment. Snow service runs 24/7 during winter storms."
  },

  /* ========== DIY VS PRO ========== */
  {
    id: 'kb-190', category: 'diy-vs-pro',
    question: 'Can I just sealcoat it myself?',
    keywords: ['diy sealcoat', 'do it myself', 'self sealcoat', 'home depot sealer', 'big box sealer'],
    answer: "You can buy big-box sealer, but it's thinner, wears fast, and the prep is the hard part. A pro coat with commercial-grade product lasts far longer and looks sharper — usually cheaper over time."
  },
  {
    id: 'kb-191', category: 'diy-vs-pro',
    question: 'Why hire a pro instead of store-bought sealer?',
    keywords: ['pro vs store sealer', 'why hire pro', 'why not diy', 'professional vs diy'],
    answer: "Better product, proper crack prep, even two-coat coverage, and clean edges. Store sealer often peels or fades in a season. Do it once, do it right."
  },
  {
    id: 'kb-192', category: 'diy-vs-pro',
    question: 'Can you fix a bad DIY sealcoat job?',
    keywords: ['fix bad sealcoat', 'repair diy job', 'previous sealcoat', 'fix peeling sealer'],
    answer: "Affirmative — we deal with this all the time. Sometimes we can clean and re-coat over the top, sometimes we need to scrape problem areas first. Send a photo on the estimate form."
  },

  /* ========== COMMON QUESTIONS / FAQ EXTRAS ========== */
  {
    id: 'kb-200', category: 'misc',
    question: 'Do you offer free quotes?',
    keywords: ['free quote', 'free estimate', 'no obligation quote'],
    answer: "100% free quotes — written, no obligation, no pressure. Hit the estimate form and we'll come out."
  },
  {
    id: 'kb-201', category: 'misc',
    question: 'Do you handle multi-tenant properties?',
    keywords: ['multi tenant', 'apartment lot', 'condo lot', 'plaza'],
    answer: "Yes — plazas, apartments, condos, mixed-use. We schedule around tenants and traffic flow."
  },
  {
    id: 'kb-202', category: 'misc',
    question: 'Can I see examples of your work?',
    keywords: ['examples', 'portfolio', 'past jobs', 'see your work', 'photo gallery'],
    answer: "Affirmative — scroll the gallery on this page or hit our Facebook at SealTeamSix.716 for the full archive."
  },
  {
    id: 'kb-203', category: 'misc',
    question: 'Do you do oil-spot priming?',
    keywords: ['oil spot primer', 'prime oil stain', 'oil prep'],
    answer: "Yes — oil-spot primer goes down before sealer so the coat bonds. Untreated oil is the #1 killer of fresh sealcoat."
  },
  {
    id: 'kb-204', category: 'misc',
    question: 'Will the sealer kill my grass?',
    keywords: ['kill grass', 'damage lawn', 'grass damage', 'lawn protection'],
    answer: "Negative — we cut edges clean and protect borders so sealer doesn't end up on your lawn. We're careful."
  },
  {
    id: 'kb-205', category: 'misc',
    question: 'Will the smell go away?',
    keywords: ['sealer smell', 'odor', 'how long does it smell'],
    answer: "Fresh sealer has a distinct tar/coal smell that fades within 24–48 hours once cured. Keep windows closed during cure if it bothers you."
  },
  {
    id: 'kb-206', category: 'misc',
    question: 'Is sealcoat toxic / safe for pets?',
    keywords: ['toxic', 'safe for pets', 'pet safety', 'dog safe', 'kid safe', 'pet friendly'],
    answer: "Once cured, the surface is inert — pets, kids, all good. Keep them off during the cure window so they don't track wet sealer."
  },
  {
    id: 'kb-207', category: 'misc',
    question: 'Can you seal an asphalt walkway?',
    keywords: ['walkway sealing', 'asphalt path', 'sidewalk seal asphalt'],
    answer: "Affirmative — if it's asphalt, we can seal it. Same protection, smaller crew."
  },
  {
    id: 'kb-208', category: 'misc',
    question: 'Do you do paving / new asphalt installs?',
    keywords: ['new paving', 'install asphalt', 'pave new driveway', 'lay asphalt'],
    answer: "We focus on sealcoating, crack filling, striping, and patching — not full new installs. For full repaves we can refer you to a paving partner."
  },
  {
    id: 'kb-209', category: 'misc',
    question: 'Can you seal a sloped driveway?',
    keywords: ['sloped driveway', 'steep driveway', 'hill driveway', 'slope sealing'],
    answer: "Affirmative — we squeegee on slopes so the coat lays even. We've handled some pretty steep drives."
  },
  {
    id: 'kb-210', category: 'misc',
    question: 'My driveway hasn\'t been sealed in years — is it too late?',
    keywords: ['never sealed', 'first time sealing old driveway', 'too late to seal', 'old driveway sealing'],
    answer: "Probably not. If the asphalt is still structurally there (no big holes, no alligatoring), we can usually save it with crack fill + a fresh seal. Send a photo on the estimate form."
  },
  {
    id: 'kb-211', category: 'misc',
    question: 'Do you do striping for trailer lots / car lots?',
    keywords: ['car lot striping', 'trailer lot', 'dealership striping', 'auto lot'],
    answer: "Yes — auto dealerships, RV lots, trailer parks. We can layout stalls and aisles to your spec."
  },
  {
    id: 'kb-212', category: 'misc',
    question: 'Can you re-do an existing layout with different stall sizes?',
    keywords: ['change stall size', 'redo layout', 're-layout', 'different layout'],
    answer: "Affirmative — we can black out the old lines (or wait for a sealcoat to cover them) and lay down a new layout with whatever stall sizes you need."
  },
  {
    id: 'kb-213', category: 'misc',
    question: 'How do you handle weeds growing through cracks?',
    keywords: ['weeds in cracks', 'weed removal', 'kill weeds', 'plants in asphalt'],
    answer: "We knock them down during prep so they don't push back through. For really bad spots, we may need to treat first and come back."
  },
  {
    id: 'kb-214', category: 'misc',
    question: 'Will fresh seal stain my tires?',
    keywords: ['tire stain', 'stain tires', 'tire damage sealer'],
    answer: "Negative once cured. During the cure window (24–48 hours), drive on it and you'll pick up sealer on the tires — that's why we keep you off it."
  },
  {
    id: 'kb-215', category: 'misc',
    question: 'Can I get on the schedule for next spring already?',
    keywords: ['schedule next spring', 'early booking', 'book next year', 'reserve spot'],
    answer: "Affirmative — we keep a spring booking list. Drop your info anytime and we'll slot you when the weather opens up."
  },
  {
    id: 'kb-216', category: 'misc',
    question: 'Do you provide before/after photos of my job?',
    keywords: ['before after photo', 'job photos', 'documentation', 'job pics'],
    answer: "Yes — happy to. We document most jobs and can share before/after shots for your records or insurance."
  },
  {
    id: 'kb-217', category: 'misc',
    question: 'Do you do striping at night?',
    keywords: ['night striping', 'night work', 'after dark striping'],
    answer: "Affirmative — for commercial lots we can stripe after hours or overnight to keep your business running. We use proper lighting and reflective gear."
  },

  /* ========== GREETINGS / SMALL TALK ========== */
  {
    id: 'kb-300', category: 'greeting',
    question: 'Hi / Hello',
    keywords: ['hi', 'hello', 'hey', 'howdy', 'yo', 'hi there', 'hey sarge'],
    answer: "Sarge here, Seal Team Six. Ready to help — what do you need to know? Sealcoating, striping, snow plowing, an estimate? Pick your mission."
  },
  {
    id: 'kb-301', category: 'greeting',
    question: 'Thanks / Thank you',
    keywords: ['thanks', 'thank you', 'appreciate it', 'cheers'],
    answer: "Roger that, recruit. Anything else you want covered? If you're ready for a free estimate, just say the word."
  },
  {
    id: 'kb-302', category: 'greeting',
    question: 'Are you a real person?',
    keywords: ['real person', 'are you a bot', 'is this a human', 'human or bot', 'are you ai'],
    answer: "I'm Sarge, the digital recruit — I answer the common questions on the spot. For anything I can't handle, the real crew takes over when you submit the form."
  },
  {
    id: 'kb-303', category: 'greeting',
    question: 'I want to talk to a person',
    keywords: ['talk to human', 'talk to person', 'real person please', 'speak to someone'],
    answer: "Roger. Call or text the owner at 716-907-8259, or drop your info on the estimate form and the crew will reach out within 24 hours."
  },

  /* ========== EXTRA NICHE / EDGE CASES ========== */
  {
    id: 'kb-220', category: 'misc',
    question: 'My driveway has tree roots pushing up — can you help?',
    keywords: ['tree roots', 'roots under driveway', 'raised asphalt', 'heaving'],
    answer: "Roots are tricky — if they've heaved the asphalt, you need root removal and a patch or partial repave first. We'll take a look and tell you the real fix."
  },
  {
    id: 'kb-221', category: 'misc',
    question: 'Will my driveway look uneven after sealing?',
    keywords: ['uneven seal', 'spotty coverage', 'streaky finish', 'patchy sealcoat'],
    answer: "Negative — proper two-coat application with squeegee + spray gives even color. If your asphalt is very porous, the first coat may look thirsty — the second coat evens it right out."
  },
  {
    id: 'kb-222', category: 'misc',
    question: 'Can you stripe over a freshly sealed lot?',
    keywords: ['stripe after sealing', 'stripe over fresh seal', 'paint on new seal'],
    answer: "Affirmative — we wait the proper cure (typically 24–48 hours) and then lay sharp lines on top. Same crew, same day if scheduled right."
  },
  {
    id: 'kb-223', category: 'misc',
    question: 'Do you remove old paint lines?',
    keywords: ['remove old lines', 'erase old striping', 'paint removal', 'black out lines'],
    answer: "Yes — we can black out old lines with sealer or paint over them, depending on the layout change. We'll spec it in your estimate."
  },
  {
    id: 'kb-224', category: 'misc',
    question: 'My HOA needs the lot done by a specific date — can you commit?',
    keywords: ['hoa deadline', 'specific date deadline', 'commit to date', 'lock in date'],
    answer: "Affirmative — weather permitting, we lock in dates with HOAs and property managers all the time. Get on the schedule early and we'll deliver."
  },
  {
    id: 'kb-225', category: 'misc',
    question: 'Do you use reflective glass beads on striping?',
    keywords: ['reflective beads', 'glass beads', 'reflective paint', 'night visibility'],
    answer: "We can — if your spec calls for reflective beads on stop bars or fire lanes, we'll add them. Common for schools and high-traffic lots."
  },
  {
    id: 'kb-226', category: 'misc',
    question: 'Can you do a one-time snow clearing without a contract?',
    keywords: ['one time plowing', 'single snow clear', 'no contract plow'],
    answer: "We try to take care of folks one-off when we can, but priority goes to contract customers during storms. Call 716-907-8259 and we'll see."
  },
  {
    id: 'kb-227', category: 'misc',
    question: 'Do you offer power-washing before sealing?',
    keywords: ['power wash', 'pressure wash', 'wash driveway', 'clean asphalt'],
    answer: "We blow off debris and treat oil spots as standard prep. If your surface is unusually grimy we can spec a pressure wash — ask on the estimate."
  },
  {
    id: 'kb-228', category: 'misc',
    question: 'Will my driveway be off-limits while you work?',
    keywords: ['driveway closed', 'access during work', 'use driveway during', 'block driveway'],
    answer: "Affirmative — the driveway is closed for the day plus the 24–48 hour cure window. We schedule with you so it's not a surprise."
  },
  {
    id: 'kb-229', category: 'misc',
    question: 'Can you stop by and look at my driveway today?',
    keywords: ['look today', 'come by today', 'site visit today', 'walk it today'],
    answer: "We try to be quick — sometimes same-day works, sometimes it's next-day depending on what's on the schedule. Call 716-907-8259 to check live, or drop your info on the form."
  },
  {
    id: 'kb-230', category: 'misc',
    question: 'Do you do speed bumps?',
    keywords: ['speed bumps', 'speed humps', 'install speed bump', 'paint speed bump'],
    answer: "We can paint speed bumps and add reflective stripes. Installing the physical bump itself is sometimes done via partner — ask on the form and we'll coordinate."
  },
  {
    id: 'kb-231', category: 'misc',
    question: 'Will sealcoat fix faded color?',
    keywords: ['faded driveway', 'gray driveway', 'restore black color', 'restore color'],
    answer: "Affirmative — that's one of the things sealer does best. A faded gray-brown driveway comes back deep jet-black."
  },
  {
    id: 'kb-232', category: 'misc',
    question: 'Why are some sealcoaters cheaper than others?',
    keywords: ['cheap sealcoaters', 'price difference contractors', 'low price reason'],
    answer: "Usually thinner product, less prep, fewer coats, no edge work — and sometimes no insurance. You see it the first hard winter. We charge a fair number for premium product and proper prep."
  },
];
