# AI project code review brief and internship skills benchmark

Prepared for Yusri, 18 November 2026. Share this file with the reviewer alongside the AI project's repository.

This is a review brief, not a review of existing code. The AI repository has not been inspected for this document. Features below describe the intended product; the reviewer must verify what is actually implemented.

## Copy-and-send review request

Please review the attached AI project against this brief. I want an evidence-based assessment of its correctness, usefulness and value as preparation for Malaysian AI/data internships—not just whether the interface looks finished or a model returns an answer.

Start by reading the repository's instructions, README, dependency manifests, architecture and tests. Identify the implemented stack and trace one complete request from ingestion through retrieval to the displayed result. Do not assume the intended architecture or advertised features exist.

Review the code and run appropriate existing checks where feasible. Report bugs with file/line references, a concrete failure scenario and practical fixes. Clearly distinguish observed failures, untested risks and optional enhancements. Do not fabricate test results or performance measurements. Do not modify the code unless I separately request fixes.

Assess whether I can credibly discuss this project in an internship interview. Separate skills demonstrated by working code, skills supported by repeatable evaluation, and skills I still need to learn personally. AI-generated implementation is not proof of my understanding.

Deliver:

1. A short verdict: what works, what is unreliable, and the strongest current portfolio claim.
2. Findings ordered by severity, with evidence and reproduction/verification steps.
3. A feature-status table: implemented and verified / implemented but unverified / incomplete / absent.
4. A skills-evidence table mapping the employer benchmarks below to actual repository evidence and gaps.
5. An evaluation assessment: baselines, dataset quality, leakage, metrics, reproducibility and unsupported claims.
6. A prioritised improvement plan: must fix before demo; next useful milestone; optional later work. Estimate effort as a range and state assumptions.
7. A learning plan with small exercises I should perform myself, plus interview questions grounded in this codebase.
8. A truthful README/CV description I could use once the relevant results are verified.

Do not turn the project into a showcase of every tool mentioned in job adverts. Recommend additions only when they improve the product, address a demonstrated weakness, or teach a clearly identified skill. Respect the local-first requirement and do not upload my real notes to external services.

## My background and intended timeline

- My strongest practical experience is React/TypeScript and web applications. Existing meaningful projects include my portfolio, Elysium event-ticketing work, and club/yearbook websites.
- Preserve the distinction between my contributions and teammates' contributions. Do not infer ownership of an entire backend from a team project.
- I want software engineering experience in **January–April 2027**, ideally at JurisTech, followed by a more AI-focused placement in **April–August 2027**. These are intended windows, not confirmed offers; exact dates must avoid overlap.
- I am learning **PHP/SQL separately for JurisTech**. This AI project should not be rewritten in PHP to serve that purpose.
- I want useful software for my own Obsidian notes and genuine understanding of Python, data preparation, retrieval, model integration and evaluation.
- Fable 5.2 was intended to help produce a working implementation and learning materials. Assess the resulting code independently rather than trusting generated documentation.
- Primary machine: **MacBook Air M4, 24GB unified memory**. Do not make new hardware a prerequisite. Existing desktop: Ryzen 5700X, 16GB RAM, Radeon RX 5500 XT; exact GPU memory/OS unspecified.

## What the project is

Working concept: **Local Notes Companion**, an application alongside Obsidian.

It should help me find useful passages, understand explicit note links, discover possible new connections, ask questions grounded in my notes and review possible tasks or commitments. It is not initially an autonomous assistant that edits notes or acts on my behalf.

Intended stack: Python/FastAPI backend, React/TypeScript interface, persistent local storage and a replaceable local model/embedding adapter. Verify the actual implementation rather than insisting on these names if the repository uses a reasonable alternative.

Normal operation should keep ingestion, embeddings, indexing, inference and storage local. Initial installation and model downloads may require internet. Hosted inference should not be required for the main workflow.

### Bounded first version

- Read selected Markdown folders without modifying the vault.
- Preserve provenance: file, heading, passage and relevant metadata.
- Handle headings, frontmatter/tags, wikilinks and checkboxes where supported; document unsupported syntax.
- Provide keyword search as a baseline and local semantic/hybrid retrieval for comparison.
- Show explicit links separately from similarity-based link suggestions.
- Answer questions with inspectable source passages and an insufficient-evidence response.
- Extract proposed tasks for human review; store review state outside the vault.
- Persist indexes and correctly handle additions, edits, renames/deletions and reindexing.
- Include a fictional demo vault, reproducible evaluation, meaningful tests and setup documentation.

Example questions: “What have I written about internship preparation?”, “Which Elysium lessons relate to the yearbook project?”, and “Where did I decide on the event registration workflow?”

Not required for V1: email/calendar integration, automatic vault rewrites, voice, multi-user accounts, OCR/PDF ingestion, fine-tuning, Kubernetes or multi-agent orchestration.

## Review checklist

### Data ingestion and provenance

- Are paths and vault boundaries validated, including symlinks and relative-path traversal where relevant?
- Do parser/chunking choices preserve enough context without silently dropping content?
- Are empty, malformed, duplicated, very large and non-UTF-8 inputs handled predictably?
- Are identifiers stable enough for citations, incremental updates and review state?
- Does reindexing avoid duplicates and remove stale content after edits/deletions?
- Are partial failures recoverable, and do concurrent indexing/query operations produce consistent results?
- Can a reviewer trace a result back to the actual current source text?

### Retrieval and note connections

- Is there a working keyword baseline? Is semantic/hybrid search actually better on labelled examples?
- Are embedding model/version, dimensions and index configuration tracked and invalidated when incompatible?
- Are exact matches, aliases, ambiguous links and unresolved links handled sensibly?
- Does the UI distinguish a real Obsidian link from a suggested semantic relationship?
- Are source paths/titles available before generation, so the search feature remains useful if inference is unavailable?

### Generation and task extraction

- Are answers constrained to retrieved evidence, and do citations refer to real passages?
- Does the cited text support the claim? A valid citation ID alone is insufficient.
- Does the system abstain when relevant evidence is absent or contradictory?
- Are instructions inside notes treated as note content rather than permission to act, reveal unrelated notes or override application rules?
- Are model timeouts, invalid structured output, unavailable models and cancellations handled?
- Do extracted tasks distinguish explicit commitments from suggestions, quotations, examples and completed work?
- Are inferred owners/dates marked as uncertain, and are ambiguous dates handled without invention?
- Does failure to find a completion note incorrectly become proof that a task is outstanding?

### Backend, persistence and local operation

- Inspect API validation, error handling, database queries/migrations, logging and configuration.
- Check localhost binding and any API exposure, CORS and access controls according to the actual threat model.
- Check for unexpected outbound calls, telemetry, cloud fallbacks or logs containing note contents/secrets.
- Verify dependencies, model/runtime configuration and clean-machine setup instructions.
- Measure representative latency and memory on the available machine where feasible. Separate cold model load, indexing time and warm query time.
- Treat model download size as different from runtime memory requirements.

### Evaluation and software quality

- Use manually checked fictional/public fixtures for distributable tests. Do not publish private vault content.
- Include relevant and unanswerable questions, similar-but-wrong notes, conflicting facts and stale/deleted notes.
- Split by note/scenario group to limit near-duplicate leakage; do not tune on the final held-out set.
- For retrieval, use a suitable measure such as Recall@k or MRR with documented relevance labels.
- For answers, separately assess correctness, evidence support/citation correctness and abstention. Document any human or model judging procedure.
- For extraction, measure missed and invented tasks, field accuracy and precision/recall where labels support them.
- Compare changes against a baseline and record corpus, model, prompt, chunking, retrieval configuration and actual results.
- Distinguish automated assertions from subjective evaluation and tiny fixture scores from real-world generalisation.
- Prioritise tests for meaningful failure cases rather than tests that merely reproduce implementation details.

## Internship benchmark register

The following is a snapshot of research discussed on **18 November 2026**, not a live vacancy feed. “Advertised” means an accessible vacancy/programme was found; it does not confirm a 2027 start or ongoing acceptance. “Historical” means a closed listing, useful only as a skills benchmark. Unspecified dates/requirements must remain unspecified. Relative posting labels are not reliable original publication dates.

### JurisTech — Bangsar South

**Software Engineer Intern — advertised.** PHP/JavaScript banking applications and integrations. Diploma/degree preferred; PHP, Linux, JS, SQL/PLSQL, TypeScript and HTML5 sought after. No previous work experience required. Minimum **3 months**; posting date, deadline and 2027 intake unspecified. Apply with CV, transcript and estimated dates. Separate PHP practice is the direct preparation; the notes project can demonstrate APIs, SQL, debugging and documentation.

Source: https://juristech.net/careers/join-us/

### Ryt Bank — Kuala Lumpur

- **Fullstack Engineer Intern, Enterprise Engineering:** Relevant degree; foundational JS/TS, a React/Vue/comparable web app, some REST backend experience, SQL and Git. Java/testing/Docker are advantages. Minimum **3 months**; recently advertised on job boards, original date/intake unverified. Direct project evidence: frontend/backend integration, validation, tests, database and clear Git history. https://firstjobby.com/companies/rytbankorwd3orexternalcareer/fullstack-engineer-intern-enterprise-engineering-ryt-bank-1038f6
- **Business Intelligence Intern:** SQL/Python coursework or projects; charts/reporting in Power BI/Tableau or similar; relevant degree. Work includes reporting models, dbt/Snowflake and dashboards. Duration/intake unspecified; advertised via job boards, acceptance needs checking. Notes retrieval alone does not demonstrate BI reporting. https://my.prosple.com/graduate-employers/ryt-bank/jobs-internships/business-intelligence-intern-0
- **Data Engineer Intern:** Relevant bachelor’s/master’s; SQL/Python preferred. Duties emphasise UAT, BRDs, mapping, lineage/documentation and data quality rather than guaranteed pipeline development. Indexed employer listing showed 30+ days; exact date, duration/intake unspecified. https://rytbank.wd3.myworkdayjobs.com/en-US/External_Career/job/Data-Engineer-Intern_JR00000324

### Data Flows — Kuala Lumpur

- **Software internship:** Relevant degree, programming basics (Python/Java/C++/JS examples), databases, data structures, debugging and collaboration; web/mobile exposure a plus. https://www.dataflows.co/careers/internship/
- **AI and Data Analytics tracks:** Explicitly offered, but separate detailed technical requirements and project assignments were not published on the programme page. Do not invent them.
- Programme: **minimum 6 months**, hybrid, year-round intake, flexible starts subject to availability. Both proposed separate placements are too short without an exception. https://www.dataflows.co/internship-programme/

### Cyber Village / Silverlake — Damansara / Petaling Jaya

- **Cyber Village Java Software Developer Intern — advertised:** Relevant degree, **CGPA 3.20**, on-site Damansara Uptown and possible travel. Enterprise financial software, OOP, debugging and SIT/UAT. Spring, React, Docker and other frameworks are exposure opportunities. State dates in CV; minimum duration and intake unspecified. The Python project demonstrates transferable engineering, not Java proficiency. https://my.jobstreet.com/job/95850787
- **Silverlake Software Engineer Intern — historical/closed:** Final-year relevant-degree students; CS/programming/OOP fundamentals, teamwork and problem-solving; development/testing/documentation in PJ. Duration unspecified. https://my.linkedin.com/jobs/view/software-engineer-intern-at-silverlake-4220969983
- An older February/March Silverlake advert referred to **2025**, not 2027: https://my.linkedin.com/jobs/view/software-engineer-intern-feb-march-intake-at-silverlake-4095377004

### TNG Digital / Touch ’n Go Group — Kuala Lumpur

Treat these as distinct hiring entities. Role-level Bangsar South assignments were not confirmed.

- **TNG Digital Automation Scientist Intern — historical/closed:** Relevant degree; basic Python/programming, LLM/GenAI understanding and exposure to tools/APIs. Prompt engineering and AI/automation projects are advantages. Chatbots/copilots/workflow prototypes, testing, demos and stakeholder communication. Duration/intake unspecified; page displayed about three months old. This is the closest product match for the notes assistant. https://my.linkedin.com/jobs/view/intern-automation-scientist-at-tng-digital-4445669634
- **TNG Digital AI Engineering Intern — historical/closed:** Relevant degree; basic Python/ML, computer vision/deep learning/CNN/framework familiarity; data collection, labelling/cleaning, face/document verification testing, experiments and LLM evaluation. Published duration **3–6 months**, no confirmed 2027 intake. Project can demonstrate data/evaluation, but not CV expertise. https://www.linkedin.com/jobs/view/4387692641/
- **AI Engineering, Data & BI Intern — older listing, current acceptance unconfirmed:** Final-year relevant degree, AI/ML/data fundamentals; Python/Java preferred. Model validation, datasets and documentation. **Minimum 4 months, 6 preferred.** https://my.linkedin.com/jobs/view/intern-ai-engineering-data-business-intelligence-tng-digital-at-touch-n-go-group-4052938551
- **TNG Digital Data Analyst Intern — historical/closed:** Relevant degree, basic SQL, Excel or Python/pandas; BI tools a plus. Dashboards, validation and business insights. Duration unspecified; page displayed about nine months old. https://www.linkedin.com/jobs/view/4358212124/
- **Touch ’n Go Group Cloud & DevOps Intern — recently advertised:** Relevant diploma/degree, learning/communication; Linux/Git/CI/CD/cloud/containers/scripting exposure and projects are advantages. **Minimum 6 continuous months**, intake unspecified. Not compatible with either separate window as planned. https://my.linkedin.com/jobs/view/intern-cloud-dev-ops-at-touch-n-go-group-4490258224

### Hilti — Petaling Jaya

Official role pages were accessible; exact posting dates and 2027 intakes unspecified.

- **Software Developer, Strategic Marketing:** Backend/mobile digital experience work; no prior experience required, fast learning/teamwork/ownership, final year preferred. Duration unspecified. https://careers.hilti.group/cs/pracovni-nabidky/16522-en/internship-software-developer-strategic-marketing/
- **Software Developer, Marketing and Sales IT:** Relevant degree, learning/teamwork. APIs, backend/event-driven systems, tests and CI/CD; Java/JS/Python, AWS, Git and enterprise-platform exposure. **Minimum 5 months.** https://careers.hilti.group/de-li/stellenangebote/16494-en/internship-software-developer-marketing-and-sales-it/
- **Software Developer, IT Integrity:** No experience required; communication, coordination, quick learning. SAP integration/archiving/monitoring with potential automation/AI enhancements. Duration unspecified; do not assume general web development. https://careers.hilti.group/en-us/jobs/16493-en/internship-software-developer-it-integrity/
- **Data Science Intern:** Quantitative/CS/data degree, **strong Python, SQL, cloud experience**, basic software engineering/version control/CI; statistical validation and communicating results. Duration unspecified. This requires more data/statistical evidence than a chat demo. https://careers.hilti.group/en-us/jobs/13631-en/internship-data-science/
- **Data Engineer Intern:** Relevant quantitative degree; **Python/Spark/SQL**, software engineering, distributed/big-data concepts and some Hadoop/MapReduce/HDFS exposure; AWS/Azure preferred. **Minimum 5 months.** A local ingestion pipeline is relevant foundational evidence but does not prove distributed/cloud competence. https://careers.hilti.group/en/jobs/12227-en/internship-data-engineer/
- **IT Operations Intern — adjacent:** Relevant degree, English/teamwork/problem-solving. Enterprise operations with Power BI and agentic-AI automation in the scope. Duration unspecified; coding allocation needs confirmation. https://careers.hilti.group/en-us/jobs/15036-en/internship-it-operations/

Five months only fits April–August if the exact start/end dates cover five full months. Do not apply one role's duration to all Hilti internships.

### PayNet — Kuala Lumpur

**Internship Programme:** Official application route available, but no independently verified current SE/AI/data intern specifications. Historical closed advert specified Malaysian relevant-degree undergraduates, **CGPA 3.30**, English, critical thinking/learning agility and **minimum 3 months**. Reconfirm eligibility for the current programme. Intake/deadline unspecified. Request technical team allocation and job scope. Its Technology Graduate Programme is separate from a short internship.

Current route: https://paynet.my/about-us/career.html

Historical criteria: https://my.linkedin.com/jobs/view/paynet-internship-programme-at-paynet-payments-network-malaysia-4245070359

### CIMB — Headstart Internship Programme

Advertised general programme; software/data assignment and office require confirmation. Diploma/undergraduate **not yet graduated**, **CGPA 3.25 / Second Class Upper / WAM 75%**, extracurricular involvement and interpersonal/communication skills. Malaysian applicants; non-Malaysians requiring a compulsory university placement may apply. **Minimum 10 weeks, 12+ preferred**. Year-round intake; apply **3–4 months ahead**. Shortlisted candidates normally hear within **3–4 weeks**. No separate coding/ML checklist in the umbrella programme.

January application is inside the preferred lead time: apply immediately. For April, apply around **December–January**. Digital & Data ELP is a separate year-long graduate programme.

Source: https://www.cimb.com/en/careers/i-am/undergraduate/cimb-internship-programme.html?section=basic-eligibility

### Deloitte — Kuala Lumpur / Penang

- **Software Development Intern, Innovation & Cloud Development Centre — advertised:** Relevant degree, programming knowledge (React/JS/SQL/API/Python/Java/.NET examples), SDLC and learning ability. Final semester/final year prioritised. Work can include fullstack/cloud/ML/GenAI, depending on assignment. Page date **27 October 2026**; duration/intake unspecified. https://jobs.sea.deloitte.com/job/Kuala-Lumpur-T%26T-Intern-Innovation-%26-Cloud-Development-Centre-%28Software-Development%29-MY/1362351566/
- **AI & Data Engineering, GCP Intern — historical/closed:** Relevant bachelor’s/master’s; Python/SQL pipelines, cloud data platforms, modelling/warehouses, quality/governance; GCP preferred. Agent/tool-calling applications and evaluation/monitoring also named. **6 months full-time**; listing date **6 August 2026**, KL. Stronger stretch benchmark; do not add multi-agent tooling merely to match the advert. https://my.linkedin.com/jobs/view/t-t-internship-ai-data-engineering-gcp-my-at-deloitte-4425559307

### EY — Kuala Lumpur

**Technology Consulting Internship — advertised**, with **Digital Engineering** and **AI & Data** among its tracks. General criteria: analytical thinking, English, communication/teamwork, initiative and learning ability. No detailed Python/ML/framework checklist, minimum duration or specific 2027 intake published in the umbrella listing. Tracks are not independently confirmed vacancies. Request implementation-heavy work explicitly. Python/SQL/API/evaluation preparation is our recommendation, not a quoted EY requirement.

Source: https://eyglobal.yello.co/jobs/xOz9SbbOTeCgbePS5pVx9A?locale=en

### PwC — Kuala Lumpur

**Assurance Data CoE Intern — advertised, March 2027 intake.** Client data, analytics, automation, documentation and communication with audit teams. Published education requirement: bachelor’s degree; English and collaboration; accessible listing did not specify a programming-language proficiency threshold. Applications **November 2026**; processing **November 2026–February 2027**; onboarding **March 2027**. Duration unspecified. March conflicts with the planned January–April placement; April onboarding must be agreed. SQL/pandas/reporting are preparation recommendations based on the work, not claimed mandatory requirements.

Source: https://pwc.wd3.myworkdayjobs.com/en-US/Global_Campus_Careers/job/Kuala-Lumpur/Intern---Assurance--Data-CoE---March-2027-Intake-_771803WD

### KPMG — Petaling Jaya

- **Lighthouse Data Analyst, BI — historical/closed:** Quantitative/data-related degree, ETL/modelling/visualisation/analysis; SQL/data extraction, Python/R and BI tools; communication/teamwork. **3-month availability**; no verified 2027 reopening. https://my.linkedin.com/jobs/view/internship-%E2%80%93-data-analyst-business-intelligence-petaling-jaya-at-kpmg-malaysia-3556559182
- **Technology Assurance Intern — advertised:** At least two years completed in IT/accounting-related degree, English, extracurricular/leadership involvement and IT-audit interest. **4–6 months**, closing **31 December 2026**, start unspecified. IT audit/analytics is not equivalent to AI/software development.
- **IT Services Intern — adjacent advertised role:** Enterprise support/deployments/infrastructure rather than dedicated SE/AI. Closing **31 December 2026**; do not infer a technical development assignment.

Current portal: https://career4u.kpmg.com.my/?grade=Internship

## How to map this project to the roles

| Skill | Repository evidence to look for | Limits to state honestly |
|---|---|---|
| Python engineering | Maintainable modules, typed/validated boundaries, errors, tests, dependency setup | A generated backend alone does not show my independent fluency |
| Data preparation | Parsing, cleaning, provenance, incremental processing, labelled fixtures | Markdown ingestion is not experience with every enterprise data source |
| SQL and persistence | Schema, meaningful queries, constraints, migrations, transactions where needed | Vector-store calls alone are not SQL proficiency |
| LLM application engineering | Configurable inference, retrieval, structured output, citations, abstention | Calling a model is not training one |
| Evaluation | Baselines, held-out examples, recorded comparisons and error analysis | Tiny/synthetic scores are not broad real-world performance |
| Classical ML/statistics | Optional supervised experiment with a baseline, grouped split and justified metrics | No classifier means no claim of model-training experience |
| Fullstack development | React/TS UI connected to a validated API, tests and useful failure states | Frontend polish cannot establish model quality |
| Data engineering | Idempotent ingestion, transformations, lineage and recovery | Local scale does not demonstrate Spark/GCP/distributed systems |
| Delivery and operations | Repeatable setup, CI, logging, measured latency/memory, runtime failures | Local deployment does not prove AWS/GCP experience |
| Communication | Clear architecture, setup, limitations, experiment report and explainable decisions | Generated prose must agree with the actual code |

## Improvement priorities and learning boundaries

The reviewer should derive the final order from code evidence. A reasonable default is:

1. Protect data and fix correctness failures: vault boundaries, stale/deleted content, invalid citations and broken indexing.
2. Establish useful search with a reproducible keyword baseline and labelled retrieval evaluation.
3. Make grounded answers and task suggestions reliable enough to inspect and review.
4. Add repeatable experiments, failure-case tests and a truthful demo/README.
5. Strengthen Python and SQL understanding through small changes I implement and explain myself.
6. Consider one focused extension only after the core works: a supervised task classifier, reporting over evaluation results, or a small cloud exercise using fictional data.

For a supervised extension, a TF-IDF/logistic-regression “actionable commitment or not” classifier could teach labelling, splits, precision/recall and overfitting. Integrate it only if it improves the product. It does not need deep learning.

Keep larger agent workflows, graph databases, distributed infrastructure and fine-tuning optional. An Obsidian link graph can start with a straightforward adjacency representation; a graph database is not automatically necessary.

## Interview and ownership checks

Ask me to explain, using this repository:

- How a note becomes a chunk, embedding, search result and cited answer.
- Why the chunking/retrieval choices were made and what measured result supports them.
- What happens when a note changes or is deleted.
- The difference between keyword matching, semantic similarity and evidence for a claim.
- Why an answer with citations might still be wrong.
- How the system detects insufficient evidence and how that behaviour was tested.
- How I prevented leakage in evaluation and investigated one real failure.
- One API/database design decision and one test I personally wrote or improved.
- What runs locally, what uses the network and how I verified that.
- Which parts I implemented, which were AI-assisted, and which I can recreate independently.

The desired result is a useful, explainable project with measured limitations. Do not require every employer-specific technology before recommending that I apply.
