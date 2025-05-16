export default function Page() {
  return (
    <div className="m-10 space-y-4">
      <h1 className="text-2xl font-bold">Getting Started</h1>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        <strong>BiasSearch</strong> is an AI-powered news search engine that retrieves articles relevant to your query and classifies their stance as <strong>in favor</strong> (green), <strong>neutral</strong> (no color), or <strong>against</strong> (red), with different color intensities depending on the level of agreement/disagreement.
      </p>

      <div className="flex flex-row gap-4 justify-between my-6">
        {/* Image 1 */}
        <div className="flex-1 flex-col items-center text-center">
          <img 
            src="/Favor.png" 
            alt="Classification in favor"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-green-500 font-medium">In favor</p>
        </div>
        {/* Image 2 */}
        <div className="flex-1 flex-col items-center text-center">
          <img 
            src="/Neutral.png" 
            alt="Classification neutral"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-gray-500 font-medium">Neutral</p>
        </div>
        {/* Image 3 */}
        <div className="flex-1 flex-col items-center text-center">
          <img 
            src="/Against.png" 
            alt="Classification against"
            className="w-full h-auto rounded-lg object-cover"
          />
          <p className="text-red-500 font-medium">Against</p>
        </div>
      </div>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        When you submit a query, it is embedded into a dense vector using the <code>all-MiniLM-L6-v2</code> model from Sentence Transformers. This model encodes the semantic content of the input, meaning that similar ideas, even if worded differently, are mapped to nearby points in the embedding space.
      </p>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        These embeddings are compared against a precomputed database of over <strong>300,000 news articles</strong> using <strong>cosine similarity</strong>. While cosine similarity itself is just a mathematical measure of vector orientation, the semantic richness comes from the model used to generate the embeddings.
      </p>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        The top-matching articles are passed through a <strong>zero-shot stance classification pipeline</strong>. This uses an ensemble of large language models (<code>RoBERTa-large-MNLI</code>, <code>BART-large-MNLI</code>, and <code>DeBERTa-v3-MNLI</code>) to infer whether the article agrees, disagrees, or is neutral toward the core message of your query. Final stance is determined via majority vote and confidence averaging across models.
      </p>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        <strong>Note:</strong> Since results depend on the semantics of your query, vague or overly short inputs (e.g. one or two words) may not yield meaningful results. You’ll get better matches by phrasing your query as a full sentence or clear opinion statement.
      </p>

      <div className="pt-4">
        <h2 className="text-xl font-semibold">Examples of good queries</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 [text-align:justify] [text-justify:inter-word]">
          <li>Remote work reduces employee productivity.</li>
          <li>The government is responsible for addressing climate change.</li>
          <li>College should be free for everyone.</li>
          <li>Vaccine mandates are effective during pandemics.</li>
          <li>Electric vehicles help reduce carbon emissions.</li>
        </ul>
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-semibold">System Summary</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2 [text-align:justify] [text-justify:inter-word]">
          <li><strong>Embedding:</strong> User queries and article information are embedded via <code>all-MiniLM-L6-v2</code>, which generates dense vector embeddings that enable semantic search.</li>
          <li><strong>Search:</strong> Cosine similarity retrieves semantically close articles from the embedding index.</li>
          <li><strong>Classification:</strong> A multi-model zero-shot classifier predicts stance relative to the query based on article content.</li>
        </ul>
      </div>

            <div className="pt-6">
        <h2 className="text-xl font-semibold">Github repositories</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2 [text-align:justify] [text-justify:inter-word]">
          <p>We encourage you to check the github repositories for a closer look at the implementation of the project</p>
          <li><a href="https://github.com/olavhalleraker/thu-web-IR-project-webapp" className="text-blue-500">thu-web-IR-project-webapp</a></li>
          <li><a href="https://github.com/olavhalleraker/thu-web-IR-project-api" className="text-blue-500">thu-web-IR-project-api</a></li>
          <li><a href="https://github.com/olavhalleraker/thu-web-IR-project-crawler" className="text-blue-500">thu-web-IR-project-crawler</a></li>
        </ul>
      </div>

      <p className="text-gray-600 [text-align:justify] [text-justify:inter-word]">
        <br></br>
        <br></br>
        Olav Larsen Halleraker & Guillermo Rodrigo Pérez 

      </p>
    </div>
  );
}
