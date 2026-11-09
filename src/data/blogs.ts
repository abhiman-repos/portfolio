export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
  note?: string;
};

export type Article = {
  slug: string;
  title: string;
  summary: string;
  topic: string;
  readTime: string;
  number: string;
  intro: string;
  sections: ArticleSection[];
  takeaway: string;
};

export const articles: Article[] = [
  {
    slug: "rag-systems-that-fail-safely",
    title: "Build RAG systems that know when to stop",
    summary: "Grounded AI starts with retrieval, tenant boundaries, and a clear path to say “I don’t know.”",
    topic: "AI ENGINEERING · RAG",
    readTime: "8 MIN READ",
    number: "01",
    intro: "A retrieval-augmented generation system is only as dependable as the evidence it gives the model. A confident answer built on the wrong document is still a bad answer. I approach RAG as a search and product-design problem first, then a language-model problem.",
    sections: [
      {
        heading: "Start with the question, not the prompt",
        paragraphs: ["Before tuning a prompt, write down what a useful answer needs to find. Is the user asking for a policy, a price, a compatibility detail, or a process? Those questions have different retrieval needs and different costs when the system gets them wrong.", "A small set of real questions gives you a baseline. For each one, record the expected source, the relevant passage, and what an acceptable answer looks like. That becomes the first evaluation set—and it will expose retrieval gaps that prompt changes can hide."],
        points: ["Keep the original question alongside any rewritten search query.", "Measure whether the right evidence was retrieved before judging the generated answer.", "Include questions whose answer is intentionally absent from the corpus."],
      },
      {
        heading: "Treat tenant isolation as a data boundary",
        paragraphs: ["In a multi-tenant product, tenant scope belongs in the retrieval operation itself. Apply it before ranking and keep it attached through ingestion, indexing, caching, and logs. Filtering only after a shared search has returned results leaves too much room for accidental exposure.", "Make the tenant identifier part of the explicit retrieval contract, then test cross-tenant questions as a normal part of the evaluation suite. Isolation should be an invariant the system enforces, not a convention every caller remembers."],
        note: "A useful security test asks a tenant-specific question while authenticated as a different tenant and verifies that no source, citation, or cached answer crosses the boundary.",
      },
      {
        heading: "Preserve the shape of the source",
        paragraphs: ["Chunking is a trade-off between retrieval precision and enough context to explain a passage. Splitting every fixed number of characters can separate a rule from its heading, table row, or exception. Keep document identity and structural metadata with each chunk so the retrieved text can be interpreted in context.", "For product documentation, a useful chunk often follows a heading or a coherent procedure. For tables, keep the labels near the values. If a passage needs its neighboring section to make sense, consider retrieving that parent section after a smaller chunk matches."],
      },
      {
        heading: "Give uncertainty a real behavior",
        paragraphs: ["A similarity score is not automatically a confidence score. Calibrate thresholds against examples from your own corpus, and inspect the cases near the decision boundary. When evidence is weak or contradictory, ask a clarifying question, show the source limitation, or hand the task to a person.", "The fallback is part of the experience. In a support workflow, pass the conversation summary and the retrieved sources along with the handoff. That lets a person continue the task instead of restarting it."],
      },
      {
        heading: "Keep a trace of every answer",
        paragraphs: ["For each request, capture enough structured information to explain the result: the normalized question, tenant scope, retrieved document identifiers, ranking, model version, and whether the system answered or abstained. Redact sensitive content where required, and set a deliberate retention policy.", "These traces turn vague feedback into actionable debugging. You can distinguish a missing document from a poor chunk, a bad retrieval query, or an answer that ignored good evidence."],
      },
    ],
    takeaway: "Build the retrieval boundary, evaluation set, and fallback behavior before polishing the prompt. That is where a grounded product earns trust.",
  },
  {
    slug: "voice-agents-that-feel-like-conversations",
    title: "Design voice agents around the turn, not the model",
    summary: "A useful voice agent has to listen, respond, recover from interruptions, and hand off gracefully.",
    topic: "AI ENGINEERING · VOICE",
    readTime: "7 MIN READ",
    number: "02",
    intro: "A voice agent is a real-time system wearing a conversational interface. The model matters, but callers notice the pauses, interruptions, and recovery paths first. I design the call as a series of short, observable turns with a clear owner at every step.",
    sections: [
      {
        heading: "Make each turn an explicit pipeline",
        paragraphs: ["A turn can be described as audio capture, speech recognition, intent and context retrieval, response generation, speech synthesis, and playback. That decomposition makes it possible to see where time is spent and where a failure needs to be handled.", "Keep the stages connected by a conversation and turn identifier. The identifier lets logs, transcripts, retrieved context, and playback events tell one coherent story when you need to debug a difficult call."],
        points: ["Emit a timestamp at each stage boundary.", "Keep the raw and normalized transcript distinct.", "Track cancellation and completion state per turn."],
      },
      {
        heading: "Treat interruption as cancellation",
        paragraphs: ["Barge-in is more than stopping audio. When the caller speaks over a response, cancel the current playback, mark the generated response as interrupted, and prevent late tokens or audio chunks from leaking into the next turn.", "Tie streaming tasks to a turn-scoped cancellation signal. When a new caller utterance is accepted, downstream generation and playback should be able to stop together. Then acknowledge the new input quickly so the caller knows the system heard them."],
      },
      {
        heading: "Budget the silence",
        paragraphs: ["Break perceived delay into stages instead of measuring only total response time. Audio endpointing, retrieval, model generation, and speech synthesis can each add a pause. A fast first acknowledgement can make the interaction feel responsive while the complete answer is still being prepared.", "Use streaming where it reduces perceived wait without compromising correctness. For example, begin speech only when the response is stable enough to say aloud, and avoid speaking a claim before its supporting retrieval has arrived."],
        note: "Measure time to first useful response and interruption recovery—not just average model latency.",
      },
      {
        heading: "Design for the phone you actually have",
        paragraphs: ["Telephone audio is narrowband and callers do not speak in clean laboratory sentences. Expect clipped phrases, background noise, names the speech recognizer has not seen, and people who change their mind halfway through a sentence.", "Use short confirmations when a detail affects the next action. Keep prompts easy to answer in one breath, and let callers correct a captured name, number, or order before the system commits it."],
      },
      {
        heading: "Make the human handoff continuous",
        paragraphs: ["A handoff should preserve the work already done. When the agent cannot find supporting evidence or a caller asks for a person, prepare a compact summary, attach relevant source material, and transfer the call with the transcript available to the next operator.", "The caller should not have to repeat the question. The operator should be able to see why the agent stopped and what it tried."],
      },
    ],
    takeaway: "A natural voice experience comes from well-managed turns, clean cancellation, and a handoff that carries context forward.",
  },
  {
    slug: "apis-for-products-that-keep-growing",
    title: "Shape APIs for the product you have—and the one it is becoming",
    summary: "Practical ways to keep a full-stack product coherent as simple workflows become real platforms.",
    topic: "FULL STACK · SYSTEM DESIGN",
    readTime: "6 MIN READ",
    number: "03",
    intro: "A product rarely stays in the shape of its first release. An opportunity board can grow into cohorts, assignments, and feedback; a simple checkout can acquire stock and offline sync. Good full-stack design leaves those next steps possible without designing an imaginary platform on day one.",
    sections: [
      {
        heading: "Model the domain before the screens",
        paragraphs: ["Start with the nouns and relationships users already understand. Separate an opportunity from a learning programme if they have different lifecycles, permissions, or completion rules. Share concepts when they truly mean the same thing; avoid one overloaded record whose optional fields encode several unrelated workflows.", "A small domain map helps connect interface language, API resources, and database tables. It also gives the team a place to discuss whether a new capability is an extension or a different concept."],
      },
      {
        heading: "Design endpoints around user intent",
        paragraphs: ["An API should make the allowed action clear. Prefer explicit operations with validation and authorization at the boundary over exposing generic database updates to the client. The browser can guide the user, but the server owns the rules.", "Return errors that help the interface recover: which field needs attention, whether the item changed since it was loaded, or whether the user needs a different permission. Keep the response predictable so the UI does not need a separate exception for every endpoint."],
        points: ["Validate input on the server even when the client already validates it.", "Check authorization for the target resource, not only the signed-in user.", "Use pagination and stable ordering for collections that can grow."],
      },
      {
        heading: "Plan for change at the data boundary",
        paragraphs: ["When a product adds a new workflow, use migrations that can be applied and reviewed deliberately. Backfill new fields when their meaning is known; avoid a migration that silently invents defaults for old records.", "Transactions are useful when one user action changes several records that must stay consistent. Keep those boundaries small and make failure behavior explicit so a partial write does not leave the product in a state the interface cannot explain."],
      },
      {
        heading: "Make retries safe",
        paragraphs: ["Networks fail at inconvenient times. A client may retry a request after a timeout even if the server completed the first attempt. For operations that create a charge, order, or submission, give the request a stable idempotency key or another explicit duplicate-protection strategy.", "For offline-capable interfaces, record pending work locally with a clear sync state. When connectivity returns, reconcile against the server and show conflicts to the user rather than quietly discarding a change."],
      },
      {
        heading: "Keep the contract visible",
        paragraphs: ["Types shared between a frontend and backend can reduce mismatches, but they do not replace a documented contract or runtime validation. Keep examples of success and failure responses close to the code, and add tests around the rules that affect access and data integrity.", "The goal is not an architecture that predicts every future feature. It is a system where the next real feature has an obvious place to go."],
      },
    ],
    takeaway: "A product-ready API makes current user intent clear, protects the data boundary, and gives new workflows room to grow.",
  },
  {
    slug: "offline-first-workflows-that-recover",
    title: "Offline-first is a recovery design problem",
    summary: "Local storage is only the beginning; the difficult part is explaining what happens when devices reconnect.",
    topic: "FULL STACK · RELIABILITY",
    readTime: "5 MIN READ",
    number: "04",
    intro: "Taking a point-of-sale workflow offline can keep a workshop moving when the network drops. But saving data locally is not enough. A useful offline mode tells the operator what is saved, what still needs to sync, and how conflicts will be resolved.",
    sections: [
      {
        heading: "Write the offline contract first",
        paragraphs: ["List which actions are safe without a server and which require a live check. A draft invoice may be saved locally; a stock reservation shared across devices may need an explicit pending state. The interface should communicate that difference before the user relies on it.", "Store a local record with a durable identifier, the action time, and its sync status. Keep pending work visible so a reload or device restart does not make it look like the action disappeared."],
      },
      {
        heading: "Make sync idempotent",
        paragraphs: ["A reconnecting client may send the same operation more than once. Give each queued action a stable identifier, and have the server recognize a repeated submission. That turns retries into a recovery mechanism instead of a duplicate-sale risk.", "Sync in small batches and record success per item. If one record fails validation, the rest of the queue can still make progress, and the operator can see what needs attention."],
      },
      {
        heading: "Choose conflict rules by the data",
        paragraphs: ["Not every field should use last-write-wins. A note may allow a simple merge; a product quantity or price may need the server's latest value and an explicit confirmation. Choose a policy for each kind of data and explain it in the interface.", "Keep an audit trail of the original local value, the server value, and the decision. That makes support possible when two devices have been working independently."],
      },
      {
        heading: "Show the state honestly",
        paragraphs: ["Use clear states such as saved on this device, syncing, synced, or needs review. Avoid a generic green success message if the server has not received the transaction yet.", "Offline support is complete when the user can understand what happened after reconnecting—not merely when the app can write to local storage."],
      },
    ],
    takeaway: "Design offline queues, retries, conflicts, and status as one recovery flow. Local persistence is just the first step.",
  },
];
