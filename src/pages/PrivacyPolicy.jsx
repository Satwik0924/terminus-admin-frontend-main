import mammoth from "mammoth";
import { useEffect, useState } from "react";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/privacy-policy.docx")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch privacy policy document");
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => {
        return mammoth.convertToHtml({
          arrayBuffer,
          styleMap: [
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='List Paragraph'] => li:fresh",
            "b => strong",
            "i => em",
            "u => u",
            "br => br",
            "p => p:fresh",
          ],
          ignoreEmptyParagraphs: false,
          preserveEmptyParagraphs: true,
        });
      })
      .then((result) => {
        const styledContent = `
          <style>
            ul, ol { 
              padding-left: 2em;
              margin: 1em 0;
            }
            li {
              margin-bottom: 0.5em;
            }
            p {
              margin-bottom: 1em;
              white-space: pre-wrap;
            }
            strong {
              font-weight: bold;
            }
            h1, h2, h3 {
              margin-top: 1.5em;
              margin-bottom: 0.5em;
              font-weight: bold;
            }
            h1 { font-size: 1.8em; }
            h2 { font-size: 1.5em; }
            h3 { font-size: 1.3em; }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1em 0;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
          ${result.value}
        `;
        setContent(styledContent);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading privacy policy:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="flex justify-center items-center h-64">
          <p>Loading privacy policy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="text-red-600">
          <p>Error loading privacy policy: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default PrivacyPolicy;
