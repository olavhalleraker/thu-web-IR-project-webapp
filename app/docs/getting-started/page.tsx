export default function Page() {
  return (
    <div className="m-10 space-y-4">
      <h1 className="text-2xl font-bold">Getting Started</h1>

      <p className="text-gray-600">
        This page provides instructions for using <strong>BIAS Search</strong>. Learn how to make effective queries and understand how the system works under the hood.
      </p>

      <p className="text-gray-600">
        BIAS Search uses LLMs to represent both your query and news articles as <strong>embeddings</strong>. It then compares these embeddings using <strong>cosine similarity</strong>, that measures how close two pieces of text are in meaning, regardless of exact wording.
      </p>

      <p className="text-gray-600">
        Your query is matched semantically, not just by keywords, against a database of over <strong>300,000 news articles</strong>. The matched results are then classified based on whether they <strong>agree</strong>, are <strong>neutral</strong>, or <strong>disagree</strong> with the core message of your query.
      </p>

      <p className="text-gray-600">
        <strong>Note:</strong> Because the system relies on the semantic structure of your input, vague or extremely short queries (e.g., just one or two words) may not capture enough meaning for a high-quality match. Try to phrase your query as a clear statement to get the most relevant results.
      </p>
      
      <div className="pt-4">
        <h2 className="text-xl font-semibold">Examples of good queries:</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2">
          <li>Remote work reduces employee productivity.</li>
          <li>The government is responsible for addressing climate change.</li>
          <li>College should be free for everyone.</li>
          <li>Vaccine mandates are effective during pandemics.</li>
          <li>Electric vehicles help reduce carbon emissions.</li>
        </ul>
      </div>
    </div>
  );
}
